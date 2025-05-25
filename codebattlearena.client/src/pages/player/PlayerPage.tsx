import React from "react";
import { useParams } from "react-router-dom";

import { usePlayer } from "@/hooks/player/usePlayer";
import { useState } from "react";
import { Player } from "@/models/dbModels";
import PlayerCard from "@/components/cards/PlayerCard";
import EditPlayerModal from "@/components/modals/EditPlayerModal";
import SessionList from "@/components/lists/SessionsList";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";
import DropdownItem, { DropdownItemData } from "@/components/common/DropdownItem";
import { usePlayerSessions } from "@/hooks/playerSession/usePlayerSessions";
import SettingPlayerMenu from "@/components/menu/SettingPlayerMenu";

export function PlayerPage() {

    const dropdownItemsSettings: DropdownItemData[] = [
        { label: "Edit profile", action: () => setShowEditPlayer(true) },
        { label: "Private", action: () => {/* TODO */ } }
    ];

    const { playerId } = useParams<{ playerId: string }>();
    const { player, setPlayer, isEdit, loading: playerLoad, error: playerError } = usePlayer(playerId);
    const { sessions, setSessions, loading, error } = usePlayerSessions(playerId, isEdit);

    const [showEditPlayer, setShowEditPlayer] = useState(false);

    const [showSessions, setShowSessions] = useState(true);

    const handleUpdatePlayer = (updatedPlayer: Player) => {
        setPlayer(updatedPlayer);
    };

    if (playerLoad) return <LoadingScreen />
    if (playerError) return <ErrorMessage error={playerError} />;
    if (!player) return <EmptyState message="Player not found" />;

    return (
        <>
            <div className="glow-box">
                <div className="md:w-[40vw] sm:w-[100vw] mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-primary font-mono">
                            Player Profile
                        </h1>
                        {isEdit && (
                            <SettingPlayerMenu setShowEditPlayer={setShowEditPlayer} />
                        )}
                    </div>

                    <PlayerCard player={player}></PlayerCard>

                    {(isEdit) && (
                        <div className="space-y-4 rounded-2xl px-4 py-3 border shadow-sm mt-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-mono text-primary">Sessions</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowSessions((prev) => !prev)}
                                >
                                    {showSessions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </Button>
                            </div>

                            <Separator className="my-2" />

                            {showSessions && (
                                <SessionList
                                    sessions={sessions}
                                    cardWrapperClassName="hover:scale-[1.02] transition"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {player && (
                <EditPlayerModal open={showEditPlayer} player={player} onClose={() => setShowEditPlayer(false)} onUpdate={handleUpdatePlayer} />
            )}
        </>
    );
};

export default PlayerPage;