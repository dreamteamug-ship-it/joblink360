'use client'

import React from 'react';

export default function StyleTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">
          JobLink360 Style Test
        </h1>
        
        {/* Color Palette Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#8B0000] p-6 rounded-lg text-center">
            <h3 className="text-white font-bold">Maroon</h3>
            <p className="text-white text-sm">#8B0000</p>
          </div>
          <div className="bg-[#D4AF37] p-6 rounded-lg text-center">
            <h3 className="text-black font-bold">Gold</h3>
            <p className="text-black text-sm">#D4AF37</p>
          </div>
          <div className="bg-[#1a365d] p-6 rounded-lg text-center">
            <h3 className="text-white font-bold">Blue</h3>
            <p className="text-white text-sm">#1a365d</p>
          </div>
        </div>

        {/* Test Components */}
        <div className="space-y-6">
          <div className="bg-[#0a0a0f] border-2 border-[#D4AF37] p-6 rounded-lg">
            <h2 className="text-[#D4AF37] text-2xl font-bold mb-4">Card with Gold Border</h2>
            <p className="text-[#f5f0e8] mb-4">
              This card should have a dark background with gold borders and cream text.
            </p>
            <button className="bg-[#D4AF37] text-[#8B0000] px-4 py-2 rounded font-bold hover:opacity-90">
              Gold Button
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#0a0a0f] to-[#12121a] p-6 rounded-lg">
            <h2 className="text-[#D4AF37] text-2xl font-bold mb-4">Gradient Background</h2>
            <p className="text-[#f5f0e8]">
              This should show a subtle gradient from dark to deeper dark.
            </p>
          </div>
        </div>

        {/* Navigation Test */}
        <nav className="mt-12 flex justify-center space-x-4">
          <a href="#" className="text-[#D4AF37] hover:text-[#E8C84A] font-medium">
            Home
          </a>
          <a href="#" className="text-[#f5f0e8] hover:text-[#D4AF37] font-medium">
            About
          </a>
          <a href="#" className="text-[#f5f0e8] hover:text-[#D4AF37] font-medium">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
}
