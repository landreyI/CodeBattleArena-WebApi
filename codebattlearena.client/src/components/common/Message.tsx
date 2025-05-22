import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Message } from "@/models/dbModels";

export interface MessageProps {
    message?: Message;
    isUser?: boolean;
}
export function MessageComponent({ message, isUser }: MessageProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 mb-4",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {!isUser && (
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage className="rounded-full" src={message?.sender?.photoUrl ?? undefined} />
                    <AvatarFallback className="text-primary">
                        {message?.sender?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                    "rounded-lg px-4 py-2",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                )}
            >
                <p className="whitespace-pre-wrap break-words overflow-auto max-w-60">
                    {message?.messageText}
                </p>
                <p className="text-xs mt-1 opacity-70">
                    {new Date(message?.sentDateTime ?? new Date()).toLocaleString(undefined, {
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </p>
            </div>
            {isUser && (
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage className="rounded-full" src={message?.sender?.photoUrl ?? undefined} />
                    <AvatarFallback className="text-primary">
                        {message?.sender?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

export default MessageComponent;