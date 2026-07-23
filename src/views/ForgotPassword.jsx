import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import logoImg from '../assets/NEXOVATE_WHITE_BG.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // ☀️/🌙 SYNC STATE THEME ENGINE
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex flex-col items-center justify-between sm:justify-center min-h-screen px-4 py-6 sm:py-0 relative w-full bg-transparent text-gray-900 dark:text-white transition-colors duration-300 font-['Raleway',sans-serif] antialiased overflow-x-hidden">
      
      {/* 🎯 RESPONSIVE HEADER BAR */}
      <div className="w-full flex items-center justify-between sm:block static sm:absolute sm:top-0 sm:left-0 sm:right-0 p-2 sm:p-0 z-20 mb-6 sm:mb-0">
        
        {/* LOGO */}
        <div className="sm:absolute sm:top-6 sm:left-6 md:top-8 md:left-12 select-none">
          <img 
            src={logoImg} 
            alt="Nexovate Logo" 
            className="w-24 sm:w-28 max-h-[70px] sm:max-h-[80px] object-contain brightness-105" 
          />
        </div>

        {/* THEME TOGGLE */}
        <div className="sm:absolute sm:top-8 sm:right-8 md:top-12 md:right-12 flex items-center gap-2 sm:gap-2.5 font-sans text-xs font-bold select-none tracking-wide transition-colors">
          <span className={`hidden xs:inline transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
            Light
          </span>
          
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-14 sm:w-16 h-7 sm:h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div 
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 relative ${
                isDarkMode ? 'translate-x-7 sm:translate-x-8' : 'translate-x-0'
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
              <div className="absolute right-2 sm:right-2.5 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
            ) : (
              <div className="absolute left-2 sm:left-2.5 flex gap-0.5">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-0.5 h-0.5 bg-white/40 rounded-full mt-1" />
              </div>
            )}
          </button>

          <span className={`hidden xs:inline transition-colors duration-300 ${isDarkMode ? 'text-white font-extrabold' : 'text-gray-400'}`}>
            Dark
          </span>
        </div>

      </div>

      {/* RESET CARD CONTAINER */}
      <div className="w-full max-w-[400px] bg-[#FFF6E9] dark:bg-[#1c1a17]/50 border border-black/5 dark:border-white/10 p-5 sm:p-8 rounded-[12px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-md z-10 transition-all duration-300 my-auto">
        
        <div className="text-center space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-[#FFFFFF] tracking-tight transition-colors duration-300">Reset Password</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Enter your email and we'll send you a link.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4 sm:space-y-5">
          <div className="text-left space-y-1.5">
            <label className="block text-xs font-bold text-gray-900 dark:text-[#FFFFFF] tracking-wide transition-colors duration-300">Email Address</label>
            
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[5px] py-2.5 sm:py-3 px-4 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium"
              placeholder="name@email.com"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 sm:py-3 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg active:scale-[0.99] hover:brightness-105 transition-all uppercase mt-2 cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-5 sm:mt-6 text-center">
          <button 
            type="button"
            onClick={() => navigate("/login")}
            className="text-[11px] text-gray-900 dark:text-gray-400 font-bold hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors duration-300"
          >
            <ArrowLeft size={12} strokeWidth={2.5} /> Back to Login
          </button>
        </div>
      </div>

      {/* Spacer for bottom balance */}
      <div className="hidden sm:block h-6"></div>
    </div>
  );
}