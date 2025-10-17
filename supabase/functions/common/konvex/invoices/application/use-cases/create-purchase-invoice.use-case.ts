import { PurchaseInvoiceRepository } from "../../domain/repositories/purchase-invoice.repository.ts";
import {
PurchaseInvoiceRequest,
  PurchaseInvoiceResponse,
} from "../../domain/entities/purchase-invoice.entity.ts";
import { getCustomFormByCountry } from "../../../shared/domain/custom-form.enum.ts";
import { GetItemReceiptWithPurchaseOrderUseCase } from "../../../item-receipts/application/use-cases/get-item-recepit-with-purchase-order.use-case.ts";
import { KonvexApiClient } from "../../../shared/clients/konvex-api-client.ts";
import { KonvexItemReceiptRepository } from "../../../item-receipts/infrastructure/repositories/konvex-item-receipt.repository.ts";
import { GetByTransactionIdUseCase } from "../../../item-receipts/application/use-cases/get-by-transaction-id.use-case.ts";
import { GetVendorByIdUseCase } from "../../../vendors/application/use-cases/get-vendor-by-id.use-case.ts";
import { VendorRepository } from "../../../vendors/domain/repositories/vendor.repository.ts";
import { KonvexVendorRepository } from "../../../vendors/infrastructure/repositories/konvex-vendor.repository.ts";

interface ExecuteProps {
  orderId: string;
  tranId: string;
  paymentMethod?: string;
  subsidiaryCountry: string;
  providerId: string;
}

export class CreatePurchaseInvoiceUseCase {
  private getItemReceiptWithPurchaseOrderUseCase:
    GetItemReceiptWithPurchaseOrderUseCase;

  private getByTransactionIdUseCase: GetByTransactionIdUseCase;

  private getVendorByIdUseCase: GetVendorByIdUseCase;

  constructor(
    private readonly purchaseInvoiceRepository: PurchaseInvoiceRepository,
  ) {
    const konvexApiClient = new KonvexApiClient();

    const itemReceiptRepository = new KonvexItemReceiptRepository(
      konvexApiClient,
    );

    const vendorRepository: VendorRepository = new KonvexVendorRepository(
      konvexApiClient,
    );

    this.getItemReceiptWithPurchaseOrderUseCase =
      new GetItemReceiptWithPurchaseOrderUseCase(
        itemReceiptRepository,
      );

    this.getByTransactionIdUseCase = new GetByTransactionIdUseCase(
      itemReceiptRepository,
    );

    this.getVendorByIdUseCase = new GetVendorByIdUseCase(vendorRepository);
  }

  async execute(
    props: ExecuteProps,
  ): Promise<PurchaseInvoiceResponse> {
    console.info(
      "CreatePurchaseInvoiceUseCase::execute INIT",
      JSON.stringify(props),
    );

    const itemReceiptWithPurchaseOrder = await this
      .getItemReceiptWithPurchaseOrderUseCase.execute(props.orderId);

    const { transaction } = itemReceiptWithPurchaseOrder.data.items[0];

    const receipt = await this.getByTransactionIdUseCase.execute(transaction);

    const vendor = await this.getVendorByIdUseCase.execute(props.providerId);

    // Calcular fecha de vencimiento
    let daysToAdd = 0;
    if (vendor.data.terms?.refName.toLowerCase().includes("contado")) {
      const match = vendor.data.terms?.refName.match(/\d+/);
      if (match) {
        daysToAdd = parseInt(match[0], 10);
      }
    }

    const dueDate = new Date(Date.now() + daysToAdd * 86400000); // 86400000 = ms en un día
    const formattedDueDate = dueDate.toISOString().slice(0, 10);

    const itemsFormatted = {
      ...receipt.item,
      items: receipt.item.items.map(({ ...item }) => ({
        ...item,
        amount: item.itemFxAmount,
        rate: item.itemFxAmount,
      })),
    };

    const invoiceData: PurchaseInvoiceRequest = {
      tranDate: (new Date()).toISOString().slice(0, 10),
      tranId: props.tranId,
      customForm: getCustomFormByCountry("Colombia").toString(),
      createdFrom: receipt.createdFrom,
      currency: receipt.currency.id,
      entity: receipt.entity.id,
      subsidiary: receipt.subsidiary.id,
      number: props.tranId,
      dueDate: formattedDueDate,
      netsuite: {
        location: receipt.location?.id,
        custbody_ubits_grni: {
          id: receipt.id,
          refName: `Recepción de artículo #${receipt.tranId}`,
        },
        cseg_co_thirdparty: {
          id: vendor.data.cseg_co_thirdparty?.id,
          refName: vendor.data.cseg_co_thirdparty?.refName,
        },
      },
      item: itemsFormatted,
    };

    if (props.paymentMethod) {
      invoiceData.netsuite.custbody_bea_credit_cards_pay = props.paymentMethod;
      invoiceData.netsuite.custbodycustbody_acs_pagotarjeta = true;
      invoiceData.netsuite.custbody_9997_is_for_ep_eft = false;
    } else {
      invoiceData.netsuite.custbody_9997_is_for_ep_eft = true;
    }

    return this.purchaseInvoiceRepository.create(invoiceData);
  }
}
