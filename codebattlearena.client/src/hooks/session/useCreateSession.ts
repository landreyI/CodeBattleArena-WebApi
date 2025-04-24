import { useState } from "react";
import { Player, Session } from "@/models/dbModels";
import { fetchCreateSession } from "@/services/session";
import { StandardError, processError } from "@/untils/errorHandler";

export function useCreateSession() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    /**
    * Creates a new session and returns its ID.
    * @param values - The form values for creating a session.
    * @returns The ID of the created session.
    * @throws StandardError if the session creation fails.
    */
    const createSession = async (
        session: Session
    ): Promise<Session> => {
        setIsLoading(true);
        setError(null);

        try {
            const idSession = await fetchCreateSession(session);
            return idSession;
        } catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        } finally {
            setIsLoading(false);
        }
    }

    return { createSession, isLoading, error };
}
