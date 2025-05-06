import { useEffect, useState, useCallback } from "react";
import { Player } from "@/models/dbModels";
import { fetchGetSessionPlayers } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";

export function useSessionPlayers(sessionId?: number, enabled: boolean = true) {
    const [players, setPlayers] = useState<Player[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetSessionPlayers);

    const loadPlayers = useCallback(async () => {
        if (!sessionId) return;
        const data = await load(sessionId);
        if (data) {
            setPlayers(data);
        }
    }, [sessionId, load]);

    useEffect(() => {
        if (!enabled) return;
        loadPlayers();
    }, [sessionId, enabled, loadPlayers]);

    return { players, setPlayers, loading, error, reloadPlayers: loadPlayers };
}
