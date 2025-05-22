import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/models/dbModels";
import { BookOpenText, Calendar, Mail, Trophy } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { getRoleColor } from "@/untils/helpers";
interface Props {
    player: Player;
    className?: string;
}
export function PlayerCard({ player, className }: Props) {
    const [showFullBio, setShowFullBio] = useState<boolean>();

    return (
        <Card className={`shadow-lg flex flex-col md:flex-row p-0 rounded-xl ${className}`}>
            <div className="flex flex-col items-center bg-primary rounded-xl p-5 justify-between">
                <div className="font-semibold">
                    LEVEL
                </div>

                <Avatar className="w-30 h-30 my-4">
                    <AvatarImage src={player.photoUrl || undefined} alt={player.username} className="hover:scale-[1.3] transition" />
                    <AvatarFallback className="text-primary text-2xl">
                        {player.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <p className="text-sm font-mono font-semibold">VICTORIES</p>
                    <p className="text-lg font-bold">{player.victories}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-between items-center w-full p-5">
                <div>
                    <CardTitle className="text-2xl font-mono text-primary flex justify-center">
                        {player.username}
                    </CardTitle>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {player.roles?.map((role, index) => (
                            <Badge key={index} className={getRoleColor(role)}>
                                {role}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {player.additionalInformation && (
                        <div className="">
                            <div className="flex items-center gap-2 mb-1">
                                <BookOpenText size={16} />
                                <p className="text-sm font-mono">Bio:</p>
                            </div>
                            <p
                                onClick={() => setShowFullBio(prev => !prev)}
                                className={clsx(
                                    "text-m cursor-pointer transition-all duration-300 break-words whitespace-pre-wrap overflow-hidden",
                                    showFullBio
                                        ? "line-clamp-none max-h-[1000px]"
                                        : "line-clamp-2 max-h-[3.6em]"
                                )}
                                title="Click to expand"
                            >
                                {player.additionalInformation}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-2 md:justify-end text-sm">
                        <Calendar size={16} />
                        <p className="font-mono">Joined:</p>
                        <p>
                            {new Date(player.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default PlayerCard;