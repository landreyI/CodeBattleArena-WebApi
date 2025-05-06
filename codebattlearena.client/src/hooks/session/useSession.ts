import React, { useEffect, useState } from "react";
import { fetchGetSession } from "@/services/session";
import { Session } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { useAsyncTask } from "../useAsyncTask";

export function useSession(sessionId: number | undefined) {
    const [session, setSession] = useState<Session | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>();
    const { run: loadSession, loading, error, setError } = useAsyncTask(fetchGetSession);

    useEffect(() => {
        if (!sessionId) {
            setError(new StandardError("Session ID not specified"));
            return;
        }

        (async () => {
            const data = await loadSession(sessionId);
            if (data) {
                setSession(data.session);
                setIsEdit(data.isEdit);
            }
        })();

    }, [sessionId, loadSession, setError]);

    return { session, setSession, isEdit, loading, error };
}