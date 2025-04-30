"use client";

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div>
      {/* Hero Section with Suitable Title Bar */}
      <div className="flex justify-center items-center py-16 text-white gap-2 shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-800 via-brown-700 to-gray-700">
        <h1 className="text-5xl font-extrabold uppercase">About Us</h1>
      </div>
      
      <div className="relative bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
        <Image
          src="/Images/about us.jpg" // Make sure to replace with the correct image path in your public folder
          alt="About Us"
          width={1200}
          height={600}
          className="object-cover w-full h-96 mt-4" // Added margin-top for space between title and image
        />
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Who We Are Section */}
          <div className="flex flex-col justify-center items-center md:items-start bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Building the Future of Construction
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a construction company focused on providing quality services that deliver exceptional
              results. Our team of skilled professionals works on both large and small projects, from residential
              buildings to complex industrial infrastructure.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Our commitment to excellence, safety, and sustainability sets us apart. We aim to transform visions
              into reality by delivering innovative and reliable construction solutions that meet the highest
              standards.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center">
            <Image
              src="/Images/construction-team.jpg" // Replace with the actual image for the team or your construction projects
              alt="Construction Team"
              width={500}
              height={300}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-600 leading-relaxed mx-auto max-w-3xl">
            Our mission is to lead the construction industry by providing innovative and sustainable solutions,
            enhancing the community we serve, and building strong partnerships. We are committed to improving lives
            and shaping the world we live in.
          </p>
        </div>

        {/* Vision Section (Now matching Mission Section) */}
        <div className="mt-16 text-center bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-lg text-gray-600 leading-relaxed mx-auto max-w-3xl">
            Our vision is to be a leading innovator in the construction industry, delivering transformative
            projects that change the landscape of cities and communities worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
