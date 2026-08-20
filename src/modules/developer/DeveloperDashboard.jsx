import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeveloperDashboard } from "../../services/api";
import { 
  ClipboardList, 
  Zap, 
  CircleDollarSign, 
  Plane, 
  Utensils, 
  ArrowLeft,
  Loader2
} from "lucide-react";

import Messages from "../shared/MessagesDashboard"; 

const fallbackStats = { totalProjects: 0, activeProjects: 0, earned: "0 PKR" };

export default function DeveloperDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetchDeveloperDashboard();

        if (res?.success && res.dashboard) {
          const d = res.dashboard;
          const rawEarned = parseFloat(d.earned_money) || 0;
          const formattedEarned = rawEarned >= 1000 
            ? `${Math.round(rawEarned / 1000)}k PKR` 
            : `${rawEarned} PKR`;

          const mappedProjects = Array.isArray(res.projects)
            ? res.projects.map((p) => {
                const progressNum = parseInt(p.progress_percentage ?? p.progress) || 0;
                const rawStatus = (p.status || p.project_status || "in progress").toLowerCase();
                const displayPriority = rawStatus === "completed" || progressNum >= 100 ? "Completed" : "In Progress";

                return {
                  id: p.id || p.project_id,
                  title: p.name || p.project_name || p.title || "Project",
                  description: p.overview || p.description || p.purpose || "Active development project",
                  priority: displayPriority,
                  progress: `${progressNum}%`
                };
              })
            : [];

          setData({
            stats: {
              totalProjects: d.total_projects ?? 0,
              activeProjects: d.active_projects ?? 0,
              earned: formattedEarned
            },
            activeProjects: mappedProjects
          });
        } else {
          setData({ stats: fallbackStats, activeProjects: [] });
        }
      } catch (err) {
        console.warn("Dashboard API error, using default data:", err);
        setData({ stats: fallbackStats, activeProjects: [] });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = data?.stats || fallbackStats;
  const displayProjects = data?.activeProjects || [];

  const getProgressColor = (progressStr) => {
    const val = parseInt(progressStr) || 0;
    if (val >= 100) return "bg-emerald-600"; 
    if (val <= 0) return "bg-gray-300";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 text-black dark:text-white">
        <Loader2 className="w-6 h-6 animate-spin text-[#DC6B0F] mr-2" />
        <span className="text-xs font-semibold">Loading Developer Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl sm:max-w-4xl mx-auto text-black dark:text-white font-['Raleway',sans-serif] pb-8 px-3 sm:px-4">
      
      {currentView === 'dashboard' && (
        <>
          <div className="text-gray-900 dark:text-white space-y-0.5 text-left">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-[11px] text-gray-500 dark:text-gray-300 font-medium">Here's what's happening with your projects today.</p>
          </div>

          {/* Top Floating Metric Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#FFF6E9] p-3 rounded-[10px] flex items-center gap-3 shadow-xs text-left border border-black/5">
              <div className="w-8 h-8 rounded-[8px] bg-[#fca5a5]/40 flex items-center justify-center text-red-500 shrink-0">
                <ClipboardList size={14} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Total Projects</p>
                <h3 className="text-base font-extrabold text-black leading-tight">{stats.totalProjects}</h3>
              </div>
            </div>

            <div className="bg-[#FFF6E9] p-3 rounded-[10px] flex items-center gap-3 shadow-xs text-left border border-black/5">
              <div className="w-8 h-8 rounded-[8px] bg-[#93c5fd]/40 flex items-center justify-center text-blue-500 shrink-0">
                <Zap size={14} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Active Projects</p>
                <h3 className="text-base font-extrabold text-black leading-tight">{stats.activeProjects}</h3>
              </div>
            </div>

            <div className="bg-[#FFF6E9] p-3 rounded-[10px] flex items-center gap-3 shadow-xs text-left border border-black/5">
              <div className="w-8 h-8 rounded-[8px] bg-[#86efac]/40 flex items-center justify-center text-emerald-600 shrink-0">
                <CircleDollarSign size={14} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Earned</p>
                <h3 className="text-base font-extrabold text-black leading-tight">{stats.earned}</h3>
              </div>
            </div>
          </div>

          {/* Lower Section Container */}
          <div className="flex flex-col gap-4 w-full items-start">
            
            {/* Box 1: My Projects */}
            <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden">
              <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[8px] sm:rounded-[6px] overflow-hidden pb-3.5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-xs dark:shadow-xl">
                <div className="bg-white/40 dark:bg-white/80 px-3.5 py-2.5 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
                  <h3 className="text-xs font-bold text-black tracking-tight flex items-center gap-1.5">
                    My projects
                  </h3>
                  <button 
                    onClick={() => navigate('/developer/my projects')}
                    className="text-[11px] font-bold text-blue-600 hover:underline tracking-wide cursor-pointer uppercase"
                  >
                    View All
                  </button>
                </div>

                <div className="p-3 sm:p-4 space-y-3.5 text-left">
                  {displayProjects.map((project) => (
                    <div key={project.id} className="space-y-2 border-b border-black/5 dark:border-gray-200/40 last:border-0 last:pb-0 pb-3">
                      <div className="flex justify-between items-center gap-2">
                        <h4 className="text-xs font-bold text-black tracking-tight truncate">{project.title}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide select-none shrink-0 ${getPriorityBadgeStyles(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2.5 w-full">
                        <div className="flex-1 bg-gray-300/60 dark:bg-gray-200 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                            style={{ width: `${parseInt(project.progress) || 0}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-900 font-bold min-w-[28px] text-right shrink-0">{parseInt(project.progress) || 0}%</span>
                      </div>
                    </div>
                  ))}

                  {displayProjects.length === 0 && (
                    <div className="text-center py-6 text-xs text-gray-500 font-medium">
                      No active projects assigned yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box 2: Recent Messages */}
            <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md w-full sm:max-w-md transition-all duration-300 overflow-hidden">
              <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[8px] sm:rounded-[6px] overflow-hidden pb-3.5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-xs dark:shadow-xl">
                
                <div className="bg-white/40 dark:bg-white/80 px-3.5 py-2.5 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
                  <div className="flex items-center gap-1.5 text-left">
                    <div className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center text-[10px] shadow-xs">
                      💬
                    </div>
                    <h3 className="text-xs font-bold text-black tracking-tight">Recent Messages</h3>
                  </div>
                  <span className="text-[9px] bg-[#cefaa2] text-[#16a34a] border border-[#bbf7d0] font-bold px-2 py-0.5 rounded-full select-none uppercase tracking-wide shrink-0">
                    2 New
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 space-y-2.5 text-left">
                  <div 
                    onClick={() => setCurrentView('messages')}
                    className="p-2.5 bg-[#cefaa2]/50 dark:bg-[#cbf8d3] border border-black/5 dark:border-[#a7f3d0] rounded-[6px] flex items-start gap-2.5 cursor-pointer hover:brightness-[0.98] transition-all shadow-xs"
                  >
                    <div className="w-7 h-7 bg-black rounded-[5px] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Plane size={13} strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5 gap-1">
                        <h4 className="text-xs font-bold text-black tracking-tight truncate">Blue sky travel</h4>
                        <span className="text-[9px] text-gray-500 font-bold shrink-0">10:45 AM</span>
                      </div>
                      <p className="text-[10px] text-gray-700 dark:text-gray-800 truncate font-medium tracking-tight">
                        The latest build looks fantastic! Can we discuss the..
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white/60 dark:bg-white/80 border border-black/5 dark:border-gray-200/60 rounded-[6px] flex items-start gap-2.5 shadow-xs">
                    <div className="w-7 h-7 bg-black rounded-[5px] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Utensils size={13} strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5 gap-1">
                        <h4 className="text-xs font-bold text-black tracking-tight truncate">Bon appetit</h4>
                        <span className="text-[9px] text-gray-400 font-semibold shrink-0">Yesterday</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate font-medium tracking-tight">
                        Did you have a chance to look at the GraphQL docs?
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button 
                      onClick={() => setCurrentView('messages')}
                      className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white text-[11px] font-extrabold py-2 rounded-[6px] uppercase tracking-wider shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer text-center"
                    >
                      Go to inbox
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {currentView === 'messages' && (
        <div className="space-y-3">
          <div className="text-left">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:underline mb-1 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={13} strokeWidth={2.2} /> Back to Dashboard
            </button>
          </div>
          
          <Messages />
        </div>
      )}

    </div>
  );
}