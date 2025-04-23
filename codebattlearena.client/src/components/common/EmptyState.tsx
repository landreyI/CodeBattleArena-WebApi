import React from 'react';

interface Props {
    message: string;
}

export function EmptyState({ message }: Props) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-red-400">
            <p className="text-xl font-mono">{message}</p>
        </div>
    );
}

export default EmptyState;