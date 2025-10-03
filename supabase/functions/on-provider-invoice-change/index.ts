import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { ValidationStatus } from "../shared/domain/enums/validation-status.enum.ts";
import { CreateReceptionAndInvoiceUseCase } from "./application/use-cases/create-reception-and-invoice.use-case.ts";

const createReceptionAndInvoiceUseCase = new CreateReceptionAndInvoiceUseCase();

Deno.serve(async (req) => {
  const { record: updatedRecord } = await req.json();

  if(!updatedRecord){
    console.warn("Update event received without record")
    return new Response(JSON.stringify(null), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  console.info("Received event:", { updatedRecord });

  if (updatedRecord.validation_status == ValidationStatus.Approved) {
    console.info("Validation status changed to Approved:", {
      to: updatedRecord.validation_status,
      updatedRecord,
    });

    await createReceptionAndInvoiceUseCase.execute(
      updatedRecord.invoice_number,
      updatedRecord.purchase_order,
      updatedRecord.provider_id,
      updatedRecord.invoice_lines
    );

    return new Response("Validation status changed to Approved", {
      status: 200,
    });
  }

  return new Response(JSON.stringify(null), {
    headers: { "Content-Type": "application/json" },
  });
});
