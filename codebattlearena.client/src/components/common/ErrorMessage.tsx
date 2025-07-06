import React, { useState } from 'react';
import { StandardError } from '@/untils/errorHandler';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    error: StandardError;
}

export function ErrorMessage({ error }: Props) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="w-full max-w-lg mx-auto bg-red-50 border border-red-300 text-red-800 rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <p className="text-lg font-semibold">Error: {error.message}</p>
            </div>

            {(error.code || (error.fieldErrors && Object.keys(error.fieldErrors).length > 0)) && (
                <button
                    onClick={() => setShowDetails(prev => !prev)}
                    className="flex items-center space-x-2 text-sm text-red-600 hover:underline transition"
                >
                    {showDetails ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Hide details</span>
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            <span>More details</span>
                        </>
                    )}
                </button>
            )}

            {showDetails && (
                <div className="bg-red-100 rounded-lg p-4 text-sm space-y-2">
                    {error.code && (
                        <div>
                            <span className="font-medium">Error code:</span> {error.code}
                        </div>
                    )}

                    {error.fieldErrors && Object.keys(error.fieldErrors).length > 0 && (
                        <div>
                            <span className="font-medium">Field errors:</span>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                {Object.entries(error.fieldErrors).map(([field, msg]) => (
                                    <li key={field}>
                                        <span className="font-semibold">{field}:</span> {msg}
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
