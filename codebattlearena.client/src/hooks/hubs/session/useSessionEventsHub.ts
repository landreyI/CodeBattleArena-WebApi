import { Player, Session } from "@/models/dbModels";
import { useSessionHubConnection, useSessionHubEvent } from "@/contexts/SignalRSessionHubContext";
import { useSignalRSessionGroupSubscription } from "./useSignalRSessionGroupSubscription";


interface SessionEventHandlers {
    onDelete?: (id: number) => void;
    onUpdate?: (session: Session) => void;
    onJoin?: (player: Player) => void;
    onLeave?: (player: Player) => void;
    onListUpdate?: (session: Session) => void;
    onAdding?: (session: Session) => void;
    onListDelete?: (id: number) => void;
}

export function useSessionEventsHub(sessionId: number | undefined, handlers: SessionEventHandlers) {
    const connection = useSessionHubConnection();

    useSignalRSessionGroupSubscription(connection, sessionId?.toString());

    useSessionHubEvent<[number]>("SessionDeleting", (id: number) => {
        handlers.onDelete?.(id);
    });

    useSessionHubEvent<[Session]>("SessionUpdated", (session: Session) => {
        handlers.onUpdate?.(session);
    });

    useSessionHubEvent<[Player]>("SessionJoin", (player: Player) => {
        handlers.onJoin?.(player);
    });

    useSessionHubEvent<[Player]>("SessionLeave", (player: Player) => {
        handlers.onLeave?.(player);
    });

    useSessionHubEvent<[Session]>("SessionsListUpdated", (session: Session) => {
        handlers.onListUpdate?.(session);
    });

    useSessionHubEvent<[Session]>("SessionAdding", (session: Session) => {
        handlers.onAdding?.(session);
    });

    useSessionHubEvent<[number]>("SessionsListDeleting", (id: number) => {
        handlers.onListDelete?.(id);
    });
}
