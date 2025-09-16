CREATE TABLE public.provider_bank_accounts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    provider_id TEXT NOT NULL REFERENCES providers(nit) ON DELETE CASCADE,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.provider_bank_accounts IS 'Tabla que contiene las cuentas bancarias de los proveedores';
COMMENT ON COLUMN public.provider_bank_accounts.id IS 'Identificador único de la cuenta bancaria';
COMMENT ON COLUMN public.provider_bank_accounts.provider_id IS 'NIT del proveedor asociado a la cuenta bancaria';
COMMENT ON COLUMN public.provider_bank_accounts.data IS 'Datos de la cuenta bancaria en formato JSONB';
COMMENT ON COLUMN public.provider_bank_accounts.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.provider_bank_accounts.updated_at IS 'Fecha de la última actualización del registro';