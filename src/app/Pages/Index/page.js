'use client';

import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image'; // Importing Next.js Image component

// Use dynamic imports for Contact and About components
const Contact = dynamic(() => import('../contactus'), {
  loading: () => (
    <div className="text-center text-gray-500 py-12">
      <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full mx-auto mb-4"></div>
      <p>Loading Contact...</p>
    </div>
  ),
});
const About = dynamic(() => import('../aboutus/'), {
  loading: () => (
    <div className="text-center text-gray-500 py-12">
      <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full mx-auto mb-4"></div>
      <p>Loading About...</p>
    </div>
  ),
});

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Background Image */}
      <div className="relative flex-grow">
        <Image
          src="/Images/civil.jpg"
          alt="Civil Engineering"
          width={1920} // Larger resolution for quality
          height={1080} // Adjusted to fit common screen sizes
          className="object-cover w-full h-[400px] md:h-[600px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent flex flex-col justify-center items-center text-white z-20 opacity-80">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center z-30">
            Civil Engineering: Building the Future
          </h2>
          <p className="text-lg md:text-xl mb-6 text-center max-w-3xl px-6 text-gray-300 leading-relaxed z-30">
            Civil engineering is a professional discipline that focuses on the design, construction, and
            maintenance of infrastructure such as roads, bridges, dams, and buildings. We are shaping the future
            of urban development.
          </p>
          <div className="flex justify-center space-x-6 z-30">
            <button className="bg-blue-600 text-white py-3 px-10 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none shadow-md z-30">
              Learn More
            </button>
            <button className="bg-green-600 text-white py-3 px-10 rounded-lg hover:bg-green-700 transition transform hover:scale-105 focus:outline-none shadow-md z-30">
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="my-16 px-4 md:px-12">
        <Contact />
      </div>

      {/* About Section */}
      <div className="my-16 px-4 md:px-12">
        <About />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
