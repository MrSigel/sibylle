# Supabase Zugangsdaten

Bitte trage hier deine Supabase-Daten ein, sobald du das Projekt in Supabase erstellt hast.

- **Project URL**: [sb_publishable_-h03dKzoHVLQWYV7cempmQ_BxUQrlDl](https://yybzgsjlktdnhfnhmpok.supabase.co)
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynpnc2psa3RkbmhmbmhtcG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMTU0NjcsImV4cCI6MjA5ODY5MTQ2N30.zz3-wN9loLAC6h7GiDJtYyzllRwhxB1Q8KSM2OIjBHQ
- **Service Role Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynpnc2psa3RkbmhmbmhtcG9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzExNTQ2NywiZXhwIjoyMDk4NjkxNDY3fQ.rOCNeMwDdzu81SPgrlhx5Z1YpPHH3b0_09ZSMf9aB2Y
- **DB Password**: 5M4bjgrp5w!

## SQL Schema Vorschlag (für den SQL Editor in Supabase)

```sql
-- Kunden Tabelle
create table customers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique,
  phone text,
  status text default 'Interessent',
  plan text,
  last_contact timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Rechnungen Tabelle
create table invoices (
  id text primary key, -- z.B. RE-2024-001
  customer_id uuid references customers(id),
  amount decimal(10,2) not null,
  status text default 'Offen',
  due_date date,
  created_at timestamp with time zone default now()
);
```
