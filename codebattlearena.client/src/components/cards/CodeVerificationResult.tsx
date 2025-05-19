import { ExecutionResult } from "@/models/executionResult";
import { Card } from "../ui/card";

interface Props {
    executionResult: ExecutionResult;
    className?: string;
}

export function CodeVerificationResult({ executionResult, className }: Props) {
    const { time, memory, compileOutput } = executionResult;

    return (
        <Card className={`p-4 space-y-4 text-sm ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span className="font-medium">⏱️ Time:</span>
                    <div>{time ?? "—"}</div>
                </div>
                <div>
                    <span className="font-medium">💾 Memory:</span>
                    <div>{memory ?? "—"}</div>
                </div>
            </div>

            {compileOutput && (
                <div>
                    <span className="font-medium">🛠️ Compilation errors:</span>
                    <pre className="mt-1 whitespace-pre-wrap break-words rounded-md border p-2 text-xs">
                        {compileOutput}
                    </pre>
                </div>
            )}
        </Card>
    );
}

export default CodeVerificationResult;
