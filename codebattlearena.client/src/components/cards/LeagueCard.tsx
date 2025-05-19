import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardAction,
} from "../ui/card";
import { Button } from "../ui/button";
import { PlayersList } from "../lists/PlayersList";
import { League, Player } from "@/models/dbModels";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface Props {
    league?: League;
    players?: Player[];
    className?: string;
}

export function LeagueCard({ league, players, className }: Props) {
    const [showPlayers, setShowPlayers] = useState(true);
    const togglePlayers = () => setShowPlayers((prev) => !prev);
    const name = league?.name ?? "unknown";

    return (
        <Card className={clsx("shadow-xl", className, "league-" + name.toLowerCase())}>
            <CardHeader className="flex flex-col px-6 pb-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={24} className="text-primary shrink-0" />
                        <CardTitle className="text-xl sm:text-2xl font-mono tracking-tight leading-tight">
                            {name} League
                        </CardTitle>
                    </div>

                    <CardAction>
                        <Button
                            onClick={togglePlayers}
                            size="icon"
                            variant="ghost"
                            className="rounded-full hover:bg-muted transition"
                        >
                            {showPlayers ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                    </CardAction>
                </div>

                {/* Subtitle with players count and range */}
                <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground font-sans w-full">
                    <span>Victories: {league?.minWins} - {league?.maxWins ?? "∞"}</span>
                    <span>Players: {players?.length ?? 0}</span>
                </div>
            </CardHeader>

            {/* Emblem */}
            <CardContent className="p-0 hover:scale-[1.1] transition">
                <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] relative flex justify-center items-center">
                    <img
                        src={`/images/ranks/${name.toLowerCase()}.png`}
                        alt={`${name} emblem`}
                        className="h-full object-contain pointer-events-none select-none"
                    />
                </div>
            </CardContent>

            <CardFooter className="flex-col items-start p-0">
                <div
                    className={clsx(
                        "transition-all duration-500 ease-in-out overflow-hidden w-full",
                        showPlayers
                            ? "max-h-[1000px] opacity-100 mt-4 px-6"
                            : "max-h-0 opacity-0"
                    )}
                >
                    {players && players.length !== 0 && (
                        <PlayersList
                            players={players}
                            cardWrapperClassName="w-full hover:scale-[1.02] transition"
                            isNumbered={true}
                        />
                    )}
                </div>
            </CardFooter>
        </Card>

    );
}

export default LeagueCard;
