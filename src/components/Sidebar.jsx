import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  SearchCode, 
  GitMerge, 
  MessageSquareCode, 
  UserRound, 
  LogOut,
  ChevronLeft,
  UserCheck,
  CheckSquare,
  CreditCard,Receipt
} from 'lucide-react';

import logoImg from '../assets/NEXOVATE_WHITE_BG.png';

export default function Sidebar({ userName, userRole, currentView, onViewChange, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const role = userRole?.toLowerCase() || 'developer';
  const roleKey = role === 'customer' || role === 'client' ? 'client' : (role === 'admin' ? 'admin' : 'developer');

  const menuConfig = {
    client: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={14} strokeWidth={2.2} />, path: '/client/dashboard' },
      { id: 'projects', name: 'My projects', icon: <GitMerge size={14} strokeWidth={2.2} />, path: '/client/projects' },
      { id: 'profile', name: 'Profile', icon: <UserRound size={14} strokeWidth={2.2} />, path: '/client/profile' },
      { id: 'messages', name: 'Messages', icon: <MessageSquareCode size={14} strokeWidth={2.2} />, path: '/client/messages' },
    ],
    developer: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={14} strokeWidth={2.2} />, path: '/developer/dashboard' },
      { id: 'projects', name: 'Open Projects', icon: <SearchCode size={14} strokeWidth={2.2} />, path: '/developer/projects' },
      { id: 'my projects', name: 'My Projects', icon: <GitMerge size={14} strokeWidth={2.2} />, path: '/developer/my projects' },
      { id: 'messages', name: 'Messages', icon: <MessageSquareCode size={14} strokeWidth={2.2} />, path: '/developer/messages' },
      { id: 'profile', name: 'Profile', icon: <UserRound size={14} strokeWidth={2.2} />, path: '/developer/profile' }, 
    ],
    admin: [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={14} strokeWidth={2.2} />, path: '/admin/dashboard' },
      { id: 'developer-management', name: 'Developer Management', icon: <UserCheck size={14} strokeWidth={2.2} />, path: '/admin/developer-approval' },
      { id: 'client-management', name: 'Client Management', icon: <UserRound size={14} strokeWidth={2.2} />, path: '/admin/client-management' },
      { id: 'project-approval', name: 'Project approval', icon: <CheckSquare size={14} strokeWidth={2.2} />, path: '/admin/project-approval' },
      { id: 'payment-management', name: 'Payment Management', icon: <CreditCard size={14} strokeWidth={2.2} />, path: '/admin/payment-management' },
      { id: 'payment-history', name: 'Payment History', icon: <Receipt size={14} strokeWidth={2.2} />, path: '/admin/payment-history' },
      { id: 'chat-monitor', name: 'Chat Monitor', icon: <MessageSquareCode size={14} strokeWidth={2.2} />, path: '/admin/chat-monitor' },
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
    <div className="h-screen w-[240px] dark:w-[240px] p-[2px] dark:p-0 bg-gradient-to-b from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] dark:bg-none rounded-tr-[32px] rounded-br-[32px] z-20 shadow-[10px_0_40px_rgba(0,0,0,0.05)] dark:shadow-[10px_0_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      
      <aside className="w-full h-full bg-[#FFF6E9] dark:bg-[#13110f]/20 backdrop-blur-2xl border-r border-black/5 dark:border-white/20 flex flex-col p-3.5 shrink-0 rounded-tr-[30px] rounded-br-[30px] overflow-hidden transition-colors duration-300">
        
        <div className="flex flex-col shrink-0 relative pt-1">
          
          <div className="w-full flex flex-col items-center justify-center py-1 select-none">
            <img 
              src={logoImg} 
              alt="Nexovate Logo" 
              className="w-22 max-h-[60px] object-contain brightness-105" 
            />
          </div>

          <div className="absolute top-1 left-0">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="w-5 h-5 bg-white dark:bg-[#FFFFFF] text-black dark:text-[#000000] rounded-full flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center gap-2.5 px-0.5 shrink-0 mt-4 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#DC6B0F] shadow-xs shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt={userName || "Bilal Ahmed"} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-xs text-gray-900 dark:text-[#FFFFFF] tracking-wide leading-tight transition-colors duration-300">
                {userName || "Bilal Ahmed"}
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5 capitalize opacity-70">
                {roleKey === 'client' ? 'Client' : role}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-0.5 pr-0.5 mb-2 custom-scrollbar text-left">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.id === 'dashboard' && (location.pathname === `/${roleKey}` || location.pathname === `/${roleKey}/`));
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[11px] font-bold tracking-wide transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F2A508]/20 via-[#DC6B0F]/40 to-[#BD1C22]/40 text-black font-extrabold shadow-xs dark:bg-[#d8c3a5]/90 dark:from-transparent dark:to-transparent dark:text-[#000000] dark:shadow-xs'
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

        <div className="shrink-0 mt-auto space-y-2 bg-transparent">
          {isClient && !location.pathname.includes('/dashboard') && (
            <div className="pb-2 border-b border-black/20 dark:border-white/10">
              <button 
                type="button"
                onClick={() => navigate('/client/post-project')} 
                className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-[11px] py-2 rounded-[6px] shadow-xs hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                + New Project
              </button>
            </div>
          )}
          
          <button 
            type="button"
            onClick={handleLogoutClick} 
            className="w-full bg-white dark:bg-[#FFFFFF] text-black dark:text-[#000000] font-bold text-[11px] py-2 rounded-[6px] shadow-xs border border-black/10 dark:border-transparent flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
          >
            <LogOut size={13} strokeWidth={2.2} /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
}