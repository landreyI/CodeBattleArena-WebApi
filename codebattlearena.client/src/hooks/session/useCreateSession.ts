import { Session } from "@/models/dbModels";
import { fetchCreateSession } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";

export function useCreateSession() {
    const { run: create, loading, error } = useAsyncTask(fetchCreateSession);
    /**
    * Creates a new session and returns its ID.
    * @param values - The form values for creating a session.
    * @returns The ID of the created session.
    * @throws StandardError if the session creation fails.
    */
    const createSession = async (session: Session) => {
        const data = await create(session);
        return data;
    };

    return { createSession, loading, error };
}
