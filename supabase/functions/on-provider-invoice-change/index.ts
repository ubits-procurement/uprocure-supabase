import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { ValidationStatus } from '../shared/domain/enums/validation-status.enum.ts';
import { GetPurchaseOrderDetailedByIdUseCase } from '../common/konvex/purchase-orders/application/use-cases/get-purchase-order-detailed-by-id.use-case.ts';
import { KonvexPurchaseOrderRepository } from '../common/konvex/purchase-orders/infrastructure/repositories/konvex-purchase-order.repository.ts';
import { KonvexApiClient } from '../common/konvex/purchase-orders/infrastructure/konvex/konvex-api-client.ts';

const konvexApiClient = new KonvexApiClient();
const purchaseOrderRepository = new KonvexPurchaseOrderRepository(konvexApiClient);
const useCase = new GetPurchaseOrderDetailedByIdUseCase(purchaseOrderRepository);

Deno.serve(async (req) => {
  const { record: updatedRecord } = await req.json();

  console.info("Received event:", { updatedRecord });

  if (updatedRecord?.validation_status == ValidationStatus.Approved) {
    console.info("Validation status changed to Approved:", {
      to: updatedRecord?.validation_status,
      updatedRecord,
    });

    const purchaseOrder = await useCase.execute(updatedRecord?.purchase_order);

    console.info("Purchase order retrieved:", { purchaseOrder });

    return new Response("Validation status changed to Approved", { status: 200 });
  }

  return new Response(
    JSON.stringify(null),
    { headers: { "Content-Type": "application/json" } },
  );
});