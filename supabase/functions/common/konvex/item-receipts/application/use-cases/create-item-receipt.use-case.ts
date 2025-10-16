import { ItemReceiptRepository } from "../../domain/repositories/item-receipt.repository.ts";
import { ItemReceiptRequest, ItemReceiptResponse } from "../../domain/entities/item-receipt.entity.ts";

export class CreateItemReceiptUseCase {
  constructor(private readonly itemReceiptRepository: ItemReceiptRepository) {}

  execute(itemReceipt: ItemReceiptRequest): Promise<ItemReceiptResponse> {
    console.info("CreateItemReceiptUseCase::execute INIT", JSON.stringify(itemReceipt));
    return this.itemReceiptRepository.create(itemReceipt);
  }
}
