-- Instagram posts/reels that Sibylle adds in the CRM and that are shown in the
-- "Instagram" section on the public homepage (newest first).
create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  shortcode text not null unique,
  media_type text not null default 'reel',
  created_at timestamptz not null default now()
);

create index if not exists social_posts_created_at_idx
  on public.social_posts (created_at desc);

-- The CRM and the public site both talk to Supabase with the anon key, matching
-- the other CRM tables. Enable RLS and allow the anon role full access.
alter table public.social_posts enable row level security;

drop policy if exists "social_posts anon access" on public.social_posts;
create policy "social_posts anon access"
  on public.social_posts
  for all
  to anon
  using (true)
  with check (true);
