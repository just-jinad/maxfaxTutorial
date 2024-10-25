"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import bottomImage from './images/bottom2.png';
import 'aos/dist/aos.css'; // Import AOS styles

const LearnTogether = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing for the animations
    });
  }, []);

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Waves SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none"></div>

      {/* Responsive Side-by-Side Section */}
      <div className="relative z-10 mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12 max-w-7xl">
        {/* Left Text Side */}
        <div
          className="md:w-1/2 text-center md:text-left"
          data-aos="fade-right"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Let's Explore and Learn Together!
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
            We believe in fostering growth through education and skills development. Join us on a journey to unlock your potential and reach new heights. Whether you're starting out or looking to sharpen your abilities, we're here to support your learning journey every step of the way.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-400 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="#"
              className="bg-gray-200 text-gray-900 px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image Side */}
        <div
          className="md:w-1/2 relative"
          data-aos="fade-left"
        >
          <Image
            src={bottomImage}
            alt="Learning Image"
            width={400}
            height={400}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* Decorative Elements with Animations */}
      <div className="absolute top-10 left-10 animate-pulse hover:scale-110 transition-transform duration-300">
        <div className="w-8 sm:w-12 h-8 sm:h-12 bg-blue-400 rounded-full shadow-md"></div>
      </div>
      <div className="absolute bottom-0 right-0 animate-spin-slow hover:rotate-45 transition-transform duration-300">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-red-400 rounded-full shadow-md"></div>
      </div>
      <div className="absolute top-1/4 right-1/4 animate-bounce hover:scale-125 transition-transform duration-300">
        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-yellow-400 rounded-full shadow-md"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 hover:scale-105 transition-transform duration-300">
        <div className="w-16 sm:w-24 h-16 sm:h-24 bg-green-400 rounded-full shadow-md"></div>
      </div>
      <div className="absolute bottom-0 left-0 animate-spin hover:rotate-180 transition-transform duration-300">
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-400 rounded-full shadow-md"></div>
      </div>

      {/* Star Elements */}
      <div className="absolute top-5 right-5 animate-twinkle hover:scale-110 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="gold"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 sm:w-8 h-6 sm:h-8"
        >
          <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
        </svg>
      </div>
      <div className="absolute top-40 right-40 hover:scale-110 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="gold"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 sm:w-6 h-4 sm:h-6"
        >
          <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
        </svg>
      </div>
    </section>
  );
};

export default LearnTogether;
