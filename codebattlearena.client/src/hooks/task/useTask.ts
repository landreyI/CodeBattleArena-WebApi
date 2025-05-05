import React, { useEffect, useState } from "react";
import { TaskProgramming } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetTask } from "@/services/task";

export function useTask(taskId: number | undefined) {
    const [task, setTask] = useState<TaskProgramming | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    useEffect(() => {
        if (!taskId) {
            setError(new StandardError("Task ID not specified"));
            setLoading(false);
            return;
        }

        const fetchSession = async () => {
            try {
                const data = await fetchGetTask(taskId);
                setTask(data);
            } catch (err: unknown) {
                const standardError = processError(err);
                setError(standardError);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, [taskId]);

    return { task, setTask, loading, error };
}