import { PurchaseInvoiceRepository } from "../../domain/repositories/purchase-invoice.repository.ts";
import { PurchaseInvoiceRequest, PurchaseInvoiceResponse } from "../../domain/entities/purchase-invoice.entity.ts";

export class CreatePurchaseInvoiceUseCase {
  constructor(private readonly purchaseInvoiceRepository: PurchaseInvoiceRepository) {}

  execute(purchaseInvoice: PurchaseInvoiceRequest): Promise<PurchaseInvoiceResponse> {
    console.info("CreatePurchaseInvoiceUseCase::execute INIT", JSON.stringify(purchaseInvoice));
    return this.purchaseInvoiceRepository.create(purchaseInvoice);
  }
}
