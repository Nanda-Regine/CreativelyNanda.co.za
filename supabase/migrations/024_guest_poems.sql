-- Guest Garden: poems submitted by readers/fellow writers, moderated by Nanda.
-- Applied to the live DB on 2026-07-14.
create table if not exists public.guest_poems (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  content       text not null,
  author_name   text,
  author_email  text,
  is_anonymous  boolean not null default false,
  status        text not null default 'pending'
                  check (status in ('pending','approved','featured','rejected')),
  session_id    text,
  created_at    timestamptz not null default now()
);

alter table public.guest_poems enable row level security;

-- All access flows through server API routes using the service-role (admin)
-- client, mirroring poem_roses. No direct anon access.
create policy "Service role manages guest poems"
  on public.guest_poems
  for all
  to service_role
  using (true)
  with check (true);

create index if not exists guest_poems_status_created_idx
  on public.guest_poems (status, created_at desc);
