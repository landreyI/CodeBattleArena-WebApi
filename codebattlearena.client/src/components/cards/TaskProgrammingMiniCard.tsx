import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskProgramming } from "@/models/dbModels";
import { getDifficultyColor } from "@/untils/helpers";
import { Link } from "react-router-dom";

interface Props {
    task: TaskProgramming;
    className?: string;
    children?: React.ReactNode;
}

export function TaskProgrammingMiniCard({ task, className, children }: Props) {
    return (
        <Link to={`/task/info-task/${task.idTaskProgramming}`} title="View Task" >
            <Card className={`border ${className}`}>
                <CardContent className="px-6 flex items-center gap-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="font-mono">Name:</span>{" "}
                                <span>{task.name || "Unnamed"}</span>
                            </div>
                            <div>
                                <span className="font-mono">Lang:</span>{" "}
                                <span>{task.langProgramming?.nameLang}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm self-end md:self-center md:ml-auto space-y-1">
                        <div className="flex items-center gap-2 ml-6">
                            <Badge className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty}
                            </Badge>
                        </div>
                    </div>

                    {children}
                </CardContent>
            </Card>
        </Link>
    );
};

export default TaskProgrammingMiniCard;