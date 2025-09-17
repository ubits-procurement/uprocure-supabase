-- Crear tabla providers
create table public.providers (
  nit text primary key,
  nombre text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Agregar descripción a la tabla
COMMENT ON TABLE public.providers IS 'Tabla que contiene los proveedores';

-- Agregar descripción a columnas
COMMENT ON COLUMN public.providers.nit IS 'NIT del proveedor, clave primaria';
COMMENT ON COLUMN public.providers.nombre IS 'Nombre del proveedor';
COMMENT ON COLUMN public.providers.created_at IS 'Fecha de creación del registro';

-- Activar Row Level Security
alter table public.providers enable row level security;

-- Política básica: usuarios autenticados pueden ver providers
create policy "Usuarios autenticados pueden ver providers"
on public.providers
for select
using ((select auth.role()) = 'authenticated');