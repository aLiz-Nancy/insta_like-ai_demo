-- Create posts table
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null check (char_length(content) <= 500),
  image_url text check (image_url is null or image_url ~ '^https?://'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS (policies defined in 00006)
alter table public.posts enable row level security;

-- Auto-update updated_at
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();
