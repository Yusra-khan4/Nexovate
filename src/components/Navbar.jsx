import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';

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
    <header className="w-full min-h-[3.5rem] py-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between px-3 sm:px-6 shrink-0 z-30 bg-transparent relative gap-2.5">
      
      {/* 🟢 ACTIONS & SEARCH CONTAINER */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-4 w-full sm:w-auto ml-auto relative justify-between sm:justify-end">
        
        {/* 🎨 RESPONSIVE SEARCH BAR CONTAINER */}
        <div className="order-2 sm:order-1 bg-[#FFF6E9] dark:bg-[#e0d8cf]/80 backdrop-blur-md rounded-[10px] pl-2.5 sm:pl-3 pr-1 py-1 flex items-center w-full sm:w-[260px] md:w-[360px] shadow-xs border border-white/20 transition-all duration-300">
          
          <span className="text-gray-500 text-xs mr-1.5 shrink-0 flex items-center">
            <Search size={14} strokeWidth={2.2} className="text-[#5a5550]" />
          </span>
          
          <input 
            type="text" 
            placeholder="Search projects, tasks, or clients..." 
            className="bg-transparent text-[#2c2825] text-[11px] font-semibold placeholder-[#7a746e] outline-none w-full min-w-0 pr-1.5"
          />

          <div className="h-4 w-[1px] bg-black/10 mx-1 sm:mx-1.5 shrink-0 hidden xs:block" />

          <button className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[11px] px-3.5 sm:px-4 py-1 rounded-[6px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-[0.98] transition-all shrink-0 cursor-pointer tracking-wide border border-white/10">
            Search
          </button>
        </div>

        {/* 🟢 CONTROLS WRAPPER (Theme Switch + Bell Notification) */}
        <div className="order-1 sm:order-2 flex items-center gap-2.5 sm:gap-3 ml-auto sm:ml-0">
          
          {/* 🎯 STANDARDIZED SUN/MOON THEME TOGGLE (Matched to Login/Signup) */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-14 h-7 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-full p-0.5 relative flex items-center shadow-md cursor-pointer transition-all duration-300 focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div 
              className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 text-gray-900 ${
                isDarkMode ? 'translate-x-7' : 'translate-x-0'
              }`}
            >
              {isDarkMode ? (
                <Moon size={13} className="text-[#1e1e1e] fill-current" />
              ) : (
                <Sun size={13} className="text-[#DC6B0F] fill-current" />
              )}
            </div>
          </button>

          <div ref={dropdownRef} className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-1.5 rounded-full border transition-all relative flex items-center justify-center cursor-pointer ${
                showNotifications 
                  ? 'bg-black/10 dark:bg-white/10 border-orange-500 text-orange-500' 
                  : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Bell size={14} strokeWidth={2.2} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-10 w-[260px] sm:w-[310px] bg-[#FFF6E9] dark:bg-[#FFFFFF]/95 border border-black/5 dark:border-white/10 rounded-[6px] p-3 shadow-lg dark:shadow-xl z-50 text-left transition-all duration-300 animate-fade-in flex gap-2.5">
                
                <div className="flex-1 space-y-2.5 max-h-[240px] overflow-y-auto pr-1.5 custom-scrollbar">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-gray-900 tracking-tight mb-1 select-none">
                    Notifications
                  </h3>
                  
                  {notificationsList.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="pb-2 flex items-start justify-between gap-2 border-b border-black/5 dark:border-white/5 last:border-none last:pb-0"
                    >
                      <p className="text-[11px] font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-900 flex-1">
                        {notification.text}
                      </p>
                      <span className="text-[9px] font-medium text-gray-700 dark:text-gray-400 lowercase whitespace-nowrap shrink-0 pt-0.5 font-sans">
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-1 bg-black/10 dark:bg-white/10 rounded-full relative overflow-hidden shrink-0 hidden sm:flex flex-col items-center shadow-inner">
                  <div className="w-full h-1/3 bg-gray-800 dark:bg-gray-400 rounded-full absolute top-1.5 shadow-xs" />
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}