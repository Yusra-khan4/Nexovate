import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check 
} from 'lucide-react';

export default function ClientProjects() {
  const [activeProjectView, setActiveProjectView] = useState(null); 
  const [milestoneNote, setMilestoneNote] = useState('');

  // Project list mock dataset
  const activeProjectsList = [
    { id: 'bon-appetit', title: 'Bon appetit', status: 'in progress', statusClass: 'bg-[#dbeafe] text-[#2563eb]', customer: 'Bilal ahmed', progress: "80%", budget: 'PKR 50,000', timeline: '6-8 weeks' },
    { id: 'blue-sky', title: 'Blue sky travel', status: 'in progress', statusClass: 'bg-[#ffeedb] text-[#dc6b0f]', customer: 'Faizan raza', progress: "10%", budget: 'PKR 100,000', timeline: '10 weeks' },
    { id: 'ak-apparel', title: 'AK apparel store', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#16a34a]', customer: 'Sara khan', progress: "100%", budget: 'PKR 98,000', timeline: 'Delivered' },
  ];

  // Progress Color Rules Engine
  const getProgressColor = (progressStr) => {
    const val = parseInt(progressStr) || 0;
    if (val === 100) return "bg-emerald-600"; 
    if (val < 40) return "bg-[#BD1C22]";      
    if (val > 50) return "bg-[#2563eb]";      
    return "bg-[#DC6B0F]"; 
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("Milestone note dispatched:", milestoneNote);
    setMilestoneNote('');
  };

  // =========================================================================
  // VIEW BRANCH A: MY PROJECTS LIST OVERVIEW
  // =========================================================================
  if (!activeProjectView) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] text-left animate-fade-in select-none text-gray-900 dark:text-white transition-colors duration-300">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-200 font-medium">Every idea you've submitted, from intake to delivery.</p>
        </div>

        <div className="p-0 dark:p-6 rounded-[16px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 w-full max-w-4xl mx-auto overflow-hidden">
          <div className="bg-[#FFF6E9] dark:bg-white rounded-[12px] p-6 overflow-x-auto relative flex gap-3 items-stretch border border-transparent text-gray-900 dark:text-black transition-colors duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none">
            <table className="w-full text-left border-separate border-spacing-y-4 flex-1 min-w-[760px]">
              <thead>
                <tr className="bg-gray-400/40 dark:bg-gray-400 text-black dark:text-black uppercase font-black font-bold text-[13px] tracking-wider">
                  <th className="py-3 px-4 rounded-l-[4px]">Project Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Customer</th>
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
                    <td className="py-4 px-4 text-xs font-bold text-gray-700">{project.customer}</td>
                    <td className="py-4 px-4 border-b border-gray-100 group-last:border-none">
                      <div className="flex items-center gap-2 max-w-[110px]">
                        <div className="w-20 bg-gray-200 dark:bg-gray-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div className={`h-full rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`} style={{ width: `${parseInt(project.progress)}%` }} />
                        </div>
                        <span className="text-[10px] font-black w-8 text-right">{parseInt(project.progress)}%</span>
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
  // VIEW BRANCH B: DEVELOPER DETAILED MANAGEMENT VIEW (image_d9cfd8.png Sync)
  // =========================================================================
  return (
    <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300 space-y-6">
      
      {/* Back Anchor Control
      <button 
        onClick={() => setActiveProjectView(null)}
        className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-2 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft size={13} strokeWidth={2.5} /> Back to all projects
      </button> */}

      {/* Main Title Headers */}
      <div className="text-left space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Bon appetit</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Update progress and add milestone notes visible to the customer in real time.</p>
      </div>

      {/* SECTION 1: INTERACTIVE PROGRESS STEPPER CARD */}
      <div className="p-0 dark:p-4 rounded-[8px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-none dark:shadow-2xl transition-all duration-300">
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black p-6 rounded-[8px] border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none text-center">
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

          <p className="text-[10px] text-gray-400 font-semibold mt-8 select-none">
            Click a milestone to mark it complete - the customer sees this update instantly.
          </p>
        </div>
      </div>

      {/* SECTION 2: ADD MILESTONE NOTE FORMS CARD */}
      <div className="p-0 dark:p-4 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-none dark:shadow-2xl transition-all duration-300">
        <div className="bg-[#FFF6E9] dark:bg-white text-black p-6 rounded-[12px] border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none text-left">
          <h3 className="text-sm font-black text-black tracking-tight mb-4">Add milestone note</h3>
          
          <form onSubmit={handleAddNote} className="space-y-4">
            <textarea 
              rows="3"
              className="w-full bg-white border border-gray-300 rounded-[5px] p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] transition-colors font-medium shadow-sm resize-none"
              placeholder="e.g Designing completed"
              value={milestoneNote}
              onChange={(e) => setMilestoneNote(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white py-2 px-5 rounded-[5px] font-extrabold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
            >
              Add note
            </button>
          </form>
        </div>
      </div>

      {/* SECTION 3: TIMELINE FEED VIEW CHANNELS */}
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