import { Inbox } from 'lucide-react';

interface Props {
    message: string;
}

export function EmptyState({ message }: Props) {
    return (
        <div className="flex items-center justify-center h-auto text-gray-500 bg-gray-50 border border-gray rounded-2xl shadow-inner p-6 m-5 text-center">
            <Inbox className="w-10 h-10 mb-3 mr-1" />
            <p className="text-base font-bold">{message}</p>
        </div>
    );
}

export default EmptyState;