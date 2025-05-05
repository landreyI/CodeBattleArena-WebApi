import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, SeparatorVertical, Users } from "lucide-react";
import { useActiveSession } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { useSessionHubConnection, useSessionHubEvent } from "@/contexts/SignalRSessionHubContext";
import { useSignalRGroupSubscription } from "@/hooks/hubs/session/useSignalRGroupSubscription";
import { Player, Session } from "@/models/dbModels";
import { useSessionEventsHub } from "../../hooks/hubs/session/useSessionEventsHub";

export function SessionActiveMenu() {
    const { activeSession, setActiveSession, leaveSession } = useActiveSession();
    const [notification, setNotification] = useState<string | null>(null);

    useSessionEventsHub(activeSession?.idSession ?? undefined, {
        onDelete: () => {
            setNotification("This session has been deleted");
            leaveSession();
        },
        onUpdate: (session) => setActiveSession(session),
        onJoin: (player) => {
            setNotification(`player joined: ${player.username}`);
            if (activeSession) {
                setActiveSession({
                    ...activeSession,
                    amountPeople: (activeSession.amountPeople ?? 0) + 1,
                });
            }
        },
        onLeave: (player) => {
            setNotification(`player leave: ${player.username}`);
            if (activeSession) {
                setActiveSession({
                    ...activeSession,
                    amountPeople: (activeSession.amountPeople ?? 0) - 1,
                });
            }
        },
    });

    if (!activeSession) return null;

    return (
        <>
            {notification && (
                <InlineNotification message={notification} position="top" className="bg-sky-600" />
            )}

            <div className="w-full p-4 header" style={{ zIndex: 1 }}>
                <div className="flex flex-nowrap justify-between items-center w-full">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-green-500">
                            {activeSession.name} ({activeSession.state})
                        </span>
                        <SeparatorVertical />
                        <div className="flex items-center gap-1">
                            <Users size={14} />
                            {activeSession.amountPeople ?? 0}/{activeSession.maxPeople}
                        </div>
                        <SeparatorVertical />
                        <div className="flex items-center gap-1">
                            Lang:
                            {activeSession.langProgramming?.nameLang || "Unknown"}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <Link to={`/session/info-session/${activeSession.idSession}`} className="hover:text-green-400 mx-4">
                            <ExternalLink size={28} />
                        </Link>
                        <Button onClick={leaveSession} className="btn-red btn-animation">
                            Leave
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SessionActiveMenu;
