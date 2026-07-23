import React, { useState } from 'react';
import { MessageSquare, Paperclip, Smile, Send } from 'lucide-react';

export default function MessagesDashboard({ userName, userRole }) {
  const chats = [
    { id: 1, name: 'Blue Sky Travel', subtitle: 'Zain: The latest build looks...', icon: '🛫', time: 'Now', active: true, unread: true },
    { id: 2, name: 'Bon Appetit', subtitle: 'Can we discuss the menu animation?', icon: '🍴', time: '2h ago', active: false },
    { id: 3, name: 'AK apparel store', subtitle: 'Payment verified for Phase 3', icon: '🛍️', time: 'Yesterday', active: false },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-6 px-4 sm:px-6 font-['Raleway',sans-serif] flex flex-col h-[calc(100vh-160px)] select-none transition-colors duration-300">
      
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">Blue Sky Travel</h2>
        <p className="text-sm text-gray-500 dark:text-gray-200 font-medium transition-colors duration-300">Booking Engine Redesign</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        
        <div className="bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl flex flex-col h-full overflow-hidden transition-all duration-300">
          <div className="bg-white/40 dark:bg-white rounded-none dark:rounded-t-[5px] px-5 py-3.5 border-b border-black/5 dark:border-gray-200 flex items-center gap-2 text-gray-900 dark:text-black">
            <MessageSquare size={15} strokeWidth={2.5} />
            <h3 className="text-sm font-black tracking-wide">Active Chats</h3>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto space-y-2.5 text-black bg-transparent dark:bg-[#d9d5ce]">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={`border rounded-[5px] p-3 flex gap-3 shadow-sm cursor-pointer transition-all ${
                  chat.active 
                    ? 'bg-emerald-100/90 border-emerald-300' 
                    : 'bg-white/70 border-black/5 hover:bg-white'
                }`}
              >
                <span className="text-xl mt-0.5">{chat.icon}</span>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center mb-0.5">
                    <h6 className="font-extrabold text-xs text-black truncate">{chat.name}</h6>
                    <span className="text-[9px] font-bold text-gray-500 shrink-0">{chat.time}</span>
                  </div>
                  <p className={`text-[11px] truncate ${chat.active ? 'text-emerald-900 font-medium' : 'text-gray-600'}`}>
                    {chat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       <div className="md:col-span-2 bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl flex flex-col h-full overflow-hidden transition-all duration-300">
          
          <div className="p-5 flex-1 overflow-y-auto text-xs space-y-4 flex flex-col text-black bg-transparent dark:bg-[#d9d5ce]">
            
            <div className="self-center my-1">
              <span className="bg-black/10 dark:bg-black/10 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-[5px] text-gray-700 dark:text-gray-600">
                Today
              </span>
            </div>

            <div className="flex gap-3 max-w-[85%] text-left">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-black/20 shrink-0 mt-1">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Zain" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="bg-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium text-gray-900">
                  Hi Bilal! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly. I'd be happy to work on this project.
                </div>
                <span className="text-[9px] font-bold text-gray-600 dark:text-gray-500 ml-1 mt-1 block">Zain • 10:45 AM</span>
              </div>
            </div>

            {/* Outbound Message Row (Gradient stays constant across themes) */}
            <div className="flex flex-col items-end max-w-[85%] self-end text-left">
              <div className="bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium">
                Great! One of my main goals is to simplify the booking process and make it mobile-friendly. I'd also like users to easily compare hotels and flight options before making a reservation.
              </div>
              <span className="text-[9px] font-bold text-gray-600 dark:text-gray-500 mr-1 mt-1 block">You • 10:48 AM</span>
            </div>

            {/* Inbound Message Row 2 */}
            <div className="flex gap-3 max-w-[85%] text-left">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-black/20 shrink-0 mt-1">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Zain" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="bg-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium text-gray-900">
                  That sounds good. I can implement a modern interface with advanced search and filtering, responsive design, and secure booking mechanisms.
                </div>
                <span className="text-[9px] font-bold text-gray-600 dark:text-gray-500 ml-1 mt-1 block">Zain • 10:50 AM</span>
              </div>
            </div>

          </div>

          {/* Input Send Message Tray Layout */}
          <div className="mx-4 mb-4 dark:mx-0 dark:mb-0 bg-white/50 dark:bg-black rounded-[5px] p-2.5 flex items-center gap-3 border border-black/10 dark:border-white/10 transition-colors">
            <button className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white pl-1.5 transition-colors cursor-pointer shrink-0">
              <Paperclip size={14} strokeWidth={2.5} />
            </button>
            <input 
              type="text" 
              placeholder="Write a message..." 
              className="bg-transparent text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none flex-1 font-medium"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                <Smile size={14} strokeWidth={2.5} />
              </button>
              <button className="bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white w-8 h-8 rounded-[5px] flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                <Send size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}