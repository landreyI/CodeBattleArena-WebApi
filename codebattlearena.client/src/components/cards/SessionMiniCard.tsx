import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/models/dbModels";
import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { getStateColor } from "@/untils/helpers";
interface Props {
    session: Session;
}

export function SessionMiniCard({ session }: Props) {
    return (
        <Card className="bg-zinc-700 border-zinc-600 mt-4">
            <CardContent className="">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Левая часть: инфо о сессии */}
                    <div className="space-y-1 text-sm">
                        <div>
                            <span className="text-zinc-300 font-mono">Name:</span>{" "}
                            <span className="text-white">{session.name || "Unnamed"}</span>
                        </div>
                        <div>
                            <span className="text-zinc-300 font-mono">Lang:</span>{" "}
                            <span className="text-white">{session.langProgramming?.nameLang}</span>
                        </div>
                    </div>

                    {/* Правая часть: количество людей */}
                    <div className="text-sm self-end md:self-center md:ml-auto space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge className={getStateColor(session.state)}>{session.state}</Badge>
                        </div>
                        {session.taskProgramming && (
                            <div>
                                <span className="text-zinc-300 font-mono">Task:</span>{" "}
                                <span className="text-white">{session.taskProgramming.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SessionMiniCard;