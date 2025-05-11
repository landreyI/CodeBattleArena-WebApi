import { useTasksList } from "@/hooks/task/useTasksList";
import TasksList from "@/components/lists/TasksList";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { isEditRole } from "@/untils/businessRules";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { TaskProgrammingFilters } from "@/models/filters";
import { Difficulty } from "@/models/dbModels";
import TaskFilter from "@/components/filters/TaskFilter";
import { useTaskEventsHub } from "@/hooks/hubs/task/useTaskEventsHub";

export function TasksListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const lang = queryParams.get('lang') ?? '';
    const difficulty = queryParams.get('difficulty') ?? Difficulty.Easy;

    // Преобразуем строку difficulty в соответствующее значение из Difficulty Enum
    const filterReceived: TaskProgrammingFilters = {
        lang,
        difficulty: Difficulty[difficulty as keyof typeof Difficulty] || Difficulty.Easy,
    };

    const [filter, setFilter] = useState<TaskProgrammingFilters>(filterReceived);

    const { tasks, setTasks, loading: tasksLoad, error: tasksError, reloadTasks } = useTasksList(filter);
    const { deleteTask, error: deleteError } = useDeleteTask();
    const { user } = useAuth();

    useTaskEventsHub(undefined, {
        onListUpdate: (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.idTaskProgramming === updatedTask.idTaskProgramming ? updatedTask : task
                )
            );
        },
        onAdding: (addTask) => setTasks((prevTasks) => [addTask, ...prevTasks]),
        onListDelete: (taskId) => setTasks((prevTasks) => prevTasks.filter((task) => task.idTaskProgramming !== taskId)),
    });

    const handleDeletTask = async (taskId: number) => {
        const success = await deleteTask(taskId);
        if (success) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.idTaskProgramming !== taskId));
        }
    };

    const handleChangeFilter = (filter: TaskProgrammingFilters) => {
        setFilter(filter);
    }

    const handleSeacrh = () => {
        reloadTasks();
    }

    if (tasksLoad) return <LoadingScreen />
    if (tasksError) return <ErrorMessage error={tasksError} />;

    return (
        <>
            {deleteError && <InlineNotification message={deleteError.message} position="top" className="bg-red" />} {/* не прерывая рендер */}

            <TaskFilter filter={filter} onChange={handleChangeFilter} handleSearch={handleSeacrh}></TaskFilter>

            {!tasks || tasks.length === 0 && (<EmptyState message="Tasks not found" />)}

            <div className="mb-5"></div>

            <TasksList
                tasks={tasks}
                cardWrapperClassName="hover:scale-[1.02] transition"
                onDelete={(user && isEditRole(user.roles)) ? handleDeletTask : undefined}
            />
        </>
    )
}

export default TasksListPage;