import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

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

  const handleChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }));
  };

const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Baseline check for fields common to everyone
    if (!formData.full_Name || !formData.email_address || !formData.password) {
      setError('Please fill in all baseline parameters.');
      return;
    }
    
    // 2. Password match verification for non-developers
    if ((role === 'client' || role === 'admin') && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // 3. 🔴 INTERCEPT ADMIN/CUSTOMER MOCK DATA FLOWS HERE
    if (role === 'admin' || role === 'client') {
      setError('');
      // Simulate successful local signup behavior and skip live API validation completely
      localStorage.setItem('token', 'mock-local-session-jwt-token');
      navigate(`/${role}/dashboard`);
      return; // Stop execution here so it never hits the developer database!
    }

    // 4. LIVE DEVELOPER PIPELINE (Only developer role gets past this line)
    try {
      setError('');
      
      const response = await registerUser(role, formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      const devId = response.user?._id || response.user?.id || response.id || response.data?._id || response.developer?._id;
      if (devId) {
        localStorage.setItem('developerId', devId);
      }
      
      navigate(`/${role}/dashboard`);
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const labelStyles = "block text-xs font-bold text-[#FFFFFF] tracking-wide mb-1.5";
  const inputStyles = "w-full bg-[#000000]/30 border border-white/10 rounded-[5px] py-2.5 px-4 text-xs text-[#FFFFFF] placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-all font-medium";

  if (role === 'select') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative w-full bg-[#0a0806] font-['Raleway',sans-serif] antialiased overflow-x-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dc6b0f_0%,transparent_55%)] opacity-20 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#bd1c22_0%,transparent_50%)] opacity-15 pointer-events-none z-0" />

        <div className="flex items-center gap-2 absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
          <div className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-[#000000]">
            N
          </div>
          <span className="text-base font-extrabold tracking-wide text-[#FFFFFF]">Nexovate</span>
        </div>

        <div className="w-full max-w-2xl text-center mb-12 z-10 space-y-2">
          <h2 className="text-4xl font-extrabold text-[#FFFFFF] tracking-tight">Choose your path.</h2>
          <p className="text-xs text-gray-400 font-medium">Select the path that best fits your goals on Nexovate.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl px-4 items-stretch z-10">
          
          <div className="bg-[#1c1a17]/40 border border-white/10 p-6 rounded-[5px] backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center min-h-[340px]">
            <div className="w-11 h-11 bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-[5px] flex items-center justify-center shadow-md shadow-orange-950/40 mb-4 mt-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#FFFFFF] mb-2">I'm Admin</h3>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed px-1 mb-6">Set up your profile to efficiently manage projects, users, and AI-generated reports.</p>
            </div>
            <button onClick={() => setRole('admin')} className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-2.5 rounded-[5px] text-[11px] tracking-wider uppercase hover:brightness-105 transition-all">
              Continue as Admin
            </button>
          </div>

          <div className="bg-[#1c1a17]/40 border border-white/10 p-6 rounded-[5px] backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center min-h-[340px]">
            <div className="w-11 h-11 bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-[5px] flex items-center justify-center shadow-md shadow-orange-950/40 mb-4 mt-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#FFFFFF] mb-2">I'm a Developer</h3>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed px-1 mb-6">Create your account to start building and contributing to projects.</p>
            </div>
            <button onClick={() => setRole('developer')} className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-2.5 rounded-[5px] text-[11px] tracking-wider uppercase hover:brightness-105 transition-all">
              Continue as a Developer
            </button>
          </div>

          <div className="bg-[#1c1a17]/40 border border-white/10 p-6 rounded-[5px] backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center min-h-[340px]">
            <div className="w-11 h-11 bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-[5px] flex items-center justify-center shadow-md shadow-orange-950/40 mb-4 mt-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#FFFFFF] mb-2">I'm a Customer</h3>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed px-1 mb-6">Set up your profile and turn your ideas into clear project requirements.</p>
            </div>
            <button onClick={() => setRole('client')} className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-2.5 rounded-[5px] text-[11px] tracking-wider uppercase hover:brightness-105 transition-all">
              Continue as a Customer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 2: PROFILE INPUT FORM SCREENS ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative w-full bg-[#0a0806] font-['Raleway',sans-serif] antialiased overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dc6b0f_0%,transparent_55%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#bd1c22_0%,transparent_50%)] opacity-15 pointer-events-none z-0" />

      <div className="flex items-center gap-2 absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
        <div className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-[#000000]">
          N
        </div>
        <span className="text-base font-extrabold tracking-wide text-[#FFFFFF]">Nexovate</span>
      </div>

      <div className="w-full max-w-[440px] text-center mt-12 mb-5 z-10 space-y-1">
        <button onClick={() => setRole('select')} className="text-[11px] font-bold text-[#F2A508] hover:underline mb-2 flex items-center gap-1 mx-auto">
          ← Back to paths
        </button>
        <h2 className="text-4xl font-extrabold text-[#FFFFFF] tracking-tight">Create your profile</h2>
      </div>

      <div className="bg-[#1c1a17]/40 border border-white/10 p-8 rounded-[5px] max-w-[440px] w-full backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] z-10">
        {error && <div className="mb-4 p-3 bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold rounded-[5px]">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          
          <button type="button" className="w-full bg-[#000000]/20 hover:bg-[#000000]/40 border border-white/10 text-gray-200 rounded-[5px] py-2.5 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.83 14.99 1 12 1 7.37 1 3.42 3.66 1.48 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.67-4.51z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.5z"/>
              <path fill="#FBBC05" d="M5.33 14.57c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.48 7.22C.54 9.11 0 11.23 0 13.5s.54 4.39 1.48 6.28l3.85-3.21z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.25 0-5.77-1.81-6.67-4.51L1.48 16.8C3.42 20.34 7.37 23 12 23z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-1.5 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-3 text-[10px] text-gray-500 font-extrabold tracking-widest">OR</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div>
            <label className={labelStyles}>Full Name</label>
            <input type="text" placeholder="abc" className={inputStyles} value={formData.full_Name} onChange={e => setFormData({...formData, full_Name: e.target.value})} required />
          </div>

          <div>
            <label className={labelStyles}>Emai address</label>
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
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* --- DEVELOPER SPECIFIC SCREEN PROFILE FIELDS --- */}
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
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </span>
                    <input type="text" placeholder="linkedin.com/in/..." className={`${inputStyles} pl-9`} value={formData.Linkdin_URL} onChange={e => setFormData({...formData, Linkdin_URL: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>GitHub URL</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold tracking-tighter">
                      &lt;/&gt;
                    </span>
                    <input type="text" placeholder="github.com/..." className={`${inputStyles} pl-9`} value={formData.Github_URL} onChange={e => setFormData({...formData, Github_URL: e.target.value})} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* --- ADMIN & CLIENT SPECIFIC SCREEN PROFILE FIELDS --- */}
          {(role === 'client' || role === 'admin') && (
            <div>
              <label className={labelStyles}>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={inputStyles} 
                value={formData.confirmPassword} 
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                required 
              />
            </div>
          )}

          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" required className="mt-0.5 accent-[#DC6B0F] rounded cursor-pointer w-3.5 h-3.5" id="terms" />
            <label htmlFor="terms" className="text-[11px] text-gray-400 font-medium leading-tight cursor-pointer selection:bg-transparent">
              I agree to the <span className="text-[#F2A508] font-bold hover:underline">Terms of Service</span> and <span className="text-[#F2A508] font-bold hover:underline">Privacy Policy</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-3 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg shadow-orange-900/10 active:scale-[0.99] hover:brightness-105 transition-all uppercase mt-2"
          >
            {role === 'developer' ? 'Complete Registration' : 'Create Account'}
          </button>
        </form>
      </div>

      <p className="text-xs text-center text-gray-400 font-semibold tracking-wide mt-6 z-10">
        Already have an account? <Link to="/login" className="text-[#F2A508] hover:underline font-bold ml-1">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;