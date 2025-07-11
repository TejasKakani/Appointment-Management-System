'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        name: "",
        phone: "",
        role: "",
        specialization: "",
        slotDuration: "",
        availability: []
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/profile");
            const { email, name, phone, role, specialization, slotDuration, availability } = response.data.user;
            setUser({ email, name, phone, role, specialization, slotDuration, availability });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const logOut = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/sign-out");
            router.push("/sign-in");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-8 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Profile</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">{user.role === 'doctor' ? 'Healthcare Provider' : 'Patient'} Account</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name || 'Not provided'}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.email || 'Not provided'}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{user.role || 'Not provided'}</p>
                                </div>

                                {user.role === 'doctor' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialization</label>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{user.specialization || 'Not provided'}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Slot Duration</label>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.slotDuration ? `${user.slotDuration} minutes` : 'Not provided'}</p>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Availability</label>
                                            {user.availability && user.availability.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {user.availability.map((slot, index) => (
                                                        <p key={index} className="text-lg font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{slot}</p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">No availability set</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                                <button
                                    onClick={getUser}
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                                >
                                    Refresh Profile
                                </button>
                                <button
                                    onClick={logOut}
                                    disabled={loading}
                                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}