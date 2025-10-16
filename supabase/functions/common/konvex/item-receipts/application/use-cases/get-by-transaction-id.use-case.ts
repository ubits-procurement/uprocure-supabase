import { ItemReceiptRepository } from "../../domain/repositories/item-receipt.repository.ts";

export class GetByTransactionIdUseCase {
    constructor(
        private readonly itemReceiptRepository: ItemReceiptRepository,
    ) {}

    execute(transactionId: string): Promise<any> {
        console.info("GetByTransactionIdUseCase::execute INIT", transactionId);
        return this.itemReceiptRepository.getByTransactionId(transactionId);
    }
}
