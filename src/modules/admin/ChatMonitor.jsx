import React, { useState, useEffect } from 'react';
import { Loader2, Send, LifeBuoy, SearchCode, UserRound } from 'lucide-react';
import { fetchAllChats } from '../../services/api';

const fallbackClientSupportChats = [
  {
    id: 1,
    name: "Zara Ahmed",
    subtitle: "Brand · onboarding question",
    time: "9:42 AM",
    unread: 2,
    initials: "ZA",
    messages: [
      { sender: "Zara Ahmed", text: "Hi! We submitted our brand application two days ago.", time: "9:38 AM", role: "client" },
      { sender: "Zara Ahmed", text: "How long does brand verification usually take?", time: "9:42 AM", role: "client" }
    ]
  },
  {
    id: 2,
    name: "Rabia Ali",
    subtitle: "Payment · escrow dispute inquiry",
    time: "Yesterday",
    unread: 0,
    initials: "RA",
    messages: [
      { sender: "Rabia Ali", text: "Thanks for clearing up the escrow deposit rules!", time: "10:15 AM", role: "client" }
    ]
  }
];

const fallbackDeveloperSupportChats = [
  {
    id: 101,
    name: "Bilal Ahmed",
    subtitle: "Developer · profile approval",
    time: "11:05 AM",
    unread: 1,
    initials: "BA",
    messages: [
      { sender: "Bilal Ahmed", text: "Hello admin, when will my developer profile get verified?", time: "11:05 AM", role: "developer" }
    ]
  },
  {
    id: 102,
    name: "Zain Khan",
    subtitle: "Tech Stack · project matching",
    time: "Tue",
    unread: 0,
    initials: "ZK",
    messages: [
      { sender: "Zain Khan", text: "Can I update my portfolio link on my dashboard?", time: "2:20 PM", role: "developer" }
    ]
  }
];

export default function ChatMonitor() {
  const [activeMainTab, setActiveMainTab] = useState('support'); // 'support' | 'disputes'
  const [supportSubTab, setSupportSubTab] = useState('client'); // 'client' | 'developer'
  
  const [clientChats, setClientChats] = useState(fallbackClientSupportChats);
  const [developerChats, setDeveloperChats] = useState(fallbackDeveloperSupportChats);
  const [disputeChats, setDisputeChats] = useState([]);

  const [activeChat, setActiveChat] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetchAllChats();
      } catch (err) {
        console.warn("Using fallback support threads:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeMainTab === 'support') {
      if (supportSubTab === 'client' && clientChats.length > 0) {
        setActiveChat(clientChats[0]);
      } else if (supportSubTab === 'developer' && developerChats.length > 0) {
        setActiveChat(developerChats[0]);
      }
    } else {
      if (disputeChats.length > 0) {
        setActiveChat(disputeChats[0]);
      } else {
        setActiveChat(null);
      }
    }
  }, [activeMainTab, supportSubTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    const newMsg = {
      sender: "Admin (You)",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'admin'
    };

    const updateList = (list) =>
      list.map(c => c.id === activeChat.id ? { ...c, messages: [...c.messages, newMsg] } : c);

    if (activeMainTab === 'support') {
      if (supportSubTab === 'client') {
        const updated = updateList(clientChats);
        setClientChats(updated);
        setActiveChat(updated.find(c => c.id === activeChat.id));
      } else {
        const updated = updateList(developerChats);
        setDeveloperChats(updated);
        setActiveChat(updated.find(c => c.id === activeChat.id));
      }
    } else {
      const updated = updateList(disputeChats);
      setDisputeChats(updated);
      setActiveChat(updated.find(c => c.id === activeChat.id));
    }

    setReplyText('');
  };

  const currentSidebarList = activeMainTab === 'support' 
    ? (supportSubTab === 'client' ? clientChats : developerChats) 
    : disputeChats;

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] max-w-6xl mx-auto pb-6 px-2 sm:px-4 text-left select-none">
      
      {/* Main Support / Disputes Container Card matching project theme */}
      <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/90 border border-black/10 dark:border-white/15 rounded-[16px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] max-h-[640px]">
        
        {/* LEFT SIDEBAR PANEL */}
        <div className="md:col-span-4 border-r border-black/10 dark:border-white/10 flex flex-col bg-white/40 dark:bg-[#13110f]/40">
          
          {/* Top Main Tabs (Support vs Disputes) */}
          <div className="p-3 border-b border-black/10 dark:border-white/10 flex items-center gap-2">
            <button
              onClick={() => setActiveMainTab('support')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMainTab === 'support'
                  ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white shadow-xs'
                  : 'bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <LifeBuoy size={13} /> Support
            </button>

            <button
              onClick={() => setActiveMainTab('disputes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMainTab === 'disputes'
                  ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white shadow-xs'
                  : 'bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              Disputes
            </button>
          </div>

          {/* Under Support: Sub-options for Client and Developer */}
          {activeMainTab === 'support' && (
            <div className="px-3 py-2 bg-white/30 dark:bg-white/5 border-b border-black/10 dark:border-white/10 flex items-center gap-1.5">
              <button
                onClick={() => setSupportSubTab('client')}
                className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                  supportSubTab === 'client'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                    : 'text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <UserRound size={11} /> Client
              </button>

              <button
                onClick={() => setSupportSubTab('developer')}
                className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                  supportSubTab === 'developer'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                    : 'text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <SearchCode size={11} /> Developer
              </button>
            </div>
          )}

          {/* Conversation List Sidebar */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/5 dark:divide-white/5 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-500 gap-2">
                <Loader2 size={16} className="animate-spin text-[#DC6B0F]" />
                <span className="text-xs font-medium">Loading threads...</span>
              </div>
            ) : currentSidebarList.length > 0 ? (
              currentSidebarList.map((chat) => {
                const isSelected = activeChat?.id === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-[#FFE8CC] dark:bg-white/10 border-l-4 border-[#DC6B0F]' 
                        : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {chat.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white truncate">{chat.name}</h4>
                        <span className="text-[10px] text-gray-500 shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 truncate mt-0.5">{chat.subtitle}</p>
                    </div>

                    {chat.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#DC6B0F] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-xs text-gray-500 px-4">
                No active {activeMainTab === 'support' ? supportSubTab : 'dispute'} threads available.
              </div>
            )}
          </div>

        </div>

        {/* RIGHT CHAT WINDOW PANEL */}
        <div className="md:col-span-8 flex flex-col bg-[#FFF6E9] dark:bg-[#1a1815]">
          
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-white/60 dark:bg-[#1a1815]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {activeChat.initials}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">{activeChat.name}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{activeChat.subtitle}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                  Unresolved
                </span>
              </div>

              {/* Message Flow Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-white/40 dark:bg-[#13110f]/20">
                {activeChat.messages.map((msg, index) => {
                  const isAdmin = msg.role === 'admin';
                  return (
                    <div key={index} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">
                        {msg.sender}
                      </span>
                      <div className={`max-w-[75%] p-3.5 rounded-xl text-xs font-medium leading-relaxed shadow-xs ${
                        isAdmin
                          ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white rounded-tr-xs'
                          : 'bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-gray-900 dark:text-white rounded-tl-xs'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Bar */}
              {activeMainTab === 'support' ? (
                <form onSubmit={handleSendMessage} className="p-3 bg-white/80 dark:bg-[#1a1815] border-t border-black/10 dark:border-white/10 flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type a reply..."
                    className="flex-1 bg-white dark:bg-black/30 border border-gray-300 dark:border-white/15 rounded-lg h-10 px-3.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] font-medium"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white flex items-center justify-center shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-black/20 border-t border-black/10 dark:border-white/10 text-center text-[11px] font-bold text-gray-500">
                  🔒 Monitoring only — admin cannot post in dispute threads.
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-gray-400 p-6 text-center">
              Select a conversation from the sidebar to inspect messages.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}