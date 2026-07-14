-- Petals: readers/writers reacting to each other's guest poems (session-based,
-- mirrors poem_hearts). Plus Nanda's personal note on a featured poem.
-- Applied to the live DB on 2026-07-14.
create table if not exists public.guest_poem_petals (
  id            uuid primary key default gen_random_uuid(),
  guest_poem_id uuid not null references public.guest_poems(id) on delete cascade,
  session_id    text not null,
  created_at    timestamptz not null default now(),
  unique (guest_poem_id, session_id)
);

alter table public.guest_poem_petals enable row level security;

create policy "Service role manages petals"
  on public.guest_poem_petals
  for all
  to service_role
  using (true)
  with check (true);

create index if not exists guest_poem_petals_poem_idx
  on public.guest_poem_petals (guest_poem_id);

-- Nanda's personal note when she features a guest poem.
alter table public.guest_poems add column if not exists nanda_note text;
