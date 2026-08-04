import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminDashboardData } from "../../data/mockData";
import { 
  Zap, 
  Hourglass, 
  Wallet, 
  UserCheck, 
  Users, 
  FolderKanban, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminDashboardData) {
      setData(adminDashboardData);
    } else {
      setData({
        profile: { name: "Hassan", role: "Admin" },
        stats: {
          activeProjects: "03",
          pendingApproval: "03",
          paymentsHeld: "220k",
          totalDevelopers: "23",
          totalCustomers: "20",
          totalProjects: "12"
        },
        projectsAwaitingApproval: [
          { id: 1, title: "Bon appetit", submittedBy: "Zara Ahmed", budget: "PKR 90,000" },
          { id: 2, title: "Ecommerce Store", submittedBy: "Sara Ahmed", budget: "PKR 90,000" },
          { id: 3, title: "TN-HRMS", submittedBy: "Zara Ahmed", budget: "PKR 90,000" }
        ]
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-black dark:text-white">
        <Loader2 className="w-5 h-5 animate-spin text-orange-500 mr-2" />
        <span className="text-xs font-semibold">Loading Admin Console...</span>
      </div>
    );
  }

  const stats = data?.stats || {};
  const awaitingProjects = Array.isArray(data?.projectsAwaitingApproval) 
    ? data.projectsAwaitingApproval 
    : [];

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-4xl mx-auto pb-8 px-3 sm:px-4">
      
      <div className="text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Welcome back, Hassan!
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#93c5fd]/40 text-blue-600 flex items-center justify-center shrink-0">
            <Zap size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Active Projects
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.activeProjects || "03"}
            </span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#fca5a5]/40 text-red-500 flex items-center justify-center shrink-0">
            <Hourglass size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Pending Approval
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.pendingApproval || "03"}
            </span>
          </div>
        </div>

        {/* Payments Held */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20 sm:col-span-2 lg:col-span-1">
          <div className="w-8 h-8 rounded-[8px] bg-[#86efac]/40 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Payments Held (PKR)
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.paymentsHeld || "220k"}
            </span>
          </div>
        </div>

        {/* Total Developers */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#a7f3d0]/50 text-teal-600 flex items-center justify-center shrink-0">
            <UserCheck size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Developers
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalDevelopers || "23"}
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#ddd6fe]/50 text-purple-600 flex items-center justify-center shrink-0">
            <Users size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Customers
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalCustomers || "20"}
            </span>
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#fecdd3]/50 text-rose-600 flex items-center justify-center shrink-0">
            <FolderKanban size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Projects
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalProjects || "12"}
            </span>
          </div>
        </div>

      </div>

      {/* Main List Box Container */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-black/5 dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden shadow-xs dark:shadow-md">
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[12px] sm:rounded-[6px] overflow-hidden pb-3 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-xl">
          
          <div className="bg-white/40 dark:bg-white/80 px-3.5 sm:px-4 py-2.5 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2 text-black">
              <div className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 size={13} strokeWidth={2.2} />
              </div>
              <h2 className="text-xs font-bold text-black tracking-tight uppercase">
                Projects Awaiting Approval
              </h2>
            </div>
            
            <button 
              onClick={() => navigate('/admin/projects')}
              className="text-[11px] font-bold text-blue-600 hover:underline tracking-wide cursor-pointer uppercase"
            >
              review all
            </button>
          </div>

          {/* List Items */}
          <div className="p-3 sm:p-4 space-y-2.5 text-left">
            {awaitingProjects.map((project, idx) => (
              <div 
                key={project.id || idx} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-black/5 dark:border-gray-200/40 last:border-0 pb-2 last:pb-0"
              >
                <div>
                  <h3 className="font-bold text-xs text-black tracking-tight">{project.title}</h3>
                  <p className="text-[10px] text-gray-600 dark:text-gray-700 font-medium mt-0.5">
                    Submitted by {project.submittedBy} - Budget {project.budget}
                  </p>
                </div>

                <button 
                  onClick={() => navigate(`/admin/projects/${project.id || idx}`)}
                  className="text-[11px] font-bold text-blue-600 hover:underline self-start sm:self-auto cursor-pointer"
                >
                  View project
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}