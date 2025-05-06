import { useEffect, useState } from "react";
import { fetchGetSessionsList } from "@/services/session";
import { Session } from "@/models/dbModels";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function useSessionsList() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetSessionsList);

    const loadSessions = useCallback(async () => {
        const data = await load();
        if (data) {
            setSessions(data);
        }
    }, [load]);

    useEffect(() => {
        loadSessions();
    }, []);

    return { sessions, setSessions, loading, error, reloadSessions: loadSessions };
}