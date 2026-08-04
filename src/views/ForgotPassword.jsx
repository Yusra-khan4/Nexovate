import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react'; 
import logoImg from '../assets/NEXOVATE_WHITE_BG.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative w-full bg-transparent text-gray-900 dark:text-white transition-colors duration-300 font-['Raleway',sans-serif] antialiased overflow-x-hidden">
      
      {/* Header Bar: Logo & Dark Mode Toggle */}
      <div className="w-full max-w-5xl absolute top-0 left-0 right-0 mx-auto px-6 py-4 flex items-center justify-between z-20">
        
        {/* Logo */}
        <div className="select-none">
          <img 
            src={logoImg} 
            alt="Nexovate Logo" 
            className="w-20 sm:w-24 max-h-[50px] object-contain brightness-105" 
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2 font-sans text-xs font-bold select-none tracking-wide">
          <span className={`hidden xs:inline transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
            Light
          </span>
          
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-12 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-0.5 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div 
              className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 relative ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {isDarkMode && (
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  <div className="w-1 h-1 bg-blue-100 rounded-full absolute top-0.5 right-1" />
                  <div className="w-1 h-1 bg-blue-100 rounded-full absolute bottom-0.5 right-1.5" />
                </div>
              )}
            </div>
          </button>

          <span className={`hidden xs:inline transition-colors duration-300 ${isDarkMode ? 'text-white font-extrabold' : 'text-gray-400'}`}>
            Dark
          </span>
        </div>

      </div>

      {/* Main Container */}
      <div className="w-full max-w-[360px] sm:max-w-[380px] z-10 space-y-4 my-auto pt-12 sm:pt-0">
        
        {/* Title Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight transition-colors duration-300">
            Reset Password
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
            Enter your email and we'll send you a recovery link.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/50 border border-black/5 dark:border-white/10 p-5 sm:p-6 rounded-[12px] backdrop-blur-xl shadow-md dark:shadow-2xl transition-all duration-300">
          
          <form onSubmit={handleReset} className="space-y-3.5">
            <div className="text-left space-y-1">
              <label className="block text-xs font-bold text-gray-900 dark:text-[#FFFFFF] tracking-wide">
                Email Address
              </label>
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <Mail size={14} strokeWidth={2.2} />
                </span>

                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[6px] h-9 pl-9 pr-3 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white h-9 rounded-[6px] font-extrabold text-xs tracking-wider shadow-sm active:scale-[0.99] hover:brightness-105 transition-all uppercase mt-2 cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login Footer Link */}
          <div className="mt-4 text-center">
            <button 
              type="button"
              onClick={() => navigate("/login")}
              className="text-xs font-bold text-gray-700 dark:text-[#F2A508] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={2.5} /> Back to Login
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}