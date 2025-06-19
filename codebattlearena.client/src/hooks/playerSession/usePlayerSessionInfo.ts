import { useState, useEffect } from "react";
import { PlayerSession } from "@/models/dbModels";
import { fetchPlayerSessionInfo } from "@/services/playerSession";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function usePlayerSessionInfo(playerId?: string, sessionId?: number) {
    const [playerSession, setPlayerSession] = useState<PlayerSession | null>(null);
    const { run: load, loading, error } = useAsyncTask(fetchPlayerSessionInfo);

    const loadPlayerSessionInfo = useCallback(async () => {

        try {
            const data = await load(playerId, sessionId);
            setPlayerSession(data ?? null);
        } catch {
            setPlayerSession(null);
        }

    }, [load, playerId, sessionId]);

    useEffect(() => {
        loadPlayerSessionInfo();
    }, [loadPlayerSessionInfo])

    return { playerSession, setPlayerSession, loadPlayerSessionInfo, loading, error }
}