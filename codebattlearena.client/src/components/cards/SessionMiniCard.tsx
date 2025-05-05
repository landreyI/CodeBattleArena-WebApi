import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/models/dbModels";
import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { getStateColor } from "@/untils/helpers";
interface Props {
    session: Session;
    className?: string; 
}

export function SessionMiniCard({ session, className }: Props) {
    return (
        <Card className={`mt-4 ${className}`}>
            <CardContent className="">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Левая часть: инфо о сессии */}
                    <div className="space-y-1 text-sm">
                        <div>
                            <span className="font-mono">Name:</span>{" "}
                            <span>{session.name || "Unnamed"}</span>
                        </div>
                        <div>
                            <span className="font-mono">Lang:</span>{" "}
                            <span>{session.langProgramming?.nameLang}</span>
                        </div>
                    </div>

                    {/* Правая часть: количество людей */}
                    <div className="text-sm self-end md:self-center md:ml-auto space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge className={getStateColor(session.state)}>{session.state}</Badge>
                            <div className="text-sm flex items-center gap-1">
                                <Users size={16} />
                                <span>
                                    {session.amountPeople ?? 0}/{session.maxPeople}
                                </span>
                            </div>
                        </div>
                        {session.taskProgramming && (
                            <div>
                                <span className="font-mono">Task:</span>{" "}
                                <span>{session.taskProgramming.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SessionMiniCard;