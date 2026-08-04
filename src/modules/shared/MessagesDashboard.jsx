import React, { useState } from 'react';
import { MessageSquare, Paperclip, Smile, Send, ArrowLeft } from 'lucide-react';

export default function MessagesDashboard({ userName, userRole }) {
  const [activeChatId, setActiveChatId] = useState(1);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const chats = [
    { id: 1, name: 'Blue Sky Travel', subtitle: 'Zain: The latest build looks...', icon: '🛫', time: 'Now', unread: true },
    { id: 2, name: 'Bon Appetit', subtitle: 'Can we discuss the menu animation?', icon: '🍴', time: '2h ago' },
    { id: 3, name: 'AK apparel store', subtitle: 'Payment verified for Phase 3', icon: '🛍️', time: 'Yesterday' },
  ];

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setShowMobileChat(true);
  };

  return (
    <div className="max-w-4xl sm:max-w-4xl mx-auto pb-4 px-3 sm:px-4 font-['Raleway',sans-serif] flex flex-col min-h-[450px] sm:h-[calc(100vh-180px)] select-none transition-colors duration-300">
      
      <div className="mb-3 sm:mb-4 text-left">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
          {activeChat.name}
        </h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium transition-colors duration-300">
          Booking Engine Redesign
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 min-h-0 relative overflow-hidden">
        
        
        <div className={`bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 sm:dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-xs dark:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 ${
          showMobileChat ? 'hidden md:flex' : 'flex'
        }`}>
          
          <div className="bg-white/40 dark:bg-white rounded-none dark:rounded-t-[4px] px-3.5 py-2.5 border-b border-black/5 dark:border-gray-200 flex items-center gap-1.5 text-gray-900 dark:text-black shrink-0">
            <MessageSquare size={13} strokeWidth={2.2} />
            <h3 className="text-xs font-bold tracking-wide">Active Chats</h3>
          </div>
          
          <div className="p-2 sm:p-2.5 flex-1 overflow-y-auto space-y-1.5 text-black bg-transparent dark:bg-[#d9d5ce]">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)}
                  className={`border rounded-[4px] p-2 sm:p-2.5 flex gap-2 shadow-xs cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-emerald-100/90 border-emerald-300' 
                      : 'bg-white/70 border-black/5 hover:bg-white'
                  }`}
                >
                  <span className="text-base sm:text-lg mt-0.5 shrink-0">{chat.icon}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center mb-0.5 gap-1">
                      <h6 className="font-bold text-xs text-black truncate">{chat.name}</h6>
                      <span className="text-[9px] font-bold text-gray-500 shrink-0">{chat.time}</span>
                    </div>
                    <p className={`text-[10px] truncate ${isActive ? 'text-emerald-900 font-medium' : 'text-gray-600'}`}>
                      {chat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        <div className={`md:col-span-2 bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 sm:dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-xs dark:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 ${
          showMobileChat ? 'flex' : 'hidden md:flex'
        }`}>
          
          <div className="md:hidden bg-white/60 dark:bg-black/30 border-b border-black/5 dark:border-white/10 px-2.5 py-1.5 flex items-center gap-1.5 shrink-0">
            <button 
              type="button"
              onClick={() => setShowMobileChat(false)}
              className="text-[11px] font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <ArrowLeft size={13} strokeWidth={2.2} /> All Conversations
            </button>
          </div>

          <div className="p-2.5 sm:p-4 flex-1 overflow-y-auto text-[11px] space-y-3 flex flex-col text-black bg-transparent dark:bg-[#d9d5ce]">
            
            <div className="self-center my-0.5">
              <span className="bg-black/10 text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-[4px] text-gray-700 dark:text-gray-600">
                Today
              </span>
            </div>

            <div className="flex gap-2 max-w-[92%] sm:max-w-[85%] text-left">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-black/20 shrink-0 mt-0.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Zain" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="bg-white p-2.5 sm:p-3 rounded-[4px] shadow-xs leading-snug font-medium text-gray-900 text-[11px]">
                  Hi Bilal! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly. I'd be happy to work on this project.
                </div>
                <span className="text-[8px] font-bold text-gray-600 dark:text-gray-500 ml-1 mt-0.5 block">Zain • 10:45 AM</span>
              </div>
            </div>

            {/* Outbound Message */}
            <div className="flex flex-col items-end max-w-[92%] sm:max-w-[85%] self-end text-left">
              <div className="bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white p-2.5 sm:p-3 rounded-[4px] shadow-xs leading-snug font-medium text-[11px]">
                Great! One of my main goals is to simplify the booking process and make it mobile-friendly. I'd also like users to easily compare hotels and flight options before making a reservation.
              </div>
              <span className="text-[8px] font-bold text-gray-600 dark:text-gray-500 mr-1 mt-0.5 block">You • 10:48 AM</span>
            </div>

            {/* Inbound Message 2 */}
            <div className="flex gap-2 max-w-[92%] sm:max-w-[85%] text-left">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-black/20 shrink-0 mt-0.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Zain" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="bg-white p-2.5 sm:p-3 rounded-[4px] shadow-xs leading-snug font-medium text-gray-900 text-[11px]">
                  That sounds good. I can implement a modern interface with advanced search and filtering, responsive design, and secure booking mechanisms.
                </div>
                <span className="text-[8px] font-bold text-gray-600 dark:text-gray-500 ml-1 mt-0.5 block">Zain • 10:50 AM</span>
              </div>
            </div>

          </div>

          {/* INPUT SEND MESSAGE TRAY */}
          <div className="m-2 sm:m-3 dark:m-0 bg-white/70 dark:bg-black rounded-[4px] p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 border border-black/10 dark:border-white/10 transition-colors shrink-0">
            <button type="button" className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white pl-0.5 transition-colors cursor-pointer shrink-0">
              <Paperclip size={13} strokeWidth={2.2} />
            </button>
            <input 
              type="text" 
              placeholder="Write a message..." 
              className="bg-transparent text-[11px] text-gray-900 dark:text-white placeholder-gray-500 outline-none flex-1 font-medium"
            />
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer p-0.5">
                <Smile size={13} strokeWidth={2.2} />
              </button>
              <button type="button" className="bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] flex items-center justify-center shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                <Send size={11} strokeWidth={2.2} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}