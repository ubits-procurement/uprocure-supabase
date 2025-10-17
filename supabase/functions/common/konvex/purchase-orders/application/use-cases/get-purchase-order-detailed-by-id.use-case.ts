import { PurchaseOrderRepository } from "../../domain/repositories/purchase-order.repository.ts";
import { PurchaseOrderDetailed } from "../../domain/entities/purchase-order-detailed.entity.ts";

export class GetPurchaseOrderDetailedByIdUseCase {
    constructor(
        private readonly purchaseOrderRepository: PurchaseOrderRepository,
    ) {}

    execute(id: string): Promise<PurchaseOrderDetailed | null> {
        return this.purchaseOrderRepository.getById(id);
    }
}
