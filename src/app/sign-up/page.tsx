"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
        availability: [] as string[],
        slotDuration: '',
        specialization: ''
    });

    const [availability, setAvailability] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSignUp = async () => {
        try {
            setError("");
            setLoading(true);
            const res = await axios.post('/api/users/sign-up', user);
            console.log("Signup success", res.data);
            router.push('/sign-in');
        } catch (err: any) {
            setError(err.response?.data?.error || "An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setButtonDisabled(
            user.email === '' ||
            user.password === '' ||
            user.confirmPassword === '' ||
            user.phone === '' ||
            user.role === '' ||
            (user.password !== user.confirmPassword)
        );
    }, [user]);

    const addAvailability = () => {
        if (availability === '') return;
        const regex = new RegExp('^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\\s([1-9]|1[0-2]):[0-5][0-9](AM|PM)-([1-9]|1[0-2]):[0-5][0-9](AM|PM)$');
        if (!regex.test(availability)) {
            setError("Invalid availability format");
            return;
        }
        setUser({ ...user, availability: [...user.availability, availability] });
        setAvailability('');
        setError("");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-4 left-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                ← Back to Home
            </Link>

            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 my-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Join us to schedule and manage appointments</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter your name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Confirm your password"
                                value={user.confirmPassword}
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter your phone number"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                value={user.role}
                                onChange={(e) => {
                                    if (e.target.value !== "doctor") {
                                        setUser({ ...user, role: e.target.value, availability: [], slotDuration: '', specialization: '' });
                                    } else {
                                        setUser({ ...user, role: e.target.value });
                                    }
                                }}
                            >
                                <option value="">Select Role</option>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>

                        {user.role === "doctor" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Enter your specialization"
                                        value={user.specialization}
                                        onChange={(e) => setUser({ ...user, specialization: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot Duration (minutes)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Enter slot duration"
                                        value={user.slotDuration}
                                        onChange={(e) => setUser({ ...user, slotDuration: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add Availability</label>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                            placeholder="Monday 10:00AM-12:00PM"
                                            value={availability}
                                            onChange={(e) => setAvailability(e.target.value)}
                                        />
                                        <button
                                            onClick={addAvailability}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Format: Day HH:MMAM/PM-HH:MMAM/PM</p>
                                </div>

                                <div className="space-y-2">
                                    {user.availability.map((item, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
                )}

                <div className="mt-8 space-y-4">
                    <button
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        onClick={onSignUp}
                        disabled={buttonDisabled || loading}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Create Account"}
                    </button>

                    <div className="text-center text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}