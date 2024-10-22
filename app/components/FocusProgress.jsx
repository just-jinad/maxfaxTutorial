"use client"
import React from 'react';
import Image from 'next/image'
import bodyImage from './images/bodyMaxfax-removebg-preview.png';
// C:\Users\Lenovo\Desktop\MAXFAX\maxfax\app\components\images\bodyMaxfax-removebg-preview.png

const FocusProgress = () => {
  const focusAreas = [
    { id: 1, title: 'Personal Growth', progress: 80, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-300' },
    { id: 2, title: 'Skill Development', progress: 65, color: 'bg-pink-500', hoverColor: 'hover:bg-pink-300' },
    { id: 3, title: 'Academic Success', progress: 90, color: 'bg-purple-500', hoverColor: 'hover:bg-purple-300' },
    { id: 4, title: 'Community Engagement', progress: 75, color: 'bg-green-500', hoverColor: 'hover:bg-green-300' },
  ];

  return (
    <section className="relative bg-white py-16 px-6 overflow-hidden">
      {/* SVG Wave Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0  w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f3f4f6" // Replace with any preferred color
            d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,122.7C672,96,768,64,864,80C960,96,1056,160,1152,160C1248,160,1344,96,1392,64L1440,32V320H0V160Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Image */}
        <div className="flex justify-center">
         
          <Image
          src={bodyImage}
          height={400}
          width={400}
          alt="ladyImage"
          className="rounded-lg shadow-lg w-full md:w-3/4"
          />

          
        </div>

        {/* Right Side: Focus Progress */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Focus
          </h2>

          {focusAreas.map((focus) => (
            <div key={focus.id} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{focus.title}</h3>
              <div className="relative w-full h-4 bg-gray-200 rounded-full">
                {/* Progress bar with hover effect */}
                <div
                  className={`absolute top-0 left-0 h-4 ${focus.color} ${focus.hoverColor} rounded-full transition-all duration-300 ease-in-out`}
                  style={{ width: `${focus.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {focus.progress}% progress in {focus.title.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusProgress;



