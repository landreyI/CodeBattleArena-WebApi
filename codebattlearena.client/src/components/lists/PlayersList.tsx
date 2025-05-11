import { Player } from "@/models/dbModels";
import { Link } from "react-router-dom";
import PlayerMiniCard from "../cards/PlayerMiniCard";

interface Props {
    players: Player[],
    onDelete?: (playerId: string) => void;
    onPlayerSessionInfo?: (playerId: string) => void;
    cardWrapperClassName?: string;
}
export function PlayersList({ players, onDelete, cardWrapperClassName, onPlayerSessionInfo }: Props) {

    return (
        <div className="grid gap-2">
            {players.map((player) => (
                <PlayerMiniCard
                    key={player.id}
                    player={player}
                    onDelete={onDelete}
                    onPlayerSessionInfo={onPlayerSessionInfo}
                    className={cardWrapperClassName}
                >
                </PlayerMiniCard>
            ))}
        </div>
    );
}

export default PlayersList;