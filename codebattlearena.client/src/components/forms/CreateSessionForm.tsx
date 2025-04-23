import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SessionState, Difficulty, LangProgramming } from "@/models/dbModels";
import { useCreateSession } from "@/hooks/useCreateSession";
import { useNavigate } from "react-router-dom";
import { useLangsProgramming } from "@/hooks/useLangsProgramming";
import LoadingScreen from "../common/LoadingScreen";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { useEffect, useState } from "react";
import InputPassword from "../common/InputPassword";

// Определяем схему валидации формы
export const formSchema = z
    .object({
        name: z.string().min(2, { message: "Session name must be at least 2 characters." }),
        maxPeople: z.coerce.number().min(1, { message: "Minimum 1 person" }).max(10, { message: "Maximum 10 people" }),
        idLangProgramming: z.number().min(0, { message: "Select language" }),
        state: z.nativeEnum(SessionState, {
            errorMap: () => ({ message: "Invalid session state" }),
        }),
        difficulty: z.nativeEnum(Difficulty, {
            errorMap: () => ({ message: "Invalid difficulty" }),
        }),
        password: z.string().nullable(),
        taskId: z.coerce.number().nullable(),
    })
    .superRefine((data, ctx) => {
        if (data.state === SessionState.Private && (!data.password || data.password.trim() === "")) {
            ctx.addIssue({
                path: ["password"],
                code: z.ZodIssueCode.custom,
                message: "Password is required for private sessions",
            });
        }
    });

interface CreateSessionProps {
    onClose?: () => void;
}

export function CreateSessionForm({ onClose }: CreateSessionProps) {
    const { createSession, isLoading, error: createError } = useCreateSession();
    const { langsProgramming, loading, error: langsError } = useLangsProgramming();
    const [ state, setState ] = useState(SessionState.Public);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            maxPeople: 1,
            idLangProgramming: -1,
            state: SessionState.Public,
            difficulty: Difficulty.Easy,
            password: null,
            taskId: null,
        },
    });

    if (loading) return <LoadingScreen />
    if (langsError) return <ErrorMessage error={langsError} />;
    if (!langsProgramming) return <EmptyState message="Langs programming not found" />;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const idSession = await createSession(values);

            if (onClose != null)
                onClose();

            navigate(`/session/info-session/${idSession}`);
        } catch (err) {
            console.error(err);

            const standardError = createError;

            form.setError("root", {
                type: "manual",
                message: standardError?.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
                {form.formState.errors.root && (
                    <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Session Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter session name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maxPeople"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum number of participants</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Please specify the maximum number of participants (1-10)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="idLangProgramming"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Programming Language</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    value={field.value.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {
                                                // Проверка: есть ли такое значение среди lang.idLang
                                                langsProgramming.some(lang => lang.idLang === field.value)
                                                    ? langsProgramming.find(lang => lang.idLang === field.value)?.nameLang
                                                    : "Select valid language"
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {langsProgramming.map((lang) => (
                                            <SelectItem key={lang.idLang} value={lang.idLang.toString()}>
                                                {lang.nameLang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Session State</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                        setState(val as SessionState); // сохраняем в useState
                                    }}
                                    value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(SessionState).map((stateValue) => (
                                            <SelectItem key={stateValue} value={stateValue}>
                                                {stateValue}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Difficulty).map((diff) => (
                                            <SelectItem key={diff} value={diff}>
                                                {diff}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {state === SessionState.Private && (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password (Optional)</FormLabel>
                                <FormControl>
                                    <InputPassword placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="taskId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task ID (Optional)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter task ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading} className="w-full btn-green btn-animation">
                    {isLoading ? "Saving..." : "Create Session"}
                </Button>
            </form>
        </Form>
    );
}

export default CreateSessionForm;
