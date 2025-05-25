import React from 'react';

export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-auto text-primary">
            <p className="text-xl font-mono animate-pulse">Loading...</p>
        </div>
    );
}

export default LoadingScreen;