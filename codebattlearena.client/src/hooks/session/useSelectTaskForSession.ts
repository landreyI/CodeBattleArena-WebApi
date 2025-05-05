import { useState, useCallback } from "react";
import { fetchsSelectTaskForSession } from "@/services/session";
import { processError, StandardError } from "@/untils/errorHandler";

export function useSelectTaskForSession() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const selectTask = useCallback(async (sessionId: number | null, taskId: number | null): Promise<boolean> => {
        setLoading(true);
        setError(null);

        if (!sessionId || !taskId) {
            const err = new StandardError("ID not specified");
            setError(err);
            setLoading(false);
            return false;
        }

        try {
            const result = await fetchsSelectTaskForSession(sessionId, taskId);
            return result;
        } catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { selectTask, loading, error };
}
