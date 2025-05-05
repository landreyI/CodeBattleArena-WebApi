import { useState } from "react";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchDeleteSession } from "@/services/session";

export function useDeleteSession() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const deleteSession = async (sessionId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchDeleteSession(sessionId);
            return data;
        }
        catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        }
        finally {
            setIsLoading(false);
        }
    };

    return { deleteSession, error, isLoading };
}