import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, MessageCircle, SeparatorVertical, Users } from "lucide-react";
import { useActiveSession } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import ChatSheet from "../common/ChatSheet";
import { MessageProps } from "../common/Message";

export function SessionActiveMenu() {
    const { activeSession, setActiveSession, leaveSession, refreshSession } = useActiveSession();
    const [notification, setNotification] = useState<string | null>(null);
    const { user } = useAuth();

    const [isChatOpen, setChatOpen] = useState(false);
    const toggleChat = () => {
        setChatOpen(prev => {
            if (!prev) setUnreadCount(0); // если открываем чат — сбрасываем
            return !prev;
        });
    };
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const [countdown, setCountdown] = useState<number | null>(null);
    const countdownDuration = 10; // second
    const navigate = useNavigate();

    const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);

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

    useEffect(() => {
        if (!activeSession || !activeSession.isStart || activeSession.isFinish) {
            setSessionTimeLeft(null);
            return;
        }

        if (!activeSession.dateStartGame || !activeSession.timePlay) {
            setSessionTimeLeft(null);
            return;
        }

        const interval = setInterval(() => {
            const dateString = activeSession.dateStartGame ?? new Date;
            const isoString = dateString.toString().endsWith("Z") ? dateString : dateString + "Z";
            const startTime = new Date(isoString).getTime();
            const now = Date.now();
            const durationMs = (activeSession.timePlay ?? 5) * 60 * 1000;

            const timeLeftMs = startTime + durationMs - now;
            if (timeLeftMs <= 0) {
                setSessionTimeLeft(0);
                clearInterval(interval);
            } else {
                setSessionTimeLeft(Math.floor(timeLeftMs / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [activeSession, refreshSession]);

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
        },
        onFinishGame: () => {
            navigate(`/session/info-session/${activeSession?.idSession}`);
            refreshSession();
        },
        onSendMessageSession: (message) => {
            incomingMessage({
                message: message,
                isUser: message.idSender === user?.id
            });
            if (!isChatOpen) {
                setUnreadCount(prev => prev + 1);
            }
        }
    });

    const incomingMessage = useCallback((message: MessageProps) => {
        setMessages((prev) => [...prev, message]);
    }, []);

    if (!activeSession) return null;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

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
                    className="bg-primary"
                    duration={1000}
                    fadeDuration={100}
                />
            )}

            <div className="w-full p-4 header" style={{ zIndex: 1 }}>
                <div className="flex flex-nowrap justify-between items-center w-full">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">
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
                        {sessionTimeLeft !== null && (
                            <>
                                <SeparatorVertical />
                                <div className="font-mono text-yellow select-none">
                                    Time left: {formatTime(sessionTimeLeft)}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">

                        <ChatSheet
                            trigger={
                                <div className="relative cursor-pointer" onClick={toggleChat}>
                                    <MessageCircle className="hover:text-primary" size={28} />
                                    {unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount}
                                        </div>
                                    )}
                                </div>
                            }
                            messages={messages}
                        />

                        <Link to={`/session/info-session/${activeSession.idSession}`} className="hover:text-primary mx-4">
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
