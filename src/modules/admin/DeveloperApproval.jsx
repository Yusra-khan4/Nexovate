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
      initial: "Z",
      initialBg: "bg-blue-200 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
      domain: "Full stack development",
      email: "zaraahmed@gmail.com",
      phone: "+923311873628",
      bio: "Full-stack developer specializing in booking & ordering platforms, with a focus on clean React frontends and reliable Node.js APIs.",
      skills: {
        web: ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js"],
        database: ["MySQL", "PostgreSQL"],
        cloud: ["AWS"]
      },
      projectLinks: ["https://tnhrms.com", "https://bonappetit.com", "https://raabtaai.com"],
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
      initial: "A",
      initialBg: "bg-orange-200 text-orange-700 dark:bg-orange-100 dark:text-orange-800",
      domain: "Frontend Development",
      email: "abdul.hanan@gmail.com",
      phone: "+923001234567",
      bio: "Frontend engineer focused on React and Tailwind UI components.",
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
      initial: "Z",
      initialBg: "bg-blue-200 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
      domain: "Backend Developer",
      email: "zain.rehman@gmail.com",
      phone: "+923211234567",
      bio: "Node.js and microservices developer.",
      skills: {
        web: ["Node.js", "Express", "GraphQL"],
        database: ["MongoDB", "PostgreSQL"],
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
      initial: "M",
      initialBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-800",
      domain: "UI/UX Developer",
      email: "maham.khan@gmail.com",
      phone: "+923129876543",
      bio: "UI/UX designer and frontend React implementer.",
      skills: {
        web: ["React.js", "Tailwind CSS", "Figma"],
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
      initial: "H",
      initialBg: "bg-amber-200 text-amber-700 dark:bg-amber-100 dark:text-amber-800",
      domain: "Full Stack Engineer",
      email: "hamza.sheikh@gmail.com",
      phone: "+923334445556",
      bio: "Full stack developer interested in scalable cloud solutions.",
      skills: {
        web: ["React.js", "Node.js", "Tailwind"],
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
      initial: "A",
      initialBg: "bg-red-200 text-red-700 dark:bg-red-100 dark:text-red-800",
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
  suspendedList: []
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

  const handleAction = (status) => {
    alert(`Developer profile ${status}!`);
    setSelectedDeveloper(null);
  };

  const handleMenuAction = (action, devName) => {
    alert(`${action} performed for ${devName}`);
    setOpenMenuId(null);
  };

  if (selectedDeveloper) {
    return (
      <div className="w-full font-['Raleway',sans-serif] space-y-4 max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDeveloper(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to list
          </button>
        </div>

        <div className="p-0 dark:p-3 sm:dark:p-4 rounded-[10px] bg-transparent dark:bg-white/10 dark:border dark:border-white/15 dark:backdrop-blur-2xl dark:shadow-2xl transition-all duration-300">
          
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-4 sm:p-6 shadow-xs border border-amber-100/60 dark:border-transparent space-y-5 text-left transition-colors duration-300">
            
            <div className="flex justify-center pt-1">
              <div className="w-12 h-12 rounded-full bg-[#0d52cd] text-white font-black text-base flex items-center justify-center shadow-xs tracking-wider">
                {selectedDeveloper.initial}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Developer name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.name} 
                  className="w-full bg-white border border-gray-300 rounded-md h-8 px-3 text-xs font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Domain</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.domain || 'Full stack development'} 
                  className="w-full bg-white border border-gray-300 rounded-md h-8 px-3 text-xs font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Email</label>
                <input 
                  type="email" 
                  readOnly 
                  value={selectedDeveloper.email || 'zaraahmed@gmail.com'} 
                  className="w-full bg-white border border-gray-300 rounded-md h-8 px-3 text-xs font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Phone</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.phone || '+923311873628'} 
                  className="w-full bg-white border border-gray-300 rounded-md h-8 px-3 text-xs font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-black block mb-1">Bio</label>
              <textarea 
                readOnly 
                rows={2} 
                value={selectedDeveloper.bio || 'Full-stack developer specializing in web applications.'} 
                className="w-full bg-white border border-gray-300 rounded-md p-2.5 text-xs font-medium text-gray-800 leading-relaxed resize-none outline-none focus:ring-0"
              />
            </div>

            <div className="space-y-3 pt-1">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0088cc]">Skills</h3>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-black">Web Development</p>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDeveloper.skills?.web || ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js"]).map((skill) => (
                    <span key={skill} className="bg-black text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                      {skill} <Check size={11} strokeWidth={2.5} />
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-300/70" />

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-black">Database</p>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDeveloper.skills?.database || ["MySQL", "PostgreSQL"]).map((skill) => (
                    <span key={skill} className="bg-black text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                      {skill} <Check size={11} strokeWidth={2.5} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-300/70">
              <button
                onClick={() => handleAction('rejected')}
                className="px-8 h-8 rounded-lg bg-[#df9196] hover:bg-[#d88388] text-[#9b2226] font-extrabold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Reject
              </button>

              <button
                onClick={() => handleAction('accepted')}
                className="px-8 h-8 rounded-lg bg-[#8cb3a8] hover:bg-[#7fa89d] text-[#1e4d2b] font-extrabold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Accept
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">

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
        <div className="inline-flex p-1 rounded-lg bg-[#FFF6E9] dark:bg-white/10 backdrop-blur-md border border-amber-100/60 dark:border-white/15 gap-1">
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

      {/* MAIN LIST TABLE CONTAINER WITH GLASS FRAME */}
      <div className="w-full dark:p-3 sm:dark:p-4 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
        
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent p-4 sm:p-5 dark:p-0 rounded-[8px] sm:rounded-[6px] overflow-hidden shadow-xs transition-all duration-300">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#FAF3E0] dark:bg-[#A2A6B0] text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">DEVELOPER</th>
                  <th className="py-3.5 px-4 text-center">
                    {activeTab === 'pending' || activeTab === 'rejected' ? 'APPLIED ON' : 'APPROVED ON'}
                  </th>
                  <th className="py-3.5 px-5 text-right pr-12">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                {activeList.map((dev) => (
                  <tr 
                    key={dev.id} 
                    className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    {/* Developer Name & Avatar */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-md font-bold text-[10px] flex items-center justify-center shrink-0 ${dev.initialBg}`}>
                          {dev.initial}
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

                    {/* Action Links & Dropdown Menu */}
                    <td className="py-4 px-5 text-right relative">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setSelectedDeveloper(dev)}
                          className="text-[11px] font-bold text-blue-600 dark:text-[#1E3A8A] hover:underline cursor-pointer inline-block"
                        >
                          View profile
                        </button>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === dev.id ? null : dev.id);
                            }}
                            className="p-1 text-gray-600 dark:text-gray-800 hover:text-black rounded-md hover:bg-gray-200/50 transition-all cursor-pointer"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {/* DROPDOWN MENU */}
                          {openMenuId === dev.id && (
                            <div 
                              className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 text-left text-xs font-medium text-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleMenuAction('Delete Account', dev.name)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 text-gray-800 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={12} /> Delete account
                              </button>
                              <button
                                onClick={() => handleMenuAction('Suspend Account', dev.name)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 text-gray-800 hover:text-amber-600 transition-colors"
                              >
                                <UserX size={12} /> Suspend account
                              </button>
                              <button
                                onClick={() => handleMenuAction('Block Account', dev.name)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 text-gray-800 hover:text-red-700 transition-colors"
                              >
                                <ShieldAlert size={12} /> Block account
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
          </div>

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