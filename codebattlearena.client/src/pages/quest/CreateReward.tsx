import { useState } from "react";
import InlineNotification from "@/components/common/InlineErrorNotification";
import RewardForm from "@/components/forms/RewardForm";

export function CreateReward() {
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
                            Create Reward
                        </h1>
                    </div>
                    <RewardForm submitLabel="Created" onClose={handleMessageSaccess}></RewardForm>
                </div>
            </div>
        </>
    );
}

export default CreateReward;