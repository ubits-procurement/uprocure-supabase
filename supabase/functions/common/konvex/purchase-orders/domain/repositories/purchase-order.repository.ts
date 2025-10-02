import { PurchaseOrderDetailed } from '../entities/purchase-order-detailed.entity.ts';

export interface PurchaseOrderRepository {
  /**
   * Retrieves a single purchase order by its ID
   * @param id The ID of the purchase order to retrieve
   * @returns A promise that resolves to the purchase order, or null if not found
   */
  getById(id: string): Promise<PurchaseOrderDetailed | null>;
}
