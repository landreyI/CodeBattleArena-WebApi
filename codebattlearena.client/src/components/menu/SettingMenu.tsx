import { useState } from "react";
import { GenericDropdownMenu, MenuAction } from "./GenericDropdownMenu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; // из shadcn/ui
import { Settings } from "lucide-react";

interface Props {
    setShowEdit?: (e: any) => void;
    handleDelet?: () => void;
    actionsProp?: MenuAction[];
}


export function SettingMenu({ setShowEdit, handleDelet, actionsProp }: Props) {
    const [showConfirm, setShowConfirm] = useState(false);

    const actions: MenuAction[] = [
        ...(setShowEdit
            ? [{ label: "Edit", onClick: setShowEdit, shortcut: "⌘E" }]
            : []),
        ...(handleDelet
            ? [{
                label: "Delete",
                onClick: () => setShowConfirm(true), // не сразу удаляет
                shortcut: "⨉D"
            }]
            : []),
        ...(actionsProp ?? [])
    ];

    return (
        <>
            <GenericDropdownMenu
                triggerContent={
                    <button className="hover:text-primary transition-colors" aria-label="Settings">
                        <Settings/>
                    </button>
                }
                menuLabel="Setting"
                actions={actions}
            />

            {/* модалка подтверждения */}
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent className="w-[90vw] md:w-fit">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="btn-animation">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="btn-animation"
                            onClick={() => {
                                handleDelet?.();
                                setShowConfirm(false);
                            }}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default SettingMenu;
