CREATE TABLE public.provider_bank_accounts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    provider_id integer NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.provider_bank_accounts IS 'Tabla que contiene las cuentas bancarias de los proveedores';
COMMENT ON COLUMN public.provider_bank_accounts.id IS 'Identificador único de la cuenta bancaria';
COMMENT ON COLUMN public.provider_bank_accounts.provider_id IS 'ID del proveedor asociado a la cuenta bancaria';
COMMENT ON COLUMN public.provider_bank_accounts.data IS 'Datos de la cuenta bancaria en formato JSONB';
COMMENT ON COLUMN public.provider_bank_accounts.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.provider_bank_accounts.updated_at IS 'Fecha de la última actualización del registro';

-- Habilitar RLS
ALTER TABLE public.provider_bank_accounts ENABLE ROW LEVEL SECURITY;

-- Política: usuarios de un proveedor pueden ver registros de su proveedor
CREATE POLICY "Usuarios pueden ver cuentas de su proveedor"
ON public.provider_bank_accounts
FOR SELECT
USING (
  provider_id = (
    select u.provider_id
    from public.users u
    where u.id = (select auth.uid())
  )
  OR
  is_admin(auth.uid())
);

-- Política: usuarios de un proveedor pueden insertar registros de su proveedor
CREATE POLICY "Usuarios pueden insertar cuentas de su proveedor"
ON public.provider_bank_accounts
FOR INSERT
WITH CHECK (
  provider_id = (
    select u.provider_id
    from public.users u
    where u.id = (select auth.uid())
  )
  OR
  is_admin(auth.uid())
);

-- Política: usuarios de un proveedor pueden actualizar registros de su proveedor
CREATE POLICY "Usuarios pueden actualizar cuentas de su proveedor"
ON public.provider_bank_accounts
FOR UPDATE
USING (
  provider_id = (
    select u.provider_id
    from public.users u
    where u.id = (select auth.uid())
  )
  OR
  is_admin(auth.uid())
);

-- Política: usuarios de un proveedor pueden eliminar registros de su proveedor
CREATE POLICY "Usuarios pueden eliminar cuentas de su proveedor"
ON public.provider_bank_accounts
FOR DELETE
USING (
  provider_id = (
    select u.provider_id
    from public.users u
    where u.id = (select auth.uid())
  )
  OR
  is_admin(auth.uid())
);

-- Comentarios en políticas
COMMENT ON POLICY "Usuarios pueden insertar cuentas de su proveedor" 
ON public.provider_bank_accounts IS 'Permite a usuarios crear cuentas bancarias de su propio proveedor o a admins crear cualquier registro';

COMMENT ON POLICY "Usuarios pueden actualizar cuentas de su proveedor" 
ON public.provider_bank_accounts IS 'Permite a usuarios actualizar cuentas bancarias de su propio proveedor o a admins actualizar cualquier registro';

COMMENT ON POLICY "Usuarios pueden eliminar cuentas de su proveedor" 
ON public.provider_bank_accounts IS 'Permite a usuarios eliminar cuentas bancarias de su propio proveedor o a admins eliminar cualquier registro';
