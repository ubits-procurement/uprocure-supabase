create policy "Admins pueden crear providers"
on public.providers
for insert
with check ( is_admin(auth.uid()) );

create policy "Admins pueden actualizar providers"
on public.providers
for update
using ( is_admin(auth.uid()) );

create policy "Admins pueden eliminar providers"
on public.providers
for delete
using ( is_admin(auth.uid()) );