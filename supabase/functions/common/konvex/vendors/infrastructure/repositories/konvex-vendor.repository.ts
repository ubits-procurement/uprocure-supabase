import { VendorRepository } from "../../domain/repositories/vendor.repository.ts";
import { KonvexApiClient } from "../../../shared/clients/konvex-api-client.ts";
import { VendorResponse } from "../../domain/entities/vendor.entity.ts";

export class KonvexVendorRepository implements VendorRepository {
  constructor(private readonly apiClient: KonvexApiClient) {}

  async getById(vendorId: string): Promise<VendorResponse> {
    try {
      console.info("KonvexVendorRepository::getById INIT", { vendorId });
      const response = await this.apiClient.makeRequest<VendorResponse>(
        `/vendors/list?page=1&id=${vendorId}`,
        {
          method: "GET",
        },
      );
      console.info(
        "KonvexVendorRepository::getById END",
        JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.error("KonvexVendorRepository::getById ERROR", error);
      throw new Error(`Failed to get vendor by ID: ${error.message}`);
    }
  }
}
