'use client';

import { useEffect, useState } from "react";
import CreateAppointment from "./create_appointment";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();

    const [user, setUser] = useState({
        id: "",
        role: "",
    });

    const getUser = async () => {
        try {
            const res = await axios.get("/api/users/get-token-payload");
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center space-y-8">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                        Smart Solutions for
                        <span className="text-blue-600 dark:text-blue-400 block mt-2">
                            Appointment Scheduling
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Streamline your healthcare appointments with our intuitive and efficient management system.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        {user.role === "doctor" ? (
                            <button
                                onClick={() => router.push("/list-appointments")}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 transform hover:scale-105"
                            >
                                View Appointments
                            </button>
                        ) : user.role === "patient" ? (
                            <CreateAppointment />
                        ) : (
                            <button
                                onClick={() => router.push("/sign-in")}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <span>Get Started</span>
                                <img src="/arrow.png" alt="arrow" className="h-5 w-5 filter brightness-0 invert" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}