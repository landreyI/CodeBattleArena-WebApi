import { fetchSendMessageSession } from "@/services/playerSession";
import { useCallback } from "react";
import { useAsyncTask } from "../useAsyncTask";

export function useSendMessageSession() {
    const { run: send, loading, error } = useAsyncTask(fetchSendMessageSession);

    const sendMessage = useCallback(async (message: string) => {
        const data = await send(message);
        return data;
    }, [send]);

    return { loading, error, sendMessage };
}