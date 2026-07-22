import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  SearchCode, 
  GitMerge, 
  MessageSquareCode, 
  UserRound, 
  LogOut,
  ChevronLeft
} from 'lucide-react';

import logoImg from '../assets/NEXOVATE WHITE BG.png';
export default function Sidebar({ userName, userRole, currentView, onViewChange, onLogout }) {
  const navigate = useNavigate();
  
  const role = userRole?.toLowerCase() || 'developer';
  const roleKey = role === 'customer' || role === 'client' ? 'client' : (role === 'admin' ? 'admin' : 'developer');

  const menuConfig = {
    client: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={15} strokeWidth={2.5} />, path: '/client/dashboard' },
      { id: 'projects', name: 'My projects', icon: <GitMerge size={15} strokeWidth={2.5} />, path: '/client/projects' },
      { id: 'profile', name: 'Profile', icon: <UserRound size={15} strokeWidth={2.5} />, path: '/client/profile' },
      { id: 'messages', name: 'Messages', icon: <MessageSquareCode size={15} strokeWidth={2.5} />, path: '/client/messages' },
    ],
    developer: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={15} strokeWidth={2.5} />, path: '/developer/dashboard' },
      { id: 'projects', name: 'Open Projects', icon: <SearchCode size={15} strokeWidth={2.5} />, path: '/developer/projects' },
      { id: 'my projects', name: 'My Projects', icon: <GitMerge size={15} strokeWidth={2.5} />, path: '/developer/my projects' },
      { id: 'messages', name: 'Messages', icon: <MessageSquareCode size={15} strokeWidth={2.5} />, path: '/developer/messages' },
      { id: 'profile', name: 'Profile', icon: <UserRound size={15} strokeWidth={2.5} />, path: '/developer/profile' }, 
    ],
    admin: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={15} strokeWidth={2.5} />, path: '/admin/dashboard' },
      { id: 'user-management', name: 'Users', icon: <UserRound size={15} strokeWidth={2.5} />, path: '/admin/user-management' },
      { id: 'messages', name: 'Messages', icon: <MessageSquareCode size={15} strokeWidth={2.5} />, path: '/admin/messages' },
    ]
  };

  const menuItems = menuConfig[roleKey];
  const isClient = roleKey === 'client';

  const handleItemClick = (item) => {
    if (onViewChange) onViewChange(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('developerId');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="h-screen w-[262px] dark:w-[260px] p-[2px] dark:p-0 bg-gradient-to-b from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] dark:bg-none rounded-tr-[42px] rounded-br-[42px] z-20 shadow-[10px_0_50px_rgba(0,0,0,0.06)] dark:shadow-[10px_0_50px_rgba(0,0,0,0.3)] transition-all duration-300">
      
      <aside className="w-full h-full bg-[#fcf7ee] dark:bg-[#13110f]/40 backdrop-blur-xl border-r border-black/5 dark:border-white/10 flex flex-col p-5 shrink-0 rounded-tr-[40px] rounded-br-[40px] overflow-hidden transition-colors duration-300">
        
        <div className="flex flex-col shrink-0 relative pt-2">
          
<div className="w-full flex flex-col items-center justify-center py-2 select-none">
              <img 
              src={logoImg} 
              alt="Nexovate Logo" 
className="w-28 max-h-[80px] object-contain mix-blend-multiply dark:mix-blend-normal brightness-105"            />
          </div>

          <div className="absolute top-2 left-0">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="w-7 h-7 bg-white dark:bg-[#FFFFFF] text-black dark:text-[#000000] rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center gap-3 px-1 shrink-0 mt-8 mb-6">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#DC6B0F] shadow-sm shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt={userName || "Bilal Ahmed"} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm text-gray-900 dark:text-[#FFFFFF] tracking-wide leading-tight transition-colors duration-300">
                {userName || "Bilal Ahmed"}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5 capitalize opacity-70">
                {roleKey === 'client' ? 'Client' : role}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1 pr-1 mb-4 custom-scrollbar text-left">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-[8px] text-xs font-bold tracking-wide transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F2A508]/20 via-[#DC6B0F]/40 to-[#BD1C22]/40 text-black font-extrabold shadow-sm dark:bg-[#d8c3a5]/90 dark:from-transparent dark:to-transparent dark:text-[#000000] dark:shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-black dark:hover:text-[#FFFFFF]'
                }`}
              >
                <span className={`transition-all duration-150 shrink-0 ${isActive ? 'text-black opacity-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 mt-auto space-y-4 bg-transparent">
          
          {/* 🎯 CHANGED LOGIC: Only show "+ New Project" if it is a client AND they are not on the dashboard view */}
          {isClient && currentView !== 'dashboard' && (
            <div className="pb-4 border-b border-black/30 dark:border-white/10">
              <button 
                type="button"
                onClick={() => navigate('/client/post-project')} 
                className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-xs py-3 rounded-[8px] shadow-[0_4px_20px_rgba(220,107,15,0.25)] hover:brightness-115 active:scale-[0.98] transition-all cursor-pointer"
              >
                + New Project
              </button>
            </div>
          )}
          
          <button 
            type="button"
            onClick={handleLogoutClick} 
            className="w-full bg-white dark:bg-[#FFFFFF] text-black dark:text-[#000000] font-bold text-xs py-2.5 rounded-[8px] shadow-md border border-black/10 dark:border-transparent flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
          >
            <LogOut size={14} strokeWidth={2.5} /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
}