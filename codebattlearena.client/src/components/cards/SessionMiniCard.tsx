import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/models/dbModels";
import { Badge } from "../ui/badge";
import { getIsStartGameColor, getStateColor } from "@/untils/helpers";
import { Link } from "react-router-dom";
import { Users, Book, Code, Flag, Gamepad2 } from "lucide-react";
import { useItem } from "@/contexts/ItemContext";
import ItemRenderer from "../items/ItemRenderer";

interface Props {
    session: Session;
    className?: string;
}

export function SessionMiniCard({ session, className }: Props) {
    const item = useItem();

    return (
        <ItemRenderer item={item ?? undefined} isAutoSize={false} className="p-1">
            <Link
                to={`/session/info-session/${session?.idSession}`}
                title="View session"
            >
                <Card className={`transition-shadow hover:shadow-md ${className}`}>
                    <CardContent>
                        <div className="flex flex-wrap justify-between gap-4">
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Book size={14} className="text-muted-foreground" />
                                    <span className="font-semibold">Name:</span>
                                    <span>{session.name || "Unnamed"}</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Code size={14} className="text-muted-foreground" />
                                    <span className="font-semibold">Lang:</span>
                                    <span>{session.langProgramming?.nameLang}</span>
                                </div>
                                {session.taskProgramming && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Flag size={14} className="text-muted-foreground" />
                                        <span className="font-semibold">Task:</span>
                                        <span>{session.taskProgramming.name}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-start gap-2 md:items-end text-sm">
                                <div className="flex flex-wrap gap-2">
                                    <Badge className={getStateColor(session.state)}>
                                        {session.state}
                                    </Badge>
                                    <Badge variant="outline">
                                        <Users size={14} />
                                        <span>{session.amountPeople ?? 0}/{session.maxPeople}</span>
                                    </Badge>
                                    <Badge className={getIsStartGameColor(session.isStart)}>
                                        <Gamepad2 size={14} className="mr-1" />
                                        {session.isFinish
                                            ? "Game Over"
                                            : session.isStart
                                                ? "Game on"
                                                : "Waiting"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </ItemRenderer>
    );
}

export default SessionMiniCard;
