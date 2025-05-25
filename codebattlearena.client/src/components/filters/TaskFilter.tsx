import React, { useEffect, useState } from "react";
import { TaskProgrammingFilters } from "@/models/filters";
import { Difficulty } from "@/models/dbModels";
import { useLangsProgramming } from "@/hooks/useLangsProgramming";
import EmptyState from "../common/EmptyState";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Props {
    filter: TaskProgrammingFilters;
    onChange: (filter: TaskProgrammingFilters) => void;
    handleSearch: () => void;
}

const getDifficulties = () => {
    return Object.keys(Difficulty) as Array<keyof typeof Difficulty>;
};

export function TaskFilter({ filter, onChange, handleSearch }: Props) {
    const difficulties = getDifficulties();
    const { langsProgramming, loading, error: langsError } = useLangsProgramming();

    // Локальное состояние для управления значениями <Select>
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
        filter.difficulty || "all"
    );
    const [selectedLang, setSelectedLang] = useState<string>(filter.idLang?.toString() || "all");

    // Синхронизация локального состояния с пропсом filter
    useEffect(() => {
        setSelectedDifficulty(filter.difficulty || "all");
        setSelectedLang(filter.idLang?.toString() || "all");
    }, [filter.difficulty, filter.idLang]);

    const handleLangChange = (value: string) => {
        setSelectedLang(value);
        const id = Number(value);
        onChange({ ...filter, idLang: isNaN(id) ? undefined : id });
    };

    const handleDifficultyChange = (value: string) => {
        setSelectedDifficulty(value);

        if (value === "all") {
            onChange({ ...filter, difficulty: undefined });
        } else if (value in Difficulty) {
            const difficultyKey = value as keyof typeof Difficulty;
            onChange({ ...filter, difficulty: Difficulty[difficultyKey] });
        }
    };

    if (!langsProgramming || langsProgramming.length === 0) {
        return <EmptyState message="Langs not found" />;
    }

    return (
        <Card className="p-2 sm:p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm sm:text-base font-medium">
                            Language
                        </label>
                        <Select
                            value={selectedLang}
                            onValueChange={handleLangChange}
                            disabled={loading}
                        >
                            <SelectTrigger className="w-full md:w-[180px] border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="All languages" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All languages</SelectItem>
                                {langsProgramming.map((lang) => (
                                    <SelectItem key={lang.idLang} value={lang.idLang.toString()}>
                                        {lang.nameLang}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {langsError && (
                            <span className="text-sm text-red-600">Error loading languages</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm sm:text-base font-medium">
                            Difficulty
                        </label>
                        <Select
                            value={selectedDifficulty}
                            onValueChange={handleDifficultyChange}
                        >
                            <SelectTrigger className="w-full md:w-[180px] border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="All difficulties" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All difficulties</SelectItem>
                                {difficulties.map((diff) => (
                                    <SelectItem key={diff} value={diff}>
                                        {diff}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button
                    className="w-full md:w-auto btn-animation px-4 py-2"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>
        </Card>
    );
}

export default TaskFilter;