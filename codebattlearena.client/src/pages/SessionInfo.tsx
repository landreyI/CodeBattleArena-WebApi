import React from "react";
import { useParams } from "react-router-dom";

import { useSession } from "@/hooks/useSession";
import { useState } from "react";
import { Player, Session } from "@/models/dbModels";
import { SessionCard } from "@/components/cards/SessionCard";
import PlayersList from "@/components/lists/PlayersList";
import { fetchGetSessionPlayers } from "@/services/session";
import { useEffect } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";

const SessionInfo: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const { session, setSession, loading, error } = useSession(Number(sessionId));
    const [players, setPlayers] = useState<Player[]>([]);

    const handleUpdateSession = (updatedSession: Session) => {
        setSession(updatedSession);
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
                  </div>

                  {/* Карточка профиля */}
                  <SessionCard session={session}></SessionCard>

                  {players.length !== 0 && (
                      <div
                          className="space-y-4 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 
                      shadow-sm hover:shadow-md transition-all mt-3"
                      >

                          <PlayersList
                              players={players}
                              cardWrapperClassName="hover:scale-[1.02] transition"
                          />

                      </div>
                  )}
              </div>
          </div>
      </>
  );
}

export default SessionInfo;