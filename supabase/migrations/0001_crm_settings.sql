-- Business settings for the CRM (invoice sender, bank & tax data).
-- Stored as a single JSON row so new fields don't require migrations.
create table if not exists public.crm_settings (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- The CRM talks to Supabase with the anon key (same as the other CRM tables).
-- Enable RLS and allow the anon role full access, matching the existing CRM
-- tables. If your other CRM tables use a different policy, mirror that here.
alter table public.crm_settings enable row level security;

drop policy if exists "crm_settings anon access" on public.crm_settings;
create policy "crm_settings anon access"
  on public.crm_settings
  for all
  to anon
  using (true)
  with check (true);
