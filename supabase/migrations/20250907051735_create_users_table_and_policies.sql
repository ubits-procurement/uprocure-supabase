-- Crear tipo ENUM para roles
create type user_role as enum ('admin', 'provider_user');

-- Crear tabla users enlazada a auth.users y providers
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null unique,
  role user_role not null default 'provider_user',
  provider text references public.providers(nit) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Agregar descripción a la tabla
COMMENT ON TABLE public.users IS 'Tabla que contiene los perfiles de usuario enlazados a auth.users';

-- Agregar descripción a columnas (opcional pero recomendado)
COMMENT ON COLUMN public.users.id IS 'ID del usuario, igual que auth.users.id';
COMMENT ON COLUMN public.users.email IS 'Email del usuario, único';
COMMENT ON COLUMN public.users.role IS 'Rol del usuario: admin o provider_user';
COMMENT ON COLUMN public.users.provider IS 'Proveedor asociado al usuario';
COMMENT ON COLUMN public.users.created_at IS 'Fecha de creación del registro';

-- Función para insertar automáticamente cuando se crea un usuario en auth.users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que conecta la función con la tabla auth.users
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Activar Row Level Security en la tabla users
alter table public.users enable row level security;

-- Políticas para users
-- Cada usuario puede ver y actualizar solo su propio perfil
create policy "Usuarios pueden ver su propio perfil"
on public.users
for select
using (auth.uid() = id);

create policy "Usuarios pueden actualizar su propio perfil"
on public.users
for update
using (auth.uid() = id);

-- Admins pueden ver y actualizar cualquier perfil
create policy "Admins pueden ver todos los perfiles"
on public.users
for select
using (
  exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role = 'admin'
  )
);

create policy "Admins pueden actualizar todos los perfiles"
on public.users
for update
using (
  exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role = 'admin'
  )
);
