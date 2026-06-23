/**
 * Content server functions — the RPC boundary between routes and D1.
 *
 * Read functions are public. Write functions live below the divider and every
 * one calls `requireAdmin()` first (Cloudflare Access gate).
 */
import { createServerFn } from '@tanstack/react-start';
import {
  dbDeletePost,
  dbDeleteStory,
  dbGetPostById,
  dbGetPublishedPostBySlug,
  dbInsertPost,
  dbInsertStory,
  dbListAllPosts,
  dbListPublishedPosts,
  dbListStories,
  dbSlugExists,
  dbUpdatePost,
  dbUpdateStory,
  type Post,
  type PostCategory,
  type PostInput,
  type PostStatus,
  type Story,
  type StoryInput,
} from './db';
import { getAdmin, requireAdmin, type AdminIdentity } from './auth';

/* ─────────────────────── admin identity ─────────────────────── */

/** Current admin identity, or null. Used to gate the /admin route UI. */
export const getAdminIdentity = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminIdentity | null> => getAdmin(),
);

/** Validate that a required string field is present, returning the input. */
function requireField<T extends Record<string, unknown>>(
  d: T,
  key: keyof T,
): T {
  if (!d?.[key]) throw new Error(`${String(key)} is required`);
  return d;
}

/* ─────────────────────── public reads ─────────────────────── */

export const listPublishedPosts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Post[]> => dbListPublishedPosts(),
);

export const listStories = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Story[]> => dbListStories(),
);

export const getPublishedPost = createServerFn({ method: 'GET' })
  .inputValidator((d: { slug: string }) => requireField(d, 'slug'))
  .handler(async ({ data }): Promise<Post | null> =>
    dbGetPublishedPostBySlug(data.slug),
  );

/* ─────────────────────── admin reads ─────────────────────── */

export const adminListPosts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Post[]> => {
    await requireAdmin();
    return dbListAllPosts();
  },
);

export const adminGetPost = createServerFn({ method: 'GET' })
  .inputValidator((d: { id: string }) => requireField(d, 'id'))
  .handler(async ({ data }): Promise<Post | null> => {
    await requireAdmin();
    return dbGetPostById(data.id);
  });

export const adminListStories = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Story[]> => {
    await requireAdmin();
    return dbListStories();
  },
);

/* ─────────────────────── validation ─────────────────────── */

const CATEGORIES: PostCategory[] = ['ESSAY', 'METHOD', 'ENGINEERING', 'CASE'];
const STATUSES: PostStatus[] = ['draft', 'published'];

/** lower-case, hyphenated, url-safe. */
export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function validatePost(d: Partial<PostInput>): PostInput {
  const title = (d.title ?? '').trim();
  if (!title) throw new Error('Title is required');
  const slug = slugify(d.slug?.trim() || title);
  if (!slug) throw new Error('Slug is required');
  const category = d.category ?? 'ESSAY';
  if (!CATEGORIES.includes(category)) throw new Error('Invalid category');
  const status = d.status ?? 'draft';
  if (!STATUSES.includes(status)) throw new Error('Invalid status');
  return {
    slug,
    title,
    dek: (d.dek ?? '').trim(),
    category,
    author: (d.author ?? '').trim() || 'LeanWise AI',
    readMinutes: Math.max(1, Math.min(99, Math.round(Number(d.readMinutes) || 5))),
    bodyMd: d.bodyMd ?? '',
    status,
    featured: Boolean(d.featured),
  };
}

function validateStory(d: Partial<StoryInput>): StoryInput {
  const company = (d.company ?? '').trim();
  if (!company) throw new Error('Company is required');
  return {
    company,
    industry: (d.industry ?? '').trim(),
    kpi: (d.kpi ?? '').trim(),
    kpiUnit: (d.kpiUnit ?? '').trim(),
    kpiSub: (d.kpiSub ?? '').trim(),
    description: (d.description ?? '').trim(),
    caseStudySlug: d.caseStudySlug?.trim() || null,
    sortOrder: Math.round(Number(d.sortOrder) || 0),
  };
}

/* ─────────────────────── admin writes (gated) ─────────────────────── */

export const createPost = createServerFn({ method: 'POST' })
  .inputValidator((d: Partial<PostInput>) => validatePost(d))
  .handler(async ({ data }): Promise<Post> => {
    await requireAdmin();
    if (await dbSlugExists(data.slug)) {
      throw new Error(`A post with slug "${data.slug}" already exists`);
    }
    return dbInsertPost(data);
  });

export const updatePost = createServerFn({ method: 'POST' })
  .inputValidator((d: { id: string } & Partial<PostInput>) => {
    requireField(d, 'id');
    return { id: d.id, ...validatePost(d) };
  })
  .handler(async ({ data }): Promise<Post> => {
    await requireAdmin();
    if (await dbSlugExists(data.slug, data.id)) {
      throw new Error(`Another post already uses slug "${data.slug}"`);
    }
    const { id, ...input } = data;
    const post = await dbUpdatePost(id, input);
    if (!post) throw new Error('Post not found');
    return post;
  });

export const deletePost = createServerFn({ method: 'POST' })
  .inputValidator((d: { id: string }) => requireField(d, 'id'))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    await requireAdmin();
    await dbDeletePost(data.id);
    return { ok: true };
  });

export const createStory = createServerFn({ method: 'POST' })
  .inputValidator((d: Partial<StoryInput>) => validateStory(d))
  .handler(async ({ data }): Promise<Story> => {
    await requireAdmin();
    return dbInsertStory(data);
  });

export const updateStory = createServerFn({ method: 'POST' })
  .inputValidator((d: { id: string } & Partial<StoryInput>) => {
    requireField(d, 'id');
    return { id: d.id, ...validateStory(d) };
  })
  .handler(async ({ data }): Promise<Story> => {
    await requireAdmin();
    const { id, ...input } = data;
    const story = await dbUpdateStory(id, input);
    if (!story) throw new Error('Story not found');
    return story;
  });

export const deleteStory = createServerFn({ method: 'POST' })
  .inputValidator((d: { id: string }) => requireField(d, 'id'))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    await requireAdmin();
    await dbDeleteStory(data.id);
    return { ok: true };
  });
