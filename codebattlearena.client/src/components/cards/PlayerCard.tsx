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
    isEdit?: boolean;
    className?: string;
}
export function PlayerCard({ player, isEdit, className }: Props) {
    const [showFullBio, setShowFullBio] = useState<boolean>();

    return (
        <Card className={`shadow-lg ${className}`}>
            <CardHeader className="flex flex-col items-center">
                <Avatar className="w-30 h-30 mb-4">
                    <AvatarImage src={player.photoUrl || undefined} alt={player.username} className="hover:scale-[1.3] transition" />
                    <AvatarFallback className="text-green-400 text-2xl">
                        {player.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-mono text-green-400">
                    {player.username}
                </CardTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {player.roles?.map((role, index) => (
                        <Badge key={index} className={getRoleColor(role)}>
                            {role}
                        </Badge>
                    ))}
                </div>

            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(isEdit && player.email) && (
                        <div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <p className="text-sm font-mono">Email:</p>
                            </div>
                            <div>
                                <p className="text-lg">{player.email}</p>
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <Trophy size={16} />
                            <p className="text-sm font-mono">Victories:</p>
                        </div>
                        <p className="text-lg text-green-400 font-bold">{player.victories}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <p className="text-sm font-mono">Joined:</p>
                        </div>
                        <p className="text-lg">
                            {new Date(player.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {player.additionalInformation && (
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <BookOpenText size={16} />
                            <p className="text-sm font-mono">Bio:</p>
                        </div>
                        <p
                            onClick={() => setShowFullBio(prev => !prev)}
                            className={clsx(
                                "text-lg cursor-pointer transition-all duration-300",
                                showFullBio ? "line-clamp-none max-h-[1000px]" : "line-clamp-2 max-h-[3.6em] overflow-hidden"
                            )}
                            title="Click to expand"
                        >
                            {player.additionalInformation}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default PlayerCard;