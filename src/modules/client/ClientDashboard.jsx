import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { clientDashboardData } from "../../data/mockData";
import { 
  LayoutDashboard, 
  Zap, 
  CircleDollarSign, 
  Rocket, 
  Brain, 
  MessageSquare, 
  FolderHeart, 
  Eye, 
  FolderOpen, 
  Trash2, 
  Download,
  Plus
} from 'lucide-react';

export default function ClientDashboard() {
  const [data] = useState(clientDashboardData);
  const navigate = useNavigate();

  const profile = data?.profile || { name: "Sarah Ahmed", type: "Customer" };
  const postedProjects = data?.postedProjects || [];
  const finalPostedProjects = postedProjects.map(project => ({ ...project, progress: 15 }));
  const savedProjects = data?.savedProjects || [];
  const stats = data?.stats || { totalProjectsPosted: 0, activeProjects: 0, totalSpent: "0 pkr" };
  const forceShowEmptyState = true; 

  if (forceShowEmptyState || finalPostedProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] w-full text-center font-['Raleway',sans-serif] select-none text-gray-900 dark:text-white transition-colors duration-300">
        
        <div className="space-y-2 max-w-xl mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors">
            Start new project
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
            Answer questions to get project scope document
          </p>
        </div>

        <div className="relative mb-14 text-gray-900 dark:text-white transition-colors flex items-center justify-center">
          <div className="relative w-36 h-32 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-[5px] border-current flex items-center justify-center absolute top-0 left-3">
              <Plus size={36} strokeWidth={3} className="text-gray-900 dark:text-white" />
            </div>
            <div className="absolute bottom-1 right-5 w-10 h-[5px] bg-current rounded-full rotate-45 transform origin-bottom-right" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/client/post-project')} // 🎯 Targets your ProjectCreationForm view route directly!
          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-xs px-8 py-3.5 rounded-[5px] shadow-lg shadow-orange-500/10 active:scale-[0.99] hover:brightness-105 transition-all uppercase tracking-wider cursor-pointer"
        >
          + New Project
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] select-none transition-colors duration-300">
      
      <div className="space-y-1 text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#FFFFFF]">Welcome back, {profile.name.split(" ")[0]}!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="bg-[#FFF6E9] rounded-[12px] p-5 flex items-center gap-4 text-[#000000] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-black/5 dark:border-transparent transition-all duration-300">
          <div className="w-10 h-10 rounded-[12px] bg-[#fca5a5]/40 flex items-center justify-center shadow-sm shrink-0">
            <LayoutDashboard size={16} className="text-[#CA4612]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-0.5">Total Projects</p>
            <h3 className="text-xl font-black text-[#000000]">{stats.totalProjectsPosted}</h3>
          </div>
        </div>

        <div className="bg-[#FFF6E9] rounded-[12px] p-5 flex items-center gap-4 text-[#000000] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-black/5 dark:border-transparent transition-all duration-300">
          <div className="w-10 h-10 rounded-[12px] bg-[#93c5fd]/40 flex items-center justify-center shadow-sm shrink-0">
            <Zap size={16} className="text-[#3b82f6]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-0.5">Active Projects</p>
            <h3 className="text-xl font-black text-[#000000]">{stats.activeProjects}</h3>
          </div>
        </div>

        <div className="bg-[#FFF6E9] rounded-[12px] p-5 flex items-center gap-4 text-[#000000] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-black/5 dark:border-transparent transition-all duration-300">
          <div className="w-10 h-10 rounded-[12px] bg-[#86efac]/40 flex items-center justify-center shadow-sm shrink-0">
            <CircleDollarSign size={16} className="text-[#16a34a]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mb-0.5">Total Spent</p>
            <h3 className="text-xl font-black text-[#000000]">{stats.totalSpent}</h3>
          </div>
        </div>
      </div>

      <div className="p-0 dark:p-4 rounded-[16px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 overflow-hidden">
        <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none">
          <div className="flex items-center justify-between px-6 py-4 bg-white/40 dark:bg-white border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2">
              <Rocket size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
              <h3 className="text-sm font-black text-[#000000] tracking-wide">Active Projects</h3>
            </div>
            <button className="text-xs font-bold text-blue-800 dark:text-blue-600 hover:underline cursor-pointer">View All</button>
          </div>

          <div className="p-5 space-y-4 text-left">
            {finalPostedProjects.map((project) => (
              <div key={project.id} className="bg-white/70 p-4 rounded-[10px] border border-black/5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#000000]">{project.title}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{project.subtitle}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 bg-gray-200/80 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        project.status === 'Completed' ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 w-8 text-right">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-0 dark:p-4 rounded-[16px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 overflow-hidden">
        <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none">
          <div className="flex items-center justify-between px-6 py-4 bg-white/40 dark:bg-white border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
              <h3 className="text-sm font-black text-[#000000] tracking-wide">AI Generated Reports</h3>
            </div>
            <button className="text-xs font-bold text-blue-800 dark:text-blue-600 hover:underline cursor-pointer">View All</button>
          </div>

          <div className="p-5 space-y-3 text-left">
            {[
              { name: "Blue Sky Travel - Design Document", date: "11 Apr 2026" },
              { name: "Bon Appetit - Requirement Document", date: "11 Apr 2026" }
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/70 p-4 rounded-[10px] border border-black/5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-11 bg-[#BD1C22] text-[#FFFFFF] font-black text-[9px] rounded-[5px] flex flex-col items-center justify-center shadow-sm shrink-0">
                    <span className="text-sm mb-0.5">📄</span>
                    <span className="font-sans font-black tracking-tighter">PDF</span>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-[#000000]">{report.name}</h5>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Generated on {report.date}</p>
                  </div>
                </div>
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-[6px] text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                  <Download size={13} strokeWidth={2.5} /> Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-0 dark:p-4 rounded-[16px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 overflow-hidden">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none h-full flex flex-col justify-between">
            <div className="flex items-center justify-between px-5 py-4 bg-white/40 dark:bg-white border-b border-black/5 dark:border-gray-200/60">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
                <h3 className="text-sm font-black text-[#000000] tracking-wide">Recent Messages</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2.5 py-0.5 rounded-full">2 New</span>
            </div>

            <div className="p-4 space-y-3 flex-1 text-left">
              <div className="bg-white/80 border border-black/5 rounded-[8px] p-3 flex gap-3 shadow-sm">
                <span className="text-base mt-0.5 shrink-0">📬</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h6 className="font-extrabold text-xs text-[#000000] truncate">Blue sky travel</h6>
                    <span className="text-[9px] font-medium text-gray-400">10:45 AM</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium truncate">The latest build looks fantastic! Can we discuss the...</p>
                </div>
              </div>
              <button className="w-full mt-2 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 rounded-[6px] text-xs font-extrabold shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer">
                Go to inbox
              </button>
            </div>
          </div>
        </div>

        <div className="p-0 dark:p-4 rounded-[16px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 overflow-hidden">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] overflow-hidden pb-5 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none h-full flex flex-col justify-between">
            <div className="flex items-center justify-between px-5 py-4 bg-white/40 dark:bg-white border-b border-black/5 dark:border-gray-200/60">
              <div className="flex items-center gap-2">
                <FolderHeart size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
                <h3 className="text-sm font-black text-[#000000] tracking-wide">Saved Projects</h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 text-left">
              {savedProjects.map((project) => (
                <div key={project.id} className="bg-white/80 border border-black/5 rounded-[8px] p-3 flex items-center justify-between shadow-sm">
                  <div className="min-w-0">
                    <h6 className="font-extrabold text-xs text-[#000000] truncate">{project.title}</h6>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Generated on {project.date}</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 shrink-0 ml-2">
                    <button type="button" className="hover:text-blue-600 transition-colors cursor-pointer"><Eye size={14} /></button>
                    <button type="button" className="hover:text-emerald-600 transition-colors cursor-pointer"><FolderOpen size={14} /></button>
                    <button type="button" className="hover:text-rose-600 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}