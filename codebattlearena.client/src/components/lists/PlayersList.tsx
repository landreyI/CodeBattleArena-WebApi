import { Player } from "@/models/dbModels";
import PlayerMiniCard from "../cards/PlayerMiniCard";

interface Props {
    players: Player[],
    onDelete?: (playerId: string) => void;
    onPlayerSessionInfo?: (playerId: string) => void;
    cardWrapperClassName?: string;
    isTop?: boolean;
}

export function PlayersList({ players, onDelete, cardWrapperClassName, onPlayerSessionInfo, isTop = false }: Props) {
    const sortedPlayers = isTop
        ? [...players].sort((a, b) => (b.victories ?? 0) - (a.victories ?? 0))
        : players;

    const getBorderClass = (index: number) => {
        if (!isTop) return "";
        switch (index) {
            case 0: return "border-4 border-yellow-300";
            case 1: return "border-4 border-zinc-300";
            case 2: return "border-4 border-amber-600";
            default: return "";
        }
    };

    return (
        <div className="grid gap-2">
            {sortedPlayers.map((player, index) => (
                <PlayerMiniCard
                    key={player.id}
                    player={player}
                    number={isTop ? index+1 : undefined}
                    onDelete={onDelete}
                    onPlayerSessionInfo={onPlayerSessionInfo}
                    className={`${cardWrapperClassName ?? ""} ${getBorderClass(index)} rounded-xl`}
                />
            ))}
        </div>
    );
}
