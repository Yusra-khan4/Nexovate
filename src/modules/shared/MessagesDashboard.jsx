import React, { useState, useEffect } from 'react';
import { MessageSquare, Paperclip, Smile, Send, ArrowLeft, ShieldCheck, Users, FileText, X } from 'lucide-react';

export default function MessagesDashboard({ userName, userRole }) {
  // Determine role: checks prop first, then fallbacks to localStorage session
  const activeRole = (() => {
    if (userRole) return userRole.toLowerCase();
    try {
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      if (stored.role) return stored.role.toLowerCase();
      if (localStorage.getItem('developerId')) return 'developer';
      if (localStorage.getItem('clientId')) return 'client';
    } catch {
      // fallback default
    }
    return 'client';
  })();

  const isDeveloper = activeRole === 'developer';

  // Sub-tab: 'admin' vs peer ('client' for developers, 'developer' for clients)
  const peerTabKey = isDeveloper ? 'client' : 'developer';
  const [activeTab, setActiveTab] = useState(peerTabKey);

  // Inbound / Outbound message repository
  const [chatConversations, setChatConversations] = useState({
    // Conversations for Developer Module
    developer: {
      admin: [
        {
          id: 'dev-admin-1',
          name: 'Nexovate Admin Support',
          projectSubtitle: 'Platform Compliance & Verification',
          icon: '🛡️',
          time: '10:15 AM',
          unread: false,
          partnerRole: 'Admin Support',
          messages: [
            { id: 1, sender: 'Nexovate Admin', role: 'admin', text: 'Hello! Your developer profile and verification credentials have been approved.', time: '10:10 AM' },
            { id: 2, sender: 'You', role: 'user', text: 'Thank you! When will milestone payouts be disbursed to escrow?', time: '10:12 AM' },
            { id: 3, sender: 'Nexovate Admin', role: 'admin', text: 'Escrow payments are disbursed immediately once the client marks milestone deliverables approved.', time: '10:15 AM' }
          ]
        }
      ],
      client: [
        {
          id: 'dev-client-1',
          name: 'Blue Sky Travel',
          partnerName: 'Yusra Khan',
          projectSubtitle: 'Booking Engine Redesign',
          icon: '🛫',
          time: 'Now',
          unread: true,
          partnerRole: 'Client',
          messages: [
            { id: 1, sender: 'Yusra Khan', role: 'partner', text: 'Hi! I reviewed the latest build for Blue Sky Travel. The hotel filter is working great!', time: '10:45 AM' },
            { id: 2, sender: 'You', role: 'user', text: 'Awesome! We are now finishing the flight comparison checkout flows.', time: '10:48 AM' },
            { id: 3, sender: 'Yusra Khan', role: 'partner', text: 'Sounds good. Let me know once you submit milestone 3 for review.', time: '10:50 AM' }
          ]
        },
        {
          id: 'dev-client-2',
          name: 'Bon Appetit',
          partnerName: 'Zara Ahmed',
          projectSubtitle: 'Restaurant Ordering & POS',
          icon: '🍴',
          time: '2h ago',
          unread: false,
          partnerRole: 'Client',
          messages: [
            { id: 1, sender: 'Zara Ahmed', role: 'partner', text: 'Can we discuss the menu animation before deploying to staging?', time: '8:30 AM' },
            { id: 2, sender: 'You', role: 'user', text: 'Sure thing, I can add a smooth fade-in for the dishes list.', time: '8:45 AM' }
          ]
        },
        {
          id: 'dev-client-3',
          name: 'AK Apparel Store',
          partnerName: 'Rabia Ali',
          projectSubtitle: 'E-Commerce Mobile Application',
          icon: '🛍️',
          time: 'Yesterday',
          unread: false,
          partnerRole: 'Client',
          messages: [
            { id: 1, sender: 'Rabia Ali', role: 'partner', text: 'Phase 2 deliverables look solid. Escrow funds verified.', time: 'Yesterday' }
          ]
        }
      ]
    },

    // Conversations for Client Module
    client: {
      admin: [
        {
          id: 'client-admin-1',
          name: 'Nexovate Admin Support',
          projectSubtitle: 'Escrow & Project Support',
          icon: '🛡️',
          time: '9:30 AM',
          unread: false,
          partnerRole: 'Admin Support',
          messages: [
            { id: 1, sender: 'Nexovate Admin', role: 'admin', text: 'Welcome to Nexovate! How can we assist with your project scope or escrow deposits?', time: '9:25 AM' },
            { id: 2, sender: 'You', role: 'user', text: 'Hi, I just wanted to verify if funds are safely held until milestone completion.', time: '9:28 AM' },
            { id: 3, sender: 'Nexovate Admin', role: 'admin', text: 'Yes, your funds remain secure in escrow until you approve each delivered milestone.', time: '9:30 AM' }
          ]
        }
      ],
      developer: [
        {
          id: 'client-dev-1',
          name: 'Blue Sky Travel',
          partnerName: 'Zain Khan',
          projectSubtitle: 'Booking Engine Redesign',
          icon: '🛫',
          time: 'Now',
          unread: true,
          partnerRole: 'Developer',
          messages: [
            { id: 1, sender: 'Zain Khan', role: 'partner', text: "Hi! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly.", time: '10:45 AM' },
            { id: 2, sender: 'You', role: 'user', text: "Great! One of my main goals is to simplify the booking process and make it mobile-friendly. I'd also like users to easily compare hotels and flight options before making a reservation.", time: '10:48 AM' },
            { id: 3, sender: 'Zain Khan', role: 'partner', text: 'That sounds good. I can implement a modern interface with advanced search and filtering, responsive design, and secure booking mechanisms.', time: '10:50 AM' }
          ]
        },
        {
          id: 'client-dev-2',
          name: 'Bon Appetit',
          partnerName: 'Bilal Ahmed',
          projectSubtitle: 'Restaurant Ordering & POS',
          icon: '🍴',
          time: '2h ago',
          unread: false,
          partnerRole: 'Developer',
          messages: [
            { id: 1, sender: 'Bilal Ahmed', role: 'partner', text: 'The food menu integration and backend database are complete. Please check the review link.', time: '11:15 AM' }
          ]
        },
        {
          id: 'client-dev-3',
          name: 'AK Apparel Store',
          partnerName: 'Mustafa Raza',
          projectSubtitle: 'E-Commerce Mobile Application',
          icon: '🛍️',
          time: 'Yesterday',
          unread: false,
          partnerRole: 'Developer',
          messages: [
            { id: 1, sender: 'Mustafa Raza', role: 'partner', text: 'Payment received in escrow for Phase 3! Beginning push notification system.', time: 'Yesterday' }
          ]
        }
      ]
    }
  });

  const currentRoleChats = chatConversations[isDeveloper ? 'developer' : 'client'] || {};
  const currentTabChats = currentRoleChats[activeTab] || [];

  const [activeChatId, setActiveChatId] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  // Switch active conversation when tab changes
  useEffect(() => {
    if (currentTabChats.length > 0) {
      setActiveChatId(currentTabChats[0].id);
    } else {
      setActiveChatId(null);
    }
  }, [activeTab]);

  const activeChat = currentTabChats.find(c => c.id === activeChatId) || currentTabChats[0];

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setShowMobileChat(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((!typedMessage.trim() && !attachedFile) || !activeChat) return;

    let messageText = typedMessage.trim();
    if (attachedFile) {
      messageText = messageText 
        ? `${messageText}\n[Attached File: ${attachedFile.name}]` 
        : `[Attached File: ${attachedFile.name}]`;
    }

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      role: 'user',
      text: messageText,
      fileName: attachedFile ? attachedFile.name : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatConversations(prev => {
      const roleKey = isDeveloper ? 'developer' : 'client';
      const updatedTabList = prev[roleKey][activeTab].map(chat => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            time: 'Now',
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      });

      return {
        ...prev,
        [roleKey]: {
          ...prev[roleKey],
          [activeTab]: updatedTabList
        }
      };
    });

    setTypedMessage('');
    setAttachedFile(null);
  };

  return (
    <div className="max-w-4xl sm:max-w-4xl mx-auto pb-4 px-3 sm:px-4 font-['Raleway',sans-serif] flex flex-col min-h-[450px] sm:h-[calc(100vh-180px)] select-none transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="mb-3 sm:mb-4 text-left">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
          {activeChat ? (
            activeChat.partnerName 
              ? `${activeChat.name} - ${activeChat.partnerName}` 
              : activeChat.name
          ) : 'Messages'}
        </h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium transition-colors duration-300">
          {activeChat?.projectSubtitle || 'Collaborate with your project team and admin support in real-time'}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 min-h-0 relative overflow-hidden">
        
        {/* LEFT SIDEBAR: Active Chats & Role Tabs */}
        <div className={`bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 sm:dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-xs dark:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 ${
          showMobileChat ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Active Chats Header */}
          <div className="bg-white/40 dark:bg-white rounded-none dark:rounded-t-[4px] px-3.5 py-2.5 border-b border-black/5 dark:border-gray-200 flex items-center gap-1.5 text-gray-900 dark:text-black shrink-0">
            <MessageSquare size={13} strokeWidth={2.2} />
            <h3 className="text-xs font-bold tracking-wide">Active Chats</h3>
          </div>

          {/* Module Switcher Tabs */}
          <div className="p-2 bg-black/[0.02] dark:bg-black/20 border-b border-black/5 dark:border-white/10 shrink-0">
            <div className="flex rounded-[6px] bg-white/70 dark:bg-black/40 p-1 border border-black/5 dark:border-white/10 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-1.5 px-2 rounded-[4px] text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <ShieldCheck size={12} strokeWidth={2.5} />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab(peerTabKey)}
                className={`flex-1 py-1.5 px-2 rounded-[4px] text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer capitalize ${
                  activeTab === peerTabKey
                    ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <Users size={12} strokeWidth={2.5} />
                <span>{isDeveloper ? 'Clients' : 'Developers'}</span>
              </button>
            </div>
          </div>
          
          {/* Thread List */}
          <div className="p-2 sm:p-2.5 flex-1 overflow-y-auto space-y-1.5 text-black bg-transparent dark:bg-[#d9d5ce]">
            {currentTabChats.map((chat) => {
              const isActive = chat.id === activeChatId;
              const displayTitle = chat.partnerName ? `${chat.name} - ${chat.partnerName}` : chat.name;

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
                      <h6 className="font-bold text-xs text-black truncate" title={displayTitle}>
                        {displayTitle}
                      </h6>
                      <span className="text-[9px] font-bold text-gray-500 shrink-0">{chat.time}</span>
                    </div>
                    <p className={`text-[10px] truncate ${isActive ? 'text-emerald-900 font-medium' : 'text-gray-600'}`}>
                      {chat.projectSubtitle}
                    </p>
                  </div>
                </div>
              );
            })}

            {currentTabChats.length === 0 && (
              <div className="text-center py-10 text-xs text-gray-500 font-medium">
                No active conversations with {activeTab === 'admin' ? 'admin support' : (isDeveloper ? 'clients' : 'developers')}.
              </div>
            )}
          </div>

        </div>

        {/* RIGHT CHAT WINDOW */}
        <div className={`md:col-span-2 bg-[#FFF6E9] dark:bg-white/10 border border-black/5 dark:border-white/15 p-0 dark:p-6 sm:dark:p-6 rounded-[8px] dark:backdrop-blur-md shadow-xs dark:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 ${
          showMobileChat ? 'flex' : 'hidden md:flex'
        }`}>
          
          {/* Mobile Back Button Tray */}
          <div className="md:hidden bg-white/60 dark:bg-black/30 border-b border-black/5 dark:border-white/10 px-2.5 py-1.5 flex items-center gap-1.5 shrink-0">
            <button 
              type="button"
              onClick={() => setShowMobileChat(false)}
              className="text-[11px] font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <ArrowLeft size={13} strokeWidth={2.2} /> All Conversations
            </button>
          </div>

          {activeChat ? (
            <>
              {/* Message Flow Body */}
              <div className="p-2.5 sm:p-4 flex-1 overflow-y-auto text-[11px] space-y-3 flex flex-col text-black bg-transparent dark:bg-[#d9d5ce] custom-scrollbar">
                
                <div className="self-center my-0.5">
                  <span className="bg-black/10 text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-[4px] text-gray-700 dark:text-gray-600">
                    Project Discussion
                  </span>
                </div>

                {activeChat.messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[92%] sm:max-w-[85%] ${
                        isUser ? 'items-end self-end' : 'items-start self-start'
                      } text-left`}
                    >
                      <div className={`p-2.5 sm:p-3 rounded-[4px] shadow-xs leading-snug font-medium text-[11px] ${
                        isUser
                          ? 'bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white'
                          : 'bg-white text-gray-900 border border-black/5'
                      }`}>
                        {msg.fileName && (
                          <div className={`flex items-center gap-1.5 mb-1.5 p-1.5 rounded bg-black/10 text-[10px] font-bold ${isUser ? 'text-white' : 'text-gray-800'}`}>
                            <FileText size={14} />
                            <span className="truncate">{msg.fileName}</span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text.replace(/\[Attached File:.*?\]/g, '').trim()}</p>
                      </div>
                      <span className="text-[8px] font-bold text-gray-600 dark:text-gray-500 mt-0.5 px-1 block">
                        {msg.sender} • {msg.time}
                      </span>
                    </div>
                  );
                })}

              </div>

              {/* ATTACHMENT PREVIEW TRAY */}
              {attachedFile && (
                <div className="px-3 py-1.5 bg-amber-100/90 border-t border-amber-200 flex items-center justify-between text-[11px] font-bold text-amber-900 shrink-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <FileText size={13} />
                    <span className="truncate">Attached: {attachedFile.name}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setAttachedFile(null)} 
                    className="hover:text-red-700 cursor-pointer p-0.5"
                    title="Remove attachment"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* INPUT SEND MESSAGE TRAY */}
              <form 
                onSubmit={handleSendMessage}
                className="m-2 sm:m-3 dark:m-0 bg-white/70 dark:bg-black rounded-[4px] p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 border border-black/10 dark:border-white/10 transition-colors shrink-0"
              >
                <label className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white pl-0.5 transition-colors cursor-pointer shrink-0" title="Attach file">
                  <Paperclip size={13} strokeWidth={2.2} />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>

                <input 
                  type="text" 
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder={`Write a message to ${activeChat.partnerName || activeChat.name}...`} 
                  className="bg-transparent text-[11px] text-gray-900 dark:text-white placeholder-gray-500 outline-none flex-1 font-medium"
                />

                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" className="text-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer p-0.5">
                    <Smile size={13} strokeWidth={2.2} />
                  </button>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] flex items-center justify-center shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send size={11} strokeWidth={2.2} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-gray-500">
              Select a conversation to start messaging
            </div>
          )}

        </div>

      </div>

    </div>
  );
}