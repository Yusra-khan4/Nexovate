import React, { useState } from 'react';
import {
  UserCheck,
  Hourglass,
  XCircle,
  ArrowLeft,
  Check,
  MoreVertical,
  Trash2,
  UserX,
  ShieldAlert
} from 'lucide-react';

const developerApprovalData = {
  stats: {
    approved: 38,
    pending: 3,
    rejected: 1
  },
  approvedList: [
    {
      id: 1,
      name: "Zara ahmed",
      date: "June 12, 2026",
      initials: "ZA",
      initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
      domain: "Full stack development",
      email: "zaraahmed@gmail.com",
      phone: "+923311873628",
      bio: "Full-stack developer specializing in booking & ordering platforms, with a focus on clean React frontends and reliable Node.js APIs.",
      skills: {
        web: ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js"],
        database: ["MySQL", "PostgreSQL"],
        cloud: ["AWS"]
      },
      projectLinks: [
        "https://tnhrms.com",
        "https://bonappetit.com",
        "https://raabtaai.com"
      ],
      bank: {
        name: "Bank Al Habib",
        title: "Zara Ahmed",
        iban: "123456789000"
      }
    },
    {
      id: 2,
      name: "Abdul hanan",
      date: "May 28, 2026",
      initials: "AH",
      initialBg: "bg-orange-200/80 text-orange-700 dark:bg-orange-100 dark:text-orange-800",
      domain: "Frontend Development",
      email: "abdul.hanan@gmail.com",
      phone: "+923001234567",
      bio: "Frontend engineer focused on React UI components and responsive layout architectures.",
      skills: {
        web: ["React.js", "HTML", "CSS", "Tailwind"],
        database: ["MySQL"],
        cloud: []
      },
      projectLinks: ["https://portfolio-abdul.com"],
      bank: {
        name: "Meezan Bank",
        title: "Abdul Hanan",
        iban: "987654321000"
      }
    },
    {
      id: 3,
      name: "Zain rehman",
      date: "Oct 24, 2026",
      initials: "ZR",
      initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
      domain: "Backend Developer",
      email: "zain.rehman@gmail.com",
      phone: "+923211234567",
      bio: "Node.js microservices developer experienced with high-load API systems.",
      skills: {
        web: ["Node.js", "Express"],
        database: ["PostgreSQL"],
        cloud: ["AWS"]
      },
      projectLinks: ["https://zainrehman.dev"],
      bank: {
        name: "HBL",
        title: "Zain Rehman",
        iban: "554433221100"
      }
    },
    {
      id: 4,
      name: "Maham khan",
      date: "Oct 30, 2026",
      initials: "MK",
      initialBg: "bg-emerald-200/80 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-800",
      domain: "UI/UX Developer",
      email: "maham.khan@gmail.com",
      phone: "+923129876543",
      bio: "UI/UX designer and frontend React implementer creating intuitive dashboards.",
      skills: {
        web: ["React.js", "Tailwind CSS"],
        database: [],
        cloud: []
      },
      projectLinks: ["https://maham.design"],
      bank: {
        name: "Meezan Bank",
        title: "Maham Khan",
        iban: "667788990011"
      }
    }
  ],
  pendingList: [
    {
      id: 6,
      name: "Hamza Sheikh",
      date: "July 02, 2026",
      initials: "HS",
      initialBg: "bg-amber-200/80 text-amber-700 dark:bg-amber-100 dark:text-amber-800",
      domain: "Full Stack Engineer",
      email: "hamza.sheikh@gmail.com",
      phone: "+923334445556",
      bio: "Full stack developer interested in scalable cloud solutions.",
      skills: {
        web: ["React.js", "Node.js"],
        database: ["PostgreSQL"],
        cloud: ["AWS"]
      },
      projectLinks: ["https://hamza-dev.com"],
      bank: {
        name: "UBL",
        title: "Hamza Sheikh",
        iban: "112233445566"
      }
    }
  ],
  rejectedList: [
    {
      id: 9,
      name: "Ali Mustafa",
      date: "Feb 11, 2026",
      initials: "AM",
      initialBg: "bg-red-200/80 text-red-700 dark:bg-red-100 dark:text-red-800",
      domain: "Mobile App Developer",
      email: "ali.mustafa@gmail.com",
      phone: "+923456789012",
      bio: "Flutter & React Native developer.",
      skills: {
        web: ["React.js"],
        database: ["MySQL"],
        cloud: []
      },
      projectLinks: ["https://alimustafa.app"],
      bank: {
        name: "Allied Bank",
        title: "Ali Mustafa",
        iban: "998877665544"
      }
    }
  ],
  suspendedList: [
    {
      id: 12,
      name: "Zara ahmed",
      date: "June 12, 2026",
      initials: "ZA",
      initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
      domain: "Full stack development",
      email: "zaraahmed@gmail.com",
      phone: "+923311873628",
      bio: "Full-stack developer specializing in booking & ordering platforms, with a focus on clean React frontends and reliable Node.js APIs.",
      skills: {
        web: ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js"],
        database: ["MySQL", "PostgreSQL"],
        cloud: ["AWS"]
      },
      projectLinks: [
        "https://tnhrms.com",
        "https://bonappetit.com",
        "https://raabtaai.com"
      ],
      bank: {
        name: "Bank Al Habib",
        title: "Zara Ahmed",
        iban: "123456789000"
      }
    }
  ]
};

export default function DeveloperApproval() {
  const [activeTab, setActiveTab] = useState('approved');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const getActiveList = () => {
    switch (activeTab) {
      case 'pending':
        return developerApprovalData.pendingList;
      case 'rejected':
        return developerApprovalData.rejectedList;
      case 'suspended':
        return developerApprovalData.suspendedList;
      case 'approved':
      default:
        return developerApprovalData.approvedList;
    }
  };

  const activeList = getActiveList();

  const handleAction = (actionName, devName) => {
    alert(`${actionName} action performed for ${devName}`);
    setSelectedDeveloper(null);
  };

  const handleMenuAction = (action, devName) => {
    alert(`${action} performed for ${devName}`);
    setOpenMenuId(null);
  };

  if (selectedDeveloper) {
    return (
      <div className="w-full font-['Raleway',sans-serif] space-y-4 max-w-xl sm:max-w-2xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDeveloper(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to list
          </button>
        </div>

        {/* PROFILE CARD DETAIL CONTAINER */}
        <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-5 sm:p-7 shadow-xs border border-amber-100/60 dark:border-transparent space-y-5 text-left transition-colors duration-300">
            
            {/* AVATAR BADGE */}
            <div className="flex justify-center pt-1">
              <div className="w-14 h-14 rounded-full bg-[#0d52cd] text-white font-extrabold text-lg flex items-center justify-center shadow-xs tracking-wider">
                {selectedDeveloper.initials || 'ZA'}
              </div>
            </div>

            {/* NAME & DOMAIN (COMPACT INPUTS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Your name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.name} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Domain</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.domain || 'Full stack development'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Email</label>
                <input 
                  type="email" 
                  readOnly 
                  value={selectedDeveloper.email || 'zaraahmed@gmail.com'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Phone</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.phone || '+923311873628'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            {/* BIO (COMPACT WIDTH & HEIGHT) */}
            <div>
              <label className="text-xs font-bold text-black block mb-1">Bio</label>
              <textarea 
                readOnly 
                rows={2} 
                value={selectedDeveloper.bio || 'Full-stack developer specializing in booking & ordering platforms, with a focus on clean React frontends and reliable Node.js APIs.'} 
                className="w-full max-w-[460px] bg-white border border-gray-300/80 rounded-md p-2 text-xs font-medium text-gray-800 leading-relaxed resize-none outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
              />
            </div>

            {/* SKILLS SECTION */}
            <div className="space-y-3 pt-1">
              <h3 className="text-sm font-extrabold text-[#0088cc]">Skills</h3>
              
              {/* Web Development */}
              <div>
                <label className="text-xs font-bold text-black block mb-1.5">Web Development</label>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDeveloper.skills?.web || ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js"]).map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {skill} <Check size={10} strokeWidth={3} />
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 my-2" />

              {/* Database */}
              <div>
                <label className="text-xs font-bold text-black block mb-1.5">Database</label>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDeveloper.skills?.database || ["MySQL", "PostgreSQL"]).map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {skill} <Check size={10} strokeWidth={3} />
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 my-2" />

              {/* Cloud */}
              <div>
                <label className="text-xs font-bold text-black block mb-1.5">Cloud</label>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDeveloper.skills?.cloud || ["AWS"]).map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {skill} <Check size={10} strokeWidth={3} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-gray-200 my-2" />

            {/* PROJECT LINKS (SHORTENED & STACKED AS SHOWN IN IMAGE) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black block">Project links</label>
              {(selectedDeveloper.projectLinks || ["https://tnhrms.com", "https://bonappetit.com", "https://raabtaai.com"]).map((link, idx) => (
                <input
                  key={idx}
                  type="text"
                  readOnly
                  value={link}
                  className="w-full max-w-[260px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] block"
                />
              ))}
            </div>

            {/* BANK DETAILS SECTION (COMPACT MATCHING IMAGE) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-[#0088cc]">Bank details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDeveloper.bank?.name || "Bank Al Habib"} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank account title</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDeveloper.bank?.title || "Zara Ahmed"} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Bank account number/IBAN</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.bank?.iban || "123456789000"} 
                  className="w-full max-w-[280px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-start gap-3 pt-4">
              <button
                onClick={() => handleAction('Delete Account', selectedDeveloper.name)}
                className="px-4 py-1.5 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Delete account
              </button>

              {activeTab === 'suspended' ? (
                <button
                  onClick={() => handleAction('Unsuspend Account', selectedDeveloper.name)}
                  className="px-4 py-1.5 rounded-md bg-[#fcd5b5] hover:bg-[#f2c4a0] text-[#a0522d] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Unsuspend account
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAction('Block Account', selectedDeveloper.name)}
                    className="px-4 py-1.5 rounded-md bg-[#b8cefb] hover:bg-[#a6c1fa] text-[#1e3a8a] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Block account
                  </button>

                  <button
                    onClick={() => handleAction('Suspend Account', selectedDeveloper.name)}
                    className="px-4 py-1.5 rounded-md bg-[#fcd5b5] hover:bg-[#f2c4a0] text-[#a0522d] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Suspend account
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none"
      onClick={() => setOpenMenuId(null)}
    >
      {/* HEADER SECTION */}
      <div className="text-left">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Developer Approval
        </h1>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">APPROVED</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{developerApprovalData.stats.approved}</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">PENDING</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{developerApprovalData.stats.pending}</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
            <XCircle size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">REJECTED</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{developerApprovalData.stats.rejected}</span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center">
        <div className="inline-flex p-2 rounded-lg bg-[#FFF6E9] dark:bg-white/10 backdrop-blur-md border border-amber-100/60 dark:border-white/15 gap-1">
          {['approved', 'pending', 'rejected', 'suspended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer capitalize ${
                activeTab === tab
                  ? 'bg-white text-black shadow-xs font-extrabold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTAINER WITH GLASS FRAME */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
        
        {/* INNER WHITE CARD */}
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent dark:p-0 rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300">
          
          <table className="w-full text-left border-collapse min-w-[540px]">
            <thead>
              <tr className="bg-white/40 dark:bg-[#A2A6B0] border-b border-black/5 text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                <th className="py-3.5 px-6">DEVELOPER</th>
                <th className="py-3.5 px-4 text-center">
                  {activeTab === 'approved' ? 'APPROVED ON' : 'APPLIED ON'}
                </th>
                <th className="py-3.5 px-6 text-right pr-10">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
              {activeList.map((dev) => (
                <tr 
                  key={dev.id} 
                  className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                >
                  {/* Developer Name & Avatar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-[4px] font-bold text-[10px] flex items-center justify-center shrink-0 ${dev.initialBg}`}>
                        {dev.name.charAt(0).toLowerCase()}
                      </div>
                      <span className="font-extrabold text-xs text-black tracking-tight">
                        {dev.name}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-center text-[11px] font-medium text-gray-500">
                    {dev.date}
                  </td>

                  {/* Action Links & Explicit Gap */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-18 relative">
                      <button 
                        onClick={() => setSelectedDeveloper(dev)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-600 hover:underline cursor-pointer inline-block"
                      >
                        View profile
                      </button>

                      <div className="relative inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === dev.id ? null : dev.id);
                          }}
                          className="p-1 text-gray-700 dark:text-gray-800 hover:text-black rounded-md hover:bg-gray-200/50 transition-all cursor-pointer flex items-center"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* POPUP OPENING UPWARDS & TO THE LEFT */}
                        {openMenuId === dev.id && (
                          <div 
                            className="absolute bottom-full right-0 mb-1.5 w-44 bg-white rounded-md shadow-xl border border-gray-200/80 py-1 z-50 text-left text-xs font-semibold text-gray-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => handleMenuAction('Delete Account', dev.name)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100"
                            >
                              <Trash2 size={13} className="shrink-0" />
                              <span>Delete account</span>
                            </button>

                            {/* DYNAMICALLY TOGGLE BETWEEN SUSPEND / UNSUSPEND */}
                            {activeTab === 'suspended' ? (
                              <button
                                onClick={() => handleMenuAction('Unsuspend Account', dev.name)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100"
                              >
                                <UserCheck size={13} className="shrink-0" />
                                <span>Unsuspend account</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMenuAction('Suspend Account', dev.name)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100"
                              >
                                <UserX size={13} className="shrink-0" />
                                <span>Suspend account</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleMenuAction('Block Account', dev.name)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors"
                            >
                              <ShieldAlert size={13} className="shrink-0" />
                              <span>Block account</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {activeList.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              No developers found in {activeTab}.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}