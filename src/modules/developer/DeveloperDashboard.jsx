import React, { useState, useEffect } from "react";
import { apiService } from "../../api/apiClient";
import { 
  ClipboardList, 
  Zap, 
  CircleDollarSign, 
  Plane, 
  Utensils, 
  Paperclip, 
  SendHorizontal 
} from "lucide-react";

export default function DeveloperDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#0a0806] flex items-center justify-center text-[#F2A508] font-bold tracking-widest font-['Raleway',sans-serif]">
  //       Loading...
  //     </div>
  //   );
  // }

  const stats = data?.stats || { totalProjects: 12, activeProjects: 3, earned: "120k pkr" };
  
  const displayProjects = data?.activeProjects || [
    { id: 1, title: "Bon Appetit", description: "Restaurant website", priority: "in progress", progress: "80%" },
    { id: 2, title: "Blue Sky Travel", description: "Booking Engine Redesign", priority: "in progress", progress: "10%" },
    { id: 3, title: "AK apparel store", description: "Ecommerce website", priority: "Completed", progress: "100%" }
  ];

  const chats = [
    { id: 1, name: 'Blue Sky Travel', subtitle: 'Zain: The latest build looks...', icon: <Plane size={16} className="text-black" />, time: 'Now', active: true },
    { id: 2, name: 'Bon Appetit', subtitle: 'Can we discuss the menu animation?', icon: <Utensils size={14} className="text-black" />, time: '2h ago', active: false },
    { id: 3, name: 'AK apparel store', subtitle: 'Payment verified for Phase 3', icon: '🛍️', time: 'Yesterday', active: false },
  ];

  const getProgressColor = (progressStr) => {
    const val = parseInt(progressStr) || 0;
    
    if (val === 100) return "bg-emerald-600"; 
    if (val < 40) return "bg-[#BD1C22]";      
    if (val > 50) return "bg-[#2563eb]";      
    
    return "bg-[#DC6B0F]"; 
  };

  const getPriorityBadgeStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case "in progress":
        return "bg-[#dbeafe] text-[#2563eb]";
      case "completed":
        return "bg-[#dcfce7] text-[#16a34a]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-black dark:text-white font-['Raleway',sans-serif] pb-16">
      
      {currentView === 'dashboard' && (
        <>
          <div className="text-gray-900 dark:text-white space-y-1 text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, Bilal!</h2>
            <p className="text-xs text-gray-200 font-medium">Here's what's happening with your projects today.</p>
          </div>

          {/* Top Floating Metric Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[#FFF6E9] p-4 rounded-[12px] flex items-center gap-4 shadow-sm text-left">
              <div className="w-10 h-10 rounded-[12px] bg-[#fca5a5]/40 flex items-center justify-center text-red-500">
                <ClipboardList size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Projects</p>
                <h3 className="text-lg font-black text-black">{stats.totalProjects}</h3>
              </div>
            </div>

            <div className="bg-[#FFF6E9] p-4 rounded-[12px] flex items-center gap-4 shadow-sm text-left">
              <div className="w-10 h-10 rounded-[12px] bg-[#93c5fd]/40 flex items-center justify-center text-blue-500">
                <Zap size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Projects</p>
                <h3 className="text-lg font-black text-black">{stats.activeProjects}</h3>
              </div>
            </div>

            <div className="bg-[#FFF6E9] p-4 rounded-[12px] flex items-center gap-4 shadow-sm text-left">
              <div className="w-10 h-10 rounded-[12px] bg-[#86efac]/40 flex items-center justify-center text-emerald-600">
                <CircleDollarSign size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Earned</p>
                <h3 className="text-lg font-black text-black">{stats.earned}</h3>
              </div>
            </div>
          </div>

          <div className="p-0 dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md max-w-5xl w-full transition-all duration-300 overflow-hidden">
            <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[5px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl">
              <div className="bg-white/40 dark:bg-white/80 px-6 py-4 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
                <h3 className="text-sm font-black text-black tracking-tight flex items-center gap-2">
                  My projects
                </h3>
                <button className="text-xs font-black text-blue-600 hover:underline tracking-wide">View All</button>
              </div>

              <div className="p-6 space-y-6 text-left">
                {displayProjects.map((project) => (
                  <div key={project.id} className="space-y-3.5 border-b border-black/5 dark:border-gray-200/40 last:border-0 last:pb-0 pb-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-extrabold text-black tracking-tight">{project.title}</h4>
                      </div>
                      <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide select-none ${getPriorityBadgeStyles(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 bg-gray-300/60 dark:bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                          style={{ width: `${parseInt(project.progress)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-900 font-black min-w-[32px] text-right shrink-0">{parseInt(project.progress)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOX 3: RECENT MESSAGES MODULE CONTAINER */}
          <div className="p-0 dark:p-6 rounded-[8px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md max-w-xl w-full transition-all duration-300 overflow-hidden">
            <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[8px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none">
              
              <div className="bg-white/40 dark:bg-white/80 px-6 py-4 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-full bg-[#dbeafe] flex items-center justify-center text-xs shadow-sm">
                    💬
                  </div>
                  <h3 className="text-sm font-black text-black tracking-tight">Recent Messages</h3>
                </div>
                <span className="text-[9px] bg-[#cefaa2] text-[#16a34a] border border-[#bbf7d0] font-black px-2.5 py-0.5 rounded-full select-none uppercase tracking-wide">
                  2 New
                </span>
              </div>

              <div className="p-5 space-y-3.5 text-left">
                <div 
                  onClick={() => setCurrentView('messages')}
                  className="p-3.5 bg-[#cefaa2]/50 dark:bg-[#cbf8d3] border border-black/5 dark:border-[#a7f3d0] rounded-[6px] flex items-start gap-3 cursor-pointer hover:brightness-[0.98] transition-all shadow-sm"
                >
                  <div className="w-8 h-8 bg-black rounded-[6px] flex items-center justify-center text-white shrink-0 shadow">
                    <Plane size={15} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="text-xs font-black text-black tracking-tight">Blue sky travel</h4>
                      <span className="text-[9px] text-gray-500 font-bold shrink-0">10:45 AM</span>
                    </div>
                    <p className="text-[11px] text-gray-700 dark:text-gray-800 truncate font-medium tracking-tight">
                      The latest build looks fantastic! Can we discuss the..
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white/60 dark:bg-white/80 border border-black/5 dark:border-gray-200/60 rounded-[6px] flex items-start gap-3 shadow-sm">
                  <div className="w-8 h-8 bg-black rounded-[6px] flex items-center justify-center text-white shrink-0 shadow">
                    <Utensils size={14} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="text-xs font-black text-black tracking-tight">Bon appetit</h4>
                      <span className="text-[9px] text-gray-400 font-semibold shrink-0">Yesterday</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate font-medium tracking-tight">
                      Did you have a chance to look at the GraphQL docs?
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setCurrentView('messages')}
                    className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white text-xs font-extrabold py-2.5 rounded-[6px] uppercase tracking-wider shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer text-center"
                  >
                    Go to inbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* DYNAMIC CHAT MESSAGES PANEL */}
      {currentView === 'messages' && (
        <div className="space-y-6">
          <div className="text-gray-900 dark:text-white text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">Blue Sky Travel</h2>
            <p className="text-xs text-gray-400 font-medium">Booking Engine Redesign</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[520px]">
            <div className="p-4 rounded-[5px] bg-[#FFF6E9] dark:bg-[#1c1a17]/50 border border-black/5 dark:border-white/10 dark:backdrop-blur-md flex flex-col h-full shadow-xl overflow-hidden">
              <div className="bg-white rounded-t-[5px] px-5 py-3.5 border-b border-gray-200 text-black font-black text-sm text-left">Active Chats</div>
              <div className="bg-transparent dark:bg-[#d9d5ce] p-3 flex-1 overflow-y-auto space-y-2.5 text-black">
                {chats.map((chat) => (
                  <div key={chat.id} className={`border rounded-[5px] p-3 flex gap-3 shadow-sm transition-all text-left ${chat.active ? 'bg-emerald-100/90 border-emerald-300 font-bold' : 'bg-white/60 border-black/5 hover:bg-white/90'}`}>
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

            <div className="md:col-span-2 p-4 rounded-[5px] bg-[#FFF6E9] dark:bg-[#1c1a17]/50 border border-black/5 dark:border-white/10 dark:backdrop-blur-md flex flex-col h-full shadow-xl overflow-hidden">
              <div className="bg-transparent dark:bg-[#d9d5ce] p-5 flex-1 overflow-y-auto text-xs space-y-4 flex flex-col text-black">
                <div className="self-center bg-black/10 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-[5px] text-gray-600">Today</div>
                <div className="flex gap-3 max-w-[85%] text-left">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-black/20 shrink-0 mt-1"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-full h-full object-cover" alt="User Profile" /></div>
                  <div>
                    <div className="bg-white p-4 rounded-[5px] shadow-sm font-medium leading-relaxed">Hi Bilal! I've reviewed the requirement document for Blue Sky Travel. I understand that you want to redesign the booking engine to make it faster and more user-friendly. I'd be happy to work on this project.</div>
                    <span className="text-[9px] font-bold text-gray-500 mt-1 ml-1 block">Zain • 10:45 AM</span>
                  </div>
                </div>
              </div>

              <div className="mx-2 bg-white/70 dark:bg-black rounded-[5px] p-2.5 flex items-center gap-3 border border-black/10 dark:border-white/10">
                <button className="text-gray-600 dark:text-gray-400 pl-1">
                  <Paperclip size={14} strokeWidth={2.5} />
                </button>
                <input type="text" placeholder="Type your message here..." className="bg-transparent text-xs text-gray-900 dark:text-white outline-none flex-1 font-medium" />
                <button className="bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white w-8 h-8 rounded-[5px] flex items-center justify-center shadow">
                  <SendHorizontal size={13} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}