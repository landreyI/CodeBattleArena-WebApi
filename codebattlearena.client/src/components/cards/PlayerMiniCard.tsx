import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Player, Role } from "@/models/dbModels";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    player: Player;
    onDelete?: (playerId: string) => void;
}

export function PlayerMiniCard({ player, onDelete }: Props) {
    return (
        <div className="flex items-center gap-4 bg-zinc-700 border-zinc-600 mt-4 rounded-2xl p-2">
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
                    className="text-zinc-300 hover:text-white hover:bg-zinc-600 rounded-10 ml-auto transition-colors"
                    onClick={(e) => {
                        e.stopPropagation(); // Блокируем всплытие события
                        e.preventDefault(); // Блокируем стандартное поведение
                        onDelete(player.id);
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}

export default PlayerMiniCard;