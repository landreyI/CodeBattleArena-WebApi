import { useCallback, useEffect, useState } from "react";
import { fetchBestResult } from "@/services/session";
import { PlayerSession } from "@/models/dbModels";
import { StandardError } from "@/untils/errorHandler";
import { useAsyncTask } from "../useAsyncTask";

export function useBestResult(sessionId: number | undefined) {
    const [playerSession, setPlayerSession] = useState<PlayerSession | null>(null);
    const { run: bestResult, loading, error, setError } = useAsyncTask(fetchBestResult);

    const loadBestResult = useCallback(async () => {
        if (!sessionId) return;
        const data = await bestResult(sessionId);
        if (data) {
            setPlayerSession(data);
        } 

    }, [bestResult, sessionId])

    useEffect(() => {
        if (!sessionId) {
            setError(new StandardError("Session ID not specified"));
            return;
        }

        loadBestResult();

    }, [sessionId, loadBestResult]);

    return { playerSession, loading, error, reloadBestResult: loadBestResult };
}