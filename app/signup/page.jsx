"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'sonner';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = (e) => {
        e.preventDefault();
        axios.post("/api/auth/signup", user)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    toast.success('Signup successful', {
                      position: 'top-center',
                      style: { backgroundColor: 'green', color: 'white' }
                    });
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000)
                }
            })
            .catch((error) => {
                console.log(error)
                console.log("Signup failed", error.message);
                if (error.status === 500) {
                    toast.error("Please provide details", {
                          position: 'top-center',
                          style: { backgroundColor: 'red', color: 'white' }
                    });
                }
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
            <form
                onSubmit={onSignup}
                className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
            >
                <h2 className="text-2xl font-semibold text-purple-800 text-center mb-6">cbtapp</h2>
                <h3 className="text-2xl font-semibold text-purple-800 text-center mb-6">Create an Account</h3>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-purple-800 mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-purple-800 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-purple-800 mb-1">Password</label>
                    <input
                        required
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition duration-300"
                >
                    Sign Up
                </button>

                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-600 hover:underline">
                        Visit login page
                    </Link>
                </p>
            </form>
        </div>
    );
}
