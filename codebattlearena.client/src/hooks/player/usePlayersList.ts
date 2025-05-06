import { useEffect, useState } from "react";
import { Player } from "@/models/dbModels";
import { fetchGetPlayersList } from "@/services/player";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function usePlayersList() {
    const [players, setPlayers] = useState<Player[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetPlayersList);

    const loadPlayers = useCallback(async () => {
        const data = await load();
        if (data) {
            setPlayers(data);
        }

    }, [load]);

    useEffect(() => {
        loadPlayers();
    }, [loadPlayers]);

    return { players, setPlayers, loadPlayers, loading, error }
}