import ItemForm from "@/components/forms/ItemForm";
import { useState } from "react";
import InlineNotification from "@/components/common/InlineErrorNotification";


export function CreateItem() {
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
                <div className="md:w-[30vw] sm:w-[100vw] mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-green-400 font-mono">
                            Create Item
                        </h1>
                    </div>
                    <ItemForm submitLabel="Created" onClose={handleMessageSaccess}></ItemForm>
                </div>
            </div>
      </>
  );
}

export default CreateItem;