import { useState, useCallback } from "react";
import { StandardError, processError } from "@/untils/errorHandler";

export function useAsyncTask<T extends any[], R>(
    asyncFunc: (...args: T) => Promise<R>
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const run = useCallback(async (...args: T): Promise<R | null> => {
        setLoading(true);
        setError(null);
        try {
            const result = await asyncFunc(...args);
            return result;
        } catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [asyncFunc]);

    return { run, loading, error, setError };
}
