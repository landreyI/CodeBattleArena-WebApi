import { fetchDeleteSession } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";

export function useDeleteSession() {

    const { run, loading, error } = useAsyncTask(fetchDeleteSession);


    const deleteSession = useCallback(async (sessionId: number): Promise<boolean> => {
        return (await run(sessionId)) ?? false;
    }, [run]);

    return { deleteSession, error, loading };
}