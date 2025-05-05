import { useEffect, useState } from "react";
import { Player } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetPlayersList } from "@/services/player";
import { useCallback } from "react";

export function usePlayersList(playerId?: string) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const loadPlayers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchGetPlayersList();
            setPlayers(data);
        }
        catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
        }
        finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        loadPlayers();
    }, []);

    return { players, setPlayers, loadPlayers, loading, error }
}