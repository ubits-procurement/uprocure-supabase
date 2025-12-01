-- Add currency column to provider_invoices table
ALTER TABLE provider_invoices 
ADD COLUMN currency TEXT NOT NULL DEFAULT 'COP';

-- Add comment to document supported currencies
COMMENT ON COLUMN provider_invoices.currency IS 'Supported currencies: COP, MXN, PEN, USD, EUR, CLP, UF';