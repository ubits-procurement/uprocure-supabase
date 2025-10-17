import { PurchaseInvoiceRepository } from '../../domain/repositories/purchase-invoice.repository.ts';
import { KonvexApiClient } from '../../../shared/clients/konvex-api-client.ts';
import { PurchaseInvoiceRequest, PurchaseInvoiceResponse } from '../../domain/entities/purchase-invoice.entity.ts';

export class KonvexPurchaseInvoiceRepository implements PurchaseInvoiceRepository {
  constructor(private readonly apiClient: KonvexApiClient) {}

  async create(purchaseInvoice: PurchaseInvoiceRequest): Promise<PurchaseInvoiceResponse> {
    try {
      console.info("KonvexPurchaseInvoiceRepository::create INIT", JSON.stringify(purchaseInvoice));
      const response = await this.apiClient.makeRequest<PurchaseInvoiceResponse>(
        '/purchases/invoices',
        {
          method: 'POST',
          body: JSON.stringify(purchaseInvoice)
        }
      );
      console.info("KonvexPurchaseInvoiceRepository::create END", JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error('KonvexPurchaseInvoiceRepository::create ERROR', error);
      throw new Error(`Failed to create purchase invoice: ${error.message}`);
    }
  }
}
