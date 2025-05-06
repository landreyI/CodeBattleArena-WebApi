import { fetchDeleteSession } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";

export function useDeleteSession() {

    const { run, loading, error } = useAsyncTask(fetchDeleteSession);


    const deleteSession = async (sessionId: number): Promise<boolean> => {
        return (await run(sessionId)) ?? false;
    };

    return { deleteSession, error, loading };
}