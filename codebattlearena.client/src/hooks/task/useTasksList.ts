import React, { useEffect, useState } from "react";
import { TaskProgramming } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { useCallback } from "react";
import { fetchGetTasks } from "@/services/task";
import { TaskProgrammingFilters } from "@/models/filters";

export function useTasksList(filter?: TaskProgrammingFilters) {
    const [tasks, setTasks] = useState<TaskProgramming[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    const loadTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchGetTasks(filter);
            setTasks(response);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadTasks();
    }, []);

    return { tasks, setTasks, loading, error, reloadTasks: loadTasks };
}