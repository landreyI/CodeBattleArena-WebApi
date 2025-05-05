import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Player, Role } from "@/models/dbModels";
import { SeparatorVertical, Trash2, Trophy } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    player: Player;
    onDelete?: (playerId: string) => void;
    className?: string;
}

export function PlayerMiniCard({ player, onDelete, className }: Props) {
    return (
        <div className={`flex flex-wrap items-center gap-4 bg-card border mt-2 rounded-2xl p-2 ${className}`}>
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src={player.photoUrl || undefined} />
                <AvatarFallback className="text-green-400">
                    {player.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center h-full min-w-[120px]">
                <p className="font-semibold text-sm sm:text-base break-words">{player.username}</p>
            </div>

            <SeparatorVertical></SeparatorVertical>
            <div className="flex ml-auto items-center gap-2">
                <Trophy size={16} />
                <p className="text-sm font-mono">Victories:</p>
                <p className="text-lg text-green-400 font-bold">{player.victories}</p>
            </div>

            {onDelete && (
                <>
                    <SeparatorVertical></SeparatorVertical>
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
        </div>
    );
}


export default PlayerMiniCard;