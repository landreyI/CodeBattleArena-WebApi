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
import { Difficulty, TaskProgramming } from "@/models/dbModels";
import { useLangsProgramming } from "@/hooks/useLangsProgramming";
import LoadingScreen from "../common/LoadingScreen";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { Textarea } from "../ui/textarea";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";

// Определяем схему валидации формы
export const formSchema = z
    .object({
        name: z.string().min(3, { message: "Task name must be at least 3 characters." }),
        idLangProgramming: z.number().min(0, { message: "Select language" }),
        difficulty: z.nativeEnum(Difficulty, {
            errorMap: () => ({ message: "Invalid difficulty" }),
        }),
        textTask: z.string().min(10, { message: "Description must be at least 10 characters." }),
        preparation: z.string().nonempty("Preparation is required"),
        verificationCode: z.string().nonempty("Verification code is required"),
    })

interface Props {
    task?: TaskProgramming;
    onClose?: () => void;
    onUpdate?: (updatedTask: TaskProgramming) => void;
    submitLabel?: string;
}

export function TaskForm({ task, onClose, onUpdate, submitLabel }: Props) {
    const { langsProgramming, loading, error: langsError } = useLangsProgramming();
    const { createTask, isLoading: createIsLoad, error: createError } = useCreateTask();
    const { updateTask, isLoading: updateIsLoad, error: updateError } = useUpdateTask();
    // Подменяем в зависимости от контекста (создание или редактирование)
    const isEditing = !!task;

    const isLoading = isEditing ? updateIsLoad : createIsLoad;
    const error = isEditing ? updateError : createError;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: task?.name || "",
            idLangProgramming: task?.langProgrammingId || -1,
            difficulty: task?.difficulty || Difficulty.Easy,
            textTask: task?.textTask || "",
            preparation: task?.preparation || "",
            verificationCode: task?.verificationCode || "",
        },
    });

    if (loading) return <LoadingScreen />
    if (langsError) return <ErrorMessage error={langsError} />;
    if (!langsProgramming) return <EmptyState message="Langs programming not found" />;

    function buildTaskData(values: z.infer<typeof formSchema>, task?: TaskProgramming): TaskProgramming {
        return {
            idTaskProgramming: task?.idTaskProgramming ?? null,
            langProgramming: langsProgramming?.find(lang => lang.idLang === values.idLangProgramming) ?? null,

            name: values.name,
            langProgrammingId: values.idLangProgramming,
            difficulty: values.difficulty,
            textTask: values.textTask,
            preparation: values.preparation,
            verificationCode: values.verificationCode,
        };
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            let result = null;

            const taskData = buildTaskData(values, task);
            result = await (task ? updateTask(taskData) : createTask(taskData));

            if (onUpdate && task)
                onUpdate(taskData);

            if (onClose != null)
                onClose();

        } catch (err) {
            console.error(err);

            const standardError = error;

            form.setError("root", {
                type: "manual",
                message: standardError?.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <FormField
                    control={form.control}
                    name="textTask"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preparation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preparation</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter preparation notes" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter verification code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading} className="w-full btn-green btn-animation">
                    {isLoading ? "Saving..." : submitLabel}
                </Button>
            </form>
        </Form>
    );
}

export default TaskForm;
