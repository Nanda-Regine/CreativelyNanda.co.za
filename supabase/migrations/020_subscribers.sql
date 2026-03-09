-- Blog newsletter subscribers
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  subscribed_at timestamptz not null default now(),
  source      text default 'blog',
  is_active   boolean default true
);

alter table public.subscribers enable row level security;

-- Only service role can read/write subscribers
create policy "Service role manages subscribers"
  on public.subscribers
  for all
  to service_role
  using (true)
  with check (true);
