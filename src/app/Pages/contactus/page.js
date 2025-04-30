import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';

export default function Contact() {
  return (
    <div>
      {/* Hero Section with Suitable Title Bar */}
      <div className="flex justify-center items-center py-16 text-white gap-2 shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-800 via-brown-700 to-gray-700">
        <h1 className="text-4xl font-bold uppercase">Contact Us</h1>
      </div>

      <div className="relative bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
        <Image
          src="/Images/contact us.jpg" // Make sure to replace with the correct image path in your public folder
          alt="Contact Us"
          width={1200}
          height={600}
          className="object-cover w-full h-96 mt-4" // Added margin-top for space between title and image
        />
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 shadow-lg transition-all duration-300 transform hover:scale-105">
          We'd Love to Hear From You
        </h2>
        <p className="text-lg text-center mb-6 text-gray-600">
          Whether you're interested in a new project, need advice, or just want to know more about our services, feel free to reach out.
        </p>

        {/* Contact Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Full Name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Email Address"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-lg font-semibold text-gray-800">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Phone Number"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-lg font-semibold text-gray-800">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
