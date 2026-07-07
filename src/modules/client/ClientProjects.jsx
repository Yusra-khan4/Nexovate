import React, { useState } from 'react';

export default function ClientProjects() {
  const [activeTab, setActiveTab] = useState('scope');
  // Tracks which version history view button was clicked
  const [selectedVersion, setSelectedVersion] = useState(null);

  const versions = [
    { id: 1, version: "Version 1.2", date: "26 Jun 2026", author: "Client", desc: "Updated budget and timeline", isCurrent: true },
    { id: 2, version: "Version 1.1", date: "18 Jun 2026", author: "AI Assistant", desc: "Generated baseline architecture specs", isCurrent: false },
    { id: 3, version: "Version 1.0", date: "15 Jun 2026", author: "Client", desc: "Initial questionnaire scope submission", isCurrent: false }
  ];

  return (
    <div className="w-full font-['Raleway',sans-serif] antialiased text-white text-left">
      
      {/* 1. TOP HEADER SUMMARY BLOCK */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-white">Bon Appétit — Ordering App</h1>
        <p className="text-xs text-gray-400 font-medium font-sans">
          Web App <span className="mx-1.5">•</span> Started Jun 2, 2026 <span className="mx-1.5">•</span> Estimated delivery Jul 28, 2026
        </p>
      </div>

      {/* 2. SUB NAVIGATION BAR & ASSIGNED DEVELOPER ROW */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        
        {/* Segmented Tab Button Controls */}
        <div className="bg-[#1c1a17]/60 border border-white/10 rounded-[12px] p-1.5 flex items-center gap-1 backdrop-blur-md">
          {['scope', 'milestone', 'payment'].map((tab) => (
            <button 
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== 'scope') setSelectedVersion(null); // Clear preview when changing top tabs
              }}
              className={`px-5 py-2 rounded-[8px] text-xs font-bold transition-all capitalize cursor-pointer ${
                activeTab === tab ? 'bg-white text-black shadow-md' : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab === 'scope' ? 'Scope document' : tab}
            </button>
          ))}
        </div>

        {/* Assigned Developer Minimalist Mini Card Badge */}
        <div className="bg-[#1c1a17]/40 border border-white/10 backdrop-blur-xl rounded-[12px] px-4 py-2 flex items-center gap-3 shadow-md">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
              alt="Developer Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Developer</span>
            <span className="text-xs font-bold text-white">Bilal ahmed</span>
          </div>
          <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[10px] ml-2 text-gray-400 select-none">
            💬
          </div>
        </div>

      </div>

      {/* 3. CORE WORKSPACE AREA CONTAINER */}
      <div className="w-full flex justify-center items-start">
        {activeTab === 'scope' && (
          
          /* OUTER GLASS PANEL CANVAS SURFACE WRAPPER */
          <div className={`w-full bg-[#1c1a17]/20 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-8 flex flex-col transition-all duration-300 ${
            selectedVersion ? 'max-w-5xl items-start text-left' : 'max-w-xl items-center text-center'
          }`}>
            
            <div className={selectedVersion ? 'w-full mb-6' : 'mb-8'}>
              <h2 className="text-xl font-extrabold text-white mb-1">Scope document</h2>
              <p className="text-xs text-gray-400 font-medium">
                Bon Appétit Ordering App - Generated from the AI Scope Questionnaire
              </p>
            </div>

            {/* DYNAMIC LAYOUT FLIP (Flex-Row if a version is selected, else central columns) */}
            <div className={`w-full flex flex-col md:flex-row gap-6 justify-center items-stretch`}>
              
              {/* LEFT CARD COLUMN: VERSION HISTORY SHEET LOG */}
              <div className={`w-full bg-[#f2f2f2] rounded-[14px] p-6 text-black shadow-lg transition-all duration-300 ${
                selectedVersion ? 'md:max-w-xs' : 'max-w-sm'
              }`}>
                <h3 className="text-sm font-extrabold border-b border-gray-300 pb-2.5 text-left tracking-wide mb-4">
                  Version history
                </h3>

                <div className="space-y-4">
                  {versions.map((ver, idx) => (
                    <div key={ver.id} className="flex flex-col text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-gray-900">{ver.version}</span>
                        {ver.isCurrent && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold mt-0.5">
                        {ver.date} • {ver.author}
                      </span>
                      <p className="text-[11px] text-gray-600 font-medium mt-1 leading-tight">
                        {ver.desc}
                      </p>
                      <button 
                        onClick={() => setSelectedVersion(ver)}
                        className={`text-[11px] font-bold hover:underline mt-2 text-left w-max cursor-pointer ${
                          selectedVersion?.id === ver.id ? 'text-orange-600 underline' : 'text-blue-600'
                        }`}
                      >
                        View
                      </button>

                      {idx !== versions.length - 1 && (
                        <div className="border-t border-gray-300/70 my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT CARD COLUMN: 🔴 CONDITIONAL LIVE DETAILED ASSIGNMENT PREVIEW SHEET PANEL */}
              {selectedVersion && (
                <div className="flex-1 bg-[#f2f2f2] rounded-[14px] p-6 text-black shadow-lg flex flex-col text-left relative animate-fade-in">
                  
                  {/* Floating Action Download Mini-Badge Button mirroring custom UI layout row layout */}
                  <div className="absolute top-6 right-6">
                    <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-[10px] font-bold py-1.5 px-3 rounded-[6px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
                      <span>📄</span> Report.pdf
                    </button>
                  </div>

                  {/* DOCUMENT LOG DETAILS VIEWPORT CONTAINER */}
                  <h3 className="text-base font-black text-gray-900 tracking-tight">Bon Appétit — Ordering App</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 border-b border-gray-300 pb-3 mb-4">
                    Scope Report • {selectedVersion.version} • Generated {selectedVersion.date}
                  </p>

                  <div className="space-y-4 overflow-y-auto max-h-[340px] pr-1 custom-scrollbar text-xs">
                    <div>
                      <h4 className="font-extrabold text-blue-700 mb-1">Project Summary</h4>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        A web-based ordering platform for a mid-size restaurant, enabling customers to order ahead or via in-store QR code, view live table availability & reservations, and track order status.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-blue-700 mb-1">Core Features</h4>
                      <ul className="list-disc list-inside text-gray-600 font-medium space-y-0.5 pl-1">
                        <li>Online ordering with cart & checkout</li>
                        <li>Live table availability & reservations</li>
                        <li>QR code in-store ordering</li>
                        <li>Staff order management screen</li>
                        <li>Order status tracking for customers</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-blue-700 mb-1.5">Suggested Tech Stack</h4>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 max-w-sm">
                        <div>
                          <span className="block text-[10px] text-gray-400 font-bold uppercase">Frontend</span>
                          <span className="font-extrabold text-orange-600">React, Tailwind CSS</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-400 font-bold uppercase">Backend</span>
                          <span className="font-extrabold text-orange-600">Node.js, Express</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-400 font-bold uppercase">Database</span>
                          <span className="font-extrabold text-orange-600">PostgreSQL</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-400 font-bold uppercase">Hosting</span>
                          <span className="font-extrabold text-orange-600">AWS</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-300 flex flex-wrap justify-between items-center gap-2 text-gray-500 font-bold text-[11px]">
                      <div>
                        Estimate Timeline: <span className="text-gray-800 font-extrabold">6-8 weeks</span>
                      </div>
                      <div>
                        Budget Range: <span className="text-gray-800 font-extrabold">Rs. 70,000 – 95,000</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {activeTab === 'milestone' && (
          <div className="text-xs text-gray-400 italic py-12">Milestone tracking engine coming soon...</div>
        )}

        {activeTab === 'payment' && (
          <div className="text-xs text-gray-400 italic py-12">Secure payment gateways setup coming soon...</div>
        )}
      </div>

    </div>
  );
}