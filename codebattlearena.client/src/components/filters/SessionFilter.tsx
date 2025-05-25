import React, { useEffect, useState } from "react";
import { SessionFilters } from "@/models/filters";
import { SessionState } from "@/models/dbModels";
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
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

interface Props {
    filter: SessionFilters;
    onChange: (filter: SessionFilters) => void;
    handleSearch: () => void;
}

export function SessionFilter({ filter, onChange, handleSearch }: Props) {
    const { langsProgramming, loading, error: langsError } = useLangsProgramming();

    const [selectedLang, setSelectedLang] = useState<string>(filter.idLang?.toString() || "all");
    const [selectedState, setSelectedState] = useState<string>(filter.sessionState || "all");
    const [maxPeople, setMaxPeople] = useState<string>(filter.maxPeople?.toString() || "");
    const [isStart, setIsStart] = useState<boolean>(filter.isStart || false);
    const [isFinish, setIsFinish] = useState<boolean>(filter.isFinish || false);

    useEffect(() => {
        setSelectedLang(filter.idLang?.toString() || "all");
        setSelectedState(filter.sessionState || "all");
        setMaxPeople(filter.maxPeople?.toString() || "");
        setIsStart(filter.isStart || false);
        setIsFinish(filter.isFinish || false);
    }, [filter]);

    const handleLangChange = (value: string) => {
        setSelectedLang(value);
        const id = Number(value);
        onChange({ ...filter, idLang: isNaN(id) ? undefined : id });
    };

    const handleStateChange = (value: string) => {
        setSelectedState(value);
        onChange({
            ...filter,
            sessionState: value === "all" ? undefined : (value as SessionState),
        });
    };

    const handleMaxPeopleChange = (value: string) => {
        setMaxPeople(value);
        const num = Number(value);
        onChange({ ...filter, maxPeople: isNaN(num) ? undefined : num });
    };

    const handleStartChange = (value: boolean) => {
        setIsStart(value);
        onChange({ ...filter, isStart: value });
    };

    const handleFinishChange = (value: boolean) => {
        setIsFinish(value);
        onChange({ ...filter, isFinish: value });
    };

    if (!langsProgramming || langsProgramming.length === 0) {
        return <EmptyState message="Languages not found" />;
    }

    return (
        <Card className="p-2 sm:p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 flex-wrap">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Language</label>
                    <Select
                        value={selectedLang}
                        onValueChange={handleLangChange}
                        disabled={loading}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
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
                    <label className="text-sm font-medium">Session State</label>
                    <Select
                        value={selectedState}
                        onValueChange={handleStateChange}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="All states" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All states</SelectItem>
                            {Object.values(SessionState).map((state) => (
                                <SelectItem key={state} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Max People</label>
                    <Input
                        type="number"
                        value={maxPeople}
                        onChange={(e) => handleMaxPeopleChange(e.target.value)}
                        placeholder="Max people"
                        className="w-full md:w-[120px]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Started</label>
                    <Switch
                        checked={isStart}
                        onCheckedChange={handleStartChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Finished</label>
                    <Switch
                        checked={isFinish}
                        onCheckedChange={handleFinishChange}
                    />
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

export default SessionFilter;
