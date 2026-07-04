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
