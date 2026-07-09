-- Newsletter subscribers collected from the public homepage form. Sibylle can
-- later send campaigns (e.g. Academy news) to them from the CRM.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'active',
  source text,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

-- Same access model as the other CRM tables (anon key + RLS).
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_subscribers anon access" on public.newsletter_subscribers;
create policy "newsletter_subscribers anon access"
  on public.newsletter_subscribers
  for all
  to anon
  using (true)
  with check (true);
