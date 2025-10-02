import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { ValidationStatus } from '../common/domain/enums/validation-status.enum.ts';

Deno.serve(async (req) => {
  const { record: updatedRecord } = await req.json();

  if (updatedRecord?.validation_status == ValidationStatus.Approved) {
    console.info("Validation status changed to Approved:", {
      to: updatedRecord?.validation_status,
      updatedRecord,
    });
    return new Response("Validation status changed to Approved", { status: 200 });
  }

  return new Response(
    JSON.stringify(null),
    { headers: { "Content-Type": "application/json" } },
  );
});