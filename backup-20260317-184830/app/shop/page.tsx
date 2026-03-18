'use client'
import { useState } from 'react';

export default function TitaniumShop() {
  const products = [
    { id: 1, type: 'Course', title: 'Agribusiness Logistics (French/EAC)', price: 'KES 15,000', media: 'Video' },
    { id: 2, type: 'Job-Pack', title: 'Premium SADC Internship Access', price: 'ZAR 2,500', media: 'PDF' },
    { id: 3, type: 'Training', title: 'Mandarin for Trade (Polyglot Series)', price: 'KES 45,000', media: 'Audio' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-gold border-b border-maroon pb-4 mb-8 uppercase tracking-widest">
        Titanium Enterprise Hub
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(item => (
          <div key={item.id} className="bg-[#111] border-2 border-gold/20 hover:border-gold transition-all p-6 rounded-lg shadow-2xl group">
            <div className="h-40 bg-gradient-to-tr from-maroon/40 to-black mb-4 flex items-center justify-center relative overflow-hidden">
               <span className="text-xs font-mono text-gold opacity-50 uppercase">{item.media} Preview</span>
               {/* 4K Video Hover Playback Logic would sit here */}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-maroon font-mono mb-4">{item.price}</p>
            <button className="w-full py-3 bg-gold text-black font-bold uppercase hover:bg-white transition-all">
              Purchase Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
