create extension if not exists pgcrypto;

create table if not exists public.transcripts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  raw_text text not null,
  call_date timestamptz null,
  call_type text null,
  participant_name text null,
  source text null,
  source_url text null,
  created_at timestamptz not null default now()
);
