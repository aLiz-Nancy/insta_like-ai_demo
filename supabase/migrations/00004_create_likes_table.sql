-- Create likes table with unique constraint per post+user
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

-- Enable RLS (policies defined in 00006)
alter table public.likes enable row level security;
