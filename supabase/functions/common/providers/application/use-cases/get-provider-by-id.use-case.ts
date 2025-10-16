import { ProviderEntity } from "../../domain/entities/provider.entity.ts";
import { ProviderRepository } from "../../domain/repositories/provider.repository.ts";

export class GetProviderByIdUseCase {
    constructor(private providerRepository: ProviderRepository) {
    }

    execute(id: number): Promise<ProviderEntity | null> {
        return this.providerRepository.getById(id);
    }
}
