-- LeanWise AI — blog + customer-story content store (Cloudflare D1)
--
-- DESTRUCTIVE RESET: applying this file drops both tables and recreates them
-- empty. Safe pre-production; once live, do not re-run against a populated DB.
-- Apply locally:  pnpm db:setup
-- Apply remote:   wrangler d1 execute leanwise-ai --remote --file=db/schema.sql

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS customer_stories;

CREATE TABLE posts (
  id           TEXT PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  dek          TEXT NOT NULL,
  category     TEXT NOT NULL,                  -- ESSAY | METHOD | ENGINEERING | CASE
  author       TEXT NOT NULL,
  read_minutes INTEGER NOT NULL DEFAULT 5,
  body_md      TEXT NOT NULL DEFAULT '',
  status       TEXT NOT NULL DEFAULT 'draft',  -- draft | published
  featured     INTEGER NOT NULL DEFAULT 0,     -- 0 | 1
  published_at TEXT,                           -- ISO timestamp, set on publish
  created_at   TEXT NOT NULL,
  updated_at   TEXT NOT NULL
);

CREATE INDEX idx_posts_status_pub ON posts (status, published_at DESC);

CREATE TABLE customer_stories (
  id              TEXT PRIMARY KEY,
  company         TEXT NOT NULL,
  industry        TEXT NOT NULL,
  kpi             TEXT NOT NULL,
  kpi_unit        TEXT NOT NULL DEFAULT '',
  kpi_sub         TEXT NOT NULL DEFAULT '',
  description     TEXT NOT NULL,
  case_study_slug TEXT,                        -- optional: references posts.slug
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

CREATE INDEX idx_stories_sort ON customer_stories (sort_order);
