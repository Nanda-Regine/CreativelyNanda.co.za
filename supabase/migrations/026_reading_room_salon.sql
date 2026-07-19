-- ─────────────────────────────────────────────────────────────────────────────
-- 026 · The Reading Room & The Salon
-- Petals (the "bloom + how it left me" gesture) and Marginalia (line-anchored
-- whispers). Follows the newer convention (gen_random_uuid, service_role RLS).
-- All writes/reads flow through service-role API routes, so anon has no policy.
-- Guardrails: soft-delete (deleted_at), UTC timestamps, length caps.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Petals ──────────────────────────────────────────────────────────────────
-- One petal per reader (session) per poem. Optional feeling tag grows the poem's
-- emotional "aura". Bloom count = count of non-deleted petals for a poem.
create table if not exists public.poem_petals (
  id          uuid primary key default gen_random_uuid(),
  poem_id     uuid not null references public.poems(id) on delete cascade,
  session_id  text not null,
  feeling     text,                              -- e.g. 'longing' | 'hope' | 'grief' (curated client-side)
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (poem_id, session_id)
);

create index if not exists idx_poem_petals_poem    on public.poem_petals (poem_id) where deleted_at is null;
create index if not exists idx_poem_petals_feeling on public.poem_petals (feeling)  where deleted_at is null;

alter table public.poem_petals enable row level security;

drop policy if exists "service_role full access on poem_petals" on public.poem_petals;
create policy "service_role full access on poem_petals"
  on public.poem_petals for all to service_role
  using (true) with check (true);

-- ── Marginalia ───────────────────────────────────────────────────────────────
-- Line-anchored whispers (Genius/Medium-style). Public ones become collective
-- art; the most-whispered line glows. Auto-approved to stay live, but the status
-- column preserves a future moderation lever.
create table if not exists public.poem_marginalia (
  id          uuid primary key default gen_random_uuid(),
  poem_id     uuid not null references public.poems(id) on delete cascade,
  line_index  int  not null,
  body        text not null check (char_length(body) between 1 and 280),
  author      text,
  session_id  text,
  visibility  text not null default 'public'   check (visibility in ('public','private')),
  status      text not null default 'approved' check (status in ('pending','approved','featured','rejected')),
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists idx_poem_marginalia_poem on public.poem_marginalia (poem_id, line_index)
  where deleted_at is null;

alter table public.poem_marginalia enable row level security;

drop policy if exists "service_role full access on poem_marginalia" on public.poem_marginalia;
create policy "service_role full access on poem_marginalia"
  on public.poem_marginalia for all to service_role
  using (true) with check (true);

comment on table public.poem_petals is 'Reading Room: one petal per reader per poem, optional feeling tag → poem aura. Count = bloom.';
comment on table public.poem_marginalia is 'Reading Room: line-anchored reader whispers (Annotated depth mode).';
