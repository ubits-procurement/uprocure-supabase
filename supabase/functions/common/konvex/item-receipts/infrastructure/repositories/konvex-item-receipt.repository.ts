import { ItemReceiptRepository } from '../../domain/repositories/item-receipt.repository.ts';
import { KonvexApiClient } from '../../../shared/clients/konvex-api-client.ts';
import { ItemReceiptRequest, ItemReceiptResponse } from '../../domain/entities/item-receipt.entity.ts';

export class KonvexItemReceiptRepository implements ItemReceiptRepository {
  constructor(private readonly apiClient: KonvexApiClient) {}

  async create(itemReceipt: ItemReceiptRequest): Promise<ItemReceiptResponse> {
    try {
      console.info("KonvexItemReceiptRepository::create INIT", JSON.stringify(itemReceipt));
      const response = await this.apiClient.makeRequest<ItemReceiptResponse>(
        '/items/receipt',
        {
          method: 'POST',
          body: JSON.stringify(itemReceipt)
        }
      );
      console.info("KonvexItemReceiptRepository::create END", JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error('Error creating item receipt:', error);
      throw new Error(`Failed to create item receipt: ${error.message}`);
    }
  }
}
