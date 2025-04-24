import { Player } from "@/models/dbModels";
import { Link } from "react-router-dom";
import PlayerMiniCard from "../cards/PlayerMiniCard";

interface Props {
    players: Player[],
    onDelete?: (playerId: string) => void;
    cardWrapperClassName?: string;
}
export function PlayersList({ players, onDelete, cardWrapperClassName }: Props) {

    return (
        <div className="grid gap-4">
            {players.map((player) => (
                <Link to={`/player/info-player/${player.id}`} title="View player" key={player.id}>
                    <div className={cardWrapperClassName}>
                        <PlayerMiniCard player={player} onDelete={onDelete}></PlayerMiniCard>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PlayersList;