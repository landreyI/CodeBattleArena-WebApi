import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import { LeagueCard } from "@/components/cards/LeagueCard";
import { usePlayersLeagues } from "@/hooks/league/usePlayersLeagues";

export function LeaguesPage() {
    const { playersLeagues, setPlayersLeagues, loadPlayersLeagues, loading: playersLeaguesLoad, error: playersLeaguesError } = usePlayersLeagues();

    if (playersLeaguesLoad) return <LoadingScreen />
    if (playersLeaguesError) return <ErrorMessage error={playersLeaguesError} />;
    if (!playersLeagues) return <EmptyState message="Leagues not found" />;

    return (
        <div className="w-full lg:w-[60%] mx-auto">
            {playersLeagues.map((playersLeague, index) => (
                <LeagueCard
                    key={index}
                    league={playersLeague.league}
                    players={playersLeague.players}
                    className="mb-5"
                />
            ))}
        </div>
    );
}

export default LeaguesPage;