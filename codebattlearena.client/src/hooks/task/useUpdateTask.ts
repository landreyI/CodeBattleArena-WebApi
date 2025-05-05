import { useState } from "react";
import { TaskProgramming } from "@/models/dbModels";
import { fetchUpdateTask } from "@/services/task";
import { StandardError, processError } from "@/untils/errorHandler";

export function useUpdateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    /**
    * Update task.
    * @param values - The form values for creating a task.
    * @throws StandardError if the session creation fails.
    */
    const updateTask = async (
        task: TaskProgramming,
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchUpdateTask(task);
            return data;
        } catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateTask, isLoading, error };
}
