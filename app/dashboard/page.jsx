"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching or any setup tasks
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust this delay as needed

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="loader mb-4 border-4 border-blue-600 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
                    <p className="text-gray-600">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Maxfax Dashboard</h1>
            {/* Dashboard content goes here */}
        </div>
    );
};

export default Page;
