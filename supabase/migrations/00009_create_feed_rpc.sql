-- RPC: get_feed_posts
-- Returns posts from followed users + own posts, paginated
-- Uses auth.uid() internally — no user impersonation possible
create or replace function public.get_feed_posts(
  p_limit int default 20,
  p_offset int default 0
)
returns table (
  id uuid,
  user_id uuid,
  content text,
  image_url text,
  created_at timestamptz,
  updated_at timestamptz,
  username text,
  display_name text,
  avatar_url text,
  likes_count bigint,
  comments_count bigint,
  is_liked boolean
)
language plpgsql
stable
security invoker
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    return;
  end if;

  return query
  select
    p.id,
    p.user_id,
    p.content,
    p.image_url,
    p.created_at,
    p.updated_at,
    u.username,
    u.display_name,
    u.avatar_url,
    (select count(*) from public.likes l where l.post_id = p.id) as likes_count,
    (select count(*) from public.comments c where c.post_id = p.id) as comments_count,
    (exists (select 1 from public.likes l where l.post_id = p.id and l.user_id = v_user_id)) as is_liked
  from public.posts p
  join public.users u on u.id = p.user_id
  where p.user_id = v_user_id
     or p.user_id in (select f.following_id from public.follows f where f.follower_id = v_user_id)
  order by p.created_at desc
  limit least(p_limit, 100)
  offset p_offset;
end;
$$;
