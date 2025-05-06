import { fetchDeleteTask } from "@/services/task";
import { useAsyncTask } from "../useAsyncTask";

export function useDeleteTask() {
    const { run, loading, error } = useAsyncTask(fetchDeleteTask);

    const deleteTask = async (taskId: number): Promise<boolean> => {
        const data = await run(taskId);
        return data ?? false;
    };

    return { deleteTask, error, loading };
}