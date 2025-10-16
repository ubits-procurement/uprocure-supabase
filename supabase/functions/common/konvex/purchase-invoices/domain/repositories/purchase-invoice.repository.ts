import { PurchaseInvoiceRequest, PurchaseInvoiceResponse } from '../entities/purchase-invoice.entity.ts';

export interface PurchaseInvoiceRepository {
  /**
   * Creates a new purchase invoice in the system
   * @param purchaseInvoice The purchase invoice data to create
   * @returns A promise that resolves to the created purchase invoice response
   */
  create(purchaseInvoice: PurchaseInvoiceRequest): Promise<PurchaseInvoiceResponse>;
}
