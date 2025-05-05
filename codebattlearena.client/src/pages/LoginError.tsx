import React from 'react';

export const LoginError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-red-500 mb-4">Login Failed</h2>
                <p className="text-gray-700 text-lg mb-6">
                    Something went wrong while trying to log you in. Please try again later.
                </p>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default LoginError;
