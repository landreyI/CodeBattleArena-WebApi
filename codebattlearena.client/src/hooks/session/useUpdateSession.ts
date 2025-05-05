import { useState } from "react";
import { Player, Session } from "@/models/dbModels";
import { fetchUpdateSession } from "@/services/session";
import { StandardError, processError } from "@/untils/errorHandler";

export function useUpdateSession() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    /**
    * Update session.
    * @param values - The form values for creating a session.
    * @throws StandardError if the session creation fails.
    */
    const updateSession = async (
        session: Session,
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchUpdateSession(session);
            return data;
        } catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateSession, isLoading, error };
}
