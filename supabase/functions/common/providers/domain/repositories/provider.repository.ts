import { ProviderEntity } from "../entities/provider.entity.ts";

export interface ProviderRepository {
    getById(id: number): Promise<ProviderEntity | null>;
}