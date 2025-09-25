create table if not exists provider_information (
  id uuid primary key default gen_random_uuid(),
  provider_id text references public.providers(nit) unique not null,
  company_name text not null,
  fiscal_id text,
  email text not null,
  phone text,
  website text,
  address text,
  city text,
  state text,
  postal_code text,
  country text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table provider_information enable row level security;

create policy "provider_user puede acceder a la información de su proveedor"
on provider_information
for select
using (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider = provider_information.provider_id
  )
);

create policy "provider_user puede insertar información de su proveedor"
on provider_information
for insert
with check (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider is not null
  )
);

create policy "provider_user puede actualizar información de su proveedor"
on provider_information
for update
using (
  exists (
    select 1
    from public.users
    where public.users.id = auth.uid()
    and public.users.provider = provider_information.provider_id
  )
)

create policy "admin puede hacer cualquier acción"
on provider_information
for all
using (
  is_admin(auth.uid())
);