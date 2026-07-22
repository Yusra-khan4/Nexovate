import React, { useState, useRef, useEffect } from 'react';
// 🎯 IMPORTING THE ICONS FROM LUCIDE
import { Bell, Search } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close the notification panel if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock list elements built from schema definitions
  const notificationsList = [
    { id: 1, text: "A developer is interested in building your project", time: "today" },
    { id: 2, text: "Bilal ahmed sent you a message", time: "12:30 PM" },
    { id: 3, text: "New milestone updated", time: "12 april 2026" },
    { id: 4, text: "Bilal ahmed sent you a message", time: "10 april 2026" }
  ];

  return (
    <header className="w-full h-24 flex items-center justify-between px-10 shrink-0 z-30 bg-transparent relative">
      
      {/* 🟢 Brand Watermark Layout Alignment
      <div className="flex items-center gap-2 z-10 select-none">
        <div className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-[#000000]">
          N
        </div>
        <span className="text-base font-extrabold tracking-wide text-gray-900 dark:text-[#FFFFFF] transition-colors duration-300">
          Nexovate
        </span>
      </div> */}

      {/* Actions and Search Interface Deck Layout */}
      <div className="flex items-center gap-5 ml-auto relative">
        
        {/* 🎨 SEARCH BAR CONTAINER */}
        <div className="bg-[#FFFFFF] dark:bg-white/10 rounded-full pl-4 pr-1.5 py-1.5 flex items-center max-w-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-lg border border-black/[0.04] dark:border-white/20 transition-all duration-300">
          
          <span className="text-gray-400 dark:text-gray-400 text-xs mr-2 shrink-0">
            <Search size={14} strokeWidth={2.5} />
          </span>
          
          <input 
            type="text" 
            placeholder="Search projects, tasks, or clients..." 
            className="bg-transparent text-black dark:text-white text-xs font-medium placeholder-gray-400 dark:placeholder-gray-500 outline-none w-64 pr-2"
          />

          {/* 🎨 THE SPLIT DIVIDER */}
          <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10 mx-1 shrink-0" />

          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs px-5 py-2 rounded-full shadow-md hover:brightness-105 active:scale-[0.98] transition-all shrink-0 cursor-pointer">
            Search
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 🎯 THE THEME SWITCH TOGGLE BUTTON (image_d620e7.png Accurate Implementation) */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 font-sans text-xs font-bold select-none tracking-wide transition-colors">
          {/* Light Label Toggle Trigger */}
          <span className={`transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
            Light
          </span>
          
          {/* Sliding Pill track background container */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-16 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {/* Toggle Sliding Circle Ball Node */}
            <div 
              className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 relative ${
                isDarkMode ? 'translate-x-8' : 'translate-x-0'
              }`}
            >
              {/* Dynamic Little craters inside the sphere canvas node for style accents */}
              {isDarkMode && (
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  <div className="w-1 h-1 bg-blue-100 rounded-full absolute top-1 right-1.5" />
                  <div className="w-1.5 h-1.5 bg-blue-100 rounded-full absolute bottom-1 right-2" />
                </div>
              )}
            </div>

            {/* Little ambient spark stars overlay inside track strip background channel */}
            {!isDarkMode ? (
              <div className="absolute right-2.5 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
            ) : (
              <div className="absolute left-2.5 flex gap-0.5">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-0.5 h-0.5 bg-white/40 rounded-full mt-1" />
              </div>
            )}
          </button>

          {/* Dark Label Toggle Trigger */}
          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white font-extrabold' : 'text-gray-400'}`}>
            Dark
          </span>
        </div>

        {/* 🔔 Standalone Glow Bell Alert (Lucide Version) */}
        <div ref={dropdownRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full border transition-all relative flex items-center justify-center cursor-pointer ${
              showNotifications 
                ? 'bg-black/10 dark:bg-white/10 border-orange-500 text-orange-500' 
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <Bell size={15} strokeWidth={2.5} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          </button>

          {/* ========================================================================= */}
          {/* 🎨 DUAL-THEME POPUP DECK: Maps layout specifications                     */}
          {/* ========================================================================= */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-[380px] bg-[#FFF6E9] dark:bg-[#FFFFFF]/95 border border-black/5 dark:border-white/10 rounded-[5px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] z-50 text-left transition-all duration-300 animate-fade-in flex gap-4">
              
              {/* Inner Stream Track Scrollable Block */}
              <div className="flex-1 space-y-4 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-grey-900 tracking-tight mb-2 select-none">
                  Notifications
                </h3>
                
                {notificationsList.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="pb-3 flex items-start justify-between gap-4 border-b border-black/5 dark:border-white/5 last:border-none last:pb-0"
                  >
                    <p className="text-xs font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-900 flex-1">
                      {notification.text}
                    </p>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-400 lowercase whitespace-nowrap shrink-0 pt-0.5 font-sans">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Styled Right Scrollbar indicator strip from mockup */}
              <div className="w-1.5 bg-black/10 dark:bg-white/10 rounded-full relative overflow-hidden shrink-0 hidden sm:flex flex-col items-center shadow-inner">
                <div className="w-full h-1/3 bg-gray-800 dark:bg-gray-400 rounded-full absolute top-2 shadow" />
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}