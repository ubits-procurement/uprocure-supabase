create type document_type as enum ('legal_agent', 'articles_of_incorporation', 'fiscal_certificate', 'bank_certificate');

-- Tabla de documentos
create table provider_required_documents (
    id uuid primary key default gen_random_uuid(),
    document_type document_type not null,
    provider_id uuid references public.providers(nit),
    created_at timestamp with time zone default now()
);

alter table provider_required_documents enable row level security;

create policy "Usuario solo puede acceder a documentos del proveedor asociado"
on provider_required_documents
for select
using (
  exists (
    select 1
    from usuarios
    where usuarios.user_id = auth.uid()
    and usuarios.proveedor_id = provider_required_documents.provider_id
  )
);

create policy "Usuario solo puede insertar documentos del proveedor asociado"
on provider_required_documents
for insert
with check (
  exists (
    select 1
    from usuarios
    where usuarios.user_id = auth.uid()
    and usuarios.proveedor_id = provider_required_documents.provider_id
  )
);

create policy "Usuario solo puede eliminar documentos del proveedor asociado"
on provider_required_documents
for delete
using (
  exists (
    select 1
    from usuarios
    where usuarios.user_id = auth.uid()
    and usuarios.proveedor_id = provider_required_documents.provider_id
  )
);

create policy "Usuario admin puede hacer cualquier acción"
on provider_required_documents
for all
using (
  is_admin(auth.uid())
);