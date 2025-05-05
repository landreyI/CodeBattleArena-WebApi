import { Player, Session, TaskProgramming } from "@/models/dbModels";
import { useSignalRTaskGroupSubscription } from "./useSignalRTaskGroupSubscription";
import { useTaskHubConnection, useTaskHubEvent } from "@/contexts/SignalRTaskHubContext";


interface TaskEventHandlers {
    onDelete?: (id: number) => void;
    onUpdate?: (session: TaskProgramming) => void;
    onListUpdate?: (session: TaskProgramming) => void;
    onAdding?: (session: TaskProgramming) => void;
    onListDelete?: (id: number) => void;
}

export function useTaskEventsHub(sessionId: number | undefined, handlers: TaskEventHandlers) {
    const connection = useTaskHubConnection();

    useSignalRTaskGroupSubscription(connection, sessionId?.toString());

    useTaskHubEvent<[number]>("TaskDeleting", (id: number) => {
        handlers.onDelete?.(id);
    });

    useTaskHubEvent<[TaskProgramming]>("TaskUpdated", (task: TaskProgramming) => {
        handlers.onUpdate?.(task);
    });

    useTaskHubEvent<[TaskProgramming]>("TaskAdding", (task: TaskProgramming) => {
        handlers.onAdding?.(task);
    });

    useTaskHubEvent<[TaskProgramming]>("TasksListUpdated", (task: TaskProgramming) => {
        handlers.onListUpdate?.(task);
    });

    useTaskHubEvent<[number]>("TasksListDeleting", (id: number) => {
        handlers.onListDelete?.(id);
    });
}
