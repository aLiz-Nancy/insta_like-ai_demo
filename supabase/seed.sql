-- LOCAL DEVELOPMENT ONLY — never run against production
-- Seed data for local development
-- Note: auth.users records must be created via Supabase Auth API.
-- This seed assumes three test users already exist in auth.users.
-- Use `supabase/seed_auth.sql` or the Dashboard to create them first.

-- Test user UUIDs (deterministic for reproducibility)
-- user1: 00000000-0000-0000-0000-000000000001
-- user2: 00000000-0000-0000-0000-000000000002
-- user3: 00000000-0000-0000-0000-000000000003

-- Create auth.users for seeding (local dev only)
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'alice@example.com', crypt('password123', gen_salt('bf')), now(), '{"username": "alice"}'::jsonb, now(), now(), '', ''),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bob@example.com', crypt('password123', gen_salt('bf')), now(), '{"username": "bob"}'::jsonb, now(), now(), '', ''),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'charlie@example.com', crypt('password123', gen_salt('bf')), now(), '{"username": "charlie"}'::jsonb, now(), now(), '', '')
on conflict (id) do nothing;

-- Update user profiles (trigger should have created them)
update public.users set display_name = 'Alice', bio = 'Hello, I am Alice!' where id = '00000000-0000-0000-0000-000000000001';
update public.users set display_name = 'Bob', bio = 'Bob here. Nice to meet you.' where id = '00000000-0000-0000-0000-000000000002';
update public.users set display_name = 'Charlie', bio = 'Charlie loves coding.' where id = '00000000-0000-0000-0000-000000000003';

-- Posts
insert into public.posts (id, user_id, content, created_at) values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Hello world! This is my first post.', now() - interval '3 hours'),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Beautiful day for coding!', now() - interval '2 hours'),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Just joined this platform. Excited!', now() - interval '1 hour'),
  ('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'Working on a new project today.', now() - interval '30 minutes');

-- Comments
insert into public.comments (post_id, user_id, content) values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Welcome aboard!'),
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Great first post!'),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Welcome, Bob!');

-- Likes
insert into public.likes (post_id, user_id) values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003'),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001'),
  ('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001');

-- Follows (alice follows bob & charlie, bob follows alice)
insert into public.follows (follower_id, following_id) values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001');
