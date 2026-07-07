import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#090706] text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Huge Central Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#f97316] opacity-[0.18] blur-[160px] pointer-events-none" />

      {/* Central Interactive Module Wrapper */}
      <div className="relative z-10 w-full max-w-xl">
        {children}
      </div>
    </div>
  );
}