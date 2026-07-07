import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ userName, userRole, currentView, onViewChange, onLogout }) {
  const navigate = useNavigate();
  
  const role = userRole?.toLowerCase() || 'developer';
  const roleKey = role === 'customer' || role === 'client' ? 'client' : (role === 'admin' ? 'admin' : 'developer');

  const menuConfig = {
    client: [
      { id: 'dashboard', name: 'Dashboard', icon: '🎛️', path: '/client/dashboard' },
      { id: 'projects', name: 'Projects', icon: '📅', path: '/client/projects' },
      { id: 'post-project', name: 'Upload Project', icon: '📝', path: '/client/post-project' },
      { id: 'developers', name: 'Developers', icon: '👥', path: '/client/developers' },
      { id: 'messages', name: 'Messages', icon: '💬', path: '/client/messages' },
      { id: 'notifications', name: 'Notifications', icon: '🔔', path: '/client/notifications' },
      { id: 'settings', name: 'Settings', icon: '⚙️', path: '/client/settings' },
    ],
    developer: [
      { id: 'dashboard', name: 'Dashboard', icon: '🎛️', path: '/developer/dashboard' },
      { id: 'projects', name: 'Projects', icon: '📅', path: '/developer/projects' },
      { id: 'messages', name: 'Messages', icon: '💬', path: '/developer/messages' },
      { id: 'profile', name: 'Profile', icon: '👤', path: '/developer/profile' }, 
      { id: 'notifications', name: 'Notifications', icon: '🔔', path: '/developer/notifications' },
      { id: 'settings', name: 'Settings', icon: '⚙️', path: '/developer/settings' },
    ],
    admin: [
      { id: 'dashboard', name: 'Dashboard', icon: '🎛️', path: '/admin/dashboard' },
      { id: 'user-management', name: 'Users', icon: '👥', path: '/admin/user-management' },
      { id: 'reports', name: 'Reports', icon: '📊', path: '/admin/reports' },
      { id: 'settings', name: 'Settings', icon: '⚙️', path: '/admin/settings' },
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

  return (
    // 🔴 FIXED: Added overflow-hidden to the main sidebar container shell framework
    <aside className="w-[260px] h-screen bg-[#13110f]/40 backdrop-blur-xl border-r border-white/10 flex flex-col p-4 shrink-0 z-20 font-['Raleway',sans-serif] rounded-tr-[40px] rounded-br-[40px] shadow-[10px_0_50px_rgba(0,0,0,0.3)] overflow-hidden">
      
      {/* HEADER AVATAR LOGO SECTION WRAPPER */}
      <div className="flex flex-col space-y-4 shrink-0 mb-2">
        <div>
          <button className="w-8 h-8 bg-[#FFFFFF] text-[#000000] rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
            <span className="font-sans font-bold text-base select-none">‹</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-1 shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#DC6B0F] shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt={userName || "Bilal"} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#FFFFFF] tracking-wide leading-tight">
              {userName || "Customer"}
            </h4>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5 capitalize">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* 🔴 FIXED: Wrapped the middle nav list menu configuration panel with flex-grow and custom scrolling */}
      <nav className="flex-1 overflow-y-auto space-y-1.5 pr-1 mb-2 custom-scrollbar text-left">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-[5px] text-xs font-bold tracking-wide transition-all text-left ${
                isActive
                  ? 'bg-[#e3ded7] text-[#000000] shadow-md font-extrabold'
                  : 'text-gray-300 hover:bg-white/[0.04] hover:text-[#FFFFFF]'
              }`}
            >
              <span className="text-base filter drop-shadow-sm">{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* FOOTER INTERACTION BAR PLATFORM ACTIONS DECK */}
      {/* 🔴 FIXED: Wrapped with shrink-0 and mt-auto to completely secure layout bounding fields */}
      <div className="shrink-0 mt-auto pt-3 border-t border-white/10 space-y-1.5 bg-transparent">
        <button 
          onClick={() => navigate(isClient ? '/client/post-project' : '/developer/open-projects')} 
          className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-xs py-3 rounded-[5px] shadow-[0_4px_15px_rgba(220,107,15,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
        >
          {isClient ? '+ Post a Project' : 'Open Projects'}
        </button>

        <div className="border-t border-white/10 my-2" />
        
        <button className="w-full flex items-center gap-3 px-4 py-1 text-xs text-gray-400 font-semibold hover:text-[#FFFFFF] transition-colors">
          <span className="text-sm">❓</span> Help Center
        </button>

        <button 
          onClick={() => onLogout && onLogout()} 
          className="w-full bg-[#FFFFFF] text-[#000000] font-bold text-xs py-2.5 rounded-[5px] shadow-md flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-[0.99] transition-all"
        >
          <span className="text-xs text-[#BD1C22] font-black">▍</span> Logout
        </button>
      </div>
    </aside>
  );
}