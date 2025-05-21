import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Send } from "lucide-react";
import { useState } from "react";
import { MessageComponent, MessageProps } from "./Message";
import { Separator } from "../ui/separator";

interface ChatProps {
    messages?: MessageProps[];
    onSend?: (message: string) => void;
}

export function Chat({ messages = [], onSend }: ChatProps) {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() && onSend) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background border shadow-sm">
            <ScrollArea className="flex-1 overflow-y-auto p-3">
                <div className="flex flex-col gap-2">
                    {messages.map((msg, index) => (
                        <MessageComponent
                            key={index}
                            message={msg.message}
                            isUser={msg.isUser}
                        />
                    ))}
                </div>
            </ScrollArea>
            <Separator className="" />
            <div className="p-3">
                <div className="flex items-end gap-2">
                    <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={1}
                        className="w-full max-h-[4rem] overflow-y-auto resize-none rounded-full border focus:ring-2 focus:ring-primary transition leading-tight min-h-[2.5rem]"
                    />
                    <Button
                        onClick={handleSendMessage}
                        size="icon"
                        variant="ghost"
                        className="rounded-full hover:bg-accent transition"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Chat;