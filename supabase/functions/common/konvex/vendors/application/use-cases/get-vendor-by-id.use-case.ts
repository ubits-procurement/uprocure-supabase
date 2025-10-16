import { VendorRepository } from "../../domain/repositories/vendor.repository.ts";
import { VendorResponse } from "../../domain/entities/vendor.entity.ts";

export class GetVendorByIdUseCase {
  constructor(private readonly vendorRepository: VendorRepository) {}

  execute(vendorId: string): Promise<VendorResponse> {
    console.info("GetVendorByIdUseCase::execute INIT", { vendorId });
    return this.vendorRepository.getById(vendorId);
  }
}
