-- 1. Políticas: solo admins pueden crear, actualizar y eliminar providers
create policy "Admins pueden crear providers"
on public.providers
for insert
with check (
  exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role = 'admin'
  )
);

create policy "Admins pueden actualizar providers"
on public.providers
for update
using (
  exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role = 'admin'
  )
);

create policy "Admins pueden eliminar providers"
on public.providers
for delete
using (
  exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role = 'admin'
  )
);
