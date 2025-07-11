"use client";

import { useRouter } from 'next/navigation';

export default function CreateAppointment() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/create-appointment')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 group"
        >
            <span>Create Appointment</span>
            <img
                src="/arrow.png"
                alt="arrow"
                className="h-5 w-5 filter brightness-0 invert transition-transform duration-200 group-hover:translate-x-1"
            />
        </button>
    );
}