import { GetPurchaseOrderDetailedByIdUseCase } from "../../../common/konvex/purchase-orders/application/use-cases/get-purchase-order-detailed-by-id.use-case.ts";
import { KonvexApiClient } from "../../../common/konvex/shared/clients/konvex-api-client.ts";
import { KonvexPurchaseOrderRepository } from "../../../common/konvex/purchase-orders/infrastructure/repositories/konvex-purchase-order.repository.ts";
import { CreateItemReceiptUseCase } from "../../../common/konvex/item-receipts/application/use-cases/create-item-receipt.use-case.ts";
import { KonvexItemReceiptRepository } from '../../../common/konvex/item-receipts/infrastructure/repositories/konvex-item-receipt.repository.ts';

export class CreateReceptionAndInvoiceUseCase {
  private getPurchaseOrderDetailedByIdUseCase:
    GetPurchaseOrderDetailedByIdUseCase;

  private createItemReceiptUseCase: CreateItemReceiptUseCase;

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

    this.createItemReceiptUseCase =
      new CreateItemReceiptUseCase(
        itemReceiptRepository,
      );
  }

  async execute(invoiceNumber: string, purchaseOrderId: string, providerId: string, invoiceLines: number[]) {
    console.info(`CreateReceptionAndInvoiceUseCase::execute INIT invoiceNumber [${invoiceNumber}] purchaseOrderId [${purchaseOrderId}] providerId [${providerId}] invoiceLines [${invoiceLines}]`);

    const purchaseOrder = await this.getPurchaseOrderDetailedByIdUseCase.execute(purchaseOrderId);

    if(!purchaseOrder){
      console.info(`CreateReceptionAndInvoiceUseCase::execute Purchase Order with id [${purchaseOrderId}] not found`);
      return;
    }

    const itemReceipt = await this.createItemReceiptUseCase.execute({
      createdFrom: purchaseOrder.data.id,
      subsidiary: purchaseOrder.data.subsidiary.id,
      trandate: purchaseOrder.data.tranDate.toString(),
      entity: providerId,
      customForm: {
        id: "39"
      },
      exchangeRate: 1,
      item: {
        items: purchaseOrder.data.item.items.map((item) => ({
          line: item.line,
          orderLine: item.line,
          quantity: item.quantity,
          itemReceive: invoiceLines.includes(item.line),
          itemSubtype: 'Purchase',
          itemType: 'Service'
        })),
      },
    });

    console.info(`CreateReceptionAndInvoiceUseCase::execute Item Receipt created ${JSON.stringify(itemReceipt)}`);

    console.info("CreateReceptionAndInvoiceUseCase::execute END");
  }
}
