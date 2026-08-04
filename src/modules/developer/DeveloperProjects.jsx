import React from 'react';
import { FileText } from 'lucide-react';

export default function DeveloperProjects() {
  const projectsData = [
    {
      id: 1,
      title: "Bon Appetit - Ordering app",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Web ordering platform with live table availability and a staff order screen for a mid-size restaurant.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    },
    {
      id: 2,
      title: "Blue Sky Travel - Booking Engine",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Redesign of a flight + hotel booking engine with multi-currency pricing and a partner API integration.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    },
    {
      id: 3,
      title: "Madressa Library - Mob app",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Searchable book catalog with member borrowing history and overdue-fine tracking for a university library.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    },
    {
      id: 4,
      title: "AK Apparel - E-commerce web",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Automation script and dashboard to sync inventory between an online store and a physical POS system.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    }
  ];

  return (
    <div className="w-full font-['Raleway',sans-serif] px-3 sm:px-4 pb-8 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Page Title Section */}
      <div className="mb-4 sm:mb-5 text-left space-y-0.5 max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight">Open Projects</h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium">
          Discover new projects and connect with clients to bring their ideas to life.
        </p>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto items-stretch">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="p-0 dark:p-2 sm:dark:p-6 bg-transparent dark:bg-white/10 border border-transparent dark:border-white/15 rounded-[10px] dark:backdrop-blur-xl dark:shadow-xl flex flex-col justify-between transition-all duration-300 w-full max-w-[360px] mx-auto"
          >
            {/* Inner Container Plate */}
            <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] rounded-[8px] sm:rounded-[6px] p-3 sm:p-4 text-black flex-1 flex flex-col justify-between border border-black/5 dark:border-transparent shadow-xs dark:shadow-none transition-all duration-300">
              
              {/* Header Details */}
              <div className="text-left space-y-1">
                <h3 className="text-xs sm:text-sm font-bold tracking-tight leading-snug text-black">{project.title}</h3>
                <p className="text-[9px] text-gray-600 font-bold">
                  Client: {project.client} · <span className="font-medium text-gray-500">{project.postedTime}</span>
                </p>
                
                {/* Description Block */}
                <p className="text-[11px] text-gray-700 font-medium pt-2 sm:pt-2.5 leading-snug sm:min-h-[44px]">
                  {project.description}
                </p>
              </div>

              {/* Parameters Meta and Action Handles */}
              <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-black/10 dark:border-black/5">
                <div className="flex gap-6 sm:gap-8 mb-3 sm:mb-3.5 text-left">
                  <div>
                    <span className="block text-[8px] font-bold tracking-wider text-gray-500 uppercase">Budget</span>
                    <span className="text-xs font-bold text-black mt-0.5 block">{project.budget}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold tracking-wider text-gray-500 uppercase">Timeline</span>
                    <span className="text-xs font-bold text-black mt-0.5 block">{project.timeline}</span>
                  </div>
                </div>

                {/* Vector Button Groups */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 w-full">
                  <button type="button" className="w-full sm:flex-1 bg-white border border-gray-300 rounded-[4px] py-1.5 px-2.5 text-[10px] font-bold text-black shadow-xs hover:bg-gray-50 active:scale-[0.99] flex items-center justify-center gap-1 transition-all cursor-pointer">
                    <FileText size={12} strokeWidth={2.2} className="text-black shrink-0" /> Download Report
                  </button>
                  <button type="button" className="w-full sm:flex-1 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold py-1.5 px-2.5 rounded-[4px] text-[10px] shadow-xs hover:brightness-105 active:scale-[0.98] flex items-center justify-center gap-1 transition-all cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}