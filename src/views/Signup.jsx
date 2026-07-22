import React, { useState, useEffect } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logoImg from '../assets/NEXOVATE WHITE BG.png';

const Signup = () => {
  const [role, setRole] = useState('select');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    full_Name: '', 
    email_address: '', 
    password: '', 
    confirmPassword: '',
    your_domain: '', 
    Tech_stack: '', 
    Linkdin_URL: '', 
    Github_URL: '' 
  });
  
  const [error, setError] = useState('');
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

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!formData.full_Name || !formData.email_address || !formData.password) {
    setError('Please fill in all the fields.');
    return;
  }
  
  if (role === 'client' && formData.password !== formData.confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    setError('');
    const response = await registerUser(role, formData);
    
    if (response.success) {
      const accountData = response.authAccount || {};
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      } else if (accountData.token) {
        localStorage.setItem('token', accountData.token);
      }
      
      localStorage.setItem('user', JSON.stringify(accountData));

      const id = accountData.id || accountData._id;
      if (id) {
        localStorage.setItem(role === 'client' ? 'clientId' : 'developerId', id);
      }

      navigate(`/${role}/dashboard`);
    } else {
      throw new Error(response.message || 'Server rejected registration operations.');
    }
  } catch (err) {
    setError(err.message || 'Registration failed. Please try again.');
  }
};
  const labelStyles = "block text-xs font-bold text-gray-900 dark:text-[#FFFFFF] tracking-wide mb-1.5 transition-colors duration-300";
  const inputStyles = "w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[5px] py-2.5 px-4 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium";

  
  if (role === 'select') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative w-full bg-[#FFFFFF] text-gray-900 dark:bg-[#0a0806] dark:text-white transition-colors duration-300 font-['Raleway',sans-serif] antialiased overflow-x-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none hidden dark:block">
          <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC6B0F] via-[#DC6B0F]/60 to-transparent blur-[120px] opacity-50" />
          <div className="absolute -bottom-[15%] -left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#BD1C22] via-[#BD1C22]/50 to-transparent blur-[140px] opacity-45" />
          <div className="absolute top-[25%] left-[20%] w-[550px] h-[550px] rounded-full bg-radial-gradient from-[#DC6B0F]/30 via-[#BD1C22]/10 to-transparent blur-[100px] opacity-30 mix-blend-plus-lighter" />
        </div>
        <div className="absolute top-6 left-6 sm:top-8 sm:left-12 z-10 select-none">
                <img 
                  src={logoImg} 
                  alt="Nexovate Logo" 
                  className="w-28 sm:w-32 max-h-[80px] object-contain mix-blend-multiply dark:mix-blend-normal brightness-105" 
                />
              </div>
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 z-20 flex items-center gap-2.5 font-sans text-xs font-bold select-none tracking-wide transition-colors">
          <span className={`transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
            Light
          </span>
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-16 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
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

        <div className="w-full max-w-2xl text-center mb-12 z-10 space-y-2">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-[#FFFFFF] tracking-tight transition-colors">Choose your path.</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium transition-colors">Select the path that best fits your goals on Nexovate.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl px-4 items-stretch z-10">
          <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/40 border border-black/5 dark:border-white/10 p-6 rounded-[5px] backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center min-h-[340px] transition-all duration-300">
            <div className="w-11 h-11 bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-[5px] flex items-center justify-center shadow-md mb-4 mt-2 shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-[#FFFFFF] mb-2 transition-colors">I'm a Developer</h3>
              <p className="text-[11px] text-gray-800 dark:text-gray-400 font-medium leading-relaxed px-1 mb-6 transition-colors">Create your account to start building and contributing to projects.</p>
            </div>
            <button onClick={() => setRole('developer')} className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-2.5 rounded-[5px] text-[11px] tracking-wider uppercase hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer">Continue as a Developer</button>
          </div>
          <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/40 border border-black/5 dark:border-white/10 p-6 rounded-[5px] backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center min-h-[340px] transition-all duration-300">
            <div className="w-11 h-11 bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-[5px] flex items-center justify-center shadow-md mb-4 mt-2 shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-[#FFFFFF] mb-2 transition-colors">I'm a Customer</h3>
              <p className="text-[11px] text-gray-800 dark:text-gray-400 font-medium leading-relaxed px-1 mb-6 transition-colors">Set up your profile and turn your ideas into clear project requirements.</p>
            </div>
            <button onClick={() => setRole('client')} className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-2.5 rounded-[5px] text-[11px] tracking-wider uppercase hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer">Continue as a Customer</button>
          </div>
        </div>
      </div>
    );
  }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative w-full bg-[#FFFFFF] text-gray-900 dark:bg-[#0a0806] dark:text-white transition-colors duration-300 font-['Raleway',sans-serif] antialiased overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none hidden dark:block">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC6B0F] via-[#DC6B0F]/60 to-transparent blur-[120px] opacity-50" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#BD1C22] via-[#BD1C22]/50 to-transparent blur-[140px] opacity-45" />
        <div className="absolute top-[25%] left-[20%] w-[550px] h-[550px] rounded-full bg-radial-gradient from-[#DC6B0F]/30 via-[#BD1C22]/10 to-transparent blur-[100px] opacity-30 mix-blend-plus-lighter" />
      </div>

      <div className="flex items-center gap-2 absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
        <div className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-[#000000]">N</div>
        <span className="text-base font-extrabold tracking-wide text-gray-900 dark:text-[#FFFFFF] transition-colors">Nexovate</span>
      </div>
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 z-20 flex items-center gap-2.5 font-sans text-xs font-bold select-none tracking-wide transition-colors">
        <span className={`transition-colors duration-300 ${!isDarkMode ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
          Light
        </span>
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-16 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer transition-all focus:outline-none"
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

      <div className="w-full max-w-[440px] text-center mt-12 mb-5 z-10 space-y-1">
        <button onClick={() => setRole('select')} className="text-[11px] font-bold text-gray-900 dark:text-[#F2A508] hover:underline mb-2 flex items-center gap-1 mx-auto cursor-pointer transition-colors">
          <ArrowLeft size={12} strokeWidth={2.5} /> Back to paths
        </button>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-[#FFFFFF] tracking-tight transition-colors">Create your profile</h2>
      </div>

      <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/40 border border-black/5 dark:border-white/10 p-8 rounded-[12px] max-w-[440px] w-full backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] z-10 transition-all duration-300">
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/40 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold rounded-[5px]">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          
          <button type="button" className="w-full bg-white/40 dark:bg-[#000000]/20 hover:bg-white/60 dark:hover:bg-[#000000]/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-200 rounded-[5px] py-2.5 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.83 14.99 1 12 1 7.37 1 3.42 3.66 1.48 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.67-4.51z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.5z"/>
              <path fill="#FBBC05" d="M5.33 14.57c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.48 7.22C.54 9.11 0 11.23 0 13.5s.54 4.39 1.48 6.28l3.85-3.21z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.25 0-5.77-1.81-6.67-4.51L1.48 16.8C3.42 20.34 7.37 23 12 23z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-1.5 items-center">
            <div className="flex-grow border-t border-black/10 dark:border-white/5 transition-colors"></div>
            <span className="flex-shrink mx-3 text-[10px] text-gray-800 dark:text-gray-500 font-extrabold tracking-widest transition-colors">OR</span>
            <div className="flex-grow border-t border-black/10 dark:border-white/5 transition-colors"></div>
          </div>

          <div>
            <label className={labelStyles}>Full Name</label>
            <input type="text" placeholder="abc" className={inputStyles} value={formData.full_Name} onChange={e => setFormData({...formData, full_Name: e.target.value})} required />
          </div>

          <div>
            <label className={labelStyles}>Email address</label>
            <input type="email" placeholder="abc@gmail.com" className={inputStyles} value={formData.email_address} onChange={e => setFormData({...formData, email_address: e.target.value})} required />
          </div>

          <div>
            <label className={labelStyles}>Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className={inputStyles} 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {role === 'developer' && (
            <>
              <div>
                <label className={labelStyles}>Your Domain</label>
                <input type="text" placeholder="e.g ui/ux designing" className={inputStyles} value={formData.your_domain} onChange={e => setFormData({...formData, your_domain: e.target.value})} required />
              </div>

              <div>
                <label className={labelStyles}>Tech Stack</label>
                <input type="text" placeholder="Tailwind, React, Typescript etc" className={inputStyles} value={formData.Tech_stack} onChange={e => setFormData({...formData, Tech_stack: e.target.value})} required />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyles}>LinkedIn URL</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 00-5.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </span>
                    <input type="text" placeholder="linkedin.com/in/..." className={`${inputStyles} pl-9`} value={formData.Linkdin_URL} onChange={e => setFormData({...formData, Linkdin_URL: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>GitHub URL</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500 text-xs font-bold tracking-tighter">&lt;/&gt;</span>
                    <input type="text" placeholder="github.com/..." className={`${inputStyles} pl-9`} value={formData.Github_URL} onChange={e => setFormData({...formData, Github_URL: e.target.value})} />
                  </div>
                </div>
              </div>
            </>
          )}
          {role === 'client' && (
            <div>
              <label className={labelStyles}>Confirm Password</label>
              <input type="password" placeholder="••••••••" className={inputStyles} value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
            </div>
          )}

          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" required className="mt-0.5 accent-[#DC6B0F] rounded cursor-pointer w-3.5 h-3.5 shrink-0" id="terms" />
            <label htmlFor="terms" className="text-[11px] text-gray-700 dark:text-gray-400 font-medium leading-tight cursor-pointer selection:bg-transparent transition-colors">
              I agree to the <span className="text-gray-900 dark:text-[#F2A508] font-bold hover:underline">Terms of Service</span> and <span className="text-gray-900 dark:text-[#F2A508] font-bold hover:underline">Privacy Policy</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-3 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg active:scale-[0.99] hover:brightness-105 transition-all uppercase mt-2 cursor-pointer"
          >
            {role === 'developer' ? 'Complete Registration' : 'Create Account'}
          </button>
        </form>
      </div>

      <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-semibold tracking-wide mt-6 z-10 transition-colors">
        Already have an account? <Link to="/login" className="text-gray-900 dark:text-[#F2A508] hover:underline font-bold ml-1 transition-colors">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;