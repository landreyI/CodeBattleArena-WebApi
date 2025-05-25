import React from 'react';

interface Props {
    message: string;
}

export function EmptyState({ message }: Props) {
    return (
        <div className="flex items-center justify-center h-auto text-red">
            <p className="text-xl font-mono">{message}</p>
        </div>
    );
}

export default EmptyState;