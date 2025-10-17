import { ItemReceiptRepository } from "../../domain/repositories/item-receipt.repository.ts";

export class GetItemReceiptWithPurchaseOrderUseCase {
  constructor(private readonly itemReceiptRepository: ItemReceiptRepository) {}

  async execute(purchaseOrderId: string): Promise<any> {
    console.info("GetItemReceiptWithPurchaseOrderUseCase::execute INIT", purchaseOrderId);
    const itemReceipt = await this.itemReceiptRepository.getWithPurchaseOrder(purchaseOrderId);
    console.info("GetItemReceiptWithPurchaseOrderUseCase::execute END", JSON.stringify(itemReceipt));
    return itemReceipt;
  }
}
