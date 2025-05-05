import { useSessionsList } from "@/hooks/session/useSessionsList";
import SessionList from "@/components/lists/SessionsList";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";

export function SessionsList() {
    const { sessions, setSessions, loading: sessionsLoad, error: sessionsError, reloadSessions } = useSessionsList();

    useSessionEventsHub(undefined, {
        onListDelete: (sessionId) =>
            setSessions((prevSessions) => prevSessions.filter((session) => session.idSession !== sessionId)),
        onAdding: (addSession) => setSessions((prevSessions) => [addSession, ...prevSessions]),
        onListUpdate: (updateSession) => 
            setSessions((prevSessions) =>
                prevSessions.map((session) =>
                    session.idSession === updateSession.idSession ? updateSession : session
                )
            ),
    });

    if (sessionsLoad) return <LoadingScreen />
    if (sessionsError) return <ErrorMessage error={sessionsError} />;
    if (!sessions) return <EmptyState message="Sessions not found" />;

    return (
        <SessionList
            sessions={sessions}
            cardWrapperClassName="hover:scale-[1.02] transition"
        />
    )
}

export default SessionsList;