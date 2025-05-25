import { useNavigate, useParams } from "react-router-dom";

import { useSession } from "@/hooks/session/useSession";
import { useState } from "react";
import { Difficulty, Session, SessionState } from "@/models/dbModels";
import { SessionCard } from "@/components/cards/SessionCard";
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
import { useSessionJoin } from "@/hooks/playerSession/useSessionJoin";
import { useActiveSession } from "@/contexts/ActiveSessionContext";
import InputPassword from "@/components/common/InputPassword";
import { Users } from "lucide-react";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";
import { useStartGame } from "@/hooks/session/useStartGame";
import { useAuth } from "@/contexts/AuthContext";
import { useFinishGame } from "@/hooks/session/useFinishGame";
import { useBestResult } from "@/hooks/session/useBestResult";
import CodeVerificationResult from "@/components/cards/CodeVerificationResult";
import { PlayersList } from "@/components/lists/PlayersList";
import { useCountCompletedTask } from "@/hooks/session/useCountCompletedTask";

export function SessionInfo() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const { session, setSession, isEdit, loading: sessionLoad, error: sessionError, reloadSession } = useSession(Number(sessionId));
    const { players, setPlayers, loading: playersLoad, reloadPlayers } = useSessionPlayers(Number(sessionId), true);
    const { deleteSession, error: deleteError } = useDeleteSession();
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showEditSession, setShowEditSession] = useState(false);
    const { isCompleted, loading: joinLoad, error: joinError, joinSession } = useSessionJoin();
    const { error: startError, startGame } = useStartGame();
    const { error: finishError, finishGame } = useFinishGame();
    const { playerSession: bestResult, reloadBestResult } = useBestResult(Number(sessionId));
    const { activeSession, setActiveSession, leaveSession } = useActiveSession();
    const { count, setCount, error: countCompletedError, reloadCountCompleted } = useCountCompletedTask(Number(sessionId));
    const [password, setPassword] = useState<string>("");
    const { user } = useAuth();

    useSessionEventsHub(Number(sessionId), {
        onDelete: () => navigate("/home"),
        onUpdate: (sessionUpdate) => {
            if (session?.state !== sessionUpdate.state)
                reloadPlayers();

            reloadSession();
        },
        onJoin: () => reloadPlayers(),
        onLeave: () => reloadPlayers(),
        onFinishGame: () => reloadBestResult(),
        onUpdateCountCompleted: (count) => setCount(count), 
    });

    const handleUpdateSession = (updatedSession: Session) => {
        setSession(updatedSession);
    };

    const handleDeletPlayer = (playerId: string) => {
        const newPlayers = players.filter((player) => player.id !== playerId);
        setPlayers(newPlayers);
    };

    const handlePlayerSessionInfo = (playerId?: string) => {
        if (!playerId || !session?.idSession || !session.isStart) return;

        const query = new URLSearchParams({
            playerId: playerId,
            sessionId: session.idSession.toString(),
        });

        navigate(`/session/player-code?${ query.toString() }`);
    };

    const handleDeletSession = async () => {
        const success = await deleteSession(Number(sessionId));
        await leaveSession();
    }

    const handleJoinSession = async () => {
        if (session && session.idSession) {
            const success = await joinSession(session.idSession, password);

            if (success) {
                setActiveSession(session);
            }
        }
    };

    const goToTaskList = () => {
        const filter: TaskProgrammingFilters = {
            idLang: session?.langProgrammingId ?? undefined,
            difficulty: Difficulty.Easy,
        };

        const query = new URLSearchParams(filter as any).toString();

        navigate(`/task/list-task?${ query }`);
    };


    if (sessionLoad) return <LoadingScreen />
    if (sessionError) return <ErrorMessage error={sessionError} />;
    if (!session) return <EmptyState message="Session not found" />;

    const isStarted = session?.isStart;
    const isFinished = session?.isFinish;
    const isPrivate = session?.state === SessionState.Private;
    const isJoined = activeSession?.idSession === session?.idSession;

    const error = deleteError || joinError || startError || finishError;

    return (
        <>
            {error && <InlineNotification message={error.message} position="top" className="bg-red" />}

            {notification && (
                <InlineNotification message={notification} position="top" className="bg-blue" />
            )}

            <div className="glow-box">
                <div className="md:w-[50vw] sm:w-[100vw] mx-auto">
                    {/* Заголовок страницы */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-primary font-mono">
                            Session - details
                        </h1>
                        {isEdit && (
                            <SettingSessionMenu
                                setShowEditSession={setShowEditSession}
                                handleDeletSession={handleDeletSession}
                            />
                        )}
                    </div>

                    {bestResult && (
                        <div className="bg-muted p-4 rounded-xl shadow-md mb-4">
                            <h3 className="text-lg font-semibold text-primary mb-2">
                                🏆 Best Result: <span className="text-foreground">{bestResult?.player?.username}</span>
                            </h3>

                            <div className="max-w-md">
                                <CodeVerificationResult
                                    executionResult={{
                                        time: bestResult.time ?? undefined,
                                        memory: bestResult.memory ?? undefined,
                                        compileOutput: undefined
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Карточка сессии */}
                    <SessionCard session={session}></SessionCard>

                    <div className="my-3 text-2xl font-bold text-primary">Task:</div>

                    {session.taskProgramming && (
                        <TaskProgrammingMiniCard
                            className="hover:scale-[1.02] transition"
                            task={session.taskProgramming}>
                        </TaskProgrammingMiniCard>
                    )}

                    {count !== undefined && isStarted && !isFinished && (
                        <h3 className="text-lg font-semibold text-primary my-3">
                            Completed task: <span className="text-foreground">{count}/{session.amountPeople}</span>
                        </h3>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-3">
                        {isEdit && !isStarted && !isFinished && (
                            <>
                                <Button
                                    className="btn-primary btn-animation flex items-center justify-center"
                                    onClick={goToTaskList}
                                >
                                    {session.taskProgramming ? "Change task" : "Select task"}
                                </Button>

                                {session.taskProgramming && (
                                    <Button
                                        className="btn-green btn-animation flex items-center justify-center"
                                        onClick={() => startGame(session.idSession)}
                                    >
                                        Start the game
                                    </Button>
                                )}

                                <Button className="btn-primary btn-animation flex items-center justify-center">
                                    Invite friend
                                </Button>
                            </>
                        )}

                        {!activeSession && !isStarted && !isFinished ? (
                            <>
                                {isPrivate && (
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

                        ) : isJoined && !isFinished && (
                            <>
                                <Button
                                    disabled={joinLoad}
                                    className="btn-red btn-animation flex items-center justify-center"
                                        onClick={leaveSession}
                                >
                                    Leave
                                </Button>
                                {isStarted && (
                                    <Button
                                            className="btn-primary btn-animation flex items-center justify-center"
                                            onClick={() => handlePlayerSessionInfo(user?.id)}
                                    >
                                        My code
                                    </Button>
                                )}

                                    {isEdit && isStarted && (
                                    <Button
                                        className="btn-green btn-animation flex items-center justify-center"
                                            onClick={() => finishGame(session.idSession)}
                                    >
                                        Finish game
                                    </Button>
                                )}
                            </>
                        )}
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
                                onPlayerSessionInfo={
                                    session.isStart
                                        ? handlePlayerSessionInfo
                                        : undefined
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
            {session && (
                <EditSessionModal open={showEditSession} session={session} onClose={() => setShowEditSession(false)} onUpdate={handleUpdateSession} />
            )}
        </>
    );
}

export default SessionInfo;