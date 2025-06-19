import React from "react";
import { Link, useParams } from "react-router-dom";

import { usePlayer } from "@/hooks/player/usePlayer";
import { useState } from "react";
import { Player, TypeItem } from "@/models/dbModels";
import PlayerCard from "@/components/cards/PlayerCard";
import EditPlayerModal from "@/components/modals/EditPlayerModal";
import SessionList from "@/components/lists/SessionsList";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Trophy } from "lucide-react";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorMessage from "@/components/common/ErrorMessage";
import EmptyState from "@/components/common/EmptyState";
import { usePlayerSessions } from "@/hooks/playerSession/usePlayerSessions";
import SettingMenu from "@/components/menu/SettingMenu";
import { Badge } from "@/components/ui/badge";
import BackgroundItem from "@/components/items/BackgroundItem";
import { ItemProvider } from "@/contexts/ItemContext";
import ItemRenderer from "@/components/items/ItemRenderer";
import { usePlayerItems } from "@/hooks/item/usePlayerItems";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function PlayerPage() {
    const { playerId } = useParams<{ playerId: string }>();
    const { player, setPlayer, isEdit, loading: playerLoad, error: playerError } = usePlayer(playerId);
    const { sessions, setSessions, loading, error } = usePlayerSessions(playerId, isEdit);
    const { playerItems: bages } = usePlayerItems(playerId, TypeItem.Badge);

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
            <BackgroundItem item={player.activeBackground ?? undefined} className="w-full min-h-[95vh] rounded-xl p-3">
                <div className="w-full md:w-[65vw] mx-auto p-3 rounded-xl space-y-3">
                    {/* Верхний блок: карточка + меню + статистика */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_15vw] gap-3">
                        <div className="relative">
                            {isEdit && (
                                <div className="absolute top-0 right-0 z-10 bg-muted-card p-1 rounded-xl">
                                    <SettingMenu setShowEdit={setShowEditPlayer} />
                                </div>
                            )}
                            <PlayerCard className="shadow-none border-none bg-transparent p-0" player={player} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-center bg-primary rounded-xl p-3 justify-between">
                                <Badge className="text-sm font-semibold bg-primary-pressed rounded-xl text-white">
                                    LEVEL 30
                                </Badge>

                                <Badge className="flex items-center gap-2 bg-primary-pressed rounded-xl text-white mt-2">
                                    <Trophy size={16} />
                                    <p className="text-sm font-mono font-semibold">VICTORIES</p>
                                    <p className="text-sm font-bold">{player.victories}</p>
                                </Badge>
                            </div>

                            <div className="flex flex-row items-center bg-muted-card w-full rounded-2xl p-3 gap-3">
                                Badge
                                <ItemRenderer item={player.activeBadge ?? undefined} />
                            </div>
                        </div>
                    </div>


                    {/* Нижний блок: sessions + info */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_15vw] gap-3">
                        <div className="border-card border-5 rounded-2xl shadow-sm w-full">
                            <div className="flex items-center justify-between bg-card px-3 py-1 rounded-t-lg">
                                <h2 className="text-xl text-primary">Sessions</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowSessions((prev) => !prev)}
                                >
                                    {showSessions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </Button>
                            </div>

                            <ItemProvider item={player.activeBorder ?? null}>
                                <div className="max-h-[70vh] overflow-y-auto">
                                    <div className="p-3">
                                        {showSessions && (
                                            <SessionList
                                                sessions={sessions}
                                                cardWrapperClassName="hover:bg-border hover:scale-[1.02] transition border-2"
                                            />
                                        )}
                                    </div>
                                </div>
                            </ItemProvider>
                        </div>

                        <div className="bg-muted-card w-full flex flex-col rounded-2xl p-3 gap-3">
                            <Carousel className="w-full max-w-full">
                                <CarouselContent className="-ml-2">
                                    {bages.map((bage, index) => (
                                        <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3">
                                            <ItemRenderer item={bage} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-7 rounded-xl size-7" />
                                <CarouselNext className="-right-7 rounded-xl size-7" />
                            </Carousel>
                            <p>Games {player.countGames ?? 0}</p>
                            <Link to={`/item/player-items/${playerId}`} className="nav-link">
                                Inventory
                            </Link>
                            <Link to={`/item/list-items`} className="nav-link">
                                Shop Items
                            </Link>
                            <p>Friends</p>
                            <p>Chats</p>
                        </div>
                    </div>
                </div>
            </BackgroundItem>

            {player && (
                <EditPlayerModal open={showEditPlayer} player={player} onClose={() => setShowEditPlayer(false)} onUpdate={handleUpdatePlayer} />
            )}
        </>
    );
};

export default PlayerPage;