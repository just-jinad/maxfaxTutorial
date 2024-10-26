"use client";
import React, { useState } from "react";

const PinEntryPage = () => {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pin) {
            setError("Please enter a valid pin.");
            return;
        }
        setError("");
        // Handle the pin validation logic here
        console.log("Pin submitted:", pin);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-3">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fadeIn">
                <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
                    Enter Your Pin
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Please enter the pin provided by the admin to access your test.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
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
                        Submit Pin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PinEntryPage;
