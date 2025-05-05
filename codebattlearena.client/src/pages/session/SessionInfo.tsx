import { Link, useNavigate, useParams } from "react-router-dom";

import { useSession } from "@/hooks/session/useSession";
import { useState } from "react";
import { Difficulty, Session, SessionState } from "@/models/dbModels";
import { SessionCard } from "@/components/cards/SessionCard";
import PlayersList from "@/components/lists/PlayersList";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";
import EditSessionModal from "@/components/modals/EditSessionModal";
import { useSessionPlayers } from "@/hooks/session/useSessionPlayers";
import SettingSessionMenu from "@/components/menu/SettingSessionMenu";
import TaskProgrammingMiniCard from "@/components/cards/TaskProgrammingMiniCard";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { useDeleteSession } from "@/hooks/session/useDeleteSession";
import { Button } from "@/components/ui/button";
import { TaskProgrammingFilters } from "@/models/filters";
import { useSessionJoin } from "@/hooks/session/useSessionJoin";
import { useActiveSession } from "@/contexts/SessionContext";
import InputPassword from "@/components/common/InputPassword";
import { Users } from "lucide-react";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";

export function SessionInfo() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const { session, setSession, isEdit, loading: sessionLoad, error: sessionError } = useSession(Number(sessionId));
    const { players, setPlayers, loading: playersLoad, reloadPlayers } = useSessionPlayers(Number(sessionId), true);
    const { deleteSession, error: deleteError } = useDeleteSession();
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showEditSession, setShowEditSession] = useState(false);
    const { isCompleted, loading: joinLoad, error: joinError, joinSession } = useSessionJoin();
    const { activeSession, setActiveSession, leaveSession } = useActiveSession();
    const [password, setPassword] = useState<string>("");

    useSessionEventsHub(Number(sessionId), {
        onDelete: () => navigate("/home"),
        onUpdate: (session) => {
            setSession(session);
            reloadPlayers();
        },
        onJoin: () => reloadPlayers(),
        onLeave: () => reloadPlayers(),
    });

    const handleUpdateSession = (updatedSession: Session) => {
        setSession(updatedSession);
    };

    const handleDeletPlayer = (playerId: string) => {
        const newPlayers = players.filter((player) => player.id !== playerId);
        setPlayers(newPlayers);
    };

    const handleDeletAllPlayers = () => {

    }

    const handleDeletSession = async () => {
        const success = await deleteSession(Number(sessionId));
        await handleLeaveSession();
    }

    const handleJoinSession = async () => {
        if (session && session.idSession) {
            const success = await joinSession(session.idSession, password);
            if (success) {
                setActiveSession(session);
            }
        }
    };

    const handleLeaveSession = async () => {
        leaveSession();
    }

    const goToTaskList = (session: Session) => {
        const filter: TaskProgrammingFilters = {
            lang: session.langProgramming?.codeNameLang ?? '',
            difficulty: Difficulty.Easy,
        };

        const query = new URLSearchParams(filter as any).toString();

        navigate(`/task/list-task?${query}`);
    };

    if (sessionLoad) return <LoadingScreen/>
    if (sessionError) return <ErrorMessage error={sessionError} />;
    if (!session) return <EmptyState message="Session not found" />;

    const error = deleteError || joinError;

  return (
      <>
          {error && <InlineNotification message={error.message} position="top" className="bg-red-700" />}

          {notification && (
              <InlineNotification message={notification} position="top" className="bg-sky-600" />
          )}

          <div className="glow-box">
              <div className="max-w-3xl mx-auto">
                  {/* Заголовок страницы */}
                  <div className="flex items-center justify-between mb-6">
                      <h1 className="text-4xl font-bold text-green-400 font-mono">
                          Session - details
                      </h1>
                      {isEdit && (
                          <SettingSessionMenu
                              setShowEditSession={setShowEditSession}
                              handleDeletAllPlayers={handleDeletAllPlayers}
                              handleDeletSession={handleDeletSession}
                          />
                      )}
                  </div>

                  {/* Карточка сессии */}
                  <SessionCard session={session}></SessionCard>

                  <div className="mb-3"></div>

                  {session.taskProgramming && (
                      <Link to={`/task/info-task/${session.taskProgramming.idTaskProgramming}`} title="View Task">
                          <TaskProgrammingMiniCard
                              className="hover:scale-[1.02] transition"
                              task={session.taskProgramming}>
                          </TaskProgrammingMiniCard>
                      </Link>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-3">
                      {isEdit && (
                          <Button className="btn-green btn-animation flex items-center justify-center"
                              onClick={() => goToTaskList(session)}
                          >
                              {session.taskProgramming ? "Change task" : "Select task"}
                          </Button>
                      )}
                      {!activeSession ? (
                          <>
                              {session.state === SessionState.Private && (
                                  <InputPassword onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                              )}
                              <Button
                                  disabled={joinLoad}
                                  className="btn-green btn-animation flex items-center justify-center"
                                  onClick={handleJoinSession}
                              >
                                  Join
                              </Button>
                          </>

                      ) : activeSession?.idSession === session.idSession && (
                          <Button
                              disabled={joinLoad}
                              className="btn-red btn-animation flex items-center justify-center"
                              onClick={handleLeaveSession}
                          >
                              Leave
                          </Button>
                      )}

                      <Button className="btn-green btn-animation flex items-center justify-center">
                          Invite friend
                      </Button>
                  </div>

                  <div className="space-y-4 rounded-2xl px-4 py-3 border shadow-sm mt-3">
                      <div className="text-sm flex items-center gap-1">
                          <Users size={16} />
                          <span>
                              {players.length}/{session.maxPeople}
                          </span>
                      </div>
                      {players.length !== 0 && (
                          <PlayersList
                              players={players}
                              cardWrapperClassName="hover:scale-[1.02] transition"
                              onDelete={handleDeletPlayer}
                          />
                      )}
                  </div>
              </div>
          </div>
          {showEditSession && session && (
              <EditSessionModal open={showEditSession} session={session} onClose={() => setShowEditSession(false)} onUpdate={handleUpdateSession} />
          )}
      </>
  );
}

export default SessionInfo;