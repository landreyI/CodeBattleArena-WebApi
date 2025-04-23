import React, { useEffect, useState } from "react";
import { fetchGetSession } from "@/services/session";
import { Session } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";

export function useSession(sessionId: number | undefined) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setError(new StandardError("Session ID not specified"));
            setLoading(false);
            return;
        }

        const fetchSession = async () => {
            try {
                const data = await fetchGetSession(sessionId);

                setSession(data);
            } catch (err: unknown) {
                const standardError = processError(err);
                setError(standardError);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionId]);

    return { session, setSession, loading, error };
}