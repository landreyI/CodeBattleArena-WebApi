import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Difficulty, TaskProgramming } from "@/models/dbModels"; // Предполагаю, что интерфейс определён здесь
import { Code2, BarChart, FileText, Terminal } from "lucide-react";
import { getDifficultyColor } from "@/untils/helpers";

interface Props {
    task: TaskProgramming;
}

export const TaskProgrammingCard: React.FC<Props> = ({ task }) => {
    return (
        <Card className="bg-zinc-800 border-zinc-700 rounded-2xl">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <div className="text-xl font-bold text-white font-mono">
                        {task.name || "Unnamed Task"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                        </Badge>
                    </div>
                </div>

                <hr className="border-zinc-700 mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col gap-2 text-zinc-400">
                        <div className="flex items-center gap-2">
                            <Code2 size={16} />
                            <span className="font-mono">Language:</span>
                            <span className="text-white">
                                {task.langProgramming?.nameLang || "Unknown"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} />
                            <span className="font-mono">Description:</span>
                            <span className="text-white line-clamp-1">
                                {task.textTask || "No description"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 text-zinc-400">
                        <div className="flex items-center gap-2">
                            <BarChart size={16} />
                            <span className="font-mono">Difficulty:</span>
                            <span className="text-white">{task.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Terminal size={16} />
                            <span className="font-mono">Preparation:</span>
                            <span className="text-white line-clamp-1">
                                {task.preparation || "No preparation"}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskProgrammingCard;