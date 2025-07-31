import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import { Chat } from "./Chat";
import { useSendMessageSession } from "@/hooks/playerSession/useSendMessageSession";
import { MessageProps } from "./Message";

interface ChatSheetProps {
    trigger: ReactNode;
    messages?: MessageProps[];
    title?: string;
}

export function ChatSheet({ trigger, messages, title = "Group Chat" }: ChatSheetProps) {
    const { error, sendMessage } = useSendMessageSession();

    const onSend = (message: string) => {
        sendMessage(message);
    };

    return (
        <Sheet modal={false} defaultOpen={false}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent
                side="right"
                onInteractOutside={(e) => e.preventDefault()}
                className="md:h-[calc(100vh-40px)] md:my-5 md:mr-5 w-full rounded-2xl sm:w-[100vw] border border-2 bg-[var(--color-header-bg)]"
            >
                <SheetHeader>
                    <SheetTitle className="font-semibold text-lg">{title}</SheetTitle>
                </SheetHeader>
                <Chat messages={messages} onSend={onSend}></Chat>
            </SheetContent>
        </Sheet>
    );
};

export default ChatSheet;