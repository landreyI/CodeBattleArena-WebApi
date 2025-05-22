import { TaskInputData } from "@/models/dbModels";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

interface Props {
    inputDatas: TaskInputData[];
    cardWrapperClassName?: string;
}

export function InputDatasList({ inputDatas, cardWrapperClassName = "" }: Props) {
    const displayed = inputDatas.slice(0, 5);
    const [activeTab, setActiveTab] = useState("0");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 flex w-full">
                {displayed.map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                        Case {index + 1}
                    </TabsTrigger>
                ))}
            </TabsList>

            {displayed.map((item, index) => (
                <TabsContent key={index} value={index.toString()}>
                    <div className={`space-y-4 ${cardWrapperClassName}`}>
                        <div>
                            <label className="text-muted-foreground text-sm">Input =</label>
                            <pre className="bg-muted rounded-md p-4 mt-1 whitespace-pre-wrap break-words font-mono">
                                {item.inputData?.data || "—"}
                            </pre>
                        </div>
                        <div>
                            <label className="text-muted-foreground text-sm">Expected Output =</label>
                            <pre className="bg-muted rounded-md p-4 mt-1 whitespace-pre-wrap break-words text-primary font-mono">
                                {item.answer || "—"}
                            </pre>
                        </div>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default InputDatasList;
