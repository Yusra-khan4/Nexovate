import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Sun, Moon } from 'lucide-react'; 
import logoImg from '../assets/Nexovate-01.svg';

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
      
      <div className="hidden md:flex items-center h-[56px] absolute left-8 lg:left-4 top-1/2 -translate-y-[215px] z-20 select-none">
        <img 
          src={logoImg} 
          alt="Nexovate Logo" 
          className="w-50 sm:w-32 h-auto max-h-[100px] object-contain brightness-105" 
        />
      </div>

      <div className="hidden md:flex items-center h-[56px] absolute right-8 lg:right-12 top-1/2 -translate-y-[215px] z-20">
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
      </div>

      {/* Mobile Top Navbar (Visible only on small screens) */}
      <div className="flex md:hidden w-full items-center justify-between px-2 mb-6 z-20">
        <img 
          src={logoImg} 
          alt="Nexovate Logo" 
          className="w-20 max-h-[42px] object-contain" 
        />
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-6 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-full p-0.5 relative flex items-center shadow-md cursor-pointer focus:outline-none"
        >
          <div 
            className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 text-gray-900 ${
              isDarkMode ? 'translate-x-6' : 'translate-x-0'
            }`}
          >
            {isDarkMode ? (
              <Moon size={12} className="text-[#1e1e1e] fill-current" />
            ) : (
              <Sun size={12} className="text-[#DC6B0F] fill-current" />
            )}
          </div>
        </button>
      </div>

      {/* Unified Main Card containing Header, Form, and Back Button */}
      <div className="w-full max-w-[390px] sm:max-w-[420px] z-10 my-auto">
        <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/70 border border-black/5 dark:border-white/10 rounded-[14px] p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-2xl transition-all duration-300 space-y-5 text-center">
          
          {/* Header Section */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-[#FFFFFF] tracking-tight">
              Reset Password
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Enter your email and we'll send you a recovery link.
            </p>
          </div>

          {/* Form */}
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
                  className="w-full bg-white dark:bg-[#000000]/40 border border-gray-300 dark:border-white/10 rounded-[6px] h-9.5 pl-9 pr-3 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white h-9.5 rounded-[6px] font-extrabold text-xs tracking-wider shadow-sm active:scale-[0.99] hover:brightness-105 transition-all uppercase mt-2 cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login Footer inside Card */}
          <div className="pt-2 border-t border-black/5 dark:border-white/5">
            <button 
              type="button" 
              onClick={() => navigate("/login")}
              className="text-xs font-bold text-gray-700 dark:text-[#F2A508] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors"
            >
              <ArrowLeft size={13} strokeWidth={2.5} /> Back to Login
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}