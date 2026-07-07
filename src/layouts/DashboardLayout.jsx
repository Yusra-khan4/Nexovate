import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // 🔴 Native nested route handler
import Sidebar from '../components/Sidebar';

// IMPORT THE CONTEXT PROVIDER
import { ProfileProvider } from '../context/ProfileContext'; 

export default function DashboardLayout({ userName, userRole, onLogout }) {
  // Sidebar navigation fallback engine tracking state variables
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <ProfileProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#0a0806] text-white antialiased">
        {/* Decorative background visual ambient elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dc6b0f_0%,transparent_55%)] opacity-20 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#bd1c22_0%,transparent_50%)] opacity-15 pointer-events-none z-0" />

        <Sidebar 
          userName={userName} 
          userRole={userRole} 
          onLogout={onLogout}
          currentView={currentView}
          onViewChange={(id) => setCurrentView(id)}
        />

        <main className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar relative z-10 flex flex-col">
          
          {/* Responsive Top Navbar */}
          <div className="w-full max-w-7xl mx-auto pt-6 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-black">N</span>
              <span className="font-extrabold text-base font-['Raleway'] tracking-wide">Nexovate</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
              <div className="relative flex items-center bg-white/10 border border-white/10 rounded-[5px] pl-3 pr-1 py-1 w-full max-w-xs backdrop-blur-md">
                <span className="text-gray-400 text-xs mr-2">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent text-xs text-white placeholder-gray-400 outline-none w-full font-['Raleway'] font-medium"
                />
                <button className="hidden sm:block bg-gradient-to-r from-[#F2A508] to-[#BD1C22] text-white px-4 py-1.5 rounded-[5px] text-[11px] font-bold tracking-wide shadow-md hover:brightness-105 transition-all">
                  Search
                </button>
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors relative">
                <span className="text-sm">🔔</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* 🔴 THE FIX: Replace renderMainContent() with Outlet to load App.jsx configurations dynamically! */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </ProfileProvider>
  );
}