import { Session } from "@/models/dbModels";
import { fetchUpdateSession } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";

export function useUpdateSession() {
    const { run: update, loading, error } = useAsyncTask(fetchUpdateSession);
    /**
    * Update session.
    * @param values - The form values for creating a session.
    * @throws StandardError if the session creation fails.
    */
    const updateSession = useCallback(async (
        session: Session,
    ): Promise<boolean> => {
        const data = await update(session);
        return data ?? false;
    }, [update]);

    return { updateSession, loading, error };
}
