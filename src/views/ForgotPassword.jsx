import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    // Same wrapper classes as DashboardLayout for consistency
    <div className="flex w-screen h-screen overflow-hidden bg-[#0a0806] text-white antialiased relative items-center justify-center">
      
      {/* EXACT SAME RADIAL GRADIENTS AS DASHBOARDLAYOUT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dc6b0f_0%,transparent_55%)] opacity-20 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#bd1c22_0%,transparent_50%)] opacity-15 pointer-events-none z-0" />

      {/* CARD CONTAINER (Glassmorphism) */}
      <div className="w-full max-w-[400px] bg-[#1c1a17]/40 backdrop-blur-xl border border-white/10 p-8 rounded-[5px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] z-10">
        
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-extrabold text-[#FFFFFF] tracking-tight">Reset Password</h2>
          <p className="text-xs text-gray-400 font-medium">Enter your email and we'll send you a link.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div className="text-left space-y-1.5">
            <label className="block text-xs font-bold text-[#FFFFFF] tracking-wide">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#000000]/30 border border-white/10 rounded-[5px] py-3 px-4 text-xs text-[#FFFFFF] placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-all"
              placeholder="name@email.com"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-3 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg active:scale-[0.99] hover:brightness-105 transition-all uppercase"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/login")}
            className="text-[10px] text-gray-500 font-bold hover:text-[#FFFFFF] transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}