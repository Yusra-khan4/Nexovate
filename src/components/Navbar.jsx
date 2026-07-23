import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificationsList = [
    { id: 1, text: "A developer is interested in building your project", time: "today" },
    { id: 2, text: "Bilal ahmed sent you a message", time: "12:30 PM" },
    { id: 3, text: "New milestone updated", time: "12 april 2026" },
    { id: 4, text: "Bilal ahmed sent you a message", time: "10 april 2026" }
  ];

  return (
    <header className="w-full h-24 flex items-center justify-between px-10 shrink-0 z-30 bg-transparent relative">
      
      <div className="flex items-center gap-5 ml-auto relative">
        
        <div className="bg-[#FFF6E9] dark:bg-[#e0d8cf]/80 backdrop-blur-md rounded-[16px] pl-4 pr-1.5 py-1.5 flex items-center w-[460px] max-w-lg shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-white/20 transition-all duration-300">
          
          <span className="text-gray-500 text-sm mr-2.5 shrink-0 flex items-center">
            <Search size={16} strokeWidth={2.5} className="text-[#5a5550]" />
          </span>
          
          <input 
            type="text" 
            placeholder="Search projects, tasks, or clients..." 
            className="bg-transparent text-[#2c2825] text-xs font-semibold placeholder-[#7a746e] outline-none w-full pr-2"
          />

          <div className="h-5 w-[1px] bg-black/10 mx-2 shrink-0" />

          <button className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs px-6 py-2 rounded-[10px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] hover:brightness-110 active:scale-[0.98] transition-all shrink-0 cursor-pointer tracking-wide border border-white/10">
            Search
          </button>
        </div>

      
        <div className="flex items-center gap-2.5 font-sans text-xs font-bold select-none tracking-wide transition-colors">
          <span className={`transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
            Light
          </span>
          
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-16 h-8 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-full p-1 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div 
              className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 relative ${
                isDarkMode ? 'translate-x-8' : 'translate-x-0'
              }`}
            >
              {isDarkMode && (
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  <div className="w-1 h-1 bg-blue-100 rounded-full absolute top-1 right-1.5" />
                  <div className="w-1.5 h-1.5 bg-blue-100 rounded-full absolute bottom-1 right-2" />
                </div>
              )}
            </div>

            {!isDarkMode ? (
              <div className="absolute right-2.5 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
            ) : (
              <div className="absolute left-2.5 flex gap-0.5">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-0.5 h-0.5 bg-white/40 rounded-full mt-1" />
              </div>
            )}
          </button>

          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white font-extrabold' : 'text-gray-400'}`}>
            Dark
          </span>
        </div>

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
          {/* 🎨 DUAL-THEME POPUP DECK                                                 */}
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