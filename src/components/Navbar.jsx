import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full h-24 flex items-center justify-between px-10 shrink-0 z-10 bg-transparent">
      {/* Brand Watermark */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-black border border-white/10 rounded flex items-center justify-center text-xs font-black text-orange-500">N</div>
        <span className="text-sm font-black tracking-wider text-white">Nexovate</span>
      </div>

      {/* Center Search Shell + Right Actions */}
      <div className="flex items-center gap-6">
        <div className="bg-[#e8dec9] rounded-full p-1.5 flex items-center max-w-md shadow-lg border border-white/20">
          <span className="px-3 text-gray-500 text-sm">🔍</span>
          <input 
            type="text" 
            placeholder="Search projects, tasks, or clients..." 
            className="bg-transparent text-black text-xs font-medium placeholder-gray-500 outline-none w-64 pr-2"
          />
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs px-5 py-2 rounded-full shadow hover:brightness-105 transition-all">
            Search
          </button>
        </div>

        {/* Standalone Glow Bell Alert */}
        <button className="text-xl relative p-1 text-white hover:scale-105 transition-transform">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}