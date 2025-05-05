import Editor from "@monaco-editor/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";

interface Props {
    code: string;
    language: string;
    maxHeight?: number; // лучше числом для удобства
}

export function CodeViewer({ code, language, maxHeight = 400 }: Props) {
    const { isDarkMode } = useTheme();
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(100);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Установка темы
        monaco.editor.setTheme(isDarkMode ? "vs-dark" : "vs");

        // Вычисляем высоту автоматически
        const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
        const lineCount = editor.getModel()?.getLineCount() ?? 1;
        const padding = 20; // сверху и снизу
        const newHeight = Math.min(lineCount * lineHeight + padding, maxHeight);

        setHeight(newHeight);
        editor.layout(); // важно после изменения размеров
    };

    useEffect(() => {
        if (monacoRef.current) {
            monacoRef.current.editor.setTheme(isDarkMode ? "vs-dark" : "vs");
        }
    }, [isDarkMode]);

    return (
        <div ref={containerRef} className="rounded-xl overflow-hidden shadow-sm border border-muted" style={{ maxHeight, overflowY: "auto" }}>
            <Editor
                height={height}
                defaultLanguage={language}
                defaultValue={code}
                theme={isDarkMode ? "vs-dark" : "vs"}
                onMount={handleEditorDidMount}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: "off",
                    fontSize: 14,
                    wordWrap: "on",
                    padding: { top: 10, bottom: 10 },
                    overviewRulerLanes: 0,
                }}
            />
        </div>
    );
}

export default CodeViewer;
