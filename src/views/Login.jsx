import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import logoImg from '../assets/NEXOVATE_WHITE_BG.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all the fields.');
      return;
    }
    setError(''); 
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Save ID under developerId or clientId if present
        const userId = data.user.id || data.user._id;
        if (userId) {
          localStorage.setItem('developerId', userId);
        }

        // Navigate based on role
        if (data.user.role?.toLowerCase() === 'developer') {
          navigate('/developer/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      } else {
        // Fallback navigation if role is not directly on data.user
        navigate('/developer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative w-full bg-transparent text-gray-900 dark:text-white transition-colors duration-300 font-['Raleway',sans-serif] antialiased overflow-x-hidden">
      
      {/* Top Bar / Navigation */}
      <div className="w-full max-w-5xl absolute top-0 left-0 right-0 mx-auto px-6 py-4 flex items-center justify-between z-20">
        
        <div className="select-none">
          <img 
            src={logoImg} 
            alt="Nexovate Logo" 
            className="w-22 sm:w-24 max-h-[60px] object-contain brightness-105" 
          />
        </div>

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

      {/* Main Login Card */}
      <div className="w-full max-w-[360px] sm:max-w-[380px] z-10 space-y-4 my-auto pt-12 sm:pt-0">
        
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight transition-colors duration-300">
            Welcome back
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/50 border border-black/5 dark:border-white/10 rounded-[12px] p-5 sm:p-6 backdrop-blur-xl shadow-md dark:shadow-2xl transition-all duration-300">
          
          {error && (
            <div className="mb-3 p-2.5 bg-red-100 dark:bg-red-950/40 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold rounded-[5px]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            
            {/* Email Field */}
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
                  placeholder="name@email.com"
                  className="w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[6px] h-9 pl-9 pr-3 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="text-left space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-gray-900 dark:text-[#FFFFFF] tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[11px] font-bold text-gray-700 dark:text-[#F2A508] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <Lock size={14} strokeWidth={2.2} />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[6px] h-9 pl-9 pr-9 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-black/10 dark:border-white/5"></div>
              <span className="flex-shrink mx-3 text-[10px] text-gray-500 font-extrabold tracking-widest">OR</span>
              <div className="flex-grow border-t border-black/10 dark:border-white/5"></div>
            </div>

            {/* Google OAuth Button */}
            <button 
              type="button" 
              className="w-full bg-white/60 dark:bg-[#000000]/20 hover:bg-white dark:hover:bg-[#000000]/40 border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-[6px] h-9 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.83 14.99 1 12 1 7.37 1 3.42 3.66 1.48 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.67-4.51z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.5z" />
                <path fill="#FBBC05" d="M5.33 14.57c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.48 7.22C.54 9.11 0 11.23 0 13.5s.54 4.39 1.48 6.28l3.85-3.21z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.25 0-5.77-1.81-6.67-4.51L1.48 16.8C3.42 20.34 7.37 23 12 23z" />
              </svg>
              Continue with Google
            </button>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white h-9 rounded-[6px] font-extrabold text-xs tracking-wider shadow-sm active:scale-[0.99] hover:brightness-105 transition-all uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

        </div>

        <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-semibold tracking-wide transition-colors duration-300">
          Don't have an account? <Link to="/register" className="text-gray-900 dark:text-[#F2A508] hover:underline font-bold ml-1">Sign Up</Link>
        </p>

      </div>

    </div>
  );
};

export default Login;