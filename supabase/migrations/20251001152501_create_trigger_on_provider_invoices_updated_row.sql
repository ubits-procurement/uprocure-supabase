CREATE OR REPLACE TRIGGER "Provider Invoice Updated Row"
AFTER INSERT ON "public"."provider_invoices"
FOR EACH ROW
EXECUTE FUNCTION "supabase_functions"."http_request"('https://zmsvtvxpbxapxeofjzcg.supabase.co/functions/v1/on-provider-invoice-change', 'POST', '{"Content-type":"application/json"}', '{}', '5000');