"use client"
import React from 'react';

const LearnTogether = () => {
  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Background Waves SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f3f4f6"
            d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,122.7C672,96,768,64,864,80C960,96,1056,160,1152,160C1248,160,1344,96,1392,64L1440,32V320H0V160Z"
          ></path>
        </svg>
      </div>

      {/* Circular Content Section */}
      <div className="relative z-10 mx-auto text-center bg-gray-100 p-8 md:p-10 lg:p-16 rounded-full w-96 shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Let's Learn Together!
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Unlock potential and foster growth with us. Learn new skills or
          deepen your knowledge on your journey to success.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-400 transition duration-300"
          >
            Get Started
          </a>
          <a
            href="#"
            className="bg-gray-200 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10">
        <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="w-20 h-20 bg-red-400 rounded-full"></div>
      </div>
      <div className="absolute top-1/4 right-1/4">
        <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3">
        <div className="w-24 h-24 bg-green-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 left-0">
        <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default LearnTogether;

