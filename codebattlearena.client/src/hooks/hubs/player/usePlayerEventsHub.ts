import { Player, Session } from "@/models/dbModels";
import { usePlayerHubConnection, usePlayerHubEvent } from "@/contexts/SignalRPlayerHubContext";

interface PlayerEventHandlers {
    onFriendRequest?: (sender: Player) => void;
    onInvitationSession?: (session: Session) => void;
}

export function usePlayerEventsHub(handlers: PlayerEventHandlers) {
    const connection = usePlayerHubConnection();

    usePlayerHubEvent<[Player]>("FriendRequest", (sender: Player) => {
        handlers.onFriendRequest?.(sender);
    });

    usePlayerHubEvent<[Session]>("InvitationSession", (session: Session) => {
        handlers.onInvitationSession?.(session);
    });
}
