import { ItemReceiptRequest, ItemReceiptResponse } from '../entities/item-receipt.entity.ts';

export interface ItemReceiptRepository {
  /**
   * Creates a new item receipt in the system
   * @param itemReceipt The item receipt data to create
   * @returns A promise that resolves to the created item receipt response
   */
  create(itemReceipt: ItemReceiptRequest): Promise<ItemReceiptResponse>;
}
