-- Create public-media storage bucket
insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true);

-- Storage RLS: anyone can read public-media
create policy "public-media: anyone can read"
  on storage.objects for select
  using (bucket_id = 'public-media');

-- Storage RLS: authenticated users can upload to their own folder
create policy "public-media: authenticated can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'public-media'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage RLS: owner can update their own files
create policy "public-media: owner can update"
  on storage.objects for update
  using (
    bucket_id = 'public-media'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'public-media'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage RLS: owner can delete their own files
create policy "public-media: owner can delete"
  on storage.objects for delete
  using (
    bucket_id = 'public-media'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
