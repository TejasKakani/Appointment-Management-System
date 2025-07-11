'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const verify = async () => {
        try {
            const res = await axios.post(`/api/users/verify-email?token=${token}`);
            console.log("Email verified", res.data);
            setVerified(true);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to verify email");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setToken(token);
        } else {
            setError("No verification token found");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            verify();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                {loading ? (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <svg className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Verifying your email...</p>
                    </div>
                ) : verified ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified!</h2>
                        <p className="text-gray-600 dark:text-gray-300">Your email has been successfully verified. You can now sign in to your account.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <svg className="h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h2>
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                <div className="mt-8">
                    <Link
                        href="/sign-in"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                        Go to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}