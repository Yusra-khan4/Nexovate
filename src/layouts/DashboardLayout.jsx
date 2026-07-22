import React, { useState, useEffect } from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 

import { ProfileProvider } from '../context/ProfileContext'; 

export default function DashboardLayout({ userName, userRole, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/projects') && !path.includes('/myprojects')) {
      setCurrentView('projects');
    } else if (path.includes('/my%20projects') || path.includes('/my-projects')) {
      setCurrentView('my projects');
    } else if (path.includes('/profile')) {
      setCurrentView('profile');
    } else if (path.includes('/messages')) {
      setCurrentView('messages');
    }else if (path.includes('/post-project')) {
    setCurrentView('post-project');
    } else {
      setCurrentView('dashboard');
    }
  }, [location]);

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

  return (
    <ProfileProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#FFFFFF] text-black dark:bg-[#0a0806] dark:text-white transition-colors duration-300 antialiased relative">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none hidden dark:block">
          <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC6B0F] via-[#DC6B0F]/60 to-transparent blur-[120px] opacity-50" />
          
          <div className="absolute -bottom-[15%] -left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#BD1C22] via-[#BD1C22]/50 to-transparent blur-[140px] opacity-45" />

          <div className="absolute top-[25%] left-[20%] w-[550px] h-[550px] rounded-full bg-radial-gradient from-[#DC6B0F]/30 via-[#BD1C22]/10 to-transparent blur-[100px] opacity-30 mix-blend-plus-lighter" />
        </div>

        <Sidebar 
          userName={userName} 
          userRole={userRole} 
          onLogout={onLogout}
          currentView={currentView}
          onViewChange={(id) => setCurrentView(id)}
        />

        <main className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar relative z-10 flex flex-col">
          
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <Outlet /> 
          </div>
        </main>
      </div>
    </ProfileProvider>
  );
}