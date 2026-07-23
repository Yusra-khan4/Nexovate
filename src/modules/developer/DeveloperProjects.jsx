import React from 'react';
import { FileText, SendHorizontal } from 'lucide-react';

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
    <div className="w-full font-['Raleway',sans-serif] px-2 sm:px-4 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Page Title Section */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-[#FFFFFF] tracking-tight">Open Projects</h2>
        <p className="text-xs text-gray-500 dark:text-gray-200 font-medium mt-1">
          Discover new projects and connect with clients to bring their ideas to life.
        </p>
      </div>

      {/* Grid wrapper constrained max width per card to maintain the pixel-perfect design ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="p-0 dark:p-6 bg-transparent dark:bg-white/10 border border-transparent dark:border-white/15 rounded-[12px] dark:backdrop-blur-xl dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 w-full max-w-[420px] mx-auto"
          >
            {/* 🎯 INNER CONTAINER PLATE: Oatmeal Cream (#FFF6E9) for Light | Custom Ivory Tan (#f3eedf) for Dark */}
            <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] rounded-[12px] p-6 text-black flex-1 flex flex-col justify-between border border-black/5 dark:border-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-none transition-all duration-300">
              
              {/* Header Details */}
              <div className="text-left">
                <h3 className="text-base font-black tracking-tight leading-snug text-black">{project.title}</h3>
                <p className="text-[10px] text-gray-600 font-bold mt-0.5">
                  Client: {project.client} · <span className="font-medium text-gray-500">{project.postedTime}</span>
                </p>
                
                {/* Description Block */}
                <p className="text-xs text-gray-700 font-medium mt-5 leading-relaxed min-h-[56px]">
                  {project.description}
                </p>
              </div>

              {/* Parameters Meta and Action Handles */}
              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="flex gap-12 mb-5 text-left">
                  <div>
                    <span className="block text-[9px] font-black tracking-wider text-gray-500 uppercase">Budget</span>
                    <span className="text-xs font-extrabold text-black mt-0.5 block">{project.budget}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black tracking-wider text-gray-500 uppercase">Timeline</span>
                    <span className="text-xs font-extrabold text-black mt-0.5 block">{project.timeline}</span>
                  </div>
                </div>

                {/* Vector Button Groups */}
                <div className="flex items-center gap-3 w-full">
                  <button className="flex-1 bg-white border border-gray-300 rounded-[5px] py-2 px-3 text-[10px] font-extrabold text-black shadow-sm hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                    <FileText size={12} strokeWidth={2.5} className="text-black" /> Download Report
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold py-2 px-3 rounded-[5px] text-[10px] shadow-md hover:brightness-105 active:scale-[0.98] flex items-center justify-center gap-1.5 transition-all cursor-pointer">
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