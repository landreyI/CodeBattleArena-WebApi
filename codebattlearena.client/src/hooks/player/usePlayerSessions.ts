import { useEffect, useState } from "react";
import { Session } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetPlayerSessions } from "@/services/player";
import { useCallback } from "react";

export function usePlayerSessions(playerId?: string, enabled: boolean = true) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const loadSessions = useCallback(async () => {
        if (!playerId || !enabled) return;

        try {
            setLoading(true);
            const data = await fetchGetPlayerSessions(playerId);
            setSessions(data);
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
        loadSessions();

    }, [playerId, enabled]);

    return { sessions, setSessions, loading, error }
}