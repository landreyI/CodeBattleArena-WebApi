import { useCallback } from "react";
import { fetchSelectTaskForSession } from "@/services/session";
import { StandardError } from "@/untils/errorHandler";
import { useAsyncTask } from "../useAsyncTask";

export function useSelectTaskForSession() {
    const { run: select, loading, error, setError } = useAsyncTask(fetchSelectTaskForSession);

    const selectTask = useCallback(async (sessionId: number | null, taskId: number | null): Promise<boolean | null> => {
        if (!sessionId || !taskId) {
            const err = new StandardError("ID not specified");
            setError(err);
            return false;
        }

        const result = await select(sessionId, taskId);
        return result;
    }, [select]);

    return { selectTask, loading, error };
}
