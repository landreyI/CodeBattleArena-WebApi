import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskProgramming } from "@/models/dbModels";
import { getDifficultyColor } from "@/untils/helpers";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    task: TaskProgramming;
    onDelete?: (taskId: number) => void;
    className?: string;
}

export function TaskProgrammingMiniCard({ task, onDelete, className }: Props) {
    return (
        <Card className={`border rounded-2xl ${className}`}>
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

                {onDelete && task.idTaskProgramming != null && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-10 ml-auto transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDelete?.(task.idTaskProgramming!);
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskProgrammingMiniCard;