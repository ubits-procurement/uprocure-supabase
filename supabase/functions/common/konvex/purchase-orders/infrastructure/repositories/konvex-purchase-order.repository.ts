import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository.ts';
import { KonvexApiClient } from '../konvex/konvex-api-client.ts';
import { PurchaseOrderDetailed } from '../../domain/entities/purchase-order-detailed.entity.ts';

export class KonvexPurchaseOrderRepository implements PurchaseOrderRepository {
  constructor(private readonly apiClient: KonvexApiClient) {}

  async getById(id: string): Promise<PurchaseOrderDetailed | null> {
    try {
      const response = await this.apiClient.makeRequest<PurchaseOrderDetailed>(
        `/purchases/orders?id=${id}&detailed=true`
      );
      return response;
    } catch (error: any) {
      if (error.cause?.status === 404) {
        return null;
      }
      console.error(`Error fetching purchase order ${id}:`, error);
      throw new Error(`Failed to fetch purchase order: ${error}`);
    }
  }
}
