import React, { useState } from 'react';
// 🎯 MODERN REPLACEMENTS: LINKING LUCIDE VECTOR ICONS
import { Users, Search, ArrowLeft, ExternalLink } from 'lucide-react';

export default function ClientDevelopers() {
  // null = show project list report, string (id) = show matched developers for that project
  const [searchingProject, setSearchingProject] = useState('bon-appetit'); // Defaulted for immediate testing

  // Data for View 1: Projects Report List
  const clientProjectsReport = [
    { id: 'blue-sky', title: 'Blue Sky Travel', subtitle: 'Booking Engine Redesign' },
    { id: 'bon-appetit', title: 'Bon Appetit', subtitle: 'Restaurant website' },
    { id: 'ak-apparel', title: 'AK apparel store', subtitle: 'Ecommerce website' }
  ];

  // Data for View 2: Developer Matches List
  const developerMatchesList = [
    { id: 'dev-01', name: 'Hira Khan', role: 'Full Stack Developer', initials: 'HK', avatarBg: 'bg-[#0055ff]', matchScore: 92, scoreClass: 'text-[#15803d] border-[#15803d]' },
    { id: 'dev-02', name: 'Usman Ali', role: 'Backend-Developer', initials: 'UA', avatarBg: 'bg-[#3b82f6]', matchScore: 50, scoreClass: 'text-[#ea580c] border-[#ea580c]' },
    { id: 'dev-03', name: 'Sara Tariq', role: 'UI/UX Designer', initials: 'ST', avatarBg: 'bg-[#22c55e]', matchScore: 30, scoreClass: 'text-[#dc2626] border-[#dc2626]' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] text-left animate-fade-in select-none transition-colors duration-300">
      
      {/* Upper Main Section Headers */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#FFFFFF] transition-colors duration-300">Developer Matches</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Find perfect matches for your project.</p>
      </div>

      {/* 🎯 OUTER FRAME CARD MODULE: Solid #FF66E9 container in light theme, original custom glass container in dark theme */}
      <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/20 border border-black/5 dark:border-white/10 p-0 dark:p-5 rounded-[5px] dark:rounded-[16px] dark:backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] max-w-4xl mx-auto transition-all duration-300 overflow-hidden">
        
        {/* Core Layout Inner Wrapper */}
        <div className="rounded-none dark:rounded-[5px] overflow-hidden flex flex-col bg-transparent dark:bg-[#ece9e6]">
          
          {/* ========================================================================= */}
          {/* CONDITION A: RENDER DEVELOPERS MATCH LIST (VIEWING MATCHES)               */}
          {/* ========================================================================= */}
          {searchingProject ? (
            <>
              {/* Header Banner Row */}
              <div className="px-6 py-5 bg-white/40 dark:bg-[#fbf9f6] border-b border-black/5 dark:border-gray-300/40 text-left flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
                  <div>
                    <h3 className="text-sm font-black text-[#000000] tracking-wide">Developers</h3>
                    <p className="text-[11px] text-gray-700 dark:text-gray-400 font-bold mt-0.5 font-sans">View profiles of developers</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSearchingProject(null)}
                  className="text-xs font-bold text-gray-900 dark:text-blue-600 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft size={13} strokeWidth={2.5} /> Change project
                </button>
              </div>

              {/* Table List Layout Split Wrapper */}
              <div className="p-6 flex gap-4 items-stretch relative">
                
                <div className="flex-1 space-y-4 max-h-[380px] overflow-y-auto pr-4 custom-scrollbar">
                  {developerMatchesList.map((dev) => (
                    <div 
                      key={dev.id} 
                      className="bg-transparent pb-4 flex items-center justify-between gap-6 transition-all border-b border-black/5 dark:border-gray-400/40 last:border-none last:pb-0 dark:last:border-b dark:last:pb-4"
                    >
                      {/* Left Column Profile Row Group */}
                      <div className="flex items-center gap-4 min-w-0 flex-1 text-left">
                        <div className={`w-10 h-10 rounded-full ${dev.avatarBg} text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0`}>
                          {dev.initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm text-[#000000] leading-snug tracking-tight">
                            {dev.name}
                          </h4>
                          <p className="text-[10px] text-gray-700 dark:text-gray-500 font-bold tracking-wide mt-0.5">
                            {dev.role}
                          </p>
                        </div>
                      </div>

                      {/* Right Hand Stats Percentage Ring Indicator and Profile Button Stack */}
                      <div className="shrink-0 flex items-center gap-5">
                        <div className={`w-9 h-9 rounded-full border-2 bg-white/20 dark:bg-transparent flex items-center justify-center font-black text-[10px] ${dev.scoreClass}`}>
                          {dev.matchScore}%
                        </div>
                        
                        <button
                          type="button"
                          className="bg-white hover:bg-gray-50 text-black border border-gray-300 font-extrabold text-[11px] px-4 py-2 rounded-[5px] shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                        >
                          View profile <ExternalLink size={12} strokeWidth={2.5} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Scroll track indicator match strip */}
                <div className="w-2 bg-black/10 dark:bg-white/40 rounded-full relative overflow-hidden shrink-0 flex flex-col items-center shadow-inner">
                  <div className="w-full h-1/3 bg-gray-700 dark:bg-gray-600 rounded-full absolute top-12 shadow" />
                </div>

              </div>
            </>
          ) : (
            /* ========================================================================= */
            /* CONDITION B: RENDER PROJECTS OVERVIEW LIST SCREEN (Default)               */
            /* ========================================================================= */
            <>
              <div className="flex items-center justify-between px-6 py-5 bg-white/40 dark:bg-[#fbf9f6] border-b border-black/5 dark:border-gray-300/40 text-left">
                <div className="flex items-center gap-2.5">
                  <Search size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
                  <div>
                    <h3 className="text-sm font-black text-[#000000] tracking-wide">Your projects report</h3>
                    <p className="text-[11px] text-gray-700 dark:text-gray-400 font-bold mt-0.5 font-sans">Select your project to find best match</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex gap-4 items-stretch relative">
                <div className="flex-1 space-y-4 max-h-[380px] overflow-y-auto pr-4 custom-scrollbar">
                  {clientProjectsReport.map((project) => (
                    <div 
                      key={project.id} 
                      className="bg-transparent pb-4 flex items-center justify-between gap-6 transition-all border-b border-black/5 dark:border-gray-400/40 last:border-none last:pb-0 dark:last:border-b dark:last:pb-4"
                    >
                      <div className="min-w-0 text-left">
                        <h4 className="font-extrabold text-sm text-[#000000] leading-snug tracking-tight">
                          {project.title}
                        </h4>
                        <p className="text-[10px] text-gray-700 dark:text-gray-500 font-bold tracking-wide mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setSearchingProject(project.id)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[11px] px-5 py-2 rounded-[5px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wide cursor-pointer"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-2 bg-black/10 dark:bg-white/40 rounded-full relative overflow-hidden shrink-0 flex flex-col items-center shadow-inner">
                  <div className="w-full h-1/3 bg-gray-700 dark:bg-gray-600 rounded-full absolute top-10 shadow" />
                </div>
              </div>
            </>
          )}

          <div className="pb-2 dark:pb-2" />
        </div>
      </div>

    </div>
  );
}