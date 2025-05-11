import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/models/dbModels";
import { Badge } from "../ui/badge";
import { getIsStartGameColor, getStateColor } from "@/untils/helpers";
import { Link } from "react-router-dom";
import { Users, Book, Code, Flag, Gamepad2 } from "lucide-react";

interface Props {
    session: Session;
    className?: string;
}

export function SessionMiniCard({ session, className }: Props) {
    return (
        <Link
            to={`/session/info-session/${session?.idSession}`}
            title="View session"
        >
            <Card className={`mt-4 transition-shadow hover:shadow-md ${className}`}>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Левая часть: инфо о сессии */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Book size={14} className="text-muted-foreground" />
                                <span className="font-semibold">Name:</span>
                                <span>{session.name || "Unnamed"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Code size={14} className="text-muted-foreground" />
                                <span className="font-semibold">Lang:</span>
                                <span>{session.langProgramming?.nameLang}</span>
                            </div>
                            {session.taskProgramming && (
                                <div className="flex items-center gap-2">
                                    <Flag size={14} className="text-muted-foreground" />
                                    <span className="font-semibold">Task:</span>
                                    <span>{session.taskProgramming.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Правая часть: статус и игроки */}
                        <div className="flex flex-col items-start gap-2 md:items-end text-sm">
                            <div className="flex items-center gap-2">
                                <Badge className={getStateColor(session.state)}>
                                    {session.state}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                                    <Users size={14} />
                                    <span>{session.amountPeople ?? 0}/{session.maxPeople}</span>
                                </Badge>
                            </div>
                            <Badge className={getIsStartGameColor(session.isStart)}>
                                <Gamepad2 size={14} className="mr-1" />
                                {session.isStart ? "The game has started" : "The game hasn't started"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default SessionMiniCard;
