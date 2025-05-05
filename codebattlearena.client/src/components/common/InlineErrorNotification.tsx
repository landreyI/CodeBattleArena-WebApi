import { useEffect, useState } from "react";
import { X } from "lucide-react"; // или любой другой иконкой по желанию

interface Props {
    message: string;
    position?: "top" | "bottom";
    className?: string;
    duration?: number;
    fadeDuration?: number;
}

export function InlineNotification({
    message,
    position = "top",
    className,
    duration = 5000,
    fadeDuration = 500,
}: Props) {
    const [visible, setVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setIsFading(true), duration);
        const removeTimer = setTimeout(() => setVisible(false), duration + fadeDuration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [duration, fadeDuration]);

    const handleClose = () => {
        setIsFading(true);
        setTimeout(() => setVisible(false), fadeDuration);
    };

    if (!visible) return null;

    return (
        <div
            className={`
                fixed ${position}-4 left-1/2 transform -translate-x-1/2 
                px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-500
                flex items-center gap-2
                ${isFading ? "opacity-0" : "opacity-100"}
                ${className}
            `}
        >
            <span className="flex-1">{message}</span>
            <button
                className="ml-2 text-white hover:text-gray-300"
                onClick={handleClose}
                aria-label="Close"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default InlineNotification;
