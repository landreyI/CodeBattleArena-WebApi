import { useEffect, useState } from "react";
import { Session } from "@/models/dbModels";
import { fetchGetPlayerSessions } from "@/services/playerSession";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function usePlayerSessions(playerId?: string, enabled: boolean = true) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetPlayerSessions);

    const loadSessions = useCallback(async () => {
        if (!playerId || !enabled) return;
        try {
            const data = await load(playerId);
            setSessions(data ?? []);
        } catch {
            setSessions([]);
        }

    }, [load, playerId]);

    useEffect(() => {
        loadSessions();

    }, [enabled, loadSessions]);

    return { sessions, setSessions, loading, error }
}