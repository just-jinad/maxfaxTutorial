"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "./images/Gemini.png";
import { FaBars, FaTimes, FaSignOutAlt, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white text-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Icon */}
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Maxfax Icon"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="font-bold text-lg sm:text-xl md:text-2xl">
            Maxfax Tutorial
          </span>
        </div>

        {/* Menu Icon for Small and Medium Screens */}
        <div className="lg:hidden">
          <button
            onClick={toggleNav}
            className="text-gray-900 text-2xl focus:outline-none"
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links for Large Screens */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            className="text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
            href={"/signup"}
          >
            Signup Admin
          </Link>

          <Link
            className="text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
            href={"/login"}
          >
            Login Admin
          </Link>

          <Link
            href={"/canLogin"}
            className="text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
          >
            Login Student
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-base text-red-600 hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300 flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu for Small and Medium Screens */}
      {navOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200 p-4">
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                className="block text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
                href={"/signup"}
              >
                Signup Admin
              </Link>
            </li>
            <li>
              <Link
                className="block text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
                href={"/login"}
              >
                Login Admin
              </Link>
            </li>
            <li>
              <Link
                href={"/canLogin"}
                className="block text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
              >
                Login Student
              </Link>
            </li>
            {/* Logout Button for Mobile */}
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-red-600 text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300 w-full text-left flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowLogoutModal(false)}
            >
              <FaTimes />
            </button>
            <div className="flex flex-col items-center">
              <FaExclamationCircle className="text-red-600 text-4xl mb-3" />
              <h2 className="text-xl font-semibold mb-2">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
