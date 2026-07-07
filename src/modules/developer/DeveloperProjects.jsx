import React from 'react';

export default function DeveloperProjects() {
  // Sample projects data array matching the provided image
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
      title: "Blue Sky Travel — Booking Engine",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Redesign of a flight + hotel booking engine with multi-currency pricing and a partner API integration.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    },
    {
      id: 3,
      title: "Madressa Library — Mob app",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Searchable book catalog with member borrowing history and overdue-fine tracking for a university library.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    },
    {
      id: 4,
      title: "AK Apparel — E-commerce web",
      client: "Ramsha Zain",
      postedTime: "Posted 2 days ago",
      description: "Automation script and dashboard to sync inventory between an online store and a physical POS system.",
      budget: "70k - 95k",
      timeline: "3 - 6 months"
    }
  ];

  return (
    <div className="w-full font-['Raleway',sans-serif] px-2 sm:px-4">
      {/* Page Title Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#FFFFFF] tracking-tight">Projects</h2>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Discover new projects and connect with clients to bring their ideas to life.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="bg-[#1c1a17]/40 border border-white/10 p-6 rounded-[20px] backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            {/* White Content Inner Wrapper */}
            <div className="bg-[#f3eedf] rounded-[12px] p-6 text-[#000000] flex-1 flex flex-col justify-between">
              
              {/* Header Details */}
              <div>
                <h3 className="text-lg font-black tracking-tight leading-snug">{project.title}</h3>
                <p className="text-[10px] text-gray-600 font-bold mt-0.5">
                  Client: {project.client} · <span className="font-medium text-gray-500">{project.postedTime}</span>
                </p>
                
                {/* Description block */}
                <p className="text-xs text-gray-700 font-medium mt-4 leading-relaxed min-h-[48px]">
                  {project.description}
                </p>
              </div>

              {/* Parameter Row & Trigger CTA Buttons */}
              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="flex gap-10 mb-5">
                  <div>
                    <span className="block text-[9px] font-black tracking-wider text-gray-500 uppercase">Budget</span>
                    <span className="text-xs font-extrabold text-black mt-0.5 block">{project.budget}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black tracking-wider text-gray-500 uppercase">Timeline</span>
                    <span className="text-xs font-extrabold text-black mt-0.5 block">{project.timeline}</span>
                  </div>
                </div>

                {/* Buttons Container */}
                <div className="flex items-center gap-3 w-full">
                  <button className="flex-1 bg-white border border-gray-300 rounded-[5px] py-1.5 px-3 text-[10px] font-extrabold text-black shadow-sm hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                    <span>🗎</span> Download Report
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold py-1.5 px-3 rounded-[5px] text-[10px] shadow-sm hover:brightness-105 transition-all cursor-pointer">
                    Message client
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