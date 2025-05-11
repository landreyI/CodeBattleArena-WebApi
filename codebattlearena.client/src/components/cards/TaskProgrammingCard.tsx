import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskProgramming } from "@/models/dbModels";
import { Code2, FileText, Terminal } from "lucide-react";
import { getDifficultyColor } from "@/untils/helpers";
import InputDatasList from "../lists/InputDatasList";
import CodeViewer from "../common/CodeViewer";

interface Props {
    task: TaskProgramming;
    isEditRole?: boolean;
}

export function TaskProgrammingCard({ task, isEditRole }: Props) {
    return (
        <Card className="border rounded-2xl w-full">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <div className="text-xl font-bold font-mono break-words">
                        {task.name || "Unnamed Task"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                        </Badge>
                    </div>
                </div>

                <hr className="mb-4" />

                <div className="flex flex-col gap-4 text-sm w-full">
                    <div className="flex items-start gap-3 w-full">
                        <Code2 size={16} className="mt-1 shrink-0" />
                        <div className="flex items-center gap-2">
                            <div className="font-mono text-muted-foreground">Language:</div>
                            <div className="break-words">{task.langProgramming?.nameLang || "Unknown"}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 w-full">
                        <FileText size={16} className="mt-1 shrink-0" />
                        <div className="flex flex-col w-full">
                            <div className="font-mono text-muted-foreground">Description:</div>
                            <div className="break-words whitespace-pre-wrap">
                                {task.textTask || "No description"}
                            </div>
                        </div>
                    </div>
                    {isEditRole && (
                        <>
                            <div className="flex items-start gap-3 w-full">
                                <Terminal size={16} className="mt-1 shrink-0" />
                                <div className="flex flex-col w-full">
                                    <div className="font-mono text-muted-foreground">Preparation:</div>
                                    <CodeViewer code={task.preparation} autoResize={true} language={task.langProgramming?.codeNameLang || "javascript"} />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 w-full">
                                <Terminal size={16} className="mt-1 shrink-0" />
                                <div className="flex flex-col w-full">
                                    <div className="font-mono text-muted-foreground">Verification Code:</div>
                                    <CodeViewer code={task.verificationCode} autoResize={true} language={task.langProgramming?.codeNameLang || "javascript"} />
                                </div>
                            </div>
                        </>
                    )}


                    { /* —ƒ≈À¿“‹ ¬’ŒƒÕ€≈ ƒ¿ÕÕ€≈ */}
                    {task.taskInputData && (
                        <InputDatasList inputDatas={task.taskInputData}></InputDatasList>
                    )}

                </div>

            </CardContent>
        </Card>
    );
}

export default TaskProgrammingCard;
