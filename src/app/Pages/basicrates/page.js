'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Labour from '../category/labour';
import Plant from '../category/plant';
import Materials from '../category/materials';

export default function Page() {
  const [activeTable, setActiveTable] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Back Button (Appears when a table is selected) */}
      {activeTable !== '' && (
        <div className="flex justify-start p-4">
          <button 
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
            onClick={() => setActiveTable('')}
          >
            🔙 Back
          </button>
        </div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Construction Basic Rates 
          
        </h1>

        {/* Button Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <button 
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${activeTable === 'Materials' ? 'ring-4 ring-yellow-300' : ''}`}
            onClick={() => setActiveTable('Materials')}
          >
            🏗️ Material Table
          </button>
          <button 
            className={`bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${activeTable === 'Labour' ? 'ring-4 ring-gray-400' : ''}`}
            onClick={() => setActiveTable('Labour')}
          >
            👷 Labour Table
          </button>
          <button 
            className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${activeTable === 'Plant' ? 'ring-4 ring-red-300' : ''}`}
            onClick={() => setActiveTable('Plant')}
          >
            🚜 Plant Table
          </button>
        </div>
      </div>

      {/* Display Selected Table */}
      <div className="p-6 md:p-12">
        {activeTable === '' && (
          <div className="text-center text-gray-700 text-xl font-medium">
            Welcome! Please select a category to view the table.
          </div>
        )}
        {activeTable === 'Materials' && <Materials />}
        {activeTable === 'Labour' && <Labour />}
        {activeTable === 'Plant' && <Plant />}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
