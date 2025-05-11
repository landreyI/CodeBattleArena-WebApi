import { useState } from "react";
import { fetchJoinSession } from "@/services/playerSession";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function useSessionJoin() {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const { run: join, loading, error } = useAsyncTask(fetchJoinSession);

    const joinSession = useCallback(async (idSession: number, passwor?: string): Promise<boolean | null> => {
        const data = await join(idSession, passwor);
        if (data) {
            setIsCompleted(data);
        }
        return data;
    }, [join]);

    return { isCompleted, loading, error, joinSession };
}