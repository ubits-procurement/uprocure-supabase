import { ItemReceiptRepository } from "../../domain/repositories/item-receipt.repository.ts";

export class GetItemReceiptWithPurchaseOrderUseCase {
  constructor(private readonly itemReceiptRepository: ItemReceiptRepository) {}

  execute(purchaseOrderId: string): Promise<any> {
    console.info("GetItemReceiptWithPurchaseOrderUseCase::execute INIT", purchaseOrderId);
    return this.itemReceiptRepository.getWithPurchaseOrder(purchaseOrderId);
  }
}
