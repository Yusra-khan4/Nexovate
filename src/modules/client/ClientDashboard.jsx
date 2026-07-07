import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { clientDashboardData } from "../../data/mockData";
export default function ClientDashboard() {
  const [data] = useState(clientDashboardData);
  const navigate = useNavigate();

  const profile = data?.profile || { name: "Sarah Ahmed", type: "Customer" };
  const stats = data?.stats || { totalProjectsPosted: 4, lockedbalance: "450k pkr", completedMilestones: 8 };
  const postedProjects = data?.postedProjects || [
    { id: "p-901", title: "Fintech Mobile App", budget: "300k pkr", status: "In Selection" },
    { id: "p-902", title: "Corporate Portfolio Website", budget: "150k pkr", status: "Active" }
  ];

  return (
    
      <div className="space-y-8 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif]">
        
        {/* Greetings Panel Header */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#FFFFFF]">Welcome back, {profile.name.split(" ")[0]}!</h2>
          <p className="text-sm text-gray-400 font-medium">Here's what's happening with your projects today.</p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Projects Posted */}
          <div className="bg-[#f3eae1] rounded-[5px] p-5 flex items-center gap-4 text-[#000000] shadow-xl border border-white/20">
            <div className="w-10 h-10 rounded-[5px] bg-[#fcd4d4] flex items-center justify-center text-sm">
              <span className="text-[#CA4612]">📊</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Total Posted</p>
              <h3 className="text-xl font-black text-[#000000]">{stats.totalProjectsPosted}</h3>
            </div>
          </div>

          {/* Locked Balance */}
          <div className="bg-[#f3eae1] rounded-[5px] p-5 flex items-center gap-4 text-[#000000] shadow-xl border border-white/20">
            <div className="w-10 h-10 rounded-[5px] bg-[#dbeafe] flex items-center justify-center text-sm">
              <span className="text-[#DC6B0F]">🔒</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Locked Balance</p>
              <h3 className="text-xl font-black text-[#000000] uppercase">{stats.lockedbalance}</h3>
            </div>
          </div>

          {/* Completed Milestones */}
          <div className="bg-[#f3eae1] rounded-[5px] p-5 flex items-center gap-4 text-[#000000] shadow-xl border border-white/20">
            <div className="w-10 h-10 rounded-[5px] bg-[#dcfce7] flex items-center justify-center text-sm">
              <span className="text-[#16a34a]">🏆</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Milestones Completed</p>
              <h3 className="text-xl font-black text-[#000000]">{stats.completedMilestones}</h3>
            </div>
          </div>
        </div>

        {/* Section 1: Active Posted Projects Container */}
        <div className="p-4 rounded-[5px] bg-[#1c1a17]/50 border border-white/10 backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
          <div className="rounded-[5px] overflow-hidden bg-[#d9d5ce] text-[#000000]">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm bg-blue-50 p-1 rounded-[5px]">📁</span>
                <h3 className="text-sm font-black text-[#000000] tracking-wide">Your Posted Projects</h3>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="p-6 space-y-4">
              {postedProjects.map((project) => (
                <div key={project.id} className="flex justify-between items-center bg-white/50 p-4 rounded-[5px] border border-black/5 shadow-sm last:mb-0">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#000000]">{project.title}</h4>
                    <p className="text-[11px] text-gray-500 font-bold mt-0.5">Budget: {project.budget}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-[5px] ${
                    project.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    • {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: AI Generated Reports Container */}
        <div className="p-4 rounded-[5px] bg-[#1c1a17]/50 border border-white/10 backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
          <div className="rounded-[5px] overflow-hidden bg-[#d9d5ce] text-[#000000]">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm bg-orange-50 p-1 rounded-[5px]">🧠</span>
                <h3 className="text-sm font-black text-[#000000] tracking-wide">AI Generated Reports</h3>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between bg-white/40 p-4 rounded-[5px] border border-black/5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-12 bg-[#BD1C22] text-[#FFFFFF] font-black text-xs rounded-[5px] flex flex-col items-center justify-center shadow">
                    <span>📄</span>
                    <span className="text-[9px]">PDF</span>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#000000]">Fintech Mobile App - Scope Analysis</h5>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">Generated on 24 Jun 2026</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] px-5 py-2.5 rounded-[5px] text-xs font-bold shadow-md hover:brightness-105 transition-all">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Recent Messages */}
        <div className="max-w-md p-4 rounded-[5px] bg-[#1c1a17]/50 border border-white/10 backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
          <div className="rounded-[5px] overflow-hidden bg-[#d9d5ce] text-[#000000]">
            <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm bg-blue-50 p-1 rounded-[5px]">💬</span>
                <h3 className="text-xs font-black text-[#000000] tracking-wide">Recent Messages</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-[5px]">2 New</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-emerald-100/80 border border-emerald-200 rounded-[5px] p-3 flex gap-3 shadow-sm">
                <span className="text-base mt-0.5">📱</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h6 className="font-extrabold text-xs text-[#000000] truncate">Fintech App Team</h6>
                    <span className="text-[9px] font-medium text-gray-500">4:12 PM</span>
                  </div>
                  <p className="text-[11px] text-gray-600 truncate">We updated the core secure gateway components...</p>
                </div>
              </div>

              <button className="w-full mt-2 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 rounded-[5px] text-xs font-extrabold shadow hover:brightness-105 transition-all">
                Go to inbox
              </button>
            </div>
          </div>
        </div>

      </div>
  );
}