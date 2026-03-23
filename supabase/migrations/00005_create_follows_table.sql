-- Create follows table with composite PK and self-follow check
create table public.follows (
  follower_id uuid not null references public.users(id) on delete cascade,
  following_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id != following_id)
);

-- Enable RLS (policies defined in 00006)
alter table public.follows enable row level security;
