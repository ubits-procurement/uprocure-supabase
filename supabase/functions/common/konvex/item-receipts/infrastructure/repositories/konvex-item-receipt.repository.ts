import { ItemReceiptRepository } from "../../domain/repositories/item-receipt.repository.ts";
import { KonvexApiClient } from "../../../shared/clients/konvex-api-client.ts";
import {
  ItemReceiptRequest,
  ItemReceiptResponse,
} from "../../domain/entities/item-receipt.entity.ts";

export class KonvexItemReceiptRepository implements ItemReceiptRepository {
  constructor(private readonly apiClient: KonvexApiClient) {}

  async create(itemReceipt: ItemReceiptRequest): Promise<ItemReceiptResponse> {
    try {
      console.info(
        "KonvexItemReceiptRepository::create INIT",
        JSON.stringify(itemReceipt),
      );
      const response = await this.apiClient.makeRequest<ItemReceiptResponse>(
        "/items/receipt",
        {
          method: "POST",
          body: JSON.stringify(itemReceipt),
        },
      );
      console.info(
        "KonvexItemReceiptRepository::create END",
        JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.error("KonvexItemReceiptRepository::create ERROR", error);
      throw new Error(`Failed to create item receipt: ${error.message}`);
    }
  }

  async getWithPurchaseOrder(purchaseOrderId: string): Promise<any> {
    try {
      console.info(
        "KonvexItemReceiptRepository::getWithPurchaseOrder INIT",
        purchaseOrderId,
      );
      const response = await this.apiClient.makeRequest<ItemReceiptResponse>(
        `/items/receipt/purchaseOrder/${purchaseOrderId}`,
        {
          method: "GET",
        },
      );
      console.info(
        "KonvexItemReceiptRepository::getWithPurchaseOrder END",
        JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.error(
        "KonvexItemReceiptRepository::getWithPurchaseOrder ERROR",
        error,
      );
      throw new Error(`Failed to create item receipt: ${error.message}`);
    }
  }

  async getByTransactionId(transactionId: string): Promise<any> {
    try {
      console.info(
        "KonvexItemReceiptRepository::getByTransactionId INIT",
        transactionId,
      );
      const response = await this.apiClient.makeRequest<ItemReceiptResponse>(
        `/items/receipt/${transactionId}`,
        {
          method: "GET",
        },
      );
      console.info(
        "KonvexItemReceiptRepository::getByTransactionId END",
        JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.error(
        "KonvexItemReceiptRepository::getByTransactionId ERROR",
        error,
      );
      throw new Error(`Failed to create item receipt: ${error.message}`);
    }
  }
}
