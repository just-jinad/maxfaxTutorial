"use client";
import React, { useState } from "react";
import {useRouter} from 'next/navigation'

const PinEntryPage = () => {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!name || !pin) {
            setError("Please enter both name and pin.");
            return;
        }
        setError("");

        try {
            const response = await fetch("/api/quiz/access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pin }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Access granted:", data);
              router.push(`/quiz/${data.quizId}`);
                // Redirect to quiz page or display quiz instructions
            } else {
                setError(data.error || "Failed to verify pin.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-3">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fadeIn">
                <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
                    Enter Your Details
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Enter your name and the pin provided by the admin to access your quiz.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        className="w-full px-4 py-2 mb-4 text-lg text-center border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out transform focus:scale-105"
                    />
                    <input
                        type="text"
                        required
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter Pin"
                        className="w-full px-4 py-2 mb-4 text-lg text-center border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out transform focus:scale-105"
                    />
                    {error && (
                        <p className="text-red-500 text-sm mb-4 animate-bounce">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PinEntryPage;
