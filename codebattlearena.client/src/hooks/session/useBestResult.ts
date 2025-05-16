import { useEffect, useState } from "react";
import { fetchBestResult } from "@/services/session";
import { PlayerSession } from "@/models/dbModels";
import { StandardError } from "@/untils/errorHandler";
import { useAsyncTask } from "../useAsyncTask";

export function useBestResult(sessionId: number | undefined) {
    const [playerSession, setPlayerSession] = useState<PlayerSession | null>(null);
    const { run: bestResult, loading, error, setError } = useAsyncTask(fetchBestResult);

    useEffect(() => {
        if (!sessionId) {
            setError(new StandardError("Session ID not specified"));
            return;
        }

        (async () => {
            const data = await bestResult(sessionId);
            if (data) {
                setPlayerSession(data);
            }
        })();

    }, [sessionId, bestResult, setError]);

    return { playerSession, loading, error };
}