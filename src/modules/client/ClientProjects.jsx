import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Lock, 
  Clock, 
  ArrowLeft, 
  FileText, 
  ExternalLink, 
  MessageSquare, 
  AlertCircle,
  Activity,
  Check
} from 'lucide-react';

export default function ClientProjects() {
  const [activeProjectView, setActiveProjectView] = useState(null); 
  const [activeTab, setActiveTab] = useState('payment');
  const [selectedVersion, setSelectedVersion] = useState(null);

  const activeProjectsList = [
    { id: 'bon-appetit', title: 'Bon appetit', status: 'in progress', statusClass: 'bg-[#dbeafe] text-[#2563eb]', dev: 'Bilal ahmed', progress: 80, progressColor: 'bg-[#2563eb]', budget: 'PKR 50,000', timeline: '6-8 weeks', hasAssignedDev: true },
    { id: 'blue-sky', title: 'Blue sky travel', status: 'developer interested', statusClass: 'bg-[#f3e8ff] text-[#7c3aed]', dev: 'Not assigned yet', progress: 0, progressColor: 'bg-gray-300', budget: 'PKR 100,000', timeline: '10 weeks', hasAssignedDev: false },
    { id: 'ak-apparel', title: 'AK apparel store', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#16a34a]', dev: 'Sara khan', progress: 100, progressColor: 'bg-[#16a34a]', budget: 'PKR 98,000', timeline: 'Delivered', hasAssignedDev: true },
  ];

  
  if (!activeProjectView) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] text-left animate-fade-in select-none text-gray-900 dark:text-white transition-colors duration-300">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">My Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Every idea you've submitted, from intake to delivery.</p> 
        </div>

        <div className="p-0 dark:p-8 rounded-[12px] bg-transparent dark:bg-white/10 border border-black/5 dark:border-white/10 dark:backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl w-full max-w-4xl mx-auto overflow-hidden transition-all duration-300">
          <div className="bg-[#FFF6E9] dark:bg-white rounded-[4px] p-6 shadow-inner overflow-x-auto relative flex gap-3 items-stretch border border-transparent text-gray-900 dark:text-black transition-colors duration-300">
            <table className="w-full text-left border-separate border-spacing-y-4 flex-1 min-w-[760px]">
              <thead>
                <tr className="bg-gray-400/40 dark:bg-gray-400 text-black dark:text-black uppercase font-['Raleway',sans-serif] font-black text-[12px] tracking-wider">
                  <th className="py-3 px-4 rounded-l-[4px]">Project Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Dev</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4 rounded-r-[4px]">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {activeProjectsList.map((project) => (
                  <tr 
                    key={project.id}
                    onClick={() => setActiveProjectView(project.id)}
                    className="group bg-white/60 dark:bg-white hover:bg-white dark:hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="py-4 px-4 text-xs font-extrabold border-b border-gray-100 group-last:border-none">{project.title}</td>
                    <td className="py-4 px-4 border-b border-gray-100 group-last:border-none">
                      <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full select-none capitalize ${project.statusClass}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-700">{project.dev}</td>
                    <td className="py-4 px-4 border-b border-gray-100 group-last:border-none">
                      <div className="flex items-center gap-2 max-w-[110px]">
                        <div className="w-20 bg-gray-200 dark:bg-gray-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div className={`h-full rounded-full transition-all duration-300 ${project.progressColor}`} style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-black w-8 text-right">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-black">{project.budget}</td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-600 rounded-r-[4px]">{project.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-1.5 bg-black/10 rounded-full h-[180px] self-center relative overflow-hidden shrink-0 hidden sm:block">
              <div className="w-full h-14 bg-gray-600 rounded-full absolute top-4 shadow" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DEVELOPER PORTAL MATCHING INTEREST PROFILE
  // =========================================================================
  if (activeProjectView === 'blue-sky') {
    return (
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white">A developer is interested in your project</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Review the developer's profile before releasing payment for "Blue Sky Travel - Booking Engine".</p>
        </div>

        <div className="p-0 dark:p-8 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl shadow-none dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] w-full max-w-2xl mx-auto mb-6 transition-all duration-300">
          <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 dark:text-black p-8 rounded-[4px] shadow-inner flex flex-col items-center text-center transition-colors duration-300">
            <div className="w-12 h-12 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-sm font-black mb-2 shadow">BA</div>
            <h2 className="text-base font-black tracking-tight">Bilal Ahmed</h2>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6 block">Full stack developer</span>

            <div className="w-full border-t border-black/5 dark:border-gray-400 pt-5 pb-6 text-center">
              <h3 className="text-xs font-black uppercase tracking-widest mb-3">Bio</h3>
              <p className="text-xs text-gray-650 dark:text-gray-600 font-medium leading-relaxed max-w-lg mx-auto"></p>
            </div>

            <div className="w-full border-t border-black/5 dark:border-gray-400 pt-5 pb-6 text-center">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'AWS', 'PostgreSQL'].map(skill => (
                  <span key={skill} className="bg-black dark:bg-zinc-800 text-white text-[9px] font-black px-3 py-1.5 rounded-[4px] shadow-sm uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-black/5 dark:border-gray-400 pt-5 text-center">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4">Projects</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['NEXOVATE', 'SAFAR KARO', 'TN - HRMS'].map(project => (
                  <span key={project} className="bg-black dark:bg-zinc-800 text-white text-[9px] font-black px-4 py-1.5 rounded-[4px] shadow-sm tracking-wide">
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 dark:text-black rounded-[12px] p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto transition-colors duration-300">
          <div className="text-left leading-tight">
            <h4 className="text-sm font-black tracking-tight mb-0.5">Ready to move forward ?</h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold leading-relaxed max-w-xs">
              Payment will be held securely by Nexovate in escrow until the project is completed.
            </p>
          </div>
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs px-6 py-2.5 rounded-[4px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all tracking-wide text-center shrink-0 cursor-pointer"
          >
            Release Payment
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: CORE DETAILED MANAGEMENT WORKSPACE INTERFACE PANEL
  // =========================================================================
  return (
    <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white">Bon appetit</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Track development progress and milestone updates in real time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 text-gray-900 dark:text-black">
        <div className="bg-[#FFF6E9] dark:bg-white rounded-[12px] p-4 flex items-center gap-3 shadow-md border border-transparent transition-colors duration-300">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Calendar size={15} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-black uppercase tracking-wider">Timeline</span>
            <span className="text-xs font-black">6 of 8 weeks</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white rounded-[12px] p-4 flex items-center gap-3 shadow-md border border-transparent transition-colors duration-300">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Activity size={15} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-black uppercase tracking-wider">Completion</span>
            <span className="text-xs font-black">39%</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white rounded-[12px] p-4 flex items-center gap-3 shadow-md border border-transparent transition-colors duration-300">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <Lock size={15} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-black uppercase tracking-wider">Payment</span>
            <span className="text-xs font-black uppercase tracking-tight">In Escrow</span>
          </div>
        </div>
      </div>

      {/* 🎯 SECTION 1: PROGRESS STEPPER BAR INTERACTIVE CARD */}
      <div className="p-0 dark:p-4 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-none dark:shadow-2xl transition-all duration-300 mb-8">
        <div className="bg-[#FFF6E9] dark:bg-white text-black p-6 rounded-[12px] border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none text-center">
          <h3 className="text-sm font-black text-black tracking-tight text-left mb-6">Progress stepper</h3>
          
          <div className="relative max-w-2xl mx-auto px-4 py-2">
            {/* Background Line Tracks */}
            <div className="absolute top-4 left-6 right-6 h-[3px] bg-gray-300 dark:bg-gray-200 z-0" />
            <div className="absolute top-4 left-6 w-[36%] h-[3px] bg-emerald-700 z-0" /> 

            {/* Stepper Nodes */}
            <div className="flex items-center justify-between relative z-10 w-full text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-sm"><Check size={12} strokeWidth={3} /></div>
                <span className="text-[11px] font-bold text-gray-900">10%</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-sm"><Check size={12} strokeWidth={3} /></div>
                <span className="text-[11px] font-bold text-gray-900">20%</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#CA4612] text-white flex items-center justify-center font-extrabold text-[10px] ring-4 ring-orange-500/20 cursor-pointer shadow-sm">40</div>
                <span className="text-[11px] font-black text-gray-900">40%</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-extrabold text-[10px] cursor-pointer hover:bg-gray-600 transition-colors">60</div>
                <span className="text-[11px] font-bold text-gray-400">60%</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-extrabold text-[10px] cursor-pointer hover:bg-gray-600 transition-colors">80</div>
                <span className="text-[11px] font-bold text-gray-400">80%</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-extrabold text-[10px] cursor-pointer hover:bg-gray-600 transition-colors">100</div>
                <span className="text-[11px] font-bold text-gray-400">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 SECTION 2: HISTORICAL MILESTONES TIMELINE FEED CARD */}
      <div className="p-0 dark:p-4 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-none dark:shadow-2xl transition-all duration-300">
        <div className="p-6 text-black bg-[#FFF6E9] dark:bg-white rounded-[12px] border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none text-left">
          <h3 className="text-sm font-black text-black tracking-tight mb-6">Developer Notes / Milestones</h3>
          
          <div className="space-y-4 max-w-md font-sans pl-1">
            <div className="flex gap-4 items-start border-b border-black/15 pb-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-gray-900">Payment module completed</h4>
                <span className="text-[10px] text-gray-500 font-semibold">Bilal Ahmed • Jul 10, 2026</span>
              </div>
            </div>
            <div className="flex gap-4 items-start border-b border-black/15 pb-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-gray-900">Database integrated</h4>
                <span className="text-[10px] text-gray-500 font-semibold">Bilal Ahmed • Jul 6, 2026</span>
              </div>
            </div>
            <div className="flex gap-4 items-start border-b border-black/15 pb-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-gray-900">Dashboard finished</h4>
                <span className="text-[10px] text-gray-500 font-semibold">Bilal Ahmed • Jul 2, 2026</span>
              </div>
            </div>
            <div className="flex gap-4 items-start last:border-none last:pb-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-gray-900">Authentication completed</h4>
                <span className="text-[10px] text-gray-500 font-semibold">Bilal Ahmed • Jun 28, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}