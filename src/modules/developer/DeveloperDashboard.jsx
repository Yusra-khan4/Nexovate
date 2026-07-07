import React, { useState, useEffect } from "react";

import { apiService } from "../../api/apiClient";

export default function DeveloperDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Manage state hook to dynamically toggle layout views from Sidebar buttons
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    apiService.getDeveloperDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard data load failed:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0806] flex items-center justify-center text-[#F2A508] font-bold tracking-widest font-['Raleway',sans-serif]">
        Loading...
      </div>
    );
  }

  const stats = data?.stats || { totalProjects: 12, activeProjects: 3, earned: "120k pkr" };
  const displayProjects = data?.activeProjects || [
    { id: 1, title: "Blue Sky Travel", description: "Booking Engine Redesign", priority: "High Priority", progress: "78%" },
    { id: 2, title: "Bon Appetit", description: "Restaurant website", priority: "On Track", progress: "45%" },
    { id: 3, title: "AK apparel store", description: "Ecommerce website", priority: "Completed", progress: "100%" }
  ];

  const recentBids = data?.recentBids || [
    { id: 1, client: "Zara ahmed", value: "Rs. 80,400", deadline: "June 12, 2026", status: "Under Review" },
    { id: 2, client: "Abdul hanan", value: "Rs. 78,500", deadline: "May 28, 2026", status: "Accepted" },
    { id: 3, client: "Zain rehman", value: "Rs. 100,000", deadline: "Oct 24, 2026", status: "Drafting" }
  ];

  const chats = [
    { id: 1, name: 'Blue Sky Travel', subtitle: 'Zain: The latest build looks...', icon: '🛫', time: 'Now', active: true },
    { id: 2, name: 'Bon Appetit', subtitle: 'Can we discuss the menu animation?', icon: '🍴', time: '2h ago', active: false },
    { id: 3, name: 'AK apparel store', subtitle: 'Payment verified for Phase 3', icon: '🛍️', time: 'Yesterday', active: false },
  ];

  const getPriorityStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high priority":
        return "bg-[#3b82f6]/10 text-[#2563eb] border border-[#2563eb]/20";
      case "on track":
        return "bg-[#a855f7]/10 text-[#7c3aed] border border-[#7c3aed]/20";
      case "completed":
        return "bg-[#22c55e]/10 text-[#16a34a] border border-[#16a34a]/20";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "under review":
        return "bg-[#cce0ff] text-[#2563eb]";
      case "accepted":
        return "bg-[#d1fae5] text-[#10b981]";
      case "drafting":
        return "bg-[#dfe7f6] text-[#4f46e5]";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    
      <div className="space-y-8 max-w-5xl mx-auto text-black font-['Raleway',sans-serif] pb-16">
        
        {/* ================= VIEW 1: GENERAL OVERVIEW OVERVIEW CONTAINER ================= */}
        {currentView === 'dashboard' && (
          <>
            {/* Welcome Block */}
            <div className="text-white space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, Bilal!</h2>
              <p className="text-xs text-gray-400 font-medium">Here's what's happening with your projects today.</p>
            </div>

            {/* Top Floating Metric Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#f4f1ee] p-4 rounded-[5px] flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-[5px] bg-[#fca5a5]/40 flex items-center justify-center text-base">📋</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Projects</p>
                  <h3 className="text-lg font-black text-black">{stats.totalProjects}</h3>
                </div>
              </div>

              <div className="bg-[#f4f1ee] p-4 rounded-[5px] flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-[5px] bg-[#93c5fd]/40 flex items-center justify-center text-base">⚡</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Projects</p>
                  <h3 className="text-lg font-black text-black">{stats.activeProjects}</h3>
                </div>
              </div>

              <div className="bg-[#f4f1ee] p-4 rounded-[5px] flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-[5px] bg-[#86efac]/40 flex items-center justify-center text-base">💵</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Earned</p>
                  <h3 className="text-lg font-black text-black">{stats.earned}</h3>
                </div>
              </div>
            </div>

            {/* BOX 1: Active Projects Container Layout */}
            <div className="bg-[#1c1a17]/40 backdrop-blur-xl p-5 rounded-[5px] border border-white/10 shadow-2xl">
              <div className="bg-[#f4f1ee] rounded-[5px] overflow-hidden pb-4">
                <div className="bg-white px-5 py-3.5 flex justify-between items-center border-b border-gray-200/50">
                  <h3 className="text-xs font-black text-black tracking-wide uppercase flex items-center gap-2">
                    <span className="text-blue-600">🚀</span> Active Projects
                  </h3>
                  <button className="text-[11px] text-blue-600 font-extrabold hover:underline">View All</button>
                </div>

                <div className="p-5 space-y-5">
                  {displayProjects.map((project) => (
                    <div key={project.id} className="space-y-2 border-b border-gray-200/40 last:border-0 last:pb-0 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-black">{project.title}</h4>
                          <p className="text-[10px] text-gray-500 font-medium">{project.description}</p>
                        </div>
                        <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${getPriorityStyles(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              project.priority === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                            }`}
                            style={{ width: project.progress }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold min-w-[28px] text-right">{project.progress}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOX 2: Recent Bids Panel Container Layout */}
            <div className="bg-[#1c1a17]/40 backdrop-blur-xl p-5 rounded-[5px] border border-white/10 shadow-2xl">
              <div className="bg-white rounded-[5px] overflow-hidden pb-4">
                <h3 className="text-xs font-black text-black tracking-wide uppercase px-5 py-4 border-b border-gray-100">
                  Recent Bids
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#9ca3af]/30 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                        <th className="py-2.5 px-5">Clients</th>
                        <th className="py-2.5 px-4">Project Value</th>
                        <th className="py-2.5 px-4">Deadline</th>
                        <th className="py-2.5 px-5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] font-bold text-gray-700">
                      {recentBids.map((bid) => (
                        <tr key={bid.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-5 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#dbeafe] text-[#2563eb] font-black text-[9px] flex items-center justify-center uppercase">
                              {bid.client.charAt(0)}
                            </div>
                            <span className="text-black font-extrabold">{bid.client}</span>
                          </td>
                          <td className="py-3 px-4 text-black font-extrabold">{bid.value}</td>
                          <td className="py-3 px-4 text-gray-400 font-medium">{bid.deadline}</td>
                          <td className="py-3 px-5 text-center">
                            <span className={`text-[9px] px-3 py-0.5 rounded-full font-black inline-block min-w-[90px] ${getStatusStyles(bid.status)}`}>
                              • {bid.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* BOX 3: Recent Messages Panel Container Layout */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-[#1c1a17]/40 backdrop-blur-xl p-5 rounded-[5px] border border-white/10 shadow-2xl">
                <div className="bg-[#f4f1ee] rounded-[5px] p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-black flex items-center gap-2">
                      <span className="p-1.5 bg-[#dbeafe] text-[#2563eb] rounded-full text-xs">🔵</span>
                      Recent Messages
                    </h3>
                    <span className="text-[9px] bg-[#22c55e]/20 text-[#16a34a] font-black px-2 py-0.5 rounded-full">
                      2 New
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div 
                      onClick={() => setCurrentView('messages')}
                      className="p-3 bg-[#a7f3d0]/60 border border-[#10b981]/20 rounded-[5px] flex items-start gap-3 cursor-pointer hover:bg-[#a7f3d0]/80 transition-colors"
                    >
                      <div className="w-6 h-6 bg-black rounded-[5px] flex items-center justify-center text-xs text-white">🛩️</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-extrabold text-black">Blue sky travel</h4>
                          <span className="text-[9px] text-gray-500 font-bold">10:45 AM</span>
                        </div>
                        <p className="text-[10px] text-gray-600 truncate mt-0.5 font-medium">
                          The latest build looks fantastic! Can we discuss the...
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-gray-200/50 rounded-[5px] flex items-start gap-3">
                      <div className="w-6 h-6 bg-black rounded-[5px] flex items-center justify-center text-xs text-white">🍴</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-extrabold text-black">Bon appetit</h4>
                          <span className="text-[9px] text-gray-400 font-medium">Yesterday</span>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5 font-medium">
                          Did you have a chance to look at the GraphQL docs?
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCurrentView('messages')}
                      className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white text-[10px] font-black py-2 rounded-[5px] uppercase tracking-wider hover:brightness-105 transition-all pt-2.5 pb-2.5"
                    >
                      Go to inbox
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block"></div>
            </div>
          </>
        )}

        {/* ================= VIEW 2: DYNAMIC CHAT MESSAGES VIEW PANEL ================= */}
        {currentView === 'messages' && (
          <div className="space-y-6">
            <div className="text-white">
              <h2 className="text-3xl font-extrabold tracking-tight">Blue Sky Travel</h2>
              <p className="text-xs text-gray-400 font-medium">Booking Engine Redesign</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[520px]">
              {/* Active Chats Sidebar Container Panel */}
              <div className="p-4 rounded-[5px] bg-[#1c1a17]/50 border border-white/10 backdrop-blur-md flex flex-col h-full shadow-xl">
                <div className="bg-white rounded-t-[5px] px-5 py-3.5 border-b border-gray-200">
                  <h3 className="text-sm font-black text-black tracking-wide">Active Chats</h3>
                </div>
                <div className="bg-[#d9d5ce] rounded-b-[5px] p-3 flex-1 overflow-y-auto space-y-2.5 text-black">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id} 
                      className={`border rounded-[5px] p-3 flex gap-3 shadow-sm transition-all ${
                        chat.active ? 'bg-emerald-100/90 border-emerald-300 font-bold' : 'bg-white/60 border-black/5 hover:bg-white/90'
                      }`}
                    >
                      <span className="text-xl mt-0.5">{chat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h6 className="font-extrabold text-xs text-black truncate">{chat.name}</h6>
                          <span className="text-[9px] font-bold text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 truncate font-medium">{chat.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Thread Messages Stream Container Panel */}
              <div className="md:col-span-2 p-4 rounded-[5px] bg-[#1c1a17]/50 border border-white/10 backdrop-blur-md flex flex-col h-full shadow-xl">
                <div className="bg-[#d9d5ce] rounded-[5px] p-5 flex-1 overflow-y-auto text-xs space-y-4 flex flex-col text-black">
                  <div className="self-center bg-black/10 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-[5px] text-gray-600">Today</div>
                  
                  {/* Message Inbound */}
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-black/20 shrink-0 mt-1">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-full h-full object-cover" alt="User Profile" />
                    </div>
                    <div>
                      <div className="bg-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium">
                        Hi Bilal! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly. I'd be happy to work on this project.
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 mt-1 ml-1 block">Zain • 10:45 AM</span>
                    </div>
                  </div>

                  {/* Message Outbound */}
                  <div className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium">
                      Great! One of my main goals is to simplify the booking process and make it mobile-friendly. I'd also like users to easily compare hotels and flight options before making a reservation.
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 mt-1 mr-1 block">You • 10:48 AM</span>
                  </div>

                  {/* Message Inbound 2 */}
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-black/20 shrink-0 mt-1">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-full h-full object-cover" alt="User Profile" />
                    </div>
                    <div>
                      <div className="bg-white p-4 rounded-[5px] shadow-sm leading-relaxed font-medium">
                        That sounds good. I can implement a modern interface with advanced search and filtering, responsive design, and secure booking mechanisms.
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 mt-1 ml-1 block">Zain • 10:50 AM</span>
                    </div>
                  </div>
                </div>

                {/* Message Send Input Actions Tray Panel */}
                <div className="mt-4 bg-black rounded-[5px] p-2.5 flex items-center gap-3 border border-white/10">
                  <button className="text-gray-400 hover:text-white text-lg pl-1">📎</button>
                  <input type="text" placeholder="Type your message here..." className="bg-transparent text-xs text-white outline-none flex-1 font-medium" />
                  <button className="text-gray-400 hover:text-white text-base">😊</button>
                  <button className="bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white w-8 h-8 rounded-[5px] flex items-center justify-center shadow">➔</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback layout render for secondary settings or placeholders views */}
        {currentView !== 'dashboard' && currentView !== 'messages' && (
          <div className="text-center py-24 text-gray-400 font-medium">
            This module section view workspace layout ({currentView}) is currently under construction.
          </div>
        )}

      </div>
  );
}