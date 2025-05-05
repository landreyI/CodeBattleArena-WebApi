import { usePlayersList } from "@/hooks/player/usePlayersList";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import PlayersList from "@/components/lists/PlayersList";

export function PlayersListPage() {
    const { players, setPlayers, loadPlayers, loading: playersLoad, error: playersError } = usePlayersList();

    if (playersLoad) return <LoadingScreen />
    if (playersError) return <ErrorMessage error={playersError} />;
    if (!players) return <EmptyState message="Tasks not found" />;

    return (
        <div className="w-full lg:w-[60%] mx-auto">
            <PlayersList
                players={players}
                cardWrapperClassName="w-full hover:scale-[1.02] transition"
            />
        </div>
    );
}

export default PlayersListPage;