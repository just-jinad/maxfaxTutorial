"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "./images/Gemini.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white text-gray-900 shadow-lg ">
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
        </nav>
      </div>

      {/* Mobile Dropdown Menu for Small and Medium Screens */}
      {navOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
          <Link
            className="text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
            href={"/login"}
          >
            Login Admin
          </Link>

          <Link
            href={"/login"}
            className="text-base hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-300"
          >
            Login Student
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
