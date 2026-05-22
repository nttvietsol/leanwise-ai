/**
 * D1 data layer — server-only.
 *
 * Never import this from client component scope: `cloudflare:workers` does not
 * exist in the browser bundle. It is only reached through `createServerFn`
 * handlers (see `src/server/content.ts`), which TanStack Start keeps server-side.
 */
import { env } from 'cloudflare:workers';

export type PostCategory = 'ESSAY' | 'METHOD' | 'ENGINEERING' | 'CASE';
export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: PostCategory;
  author: string;
  readMinutes: number;
  bodyMd: string;
  status: PostStatus;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  company: string;
  industry: string;
  kpi: string;
  kpiUnit: string;
  kpiSub: string;
  description: string;
  caseStudySlug: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Fields a writer supplies; the store owns id / timestamps / publishedAt. */
export type PostInput = Omit<
  Post,
  'id' | 'createdAt' | 'updatedAt' | 'publishedAt'
>;
export type StoryInput = Omit<Story, 'id' | 'createdAt' | 'updatedAt'>;

const db = (): D1Database => env.DB;

/* ────────────── row mappers (snake_case → camelCase) ────────────── */

type PostRow = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  read_minutes: number;
  body_md: string;
  status: string;
  featured: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function toPost(r: PostRow): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    dek: r.dek,
    category: r.category as PostCategory,
    author: r.author,
    readMinutes: r.read_minutes,
    bodyMd: r.body_md,
    status: r.status as PostStatus,
    featured: r.featured === 1,
    publishedAt: r.published_at,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

type StoryRow = {
  id: string;
  company: string;
  industry: string;
  kpi: string;
  kpi_unit: string;
  kpi_sub: string;
  description: string;
  case_study_slug: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function toStory(r: StoryRow): Story {
  return {
    id: r.id,
    company: r.company,
    industry: r.industry,
    kpi: r.kpi,
    kpiUnit: r.kpi_unit,
    kpiSub: r.kpi_sub,
    description: r.description,
    caseStudySlug: r.case_study_slug,
    sortOrder: r.sort_order,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

/* ────────────── posts ────────────── */

/** Published posts only, newest first — for public pages. */
export async function dbListPublishedPosts(): Promise<Post[]> {
  const { results } = await db()
    .prepare(
      `SELECT * FROM posts WHERE status = 'published'
       ORDER BY featured DESC, published_at DESC`,
    )
    .all<PostRow>();
  return results.map(toPost);
}

/** Every post incl. drafts, newest first — for the admin dashboard. */
export async function dbListAllPosts(): Promise<Post[]> {
  const { results } = await db()
    .prepare(`SELECT * FROM posts ORDER BY updated_at DESC`)
    .all<PostRow>();
  return results.map(toPost);
}

export async function dbGetPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  const row = await db()
    .prepare(`SELECT * FROM posts WHERE slug = ? AND status = 'published'`)
    .bind(slug)
    .first<PostRow>();
  return row ? toPost(row) : null;
}

export async function dbGetPostById(id: string): Promise<Post | null> {
  const row = await db()
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .bind(id)
    .first<PostRow>();
  return row ? toPost(row) : null;
}

export async function dbSlugExists(
  slug: string,
  exceptId?: string,
): Promise<boolean> {
  const row = await db()
    .prepare(`SELECT id FROM posts WHERE slug = ? AND id != ?`)
    .bind(slug, exceptId ?? '')
    .first<{ id: string }>();
  return row != null;
}

export async function dbInsertPost(input: PostInput): Promise<Post> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const publishedAt = input.status === 'published' ? now : null;
  await db()
    .prepare(
      `INSERT INTO posts
       (id, slug, title, dek, category, author, read_minutes, body_md,
        status, featured, published_at, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    )
    .bind(
      id,
      input.slug,
      input.title,
      input.dek,
      input.category,
      input.author,
      input.readMinutes,
      input.bodyMd,
      input.status,
      input.featured ? 1 : 0,
      publishedAt,
      now,
      now,
    )
    .run();
  return (await dbGetPostById(id))!;
}

export async function dbUpdatePost(
  id: string,
  input: PostInput,
): Promise<Post | null> {
  const existing = await dbGetPostById(id);
  if (!existing) return null;
  const now = new Date().toISOString();
  // First publish stamps published_at; later edits keep the original.
  const publishedAt =
    input.status === 'published'
      ? (existing.publishedAt ?? now)
      : existing.publishedAt;
  await db()
    .prepare(
      `UPDATE posts SET
        slug = ?, title = ?, dek = ?, category = ?, author = ?,
        read_minutes = ?, body_md = ?, status = ?, featured = ?,
        published_at = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      input.slug,
      input.title,
      input.dek,
      input.category,
      input.author,
      input.readMinutes,
      input.bodyMd,
      input.status,
      input.featured ? 1 : 0,
      publishedAt,
      now,
      id,
    )
    .run();
  return dbGetPostById(id);
}

export async function dbDeletePost(id: string): Promise<void> {
  await db().prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
}

/* ────────────── customer stories ────────────── */

export async function dbListStories(): Promise<Story[]> {
  const { results } = await db()
    .prepare(`SELECT * FROM customer_stories ORDER BY sort_order, company`)
    .all<StoryRow>();
  return results.map(toStory);
}

export async function dbGetStoryById(id: string): Promise<Story | null> {
  const row = await db()
    .prepare(`SELECT * FROM customer_stories WHERE id = ?`)
    .bind(id)
    .first<StoryRow>();
  return row ? toStory(row) : null;
}

export async function dbInsertStory(input: StoryInput): Promise<Story> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await db()
    .prepare(
      `INSERT INTO customer_stories
       (id, company, industry, kpi, kpi_unit, kpi_sub, description,
        case_study_slug, sort_order, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    )
    .bind(
      id,
      input.company,
      input.industry,
      input.kpi,
      input.kpiUnit,
      input.kpiSub,
      input.description,
      input.caseStudySlug,
      input.sortOrder,
      now,
      now,
    )
    .run();
  return (await dbGetStoryById(id))!;
}

export async function dbUpdateStory(
  id: string,
  input: StoryInput,
): Promise<Story | null> {
  const existing = await dbGetStoryById(id);
  if (!existing) return null;
  const now = new Date().toISOString();
  await db()
    .prepare(
      `UPDATE customer_stories SET
        company = ?, industry = ?, kpi = ?, kpi_unit = ?, kpi_sub = ?,
        description = ?, case_study_slug = ?, sort_order = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      input.company,
      input.industry,
      input.kpi,
      input.kpiUnit,
      input.kpiSub,
      input.description,
      input.caseStudySlug,
      input.sortOrder,
      now,
      id,
    )
    .run();
  return dbGetStoryById(id);
}

export async function dbDeleteStory(id: string): Promise<void> {
  await db().prepare(`DELETE FROM customer_stories WHERE id = ?`).bind(id).run();
}

export async function dbCountPosts(): Promise<number> {
  const row = await db()
    .prepare(`SELECT COUNT(*) AS n FROM posts`)
    .first<{ n: number }>();
  return row?.n ?? 0;
}
