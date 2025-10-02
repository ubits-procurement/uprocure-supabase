ALTER TABLE provider_invoices
ADD COLUMN invoice_lines integer[];

ALTER TABLE provider_invoices
ADD COLUMN created_by uuid REFERENCES users(id) ON DELETE CASCADE;