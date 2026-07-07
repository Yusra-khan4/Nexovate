import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all registration parameters.');
      return;
    }
    
    setError(''); 

    try {
      const data = await loginUser(email, password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const devId = data.user?._id || data.user?.id || data.id;
      if (devId) {
        localStorage.setItem('developerId', devId);
      }

      if (data.user.role?.toLowerCase() === 'developer') {
        navigate('/developer/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative w-full bg-[#0a0806] font-['Raleway',sans-serif] antialiased overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dc6b0f_0%,transparent_55%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#bd1c22_0%,transparent_50%)] opacity-15 pointer-events-none z-0" />

      <div className="flex items-center gap-2 absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
        <div className="w-6 h-6 bg-[#F2A508] rounded-[5px] flex items-center justify-center font-black text-xs text-[#000000]">
          N
        </div>
        <span className="text-base font-extrabold tracking-wide text-[#FFFFFF]">Nexovate</span>
      </div>

      <div className="w-full max-w-[440px] z-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-[#FFFFFF] tracking-tight">Welcome back</h2>
          <p className="text-xs text-gray-400 font-medium">Enter your credentials to access your dashboard.</p>
        </div>

        <div className="bg-[#1c1a17]/40 border border-white/10 rounded-[5px] p-8 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold rounded-[5px]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="text-left space-y-1.5">
              <label className="block text-xs font-bold text-[#FFFFFF] tracking-wide">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-[#000000]/30 border border-white/10 rounded-[5px] py-3 pl-10 pr-4 text-xs text-[#FFFFFF] placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-all font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="text-left space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-[#FFFFFF] tracking-wide">Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[11px] font-bold text-[#F2A508] hover:underline"
                >
                  Forgot Password?
                </button>              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[#000000]/30 border border-white/10 rounded-[5px] py-3 pl-10 pr-10 text-xs text-[#FFFFFF] placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-all font-medium"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FFFFFF] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-500 font-extrabold tracking-widest">OR</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button type="button" className="w-full bg-[#000000]/20 hover:bg-[#000000]/40 border border-white/10 text-gray-200 rounded-[5px] py-2.5 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.83 14.99 1 12 1 7.37 1 3.42 3.66 1.48 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.67-4.51z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.5z" />
                <path fill="#FBBC05" d="M5.33 14.57c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.48 7.22C.54 9.11 0 11.23 0 13.5s.54 4.39 1.48 6.28l3.85-3.21z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.25 0-5.77-1.81-6.67-4.51L1.48 16.8C3.42 20.34 7.37 23 12 23z" />
              </svg>
              Continue with Google
            </button>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-3 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg shadow-orange-900/10 active:scale-[0.99] hover:brightness-105 transition-all uppercase"
            >
              Login In
            </button>
          </form>
        </div>

        <p className="text-xs text-center text-gray-400 font-semibold tracking-wide">
          Don't have an account? <Link to="/register" className="text-[#F2A508] hover:underline font-bold ml-1">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;