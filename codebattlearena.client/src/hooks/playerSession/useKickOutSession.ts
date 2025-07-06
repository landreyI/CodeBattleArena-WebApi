import { fetchKickOutSession } from "@/services/playerSession";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";
import { StandardError } from "@/untils/errorHandler";

export function useKickOutSession() {

    const { run, loading, error, setError } = useAsyncTask(fetchKickOutSession);


    const kickOutSession = useCallback(async (playerId?: string, sessionId?: number): Promise<boolean> => {
        if (!sessionId || !playerId) {
            setError(new StandardError("ID not specified"));
            return false;
        }
        return (await run(playerId, sessionId)) ?? false;
    }, [run]);

    return { kickOutSession, error, loading };
}