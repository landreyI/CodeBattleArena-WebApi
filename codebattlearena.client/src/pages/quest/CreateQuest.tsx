import { useState } from "react";
import InlineNotification from "@/components/common/InlineErrorNotification";
import QuestForm from "@/components/forms/QuestForm";

export function CreateQuest() {
    const [notification, setNotification] = useState<string | null>(null);

    const handleMessageSaccess = () => {
        setNotification(null);
        setNotification("Success");
    }

    return (
        <>
            {notification && (
                <InlineNotification message={notification} position="top" className="bg-blue" />
            )}

            <div className="glow-box">
                <div className="md:w-[50vw] sm:w-[100vw] mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-green-400 font-mono">
                            Create Quest
                        </h1>
                    </div>
                    <QuestForm submitLabel="Created" onClose={handleMessageSaccess}></QuestForm>
                </div>
            </div>
        </>
    );
}

export default CreateQuest;