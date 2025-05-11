import { useNavigate, useSearchParams } from "react-router-dom";
import { usePlayerSessionInfo } from "@/hooks/playerSession/usePlayerSessionInfo";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useRef, useState, useEffect } from "react";
import { ToggleSizeButton } from "@/components/buttons/ToggleSizeButton";
import { useTask } from "@/hooks/task/useTask";
import InlineNotification from "@/components/common/InlineErrorNotification";
import CodeViewer from "@/components/common/CodeViewer";
import InputDatasList from "@/components/lists/InputDatasList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDifficultyColor } from "@/untils/helpers";
import { useCheckPlayerCode } from "@/hooks/playerSession/useCheckPlayerCode";
import PlayerMiniCard from "@/components/cards/PlayerMiniCard";
import { useSessionEventsHub } from "@/hooks/hubs/session/useSessionEventsHub";
import { fetchUpdateCodePlayer } from "@/services/playerSession";
import { useThrottleEffect } from "@/hooks/useThrottleEffect";
import { Eye } from "lucide-react";

export function PlayerCodePage() {
    const [searchParams] = useSearchParams();
    const playerId = searchParams.get("playerId");
    const sessionId = searchParams.get("sessionId");
    const { loading: checkLoad, error: checkError, checkCode } = useCheckPlayerCode();
    const { playerSession, setPlayerSession, loadPlayerSessionInfo, loading: infoLoad, error: infoError } = usePlayerSessionInfo(playerId ?? undefined, Number(sessionId));

    const { user } = useAuth();
    const taskId = playerSession?.session?.taskId;
    const { task, loading: taskLoad, error: taskError } = useTask(taskId ?? undefined);
    const navigate = useNavigate();

    const [observers, setObservers] = useState<number>(0);
    const [defaultCode, setDefaultCode] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [fullScreenPanel, setFullScreenPanel] = useState<'code' | 'task' | null>(null);

    useEffect(() => {
        const newDefaultCode = task?.preparation ?? "";
        setDefaultCode(newDefaultCode);

        // ��������� code, ������ ���� � ������������ ��� �� ���� ������ ������
        setCode(prev => prev || playerSession?.codeText || newDefaultCode);
    }, [task, playerSession]);

    useThrottleEffect(() => {
        const update = async () => {
            if (playerSession?.session?.idSession) {
                try {
                    await fetchUpdateCodePlayer(playerSession.session.idSession, code);
                } catch (err) {
                    console.error("Failed to update code:", err);
                }
            }
        };

        update();
    }, [code], 100);


    useSessionEventsHub(Number(sessionId), {
        onDelete: () => navigate("/home"),
        onLeave: (player) => {
            if (player.id === playerSession?.idPlayer)
                navigate("/home");
        },
        onUpdateCodePlayer: (code) => {
            if (user && user.id !== playerSession?.idPlayer) {
                setCode(code);
            }
        },
    });

    const handleResetCode = () => setCode(defaultCode ?? "");

    const handleSubmit = async () => {
        // Post to backend here
        console.log('Submitted code:', code);
        const data = await checkCode(code);
    };

    if (infoLoad || taskLoad) return <LoadingScreen />

    const error = infoError || taskError;
    if (error) return <ErrorMessage error={error} />;

    if (!playerSession) return <EmptyState message="Player Session not found" />;
    if (!task) return <EmptyState message="Task not found" />;

    const isEdit = user && user.id === playerSession.idPlayer;

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                {playerSession.player && (
                    <PlayerMiniCard
                        player={playerSession.player}
                        className="hover:scale-[1.02] transition"
                    >
                    </PlayerMiniCard>
                )}
                <div className="flex items-center gap-2">
                    <Eye size={26}></Eye>{observers}
                </div>
            </div>

            <div className="flex w-full h-screen overflow-hidden my-4">
                <div
                    className={` ${fullScreenPanel === 'task' ? 'hidden' : fullScreenPanel === 'code' ? 'w-full' : 'w-1/2'
                        }`}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-2 border border-green rounded-xl bg-muted">
                            <Badge className="bg-gray text-base">
                                {playerSession?.session?.langProgramming?.nameLang}
                            </Badge>
                            <div className="flex gap-2">
                                {isEdit && (
                                    <Button onClick={handleResetCode} className="btn-gray">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                                        </svg>
                                    </Button>
                                )}

                                <ToggleSizeButton
                                    fullScreen={fullScreenPanel === 'code'}
                                    onClick={() => setFullScreenPanel(fullScreenPanel === 'code' ? null : 'code')}
                                />
                            </div>
                        </div>
                        <div className="flex-grow border border-green rounded-xl">
                            <CodeViewer
                                code={code}
                                onChange={(val) => setCode(val)}
                                language={task.langProgramming?.codeNameLang || "javascript"}
                                readonly={!isEdit}
                                autoResize={false}
                            />
                        </div>
                        {isEdit && (
                            <div className="p-2 border border-green rounded-xl bg-muted">
                                <Button onClick={handleSubmit} className="btn-green btn-animation">
                                    Send
                                </Button>
                            </div>
                        )}

                    </div>
                </div>

                <div
                    className={`transition-all duration-300 ${fullScreenPanel === 'code' ? 'hidden' : fullScreenPanel === 'task' ? 'w-full' : 'w-1/2'}`}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-2 border border-green rounded-xl bg-muted">
                            <Badge className={`${getDifficultyColor(task.difficulty)} text-base`}>
                                {task.difficulty}
                            </Badge>
                            <ToggleSizeButton
                                fullScreen={fullScreenPanel === 'task'}
                                onClick={() => setFullScreenPanel(fullScreenPanel === 'task' ? null : 'task')}
                            />
                        </div>
                        <div className="break-words whitespace-pre-wrap overflow-y-auto border border-green rounded-xl p-4 bg-muted">
                            {task.textTask || "No description"}
                        </div>
                    </div>
                </div>
            </div>
            {task.taskInputData && (
                <InputDatasList inputDatas={task.taskInputData}></InputDatasList>
            )}
        </>
    );
}

export default PlayerCodePage;