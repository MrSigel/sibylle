-- SUPABASE DATABASE SCHEMA FOR SIBYLLE BERGOLD CRM
-- Ausführen im Supabase SQL Editor

-- 1. Erweiterungen aktivieren
create extension if not exists "uuid-ossp";

-- 2. Kunden Tabelle
create table if not exists customers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique,
  phone text,
  status text default 'Interessent' check (status in ('Aktiv', 'Interessent', 'Inaktiv')),
  plan text, -- z.B. 'Ahnenmuster', 'Systemaufstellung'
  notes text,
  last_contact timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. Rechnungen Tabelle
create table if not exists invoices (
  id text primary key, -- Format: RE-2024-001
  customer_id uuid references customers(id) on delete cascade,
  amount decimal(10,2) not null,
  status text default 'Offen' check (status in ('Bezahlt', 'Offen', 'Überfällig', 'Storniert')),
  due_date date,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. Projekte/Aufgaben Tabelle (Kanban)
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete cascade,
  title text not null,
  description text,
  column_name text default 'Anfrage' check (column_name in ('Anfrage', 'In Planung', 'In Umsetzung', 'Abgeschlossen')),
  priority text default 'Normal' check (priority in ('Niedrig', 'Normal', 'Hoch')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 5. Termine Tabelle
create table if not exists appointments (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete cascade,
  title text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  appointment_type text default 'Zoom' check (appointment_type in ('Zoom', 'Vor Ort', 'Telefon', 'Fokus')),
  status text default 'Geplant' check (status in ('Geplant', 'Bestätigt', 'Abgeschlossen', 'Abgesagt')),
  created_at timestamp with time zone default now()
);

-- 6. Dokumente Metadaten
create table if not exists documents (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) on delete cascade,
  file_name text not null,
  file_path text not null, -- Pfad im Supabase Storage
  category text default 'Allgemein' check (category in ('Verträge', 'Rechnungen', 'Klienten-Notizen', 'DSGVO', 'Vorlagen', 'Allgemein')),
  file_size text,
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS) - Optional: Für den Anfang deaktiviert, damit der Anon Key Zugriff hat
-- In Produktion sollten diese Tabellen nur für authentifizierte Nutzer sichtbar sein.
alter table customers enable row level security;
alter table invoices enable row level security;
alter table projects enable row level security;
alter table appointments enable row level security;
alter table documents enable row level security;

-- Einfache Policy: Alles erlaubt für anon/authenticated (für schnellen Start)
create policy "Allow all access" on customers for all using (true);
create policy "Allow all access" on invoices for all using (true);
create policy "Allow all access" on projects for all using (true);
create policy "Allow all access" on appointments for all using (true);
create policy "Allow all access" on documents for all using (true);
