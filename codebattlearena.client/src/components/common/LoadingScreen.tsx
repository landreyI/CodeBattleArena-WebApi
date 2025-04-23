import React from 'react';

export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-green-400">
            <p className="text-xl font-mono animate-pulse">Loading...</p>
        </div>
    );
}

export default LoadingScreen;