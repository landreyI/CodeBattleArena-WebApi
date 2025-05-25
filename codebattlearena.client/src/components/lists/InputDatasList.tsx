import { TaskInputData } from "@/models/dbModels";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

interface Props {
    inputDatas: TaskInputData[];
    outDatas?: string[];
    cardWrapperClassName?: string;
}

export function InputDatasList({ inputDatas, outDatas, cardWrapperClassName = "" }: Props) {
    const displayed = inputDatas.slice(0, 5);
    const [activeTab, setActiveTab] = useState("0");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* ¬кладки с прокруткой на мобильных устройствах */}
            <TabsList className="mb-4 w-full overflow-x-auto flex-nowrap whitespace-nowrap px-1 sm:px-0">
                {displayed.map((_, index) => (
                    <TabsTrigger
                        key={index}
                        value={index.toString()}
                        className="flex-shrink-0 text-sm sm:text-base"
                    >
                        Case {index + 1}
                    </TabsTrigger>
                ))}
            </TabsList>

            {displayed.map((item, index) => (
                <TabsContent key={index} value={index.toString()} className="w-full">
                    <div className={`space-y-4 ${cardWrapperClassName}`}>
                        <div>
                            <label className="text-muted-foreground text-sm sm:text-base">Input =</label>
                            <pre className="bg-muted rounded-md p-3 sm:p-4 mt-1 whitespace-pre-wrap break-words font-mono text-sm sm:text-base">
                                {item.inputData?.data || "Ч"}
                            </pre>
                        </div>
                        <div>
                            <label className="text-muted-foreground text-sm sm:text-base">Expected Output =</label>
                            <pre className="bg-muted rounded-md p-3 sm:p-4 mt-1 whitespace-pre-wrap break-words font-mono text-sm sm:text-base text-primary">
                                {item.answer || "Ч"}
                            </pre>
                        </div>
                        {outDatas && (
                            <div>
                                <label className="text-muted-foreground text-sm sm:text-base">Received Output =</label>
                                <pre className="bg-muted rounded-md p-3 sm:p-4 mt-1 whitespace-pre-wrap break-words font-mono text-sm sm:text-base">
                                    <span className={item.answer === outDatas[index] ? "text-green" : "text-red"}>
                                        {outDatas[index] || "Ч"}
                                    </span>
                                </pre>
                            </div>
                        )}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default InputDatasList;
