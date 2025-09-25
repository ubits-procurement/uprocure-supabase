insert into storage.buckets
  (id, name, public)
values
  ('provider_required_documents', 'provider_required_documents', false);

create policy "Solo acceder a archivos del bucket 'provider_required_documents' si pertenecen a tu proveedor"
on storage.objects
for select using (
  bucket_id = 'provider_required_documents' AND
  exists (
    select 1
    from provider_required_documents 
    join users on users.id = auth.uid()
    where provider_required_documents.provider_id = users.provider_id
  )
);

create policy "Solo insertar archivos en el bucket 'provider_required_documents' si hay un proveedor asociado"
on storage.objects
for insert with check (
  bucket_id = 'provider_required_documents' AND
  exists (
    select 1
    from users
    where users.id = auth.uid()
    and users.provider_id IS NOT NULL
  )
);

create policy "Usuarios admin pueden acceder a todos los archivos del bucket 'provider_required_documents'"
on storage.objects
for select using (
  bucket_id = 'provider_required_documents' AND
  exists (
    select 1
    from users
    where is_admin(auth.uid())
  )
);