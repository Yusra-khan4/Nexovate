import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check 
} from 'lucide-react';

export default function DeveloperMyProject() {
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

  if (!activeProjectView) {
    return (
      <div className="space-y-4 max-w-4xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 font-['Raleway',sans-serif] text-left animate-fade-in select-none text-gray-900 dark:text-white transition-colors duration-300">
        <div className="space-y-0.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">My Projects</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium">Every idea you've submitted, from intake to delivery.</p>
        </div>

        <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-xl transition-all duration-300 w-full overflow-hidden">
          <div className="bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] p-2.5 sm:p-4 shadow-xs border border-black/5 sm:border-transparent text-gray-900 dark:text-black transition-colors duration-300">
            
            {/* 📱 MOBILE CARDS VIEW */}
            <div className="block md:hidden space-y-2.5">
              {activeProjectsList.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setActiveProjectView(project.id)}
                  className="bg-white/80 p-3 rounded-[6px] border border-black/5 shadow-xs active:scale-[0.99] transition-transform cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-xs text-black">{project.title}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${project.statusClass}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div>
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Customer</span>
                      <span className="font-semibold text-gray-700">{project.customer}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Budget</span>
                      <span className="font-bold text-black">{project.budget}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[9px] font-bold mb-0.5">
                      <span className="text-gray-500">Progress</span>
                      <span>{parseInt(project.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getProgressColor(project.progress)}`} style={{ width: `${parseInt(project.progress)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
                <thead>
                  <tr className="bg-gray-400/40 dark:bg-gray-300 text-black uppercase font-bold text-[10px] tracking-wider">
                    <th className="py-2 px-3 rounded-l-[4px]">Project Name</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Progress</th>
                    <th className="py-2 px-3">Budget</th>
                    <th className="py-2 px-3 rounded-r-[4px]">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {activeProjectsList.map((project) => (
                    <tr 
                      key={project.id}
                      onClick={() => setActiveProjectView(project.id)}
                      className="group bg-white/60 dark:bg-white hover:bg-white dark:hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="py-2.5 px-3 text-xs font-bold border-b border-gray-100 group-last:border-none">{project.title}</td>
                      <td className="py-2.5 px-3 border-b border-gray-100 group-last:border-none">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full select-none capitalize ${project.statusClass}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] font-medium text-gray-700">{project.customer}</td>
                      <td className="py-2.5 px-3 border-b border-gray-100 group-last:border-none">
                        <div className="flex items-center gap-1.5 max-w-[90px]">
                          <div className="w-16 bg-gray-200 dark:bg-gray-100 h-1 rounded-full overflow-hidden shrink-0">
                            <div className={`h-full rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`} style={{ width: `${parseInt(project.progress)}%` }} />
                          </div>
                          <span className="text-[9px] font-bold w-6 text-right">{parseInt(project.progress)}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] font-bold">{project.budget}</td>
                      <td className="py-2.5 px-3 text-[11px] font-medium text-gray-600 rounded-r-[4px]">{project.timeline}</td>
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
  // VIEW BRANCH B: DEVELOPER DETAILED MANAGEMENT VIEW
  // =========================================================================
  return (
    <div className="w-full max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white animate-fade-in transition-colors duration-300 space-y-3 sm:space-y-4">
      
      {/* Main Title Headers */}
      <div className="text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Bon appetit</h1>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Update progress and add milestone notes visible to the customer in real time.</p>
      </div>

      {/* SECTION 1: INTERACTIVE PROGRESS STEPPER CARD */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-xs dark:shadow-xl transition-all duration-300">
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black p-3.5 sm:p-5 rounded-[8px] sm:rounded-[6px] border border-black/5 dark:border-transparent shadow-xs dark:shadow-none text-center">
          <h3 className="text-xs font-bold text-black tracking-tight text-left mb-3 sm:mb-4">Progress stepper</h3>
          
          <div className="overflow-x-auto pb-1">
            <div className="relative min-w-[380px] sm:min-w-0 max-w-xl mx-auto px-2 py-1">
              {/* Background Line Tracks */}
              <div className="absolute top-3.5 left-4 right-4 h-[2px] bg-gray-300 dark:bg-gray-200 z-0" />
              <div className="absolute top-3.5 left-4 w-[36%] h-[2px] bg-emerald-700 z-0" /> 

              {/* Stepper Nodes */}
              <div className="flex items-center justify-between relative z-10 w-full text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-xs"><Check size={10} strokeWidth={3} /></div>
                  <span className="text-[10px] font-bold text-gray-900">10%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center cursor-pointer shadow-xs"><Check size={10} strokeWidth={3} /></div>
                  <span className="text-[10px] font-bold text-gray-900">20%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#CA4612] text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-orange-500/20 cursor-pointer shadow-xs">40</div>
                  <span className="text-[10px] font-bold text-gray-900">40%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">60</div>
                  <span className="text-[10px] font-bold text-gray-400">60%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">80</div>
                  <span className="text-[10px] font-bold text-gray-400">80%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:bg-gray-600 transition-colors">100</div>
                  <span className="text-[10px] font-bold text-gray-400">100%</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-gray-500 font-semibold mt-4 sm:mt-5 select-none">
            Click a milestone to mark it complete - the customer sees this update instantly.
          </p>
        </div>
      </div>

      {/* SECTION 2: ADD MILESTONE NOTE FORMS CARD */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-xs dark:shadow-xl transition-all duration-300">
        <div className="bg-[#FFF6E9] dark:bg-white text-black p-3.5 sm:p-5 rounded-[8px] sm:rounded-[6px] border border-black/5 dark:border-transparent shadow-xs dark:shadow-none text-left">
          <h3 className="text-xs font-bold text-black tracking-tight mb-2.5 sm:mb-3">Add milestone note</h3>
          
          <form onSubmit={handleAddNote} className="space-y-2.5 sm:space-y-3">
            <textarea 
              rows="2"
              className="w-full bg-white border border-gray-300 rounded-[4px] p-2.5 text-[11px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] transition-colors font-medium shadow-xs resize-none"
              placeholder="e.g Designing completed"
              value={milestoneNote}
              onChange={(e) => setMilestoneNote(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white py-1.5 px-4 rounded-[4px] font-extrabold text-[11px] tracking-wide shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer text-center"
            >
              Add note
            </button>
          </form>
        </div>
      </div>

      {/* SECTION 3: TIMELINE FEED VIEW CHANNELS */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md shadow-xs dark:shadow-xl transition-all duration-300">
        <div className="p-3.5 sm:p-5 text-black bg-[#FFF6E9] dark:bg-white rounded-[8px] sm:rounded-[6px] border border-black/5 dark:border-transparent shadow-xs dark:shadow-none text-left">
          <h3 className="text-xs font-bold text-black tracking-tight mb-3 sm:mb-4">Developer Notes / Milestones</h3>
          
          <div className="space-y-2.5 max-w-md font-sans pl-1">
            <div className="flex gap-2.5 items-start border-b border-black/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Payment module completed</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 10, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start border-b border-black/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Database integrated</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 6, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start border-b border-black/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Dashboard finished</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jul 2, 2026</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start last:border-none last:pb-0">
              <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Authentication completed</h4>
                <span className="text-[9px] text-gray-500 font-semibold">Bilal Ahmed • Jun 28, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}