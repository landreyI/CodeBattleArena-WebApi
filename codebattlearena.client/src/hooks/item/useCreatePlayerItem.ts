import { PlayerItem } from "@/models/dbModels";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";
import { fetchCreatePlayerItem } from "@/services/item";

export function useCreatePlayerItem() {
    const { run: create, loading, error } = useAsyncTask(fetchCreatePlayerItem);
    /**
    * Creates a new playerItem and returns its ID.
    * @param values - The form values for creating a playerItem.
    * @returns The ID of the created playerItem.
    * @throws StandardError if the playerItem creation fails.
    */
    const createPlayerItem = useCallback(async (playerItem: PlayerItem) => {
        const data = await create(playerItem);
        return data;
    }, [create]);

    return { createPlayerItem, loading, error };
}
