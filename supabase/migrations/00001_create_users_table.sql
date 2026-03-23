-- Create users table (public profiles linked to auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null
    check (char_length(username) between 3 and 30)
    check (username ~ '^[a-z0-9_]+$'),
  display_name text check (display_name is null or char_length(display_name) <= 50),
  avatar_url text check (avatar_url is null or avatar_url ~ '^https://'),
  bio text check (bio is null or char_length(bio) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS (policies defined in 00006)
-- Note: no INSERT policy — profile creation is handled by the trigger below
alter table public.users enable row level security;

-- Trigger: auto-create profile on auth.users sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  v_username text;
begin
  v_username := new.raw_user_meta_data ->> 'username';

  -- Sanitise: enforce format constraints, fallback to user_<id-prefix>
  if v_username is null
    or char_length(v_username) < 3
    or char_length(v_username) > 30
    or v_username !~ '^[a-z0-9_]+$'
  then
    v_username := 'user_' || substr(new.id::text, 1, 8);
  end if;

  insert into public.users (id, username)
  values (new.id, v_username);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger: auto-update updated_at
create or replace function public.update_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();
