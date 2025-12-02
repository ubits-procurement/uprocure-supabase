import { GetPurchaseOrderDetailedByIdUseCase } from "../../../common/konvex/purchase-orders/application/use-cases/get-purchase-order-detailed-by-id.use-case.ts";
import { KonvexApiClient } from "../../../common/konvex/shared/clients/konvex-api-client.ts";
import { KonvexPurchaseOrderRepository } from "../../../common/konvex/purchase-orders/infrastructure/repositories/konvex-purchase-order.repository.ts";
import { CreateItemReceiptUseCase } from "../../../common/konvex/item-receipts/application/use-cases/create-item-receipt.use-case.ts";
import { KonvexItemReceiptRepository } from "../../../common/konvex/item-receipts/infrastructure/repositories/konvex-item-receipt.repository.ts";
import { CreatePurchaseInvoiceUseCase } from "../../../common/konvex/invoices/application/use-cases/create-purchase-invoice.use-case.ts";
import { KonvexPurchaseInvoiceRepository } from "../../../common/konvex/invoices/infrastructure/repositories/konvex-purchase-invoice.repository.ts";
import { GetProviderByIdUseCase } from "../../../common/providers/application/use-cases/get-provider-by-id.use-case.ts";
import { SupabaseProviderRepository } from "../../../common/providers/infrastructure/repositories/supabase-provider.repository.ts";

export class CreateReceptionAndInvoiceUseCase {
  private getPurchaseOrderDetailedByIdUseCase:
    GetPurchaseOrderDetailedByIdUseCase;

  private createItemReceiptUseCase: CreateItemReceiptUseCase;

  private createPurchaseInvoiceUseCase: CreatePurchaseInvoiceUseCase;

  private getProviderByIdUseCase: GetProviderByIdUseCase;

  constructor() {
    const konvexApiClient = new KonvexApiClient();

    const purchaseOrderRepository = new KonvexPurchaseOrderRepository(
      konvexApiClient,
    );

    this.getPurchaseOrderDetailedByIdUseCase =
      new GetPurchaseOrderDetailedByIdUseCase(
        purchaseOrderRepository,
      );

    const itemReceiptRepository = new KonvexItemReceiptRepository(
      konvexApiClient,
    );

    this.createItemReceiptUseCase = new CreateItemReceiptUseCase(
      itemReceiptRepository,
    );

    const purchaseInvoiceRepository = new KonvexPurchaseInvoiceRepository(
      konvexApiClient,
    );

    this.createPurchaseInvoiceUseCase = new CreatePurchaseInvoiceUseCase(
      purchaseInvoiceRepository,
    );

    this.getProviderByIdUseCase = new GetProviderByIdUseCase(
      new SupabaseProviderRepository(),
    );
  }

  async execute(
    invoiceNumber: string,
    purchaseOrderId: string,
    providerId: string,
    invoiceLines: number[],
  ) {
    console.info(
      `CreateReceptionAndInvoiceUseCase::execute INIT invoiceNumber [${invoiceNumber}] purchaseOrderId [${purchaseOrderId}] providerId [${providerId}] invoiceLines [${invoiceLines}]`,
    );

    const purchaseOrder = await this.getPurchaseOrderDetailedByIdUseCase
      .execute(purchaseOrderId);

    if (!purchaseOrder) {
      console.info(
        `CreateReceptionAndInvoiceUseCase::execute Purchase Order with id [${purchaseOrderId}] not found`,
      );
      return;
    }

    const notReceivedLines = purchaseOrder.data.item.items.filter((item) =>
      item.quantity != item.quantityBilled
    );

    const itemReceipt = await this.createItemReceiptUseCase.execute({
      createdFrom: purchaseOrder.data.id,
      subsidiary: purchaseOrder.data.subsidiary.id,
      trandate: (new Date()).toISOString().split("T")[0],
      entity: providerId,
      customForm: {
        id: "39",
      },
      item: {
        items: notReceivedLines.map((item) => ({
          line: item.line,
          orderLine: item.line,
          itemReceive: invoiceLines.includes(item.line),
          itemSubtype: "Purchase",
          itemType: "Service",
          // Solo si es una linea facturada, se envia la propiedad quantity
          ...(invoiceLines.includes(item.line)
            ? { quantity: item.quantity }
            : {}),
        })),
      },
    });

    console.info(
      `CreateReceptionAndInvoiceUseCase::execute Item Receipt created ${
        JSON.stringify(itemReceipt)
      }`,
    );

    // Create purchase invoice from the item receipt
    const purchaseInvoice = await this.createPurchaseInvoiceUseCase.execute({
      orderId: purchaseOrder.data.id,
      tranId: invoiceNumber,
      paymentMethod: purchaseOrder.data.custbody_bea_credit_cards_pay?.id,
      subsidiaryCountry: "Colombia",
      providerId: providerId,
      departmentId: purchaseOrder.data.department.id,
    });

    console.info(
      `CreateReceptionAndInvoiceUseCase::execute Purchase Invoice created ${
        JSON.stringify(purchaseInvoice)
      }`,
    );

    console.info("CreateReceptionAndInvoiceUseCase::execute END");
  }
}
