import { fetchDeleteTask } from "@/services/task";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";

export function useDeleteTask() {
    const { run, loading, error } = useAsyncTask(fetchDeleteTask);

    const deleteTask = useCallback(async (taskId: number): Promise<boolean> => {
        const data = await run(taskId);
        return data ?? false;
    }, [run]);

    return { deleteTask, error, loading };
}