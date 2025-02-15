"use client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/login", user)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          let token = res.data.token;
          localStorage.setItem("token", token);
          toast.success("Login successful", {
            position: "top-center",
            style: { backgroundColor: "green", color: "white" },
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        const errorMessage = err.response.data.error;

        toast.error(errorMessage, {
          position: "top-center",
          style: { backgroundColor: "red", color: "white" },
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (only visible on medium and larger screens) */}
      <div className="hidden md:flex w-full md:w-1/2 bg-purple-800 text-white flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-6">cbtapp</h1>
        <p className="text-lg max-w-md text-center leading-relaxed">
          Empower your learning journey with cbtapp! Join us for expertly guided tutorials designed to help you achieve your goals and expand your knowledge base.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 justify-center items-center w-full bg-gray-50 p-8">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white shadow-lg p-10 rounded-lg"
        >
          <h5 className="text-3xl font-semibold mb-6 text-purple-800 text-center">
            Welcome Back
          </h5>

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-purple-800 mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="username"
              required
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-purple-800 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Login
          </button>
          <br />
          <br />
          <span className="mt-10 text-center">Don't have an account</span> 
          <br />
          <Link href="/signup" className="underline mt-4">Signup here</Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
