import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { usePlayer } from "@/hooks/usePlayer";
import { useState } from "react";
import { Player, Session } from "@/models/dbModels";
import PlayerCard from "@/components/cards/PlayerCard";
import EditPlayerModal from "@/components/modals/EditPlayerModal";
import SessionList from "@/components/lists/SessionsList";
import { Separator } from "../components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchGetPlayerSessions } from "@/services/player";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";
import DropdownItem, { DropdownItemData } from "@/components/common/DropdownItem";
import { isEditRole } from "@/untils/businessRules";

const menuItemClass = "text-white hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors";

const PlayerPage: React.FC = () => {

    const dropdownItemsSettings: DropdownItemData[] = [
        { label: "Edit profile", action: () => setShowEditPlayer(true) },
        { label: "Private", action: () => {/* TODO */ } }
    ];

    const { playerId } = useParams<{ playerId: string }>();
    const { player, setPlayer, isAuth, loading, error } = usePlayer(playerId);
    const [showEditPlayer, setShowEditPlayer] = useState(false);

    const [sessions, setSessions] = useState<Session[]>([]);
    const [showSessions, setShowSessions] = useState(true);

    const handleUpdatePlayer = (updatedPlayer: Player) => {
        setPlayer(updatedPlayer);
    };

    useEffect(() => {
        if (!player?.id || (!isAuth && !isEditRole(player?.role))) return;

        const loadSessions = async () => {
            try {
                const data = await fetchGetPlayerSessions(player.id);
                setSessions(data);
            } catch (err) {
                console.error("Failed to fetch sessions:", err);
            }
        };

        loadSessions();
    }, [player?.id, isAuth, player?.role]);

    if (loading) return <LoadingScreen />
    if (error) return <ErrorMessage error={error} />;
    if (!player) return <EmptyState message="Player not found" />;

    return (
        <>
            <div className="glow-box bg-zinc-900 text-white p-6">
                <div className="max-w-3xl mx-auto">
                    {/* Заголовок страницы */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-green-400 font-mono">
                            Player Profile
                        </h1>
                        {isAuth && (
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

                    {/* Карточка профиля */}
                    <PlayerCard player={player} isAuth={isAuth}></PlayerCard>

                    {(isAuth || isEditRole(player?.role)) &&(
                        <div
                            className="space-y-4 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 
                                       shadow-sm hover:shadow-md transition-all mt-3"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-mono text-green-400">Sessions</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowSessions((prev) => !prev)}
                                >
                                    {showSessions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </Button>
                            </div>

                            <Separator className="my-2 bg-zinc-700" />

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
            {showEditPlayer && player &&(
                <EditPlayerModal open={showEditPlayer} player={player} onClose={() => setShowEditPlayer(false)} onUpdate={handleUpdatePlayer} />
            )}
        </>
    );
};

export default PlayerPage;