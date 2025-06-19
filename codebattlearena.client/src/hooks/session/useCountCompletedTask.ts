import { useCallback, useState, useEffect } from "react";
import { useAsyncTask } from "../useAsyncTask";
import { fetchGetCountCompletedTask } from "@/services/session";

export function useCountCompletedTask(idSession?: number) {
    const [count, setCount] = useState<number>();
    const { run: load, loading, error } = useAsyncTask(fetchGetCountCompletedTask);

    const loadCount = useCallback(async () => {
        if (!idSession) return;

        const data = await load(idSession);
        if (data !== undefined && data !== null) {
            setCount(data);
        }

    }, [load, idSession])

    useEffect(() => {
        if (!idSession) return;
        loadCount();
    }, [loadCount])

    return { count, setCount, loading, error, reloadCountCompleted: loadCount }
}