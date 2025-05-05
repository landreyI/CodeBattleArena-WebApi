import React, { useState } from "react";
import { fetchJoinSession } from "@/services/session";
import { processError, StandardError } from "@/untils/errorHandler";
import { useCallback } from "react";

export function useSessionJoin() {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const joinSession = useCallback(async (idSession: number, passwor?: string) => {
        try {
            setLoading(true);
            const data = await fetchJoinSession(idSession, passwor);
            setIsCompleted(data);
            return data;
        } catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
            return false;
        } finally {
            setLoading(false);
        }
    },[]);

    return { isCompleted, loading, error, joinSession };
}