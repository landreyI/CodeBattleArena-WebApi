import React, { useEffect, useState } from "react";
import { fetchGetSessionsList } from "@/services/session";
import { Session } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { useCallback } from "react";

export function useSessionsList() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    const loadSessions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchGetSessionsList();
            setSessions(data);
        } catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
        } finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        loadSessions();
    }, []);

    return { sessions, setSessions, loading, error, reloadSessions: loadSessions };
}