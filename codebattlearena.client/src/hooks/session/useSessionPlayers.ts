import { useEffect, useState, useCallback } from "react";
import { Player } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetSessionPlayers } from "@/services/session";

export function useSessionPlayers(sessionId?: number, enabled: boolean = true) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const loadPlayers = useCallback(async () => {
        if (!sessionId) return;
        try {
            setLoading(true);
            const data = await fetchGetSessionPlayers(sessionId);
            setPlayers(data);
            setError(null);
        }
        catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
        }
        finally {
            setLoading(false);
        }
    }, [sessionId]);

    useEffect(() => {
        if (!enabled) return;
        loadPlayers();
    }, [sessionId, enabled, loadPlayers]);

    return { players, setPlayers, loading, error, reloadPlayers: loadPlayers };
}
