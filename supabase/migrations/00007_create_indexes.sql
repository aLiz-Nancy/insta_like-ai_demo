-- Performance indexes

-- posts: user's posts list
create index idx_posts_user_id on public.posts (user_id);

-- posts: feed ordering
create index idx_posts_created_at on public.posts (created_at desc);

-- comments: post's comments
create index idx_comments_post_id on public.comments (post_id);

-- comments: user's comments
create index idx_comments_user_id on public.comments (user_id);

-- likes: post's like count
create index idx_likes_post_id on public.likes (post_id);

-- likes: user's likes
create index idx_likes_user_id on public.likes (user_id);

-- follows: list followers of a user
create index idx_follows_following_id on public.follows (following_id);
