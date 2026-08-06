import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const mockChatMonitorData = [
  {
    id: 1,
    project: "Bon appetit",
    client: "Zain khan",
    developer: "Bilal ahmed",
    date: "29 JUL 2026",
    messages: [
      {
        id: 101,
        sender: "Zain",
        role: "client",
        text: "Hi Bilal! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly. I'd be happy to work on this project.",
        time: "10:45 AM",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      },
      {
        id: 102,
        sender: "Bilal",
        role: "developer",
        text: "Great! One of my main goals is to simplify the booking process and make it mobile-friendly. I'd also like users to easily compare hotels and flight options before making a reservation.",
        time: "10:48 AM",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
      },
      {
        id: 103,
        sender: "Zain",
        role: "client",
        text: "That sounds good. I can implement a modern interface with advanced search and filtering, responsive design, and secure booking features. We can discuss the timeline and any additional requirements before getting started.",
        time: "10:45 AM",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 2,
    project: "Nexus desktop",
    client: "Sara kareem",
    developer: "Zain khan",
    date: "28 JUL 2026",
    messages: [
      {
        id: 201,
        sender: "Sara",
        role: "client",
        text: "Zain, did you review the Figma updates for the analytics dashboard layout?",
        time: "5:50 PM",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
      },
      {
        id: 202,
        sender: "Zain",
        role: "developer",
        text: "Yes Sara! The dark mode toggle and chart components have been updated in the staging branch.",
        time: "6:10 PM",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 3,
    project: "TN-HRMS",
    client: "Rabia ali",
    developer: "Mustafa raza",
    date: "26 JUL 2026",
    messages: [
      {
        id: 301,
        sender: "Rabia",
        role: "client",
        text: "We need to fix the CSV export for monthly payroll records.",
        time: "11:00 AM",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80"
      },
      {
        id: 302,
        sender: "Mustafa",
        role: "developer",
        text: "Got it! I will patch the route and push an update by end of day.",
        time: "11:15 AM",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
      }
    ]
  }
];

export default function ChatMonitor() {
  const [selectedChat, setSelectedChat] = useState(null);

  if (selectedChat) {
    return (
      <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-3 max-w-4xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedChat(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to chat list
          </button>
        </div>

        <div className="p-0 dark:p-2 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border-black/5 shadow-xs dark:shadow-md dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden">
          
          <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[10px] border border-black/10 dark:border-transparent shadow-md dark:shadow-xl overflow-hidden transition-colors duration-300">

            {/* Header Banner */}
            <div className="bg-[#FFF6E9] dark:bg-[#9fa6b2] border-b border-black/10 dark:border-transparent px-4 sm:px-6 py-2.5 flex items-center justify-between text-black font-extrabold text-xs tracking-wider uppercase">
              <span>
                {selectedChat.client} &rarr; {selectedChat.developer}
              </span>
              <span className="text-gray-800 text-[11px]">
                {selectedChat.project}
              </span>
            </div>

            {/* Conversation Window */}
            <div className="bg-[#FFF6E9] dark:bg-[#fcfbf9] p-4 sm:p-6 space-y-5 min-h-[380px] max-h-[480px] overflow-y-auto custom-scrollbar">
              
              {/* Date Divider */}
              <div className="text-center">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  {selectedChat.date}
                </span>
              </div>

              {/* Message Feed */}
              <div className="space-y-4 max-w-2xl mx-auto">
                {selectedChat.messages.map((msg) => {
                  const isIncoming = msg.role === 'client';

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isIncoming ? 'items-start' : 'items-end'}`}
                    >
                      {/* Bubble Container */}
                      <div 
                        className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-3.5 rounded-xl shadow-xs leading-relaxed text-xs font-medium ${
                          isIncoming 
                            ? 'bg-white border border-black/5 dark:border-transparent dark:bg-[#d8d8d8] text-gray-900 rounded-tl-xs' 
                            : 'bg-gradient-to-r from-[#e89d67] to-[#e47d54] text-gray-900 rounded-tr-xs'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Avatar and Timestamp Metadata */}
                      <div className={`flex items-center gap-1.5 mt-1 ${isIncoming ? 'flex-row' : 'flex-row-reverse'}`}>
                        <img 
                          src={msg.avatar} 
                          alt={msg.sender} 
                          className="w-4 h-4 rounded-full object-cover border border-gray-300 shadow-xs"
                        />
                        <span className="text-[9px] font-bold text-gray-500">
                          {msg.sender} &middot; {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // ---------------- MAIN CHAT MONITOR LIST VIEW ----------------
  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4">

      {/* Header Title */}
      <div className="text-left">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Chat monitor
        </h1>
      </div>

      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-black/5 shadow-xs dark:shadow-md dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden">
        
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[8px] sm:rounded-[6px] border border-black/10 dark:border-transparent shadow-xs dark:shadow-xl overflow-hidden transition-colors duration-300">

          <div className="bg-[#FFFaf3]/80 dark:bg-white/80 px-3.5 py-2.5 grid grid-cols-4 items-center border-b border-black/5 dark:border-gray-200/60 text-[10px] font-bold tracking-wider text-gray-600 dark:text-gray-500 uppercase">
            <span className="text-left">PROJECT</span>
            <span className="text-center">CLIENT</span>
            <span className="text-center">DEVELOPER</span>
            <span className="text-right sr-only">ACTION</span>
          </div>

          {/* Table Rows Section */}
          <div className="divide-y divide-gray-300/40 bg-[#FFF6E9] dark:bg-[#EFEEEA]">
            {mockChatMonitorData.map((row) => (
              <div 
                key={row.id} 
                className="px-3.5 py-2.5 grid grid-cols-4 items-center hover:bg-black/[0.02] transition-colors"
              >
                {/* Project Title */}
                <div className="text-left">
                  <h3 className="font-bold text-xs text-black tracking-tight">
                    {row.project}
                  </h3>
                </div>

                {/* Client Name */}
                <div className="text-center">
                  <span className="text-[11px] text-gray-700 font-medium">
                    {row.client}
                  </span>
                </div>

                {/* Developer Name */}
                <div className="text-center">
                  <span className="text-[11px] text-gray-700 font-medium">
                    {row.developer}
                  </span>
                </div>

                {/* Action Link */}
                <div className="text-right">
                  <button 
                    onClick={() => setSelectedChat(row)}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer transition-all inline-block"
                  >
                    View chat
                  </button>
                </div>
              </div>
            ))}

            {mockChatMonitorData.length === 0 && (
              <div className="text-center py-6 text-xs text-gray-500 font-medium">
                No active project chats found.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}