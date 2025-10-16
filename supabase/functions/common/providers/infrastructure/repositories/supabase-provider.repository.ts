import { supabaseClient } from "../../../supabase/infrastructure/clients/supabase.client.ts";
import { ProviderEntity } from "../../domain/entities/provider.entity.ts";
import { ProviderRepository } from "../../domain/repositories/provider.repository.ts";

export class SupabaseProviderRepository implements ProviderRepository {
    constructor() {
    }

    async getById(id: number): Promise<ProviderEntity | null> {
        const { data, error } = await supabaseClient.from("providers").select(
            "*",
        ).eq("id", id).single();

        if (error) {
            console.error("Error fetching provider:", error);
            return null;
        }

        return data as ProviderEntity;
    }
}
