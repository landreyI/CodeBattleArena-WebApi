import { useEffect, useState } from "react";
import { Session } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetPlayerSessions } from "@/services/player";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function usePlayerSessions(playerId?: string, enabled: boolean = true) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetPlayerSessions);

    const loadSessions = useCallback(async () => {
        if (!playerId || !enabled) return;

        const data = await load(playerId);
        if (data) {
            setSessions(data);
        }

    }, [load]);

    useEffect(() => {
        loadSessions();

    }, [playerId, enabled, loadSessions]);

    return { sessions, setSessions, loading, error }
}