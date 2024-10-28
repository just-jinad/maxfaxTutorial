
"use client"
import Image from "next/image";
import FocusProgress from "./components/FocusProgress.jsx";
import LearnTogether from "./components/LearnTogether.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroImage from './components/images/hero.png';
import Footer from "./components/Footer.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 3000, 
      once: false, 
    });
  }, []);
  return (
    <>
    <Navbar/>
      <div className="relative overflow-hidden bg-white">
        {/* Floating decorative shapes */}
        <div  className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-100 rounded-full z-0"></div>
        <div data-aos="fade-up" className="absolute top-10 right-0 transform translate-x-1/2 translate-y-1/2 w-32 h-32 bg-red-100 rounded-full z-0"></div>

        {/* Hero section */}
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text and CTA */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                About Maxfax Tutorials

          
              </h1>
              <p className="text-gray-600" data-aos="fade-up">
              At MaxFax, we deliver exceptional educational support tailored to students of all ages. Whether you're aiming to excel academically, enhance a particular skill, or prepare for an important exam, we have the right solution to help you succeed.
              </p>
              <p className="text-gray-600" data-aos="fade-up">
                Our team of professional tutors will work with you to create a
                personalized learning plan that fits your schedule and goals.
                Learn from the best tutors, in the comfort of your home, and at
                your own pace. Your success is our priority.
              </p>
              <div className="space-x-4">
                <a
                  href="#"
                  className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md"
                >
                  Start Learning
                </a>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-900 px-6 py-3 rounded-full shadow-md"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative" data-aos="fade-up">
              {/* heroMaxfax-removebg-preview.png */}
              <Image
                src={HeroImage}
                alt="Tutor Image"
                width={400}
                height={400}
                priority={true}
                className="w-full max-w-sm mx-auto rounded-lg"
              />
           
              {/* Floating Background Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-200 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              fill="#f3f4f6"
              d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,202.7C840,235,960,245,1080,213.3C1200,181,1320,107,1380,69.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 mt-4" data-aos="fade-up">
              Discover the benefits of joining our tutoring platform. We ensure
              you get the best experience, tailored support, and high-quality
              education.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 text-center" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/classroom.png"
                  alt="Interactive Learning"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Interactive Learning
              </h3>
              <p className="text-gray-600 mt-2">
                Our platform encourages interactive and hands-on learning
                experiences to ensure students engage deeply with the material.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 text-center  bg-white" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/certificate.png"
                  alt="Certified Tutors"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Certified Tutors
              </h3>
              <p className="text-gray-600 mt-2">
                Our tutors are experienced professionals with the right
                certifications to provide high-quality educational support.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 text-center  bg-white" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/online-support.png"
                  alt="24/7 Support"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                24/7 Support
              </h3>
              <p className="text-gray-600 mt-2">
                Our support team is available around the clock to help with any
                questions or issues you may encounter.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 text-center  bg-white" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/computer.png"
                  alt="Advanced Technology"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Advanced Technology
              </h3>
              <p className="text-gray-600 mt-2">
                We use cutting-edge technology to enhance the learning
                experience and provide tools that meet modern educational
                standards.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 text-center  bg-white" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/achievement.png"
                  alt="Proven Success"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Proven Success
              </h3>
              <p className="text-gray-600 mt-2">
                Our students consistently achieve top marks and personal growth,
                proving the effectiveness of our methods.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 text-center  bg-white" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user-shield.png"
                  alt="Safe and Secure"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Safe and Secure
              </h3>
              <p className="text-gray-600 mt-2">
                We prioritize safety and security, ensuring all users' data is
                protected and privacy is maintained.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Wave for the "Why Choose Us" section */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              fill="#f3f4f6"
              d="M0,192L60,160C120,128,240,64,360,58.7C480,53,600,107,720,144C840,181,960,203,1080,208C1200,213,1320,203,1380,197.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Why choose us */}

        <FocusProgress />
        <LearnTogether />
      </div>
      <Footer />
    </>
  );
}
