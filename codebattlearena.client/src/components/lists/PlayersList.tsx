import { Player } from "@/models/dbModels";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    players: Player[],
    onDelete?: (playerId: string) => void;
    cardWrapperClassName?: string;
}
export function PlayersList({ players, onDelete, cardWrapperClassName }: Props) {

    return (
        <div className="grid gap-4">
            {players.map((player) => (
                <Link to={`/player/info-player/${player.id}`} title="View player">
                    <div
                        key={player.id}
                        className={cardWrapperClassName}
                    >
                        <div className="flex items-center gap-4 bg-zinc-700 border-zinc-600 mt-4 rounded-2xl p-1">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={player.photoUrl || undefined} />
                                <AvatarFallback className="bg-zinc-700 text-green-400">
                                    {player.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-center h-full">
                                <p className="text-white font-semibold text-base">{player.username}</p>
                                <Badge className="bg-zinc-700 text-white text-xs">
                                    {player.role}
                                </Badge>
                            </div>

                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-red-500 btn-animation ml-auto"
                                    onClick={() => onDelete?.(player.id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PlayersList;