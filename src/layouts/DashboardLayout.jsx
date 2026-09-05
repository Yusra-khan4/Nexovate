import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 

import { ProfileProvider } from '../context/ProfileContext'; 
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({ userName, userRole, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    } else if (path.includes('/post-project')) {
      setCurrentView('post-project');
    } else {
      setCurrentView('dashboard');
    }

    // Reset search query on page transition
    setSearchQuery('');
    setIsMobileOpen(false);
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
      <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-transparent text-black dark:text-white transition-colors duration-300 antialiased relative">
        
        <div className="md:hidden flex items-center justify-between px-5 py-3 border-b border-black/10 dark:border-white/10 bg-[#fcf7ee]/80 dark:bg-[#120f0d]/80 backdrop-blur-md z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-extrabold text-sm tracking-wider text-gray-900 dark:text-white">
              NEXOVATE
            </span>
          </div>
        </div>

        {isMobileOpen && (
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          />
        )}

        <div 
          className={`
            fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out shrink-0
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <Sidebar 
            userName={userName} 
            userRole={userRole} 
            onLogout={onLogout}
            currentView={currentView}
            onViewChange={(id) => {
              setCurrentView(id);
              setIsMobileOpen(false);
            }}
          />
        </div>

        <main className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar relative z-10 flex flex-col">
          <Navbar 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
            <Outlet context={{ searchQuery }} /> 
          </div>
        </main>

      </div>
    </ProfileProvider>
  );
}