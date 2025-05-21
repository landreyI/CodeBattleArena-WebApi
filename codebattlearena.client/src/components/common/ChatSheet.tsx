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
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-lg">{title}</SheetTitle>
                </SheetHeader>
                <Chat messages={messages} onSend={onSend}></Chat>
            </SheetContent>
        </Sheet>
    );
};

export default ChatSheet;