import React, { useState } from 'react';
import { StandardError } from '@/untils/errorHandler';

interface Props {
    error: StandardError;
}

export function ErrorMessage({ error }: Props) {
    const [showDetails, setShowDetails] = useState(false);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-400 px-4 py-8">
            <p className="text-xl font-mono mb-4">Error: {error.message}</p>

            {(error.code != null || (error.fieldErrors && Object.keys(error.fieldErrors).length > 0)) && (
                <button
                    onClick={() => setShowDetails(prev => !prev)}
                    className="btn-animation btn-red"
                >
                    {showDetails ? 'Hide details' : 'Find out more'}
                </button>
            )}

            {showDetails && (
                <div className="mt-4 p-4 rounded-lg w-full max-w-md text-sm space-y-2">
                    {error.code && (
                        <div>
                            <span className="font-semibold text-red-300">Code:</span> {error.code}
                        </div>
                    )}

                    {error.fieldErrors && Object.keys(error.fieldErrors).length > 0 && (
                        <div>
                            <span className="font-semibold text-red-300">Field Errors:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                                {Object.entries(error.fieldErrors).map(([field, msg]) => (
                                    <li key={field}>
                                        <span className="text-red-200">{field}:</span> {msg}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ErrorMessage;
