import { TaskProgramming } from "@/models/dbModels";
import { fetchCreateTask } from "@/services/task";
import { useAsyncTask } from "../useAsyncTask";

export function useCreateTask() {
    const { run: create, loading, error } = useAsyncTask(fetchCreateTask);
    /**
    * Creates a new task and returns its ID.
    * @param values - The form values for creating a task.
    * @returns The ID of the created task.
    * @throws StandardError if the session creation fails.
    */
    const createTask = async (
        task: TaskProgramming
    ) => {
        const idTask = await create(task);
        return idTask;
    }

    return { createTask, loading, error };
}
