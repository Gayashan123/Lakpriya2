'use client'; // Add this at the top to indicate this is a client-side component

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importing usePathname for dynamic route detection

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname(); // Using usePathname hook to get the current route

  // Handle link click and close the mobile menu
  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the mobile menu after link click
  };

  // A helper function to determine if the current route matches the link
  const isActiveLink = (path) => pathname === path;

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo or brand name */}
        <div className="text-2xl font-extrabold cursor-pointer">
          <span className="text-white"></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <ul className="flex space-x-10">
            <li>
              <Link href="/" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/') ? 'blink' : 'hover:text-gray-300'}`}>
                Home
              </Link>
            </li>
           
            <li>
              <Link href="/pages/basic-rates" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/pages/basic-rates') ? 'blink' : 'hover:text-gray-300'}`}>
                Basic prices
              </Link>
            </li>
            <li>
              <Link href="/pages/activities" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/pages/activities') ? 'blink' : 'hover:text-gray-300'}`}>
                Activities
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Menu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? 'opacity-100 visibility-visible' : 'opacity-0 visibility-hidden'
        } md:hidden mt-6 space-y-4 px-6 transition-opacity duration-300 ease-in-out`} // Improved transition with opacity
      >
        <ul className="flex flex-col space-y-4">
          <li>
            <Link href="/" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/') ? 'blink' : 'hover:text-gray-300'}`}>
              Home
            </Link>
          </li>
          
          <li>
            <Link href="/pages/basic-rates" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/pages/basic-rates') ? 'blink' : 'hover:text-gray-300'}`}>
              Basic prices
            </Link>
          </li>
          <li>
            <Link href="/pages/activities" onClick={handleLinkClick} className={`cursor-pointer text-lg font-semibold transition duration-300 ${isActiveLink('/pages/activities') ? 'blink' : 'hover:text-gray-300'}`}>
              Activities
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}