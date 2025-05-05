import { useState } from "react";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchDeleteTask } from "@/services/task";

export function useDeleteTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const deleteTask = async (taskId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchDeleteTask(taskId);
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

    return { deleteTask, error, isLoading };
}