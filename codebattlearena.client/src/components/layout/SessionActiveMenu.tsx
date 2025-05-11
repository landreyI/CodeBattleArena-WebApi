import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, SeparatorVertical, Users } from "lucide-react";
import { useActiveSession } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function SessionActiveMenu() {
    const { activeSession, setActiveSession, leaveSession } = useActiveSession();
    const [notification, setNotification] = useState<string | null>(null);
    const { user } = useAuth();

    const [countdown, setCountdown] = useState<number | null>(null);
    const countdownDuration = 10; // second
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown === null || !user?.id || !activeSession?.idSession) return;

        if (countdown === 0) {
            const query = new URLSearchParams({
                playerId: user!.id,
                sessionId: activeSession!.idSession.toString(),
            });
            navigate(`/session/player-code?${query.toString()}`);
            return;
        }

        const timer = setTimeout(() => setCountdown((prev) => (prev ?? 1) - 1), 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

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
        onStartGame: () => {
            if (!user?.id || !activeSession?.idSession) return;
            setCountdown(countdownDuration);
        }
    });

    if (!activeSession) return null;

    return (
        <>
            {notification && (
                <InlineNotification message={notification} position="top" className="bg-sky-600" />
            )}

            {countdown !== null && countdown > 0 && (
                <InlineNotification
                    key={`countdown-${countdown}`}
                    message={`Game starts in ${countdown} seconds...`}
                    position="top"
                    className="bg-green-600 text-white"
                    duration={1000}
                    fadeDuration={100}
                />
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
