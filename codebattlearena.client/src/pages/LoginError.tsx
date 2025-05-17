import React from 'react';

export const LoginError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray">
            <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-red mb-4">Login Failed</h2>
                <p className="text-gray text-lg mb-6">
                    Something went wrong while trying to log you in. Please try again later.
                </p>
                <button className="w-full bg-red py-2 px-4 rounded">
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default LoginError;
