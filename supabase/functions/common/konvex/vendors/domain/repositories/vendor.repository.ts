import { VendorResponse } from '../entities/vendor.entity.ts';

export interface VendorRepository {
  /**
   * Gets a vendor by ID from the system
   * @param vendorId The vendor ID to retrieve
   * @returns A promise that resolves to the vendor response
   */
  getById(vendorId: string): Promise<VendorResponse>;
}
