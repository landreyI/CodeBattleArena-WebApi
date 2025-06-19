import { Player } from "@/models/dbModels";
import { Terminal, Trash2, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useItem } from "@/contexts/ItemContext";
import ItemRenderer from "../items/ItemRenderer";
import { AvatarPlayer } from "../avatars/AvatarPlayer";

interface Props {
    player: Player;
    number?: number;
    onDelete?: (playerId: string) => void;
    onPlayerSessionInfo?: (playerId: string) => void;
    className?: string;
}

export function PlayerMiniCard({ player, number, onDelete, className, onPlayerSessionInfo }: Props) {
    const item = useItem();

    return (
        <ItemRenderer item={player.activeBorder ?? undefined} isAutoSize={false} className="p-1">
            <Link to={`/player/info-player/${player.id}`} title="View player" className="w-full">
                <div className={`flex flex-wrap items-center gap-4 bg-card border rounded-xl p-2 ${className}`}>
                    {number}

                    <ItemRenderer
                        item={player.activeAvatar ?? undefined}
                        isAutoSize={false}
                    >
                        <AvatarPlayer
                            photoUrl={player.photoUrl ?? undefined}
                            username={player.username}
                            className="w-10 h-10"
                            classNameImage="hover:scale-[1.3] transition"
                        />
                    </ItemRenderer>

                    <div className="flex flex-col justify-center h-full">
                        <p className="font-semibold text-sm sm:text-base break-words">{player.username}</p>
                    </div>

                    <div className="flex flex-col justify-center">
                        <ItemRenderer
                            item={player.activeTitle ?? undefined}
                            isAutoSize={false}
                            className="text-sm font-semibold p-1 rounded-xl"
                        />
                    </div>

                    <div className="flex ml-auto items-center gap-2">
                        <Trophy size={16} />:
                        <p className="text-lg text-primary font-bold">{player.victories}</p>
                    </div>

                    {onDelete && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-10 ml-auto transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onDelete(player.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </>
                    )}
                    {onPlayerSessionInfo && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-10 ml-auto transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onPlayerSessionInfo(player.id);
                                }}
                            >
                                <Terminal className="w-4 h-4" />
                            </Button>
                        </>
                    )}
                </div>
            </Link>
        </ItemRenderer>
    );
}


export default PlayerMiniCard;