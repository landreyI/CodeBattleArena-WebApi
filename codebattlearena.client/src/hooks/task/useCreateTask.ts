import { useState } from "react";
import { z } from "zod";
import { TaskProgramming } from "@/models/dbModels";
import { fetchCreateTask } from "@/services/task";
import { StandardError, processError } from "@/untils/errorHandler";

export function useCreateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    /**
    * Creates a new task and returns its ID.
    * @param values - The form values for creating a task.
    * @returns The ID of the created task.
    * @throws StandardError if the session creation fails.
    */
    const createTask = async (
        task: TaskProgramming
    ): Promise<TaskProgramming> => {
        setIsLoading(true);
        setError(null);

        try {
            const idTask = await fetchCreateTask(task);
            return idTask;
        } catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        } finally {
            setIsLoading(false);
        }
    }

    return { createTask, isLoading, error };
}
