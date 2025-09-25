-- Tabla de facturas
create table provider_invoices (
    id uuid primary key default gen_random_uuid(),
    provider_id integer references public.providers(id),
    invoice_file_name text not null,
    invoice_validation_file_name text not null,
    validation_status validation_status default 'pending',
    purchase_order text not null,
    amount numeric not null,
    invoice_issue_date date not null,
    invoice_due_date date not null,
    created_at timestamp with time zone default now()
);

alter table provider_invoices enable row level security;

create policy "Usuario solo puede acceder a facturas del proveedor asociado"
on provider_invoices
for select
using (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider_id = provider_invoices.provider_id
  )
);

create policy "Usuario solo puede insertar facturas del proveedor asociado"
on provider_invoices
for insert
with check (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider_id = provider_invoices.provider_id
  )
);

create policy "Usuario solo puede eliminar facturas del proveedor asociado"
on provider_invoices
for delete
using (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider_id = provider_invoices.provider_id
  )
);

create policy "Usuario admin puede hacer cualquier acción"
on provider_invoices
for all
using (
  is_admin(auth.uid())
);