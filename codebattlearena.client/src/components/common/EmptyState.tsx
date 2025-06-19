import React from 'react';

interface Props {
    message: string;
}

export function EmptyState({ message }: Props) {
    return (
        <div className="flex items-center justify-center h-auto text-red px-4 py-8">
            <p className="text-xl font-mono">{message}</p>
        </div>
    );
}

export default EmptyState;