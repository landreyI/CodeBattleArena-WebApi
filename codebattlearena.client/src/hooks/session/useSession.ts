import { useEffect, useState, useCallback } from "react";
import { fetchGetSession } from "@/services/session";
import { Session } from "@/models/dbModels";
import { StandardError } from "@/untils/errorHandler";
import { useAsyncTask } from "../useAsyncTask";
export function useSession(sessionId: number | undefined) {
    const [session, setSession] = useState<Session | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>();
    const { run: load, loading, error, setError } = useAsyncTask(fetchGetSession);

    const loadSession = useCallback(async () => {
        if (!sessionId) {
            setError(new StandardError("Session ID not specified"));
            return;
        }

        const data = await load(sessionId);
        if (data) {
            setSession(data.session);
            setIsEdit(data.isEdit);
        }
    }, [setError, load, sessionId]);

    useEffect(() => {
        loadSession();

    }, [loadSession]);

    return { session, setSession, isEdit, loading, error, reloadSession: loadSession };
}