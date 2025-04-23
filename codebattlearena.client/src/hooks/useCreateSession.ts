import { useState } from "react";
import { z } from "zod";
import { Player, Session } from "@/models/dbModels";
import { fetchCreateSession } from "@/services/session";
import { formSchema } from "@/components/forms/CreateSessionForm";
import { StandardError, processError } from "@/untils/errorHandler";

export function useCreateSession() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    /**
    * Creates a new session and returns its ID.
    * @param values - The form values for creating a session, validated against the formSchema.
    * @returns The ID of the created session.
    * @throws StandardError if the session creation fails.
    */
    const createSession = async (
        values: z.infer<typeof formSchema>
    ): Promise<Session> => {
        setIsLoading(true);
        setError(null);

        try {
            const createSession: Session = {
                name: values.name,
                maxPeople: values.maxPeople,
                langProgrammingId: values.idLangProgramming,
                state: values.state,
                difficulty: values.difficulty,
                password: values.password,
                taskId: values.taskId,

                idSession: null,
                winnerId: null,
                creatorId: "",
                dateCreating: new Date(),
                dateStart: null,
                isFinish: false,
                amountPeople: null,
                langProgramming: null,
            };

            const idSession = await fetchCreateSession(createSession);
            return idSession;
        } catch (err: unknown) {
            const standardError: StandardError = processError(err);
            setError(standardError);
            throw standardError;
        } finally {
            setIsLoading(false);
        }
    }

    return { createSession, isLoading, error };
}
