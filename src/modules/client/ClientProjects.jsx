import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Lock, 
  Activity,
  Check
} from 'lucide-react';

export default function ClientProjects() {
  const [activeProjectView, setActiveProjectView] = useState(null); 

  const activeProjectsList = [
    { id: 'bon-appetit', title: 'Bon appetit', status: 'in progress', statusClass: 'bg-[#dbeafe] text-[#2563eb]', dev: 'Bilal ahmed', progress: 80, progressColor: 'bg-[#2563eb]', budget: 'PKR 50,000', timeline: '6-8 weeks', hasAssignedDev: true },
    { id: 'blue-sky', title: 'Blue sky travel', status: 'developer interested', statusClass: 'bg-[#f3e8ff] text-[#7c3aed]', dev: 'Not assigned yet', progress: 0, progressColor: 'bg-gray-300', budget: 'PKR 100,000', timeline: '10 weeks', hasAssignedDev: false },
    { id: 'ak-apparel', title: 'AK apparel store', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#16a34a]', dev: 'Sara khan', progress: 100, progressColor: 'bg-[#16a34a]', budget: 'PKR 98,000', timeline: 'Delivered', hasAssignedDev: true },
  ];

  // =========================================================================
  // VIEW 1: PROJECT OVERVIEW (TABLE ON DESKTOP, CARDS ON MOBILE)
  // =========================================================================
  if (!activeProjectView) {
    return (
      <div className="space-y-4 sm:space-y-5 max-w-4xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 font-['Raleway',sans-serif] text-left animate-fade-in select-none text-gray-900 dark:text-white transition-colors duration-300">
        <div className="space-y-0.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">My Projects</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium">Every idea you've submitted, from intake to delivery.</p> 
        </div>

        <div className="p-0 dark:p-3 sm:dark:p-4 rounded-[10px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/10 dark:backdrop-blur-md shadow-xs dark:shadow-xl w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300">
          <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] rounded-[8px] sm:rounded-[6px] p-2.5 sm:p-6 shadow-inner border border-black/5 sm:border-transparent text-gray-900 dark:text-black transition-colors duration-300">
            
            {/* 📱 MOBILE CARDS VIEW (Visible under 'md' breakpoint) */}
            <div className="block md:hidden space-y-2">
              {activeProjectsList.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setActiveProjectView(project.id)}
                  className="bg-white/80 p-3 rounded-[6px] border border-black/5 shadow-xs active:scale-[0.99] transition-transform cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-xs text-black">{project.title}</h3>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${project.statusClass}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div>
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Dev</span>
                      <span className="font-bold text-gray-700">{project.dev}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Budget</span>
                      <span className="font-extrabold text-black">{project.budget}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[9px] font-bold mb-0.5">
                      <span className="text-gray-500">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${project.progressColor}`} style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP TABLE VIEW (Visible on 'md' screens and above) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2.5 min-w-[620px]">
                <thead>
                  <tr className="bg-gray-400/40 dark:bg-gray-400 text-black uppercase font-['Raleway',sans-serif] font-bold text-[10px] tracking-wider">
                    <th className="py-2.5 px-3.5 rounded-l-[4px]">Project Name</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5">Assigned Dev</th>
                    <th className="py-2.5 px-3.5">Progress</th>
                    <th className="py-2.5 px-3.5">Budget</th>
                    <th className="py-2.5 px-3.5 rounded-r-[4px]">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {activeProjectsList.map((project) => (
                    <tr 
                      key={project.id}
                      onClick={() => setActiveProjectView(project.id)}
                      className="group bg-white/60 dark:bg-white hover:bg-white dark:hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="py-2.5 px-3.5 text-[11px] font-bold border-b border-gray-100 group-last:border-none">{project.title}</td>
                      <td className="py-2.5 px-3.5 border-b border-gray-100 group-last:border-none">
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full select-none capitalize ${project.statusClass}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-[11px] font-medium text-gray-700">{project.dev}</td>
                      <td className="py-2.5 px-3.5 border-b border-gray-100 group-last:border-none">
                        <div className="flex items-center gap-1.5 max-w-[100px]">
                          <div className="w-16 bg-gray-200 dark:bg-gray-100 h-1 rounded-full overflow-hidden shrink-0">
                            <div className={`h-full rounded-full transition-all duration-300 ${project.progressColor}`} style={{ width: `${project.progress}%` }} />
                          </div>
                          <span className="text-[9px] font-bold w-7 text-right">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3.5 text-[11px] font-bold">{project.budget}</td>
                      <td className="py-2.5 px-3.5 text-[11px] font-medium text-gray-600 rounded-r-[4px]">{project.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DEVELOPER INTEREST MATCHING PROFILE
  // =========================================================================
  if (activeProjectView === 'blue-sky') {
    return (
      <div className="w-full max-w-4xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300">
        <div className="mb-4 space-y-0.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">A developer is interested in your project</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Review the developer's profile before releasing payment for "Blue Sky Travel - Booking Engine".</p>
        </div>

        <div className="p-0 dark:p-3 sm:dark:p-4 rounded-[10px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl shadow-xs dark:shadow-xl w-full max-w-xl mx-auto mb-4 transition-all duration-300">
          <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 dark:text-black p-4 sm:p-5 rounded-[8px] sm:rounded-[6px] shadow-inner flex flex-col items-center text-center transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-xs font-bold mb-1.5 shadow-xs">BA</div>
            <h2 className="text-sm font-bold tracking-tight">Bilal Ahmed</h2>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-4 block">Full stack developer</span>

            <div className="w-full border-t border-black/5 dark:border-gray-300 pt-3 sm:pt-4 pb-3 sm:pb-4 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2">Bio</h3>
              <p className="text-[11px] text-gray-650 dark:text-gray-600 font-medium leading-relaxed max-w-md mx-auto">
                Experienced full-stack developer specializing in React, Next.js, and high-scale cloud platforms.
              </p>
            </div>

            <div className="w-full border-t border-black/5 dark:border-gray-300 pt-3 sm:pt-4 pb-3 sm:pb-4 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2.5">Skills</h3>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 max-w-sm mx-auto">
                {['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'AWS', 'PostgreSQL'].map(skill => (
                  <span key={skill} className="bg-black dark:bg-zinc-800 text-white text-[8px] font-bold px-2 py-0.5 rounded-[4px] shadow-xs uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-black/5 dark:border-gray-300 pt-3 sm:pt-4 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2.5">Projects</h3>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {['NEXOVATE', 'SAFAR KARO', 'TN - HRMS'].map(project => (
                  <span key={project} className="bg-black dark:bg-zinc-800 text-white text-[8px] font-bold px-2.5 py-0.5 rounded-[4px] shadow-xs tracking-wide">
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 dark:text-black rounded-[8px] sm:rounded-[6px] p-3.5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl mx-auto transition-colors duration-300">
          <div className="text-center sm:text-left leading-tight">
            <h4 className="text-xs font-bold tracking-tight mb-0.5">Ready to move forward ?</h4>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 font-semibold leading-relaxed max-w-xs">
              Payment will be held securely by Nexovate in escrow until the project is completed.
            </p>
          </div>
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[11px] px-4 py-1.5 rounded-[4px] shadow-xs hover:brightness-105 active:scale-[0.98] transition-all tracking-wide text-center shrink-0 cursor-pointer"
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
    <div className="w-full max-w-4xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300 space-y-4 sm:space-y-5">
      
      <div className="space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">Bon appetit</h1>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Track development progress and milestone updates in real time.</p>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-gray-900 dark:text-black">
        <div className="bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] p-2.5 sm:p-3 flex items-center gap-2.5 shadow-xs border border-transparent transition-colors duration-300">
          <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Calendar size={13} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-wider">Timeline</span>
            <span className="text-[11px] font-bold">6 of 8 weeks</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] p-2.5 sm:p-3 flex items-center gap-2.5 shadow-xs border border-transparent transition-colors duration-300">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Activity size={13} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-wider">Completion</span>
            <span className="text-[11px] font-bold">39%</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] p-2.5 sm:p-3 flex items-center gap-2.5 shadow-xs border border-transparent transition-colors duration-300">
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <Lock size={13} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-wider">Payment</span>
            <span className="text-[11px] font-bold uppercase tracking-tight">In Escrow</span>
          </div>
        </div>
      </div>

      {/* 🎯 SECTION 1: PROGRESS STEPPER BAR INTERACTIVE CARD */}
      <div className="p-0 dark:p-2 sm:dark:p-3 rounded-[10px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-xs dark:shadow-xl transition-all duration-300">
        <div className="bg-[#FFF6E9] dark:bg-white text-black p-3.5 sm:p-5 rounded-[8px] sm:rounded-[6px] border border-black/5 dark:border-transparent shadow-xs dark:shadow-none text-center">
          <h3 className="text-xs font-bold text-black tracking-tight text-left mb-4">Progress stepper</h3>
          
          <div className="overflow-x-auto pb-1.5">
            <div className="relative min-w-[420px] sm:min-w-0 max-w-xl mx-auto px-3 py-1">
              {/* Background Line Tracks */}
              <div className="absolute top-3.5 left-5 right-5 h-[2px] bg-gray-300 dark:bg-gray-200 z-0" />
              <div className="absolute top-3.5 left-5 w-[36%] h-[2px] bg-emerald-700 z-0" /> 

              {/* Stepper Nodes */}
              <div className="flex items-center justify-between relative z-10 w-full text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-xs"><Check size={10} strokeWidth={3} /></div>
                  <span className="text-[9px] font-bold text-gray-900">10%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-xs"><Check size={10} strokeWidth={3} /></div>
                  <span className="text-[9px] font-bold text-gray-900">20%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#CA4612] text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-orange-500/20 cursor-pointer shadow-xs">40</div>
                  <span className="text-[9px] font-bold text-gray-900">40%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">60</div>
                  <span className="text-[9px] font-bold text-gray-400">60%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">80</div>
                  <span className="text-[9px] font-bold text-gray-400">80%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">100</div>
                  <span className="text-[9px] font-bold text-gray-400">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 SECTION 2: HISTORICAL MILESTONES TIMELINE FEED CARD */}
      <div className="p-0 dark:p-2 sm:dark:p-3 rounded-[10px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-xs dark:shadow-xl transition-all duration-300">
        <div className="p-3.5 sm:p-5 text-black bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] border border-black/5 dark:border-transparent shadow-xs dark:shadow-none text-left">
          <h3 className="text-xs font-bold text-black tracking-tight mb-3 sm:mb-4">Developer Notes / Milestones</h3>
          
          <div className="space-y-3 max-w-sm font-sans pl-1">
            <div className="flex gap-2.5 sm:gap-3 items-start border-b border-black/15 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Payment module completed</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 10, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 sm:gap-3 items-start border-b border-black/15 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Database integrated</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 6, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 sm:gap-3 items-start border-b border-black/15 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Dashboard finished</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 2, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 sm:gap-3 items-start last:border-none last:pb-0">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Authentication completed</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jun 28, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}