-- Touchline Websites — leads table
-- Run this whole file in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  email            text not null,
  business_name    text not null,
  phone            text,
  website_type     text not null,
  business_type    text not null,
  features         jsonb default '[]'::jsonb,
  primary_color    text,
  example_websites text,
  style_description text,
  custom_request   text,
  needs_advanced   boolean default false,
  selected_package text not null,
  package_setup    integer,
  package_monthly  integer,
  submitted_at     timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

create index if not exists leads_submitted_at_idx on public.leads (submitted_at desc);

-- Row Level Security ON. We allow INSERT only (so the public form can submit),
-- but NOT SELECT — so nobody can read your leads with the public anon key.
alter table public.leads enable row level security;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
