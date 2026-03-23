-- ============================================
-- RLS Policies for all tables
-- ============================================

-- ---------- users ----------
create policy "users: anyone can read"
  on public.users for select
  using (true);

create policy "users: owner can update"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------- posts ----------
create policy "posts: anyone can read"
  on public.posts for select
  using (true);

create policy "posts: authenticated can insert own"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "posts: owner can update"
  on public.posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "posts: owner can delete"
  on public.posts for delete
  using (auth.uid() = user_id);

-- ---------- comments ----------
create policy "comments: anyone can read"
  on public.comments for select
  using (true);

create policy "comments: authenticated can insert own"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "comments: owner can update"
  on public.comments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "comments: owner can delete"
  on public.comments for delete
  using (auth.uid() = user_id);

-- ---------- likes ----------
create policy "likes: anyone can read"
  on public.likes for select
  using (true);

create policy "likes: authenticated can insert own"
  on public.likes for insert
  with check (auth.uid() = user_id);

create policy "likes: owner can delete"
  on public.likes for delete
  using (auth.uid() = user_id);

-- ---------- follows ----------
create policy "follows: anyone can read"
  on public.follows for select
  using (true);

create policy "follows: authenticated can insert own"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "follows: owner can delete"
  on public.follows for delete
  using (auth.uid() = follower_id);
