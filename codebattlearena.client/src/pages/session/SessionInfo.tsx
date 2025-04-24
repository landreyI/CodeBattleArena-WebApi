import React from "react";
import { useParams } from "react-router-dom";

import { useSession } from "@/hooks/session/useSession";
import { useState } from "react";
import { Player, Session } from "@/models/dbModels";
import { SessionCard } from "@/components/cards/SessionCard";
import PlayersList from "@/components/lists/PlayersList";
import { fetchGetSessionPlayers } from "@/services/session";
import { useEffect } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import DropdownItem, { DropdownItemData } from "@/components/common/DropdownItem";
import EditSessionModal from "@/components/modals/EditSessionModal";
import TaskProgrammingCard from "@/components/cards/TaskProgrammingCard";

const SessionInfo: React.FC = () => {
    const dropdownItemsSettings: DropdownItemData[] = [
        { label: "Edit session", action: () => setShowEditSession(true) },
        { label: "Exclude all palyers", action: () => {/* TODO */ } }
    ];

    const { sessionId } = useParams<{ sessionId: string }>();
    const { session, setSession, isEdit, loading, error } = useSession(Number(sessionId));
    const [players, setPlayers] = useState<Player[]>([]);
    const [showEditSession, setShowEditSession] = useState(false);

    const handleUpdateSession = (updatedSession: Session) => {
        setSession(updatedSession);
    };

    const handleDeletPlayer = (playerId: string) => {
        const newPlayers = players.filter((player) => player.id !== playerId);
        setPlayers(newPlayers);
        //НУЖНО ОБНОВИТЬ
        if (session) {
            setSession({
                ...session,
                amountPeople: newPlayers.length,
            });
        }
    };

    useEffect(() => {
        if (!session?.idSession) return;

        const loadSessions = async () => {
            try {
                const data = await fetchGetSessionPlayers(session.idSession);
                setPlayers(data);
            } catch (err) {
                console.error("Failed to fetch sessions:", err);
            }
        };

        loadSessions();
    }, [session?.idSession]);

    if (loading) return <LoadingScreen/>
    if (error) return <ErrorMessage error={error} />;
    if (!session) return <EmptyState message="Session not found" />;

  return (
      <>
          <div className="glow-box bg-zinc-900 text-white p-6">
              <div className="max-w-3xl mx-auto">
                  {/* Заголовок страницы */}
                  <div className="flex items-center justify-between mb-6">
                      <h1 className="text-4xl font-bold text-green-400 font-mono">
                          Session - details
                      </h1>
                      {isEdit && (
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <button className="text-zinc-400 hover:text-green-400 transition-colors" aria-label="Settings">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                      </svg>
                                  </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col p-1">
                                  {dropdownItemsSettings.map((dropdown, index) => (
                                      <DropdownMenuItem key={index} asChild>
                                          <DropdownItem dropdownItem={dropdown} />
                                      </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                          </DropdownMenu>
                      )}
                  </div>

                  {/* Карточка сессии */}
                  <SessionCard session={session}></SessionCard>

                  <div className="mb-3"></div>

                  {session.taskProgramming && (
                      <TaskProgrammingCard task={session.taskProgramming} />
                  )}

                  {players.length !== 0 && (
                      <div
                          className="space-y-4 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 
                      shadow-sm hover:shadow-md transition-all mt-3"
                      >

                          <PlayersList
                              players={players}
                              cardWrapperClassName="hover:scale-[1.02] transition"
                              onDelete={handleDeletPlayer}
                          />

                      </div>
                  )}
              </div>
          </div>
          {showEditSession && session && (
              <EditSessionModal open={showEditSession} session={session} onClose={() => setShowEditSession(false)} onUpdate={handleUpdateSession} />
          )}
      </>
  );
}

export default SessionInfo;