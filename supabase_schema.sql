-- SUPABASE DATABASE SCHEMA FOR SIBYLLE BERGOLD CRM
-- Ausführen im Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists customers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique,
  phone text,
  address text,
  status text default 'Interessent' check (status in ('Aktiv', 'Interessent', 'Inaktiv')),
  plan text,
  notes text,
  last_contact timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists invoices (
  id text primary key,
  customer_id uuid references customers(id) on delete cascade,
  amount decimal(10,2) not null,
  status text default 'Offen' check (status in ('Bezahlt', 'Offen', 'Überfällig', 'Storniert')),
  items jsonb default '[]'::jsonb,
  due_date date,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete set null,
  title text not null,
  description text,
  column_name text default 'Anfrage' check (column_name in ('Anfrage', 'In Planung', 'In Umsetzung', 'Abgeschlossen')),
  priority text default 'Normal' check (priority in ('Niedrig', 'Normal', 'Hoch')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists appointments (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete set null,
  title text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  appointment_type text default 'Zoom' check (appointment_type in ('Zoom', 'Vor Ort', 'Telefon', 'Fokus')),
  status text default 'Geplant' check (status in ('Geplant', 'Bestätigt', 'Abgeschlossen', 'Abgesagt')),
  public_visible boolean default false,
  booking_status text default 'Frei' check (booking_status in ('Frei', 'Reserviert', 'Bestätigt', 'Abgelehnt')),
  reserved_until timestamp with time zone,
  booked_name text,
  booked_email text,
  booked_phone text,
  booked_message text,
  booking_created_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists documents (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete set null,
  file_name text not null,
  file_path text not null,
  category text default 'Allgemein' check (category in ('Verträge', 'Rechnungen', 'Klienten-Notizen', 'DSGVO', 'Vorlagen', 'Allgemein')),
  file_size text,
  created_at timestamp with time zone default now()
);

-- Ergänzungen für bestehende Installationen
alter table customers add column if not exists address text;
alter table invoices add column if not exists items jsonb default '[]'::jsonb;
alter table appointments add column if not exists updated_at timestamp with time zone default now();
alter table appointments add column if not exists public_visible boolean default false;
alter table appointments add column if not exists booking_status text default 'Frei';
alter table appointments add column if not exists reserved_until timestamp with time zone;
alter table appointments add column if not exists booked_name text;
alter table appointments add column if not exists booked_email text;
alter table appointments add column if not exists booked_phone text;
alter table appointments add column if not exists booked_message text;
alter table appointments add column if not exists booking_created_at timestamp with time zone;

create index if not exists appointments_public_booking_idx on appointments (public_visible, booking_status, start_time);
create index if not exists appointments_reserved_until_idx on appointments (reserved_until);

alter table customers enable row level security;
alter table invoices enable row level security;
alter table projects enable row level security;
alter table appointments enable row level security;
alter table documents enable row level security;

drop policy if exists "Allow all access" on customers;
drop policy if exists "Allow all access" on invoices;
drop policy if exists "Allow all access" on projects;
drop policy if exists "Allow all access" on appointments;
drop policy if exists "Allow all access" on documents;

create policy "Allow all access" on customers for all using (true) with check (true);
create policy "Allow all access" on invoices for all using (true) with check (true);
create policy "Allow all access" on projects for all using (true) with check (true);
create policy "Allow all access" on appointments for all using (true) with check (true);
create policy "Allow all access" on documents for all using (true) with check (true);

-- Supabase Storage Bucket für CRM-Dokumente
insert into storage.buckets (id, name, public)
values ('crm-documents', 'crm-documents', false)
on conflict (id) do nothing;

drop policy if exists "Allow CRM document reads" on storage.objects;
drop policy if exists "Allow CRM document uploads" on storage.objects;
drop policy if exists "Allow CRM document deletes" on storage.objects;

create policy "Allow CRM document reads" on storage.objects
  for select using (bucket_id = 'crm-documents');

create policy "Allow CRM document uploads" on storage.objects
  for insert with check (bucket_id = 'crm-documents');

create policy "Allow CRM document deletes" on storage.objects
  for delete using (bucket_id = 'crm-documents');

-- Selbsttest / Beziehungs-Kompass Leads
create table if not exists selbsttests (
  id uuid default uuid_generate_v4() primary key,
  vorname text not null,
  telefonnummer text not null,
  ergebnis_typ text not null,
  created_at timestamp with time zone default now()
);

create index if not exists selbsttests_created_at_idx on selbsttests (created_at desc);

alter table selbsttests enable row level security;
drop policy if exists "Allow all access" on selbsttests;
create policy "Allow all access" on selbsttests for all using (true) with check (true);
