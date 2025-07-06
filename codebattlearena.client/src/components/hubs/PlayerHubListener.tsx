import { usePlayerEventsHub } from "@/hooks/hubs/player/usePlayerEventsHub";
import { Player, Session } from "@/models/dbModels";
import { useState } from "react";
import InlineNotification from "../common/InlineNotification";
import { useAuth } from "@/contexts/AuthContext";

export function PlayerHubListener() {
    const [notification, setNotification] = useState<string | null>(null);
    const { user } = useAuth();

    usePlayerEventsHub({
        onFriendRequest: (sender: Player) => {
            setNotification(null);
            setNotification(`Player ${sender.username} wants to add you as a friend`);
        },
        onInvitationSession: (session: Session) => {
            setNotification(null);
            setNotification(`I invite you to the session "${session.name}", language - ${session.langProgramming?.nameLang}`);
        }
    })

    if (!user)
        return null;

    return (
        <>
            {notification && (
                <InlineNotification message={notification} className="bg-blue" />
            )}
        </>
    )
}

export default PlayerHubListener;