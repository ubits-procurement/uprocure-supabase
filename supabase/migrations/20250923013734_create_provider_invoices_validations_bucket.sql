insert into storage.buckets
  (id, name, public)
values
  ('provider_invoices_validations', 'provider_invoices_validations', false);

create policy "Solo acceder a archivos del bucket 'provider_invoices_validations' si pertenecen a tu proveedor"
on storage.objects
for select using (
  bucket_id = 'provider_invoices_validations' AND
  exists (
    select 1
    from provider_invoices 
    join users on users.id = auth.uid()
    where provider_invoices.provider_id = users.provider
  )
);

create policy "Solo insertar archivos en el bucket 'provider_invoices_validations' si pertenecen a tu proveedor"
on storage.objects
for insert with check (
  bucket_id = 'provider_invoices_validations' AND
  exists (
    select 1
    from provider_invoices 
    join users on users.id = auth.uid()
    where provider_invoices.provider_id = users.provider
  )
);

create policy "Admin puede acceder a todos los archivos de provider_invoices_validations"
on storage.objects
for select using (
  bucket_id = 'provider_invoices_validations' AND
  exists (
    select 1
    from users
    where is_admin(auth.uid())
  )
);