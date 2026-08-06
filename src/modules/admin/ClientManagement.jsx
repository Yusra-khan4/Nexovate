import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Trash2,
  UserX,
  ShieldAlert
} from 'lucide-react';

const clientManagementData = [
  {
    id: 1,
    name: "Zara ahmed",
    initials: "ZA",
    initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
    email: "zaraahmed@gmail.com",
    phone: "+923311873628",
    bank: {
      name: "Bank Al Habib",
      title: "Zara Ahmed",
      iban: "123456789000"
    }
  },
  {
    id: 2,
    name: "Abdul hanan",
    initials: "AH",
    initialBg: "bg-orange-200/80 text-orange-700 dark:bg-orange-100 dark:text-orange-800",
    email: "abdul.hanan@gmail.com",
    phone: "+923001234567",
    bank: {
      name: "Meezan Bank",
      title: "Abdul Hanan",
      iban: "987654321000"
    }
  },
  {
    id: 3,
    name: "Zain rehman",
    initials: "ZR",
    initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
    email: "zain.rehman@gmail.com",
    phone: "+923211234567",
    bank: {
      name: "HBL",
      title: "Zain Rehman",
      iban: "554433221100"
    }
  },
  {
    id: 4,
    name: "Maham khan",
    initials: "MK",
    initialBg: "bg-emerald-200/80 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-800",
    email: "maham.khan@gmail.com",
    phone: "+923129876543",
    bank: {
      name: "Meezan Bank",
      title: "Maham Khan",
      iban: "667788990011"
    }
  }
];

export default function ClientManagement() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAction = (actionName, clientName) => {
    alert(`${actionName} action performed for ${clientName}`);
    setSelectedClient(null);
  };

  const handleMenuAction = (action, clientName) => {
    alert(`${action} performed for ${clientName}`);
    setOpenMenuId(null);
  };

  if (selectedClient) {
    return (
      <div className="w-full font-['Raleway',sans-serif] space-y-4 max-w-xl sm:max-w-2xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedClient(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to list
          </button>
        </div>

        {/* CLIENT CARD CONTAINER */}
        <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-6 sm:p-8 shadow-xs border border-amber-100/60 dark:border-transparent space-y-6 text-left transition-colors duration-300">
            
            {/* AVATAR BADGE */}
            <div className="flex justify-center pt-1">
              <div className="w-16 h-16 rounded-full bg-[#0d52cd] text-white font-extrabold text-xl flex items-center justify-center shadow-xs tracking-wider">
                {selectedClient.initials}
              </div>
            </div>

            {/* NAME FIELD */}
            <div>
              <label className="text-xs font-bold text-black block mb-1">Your name</label>
              <input 
                type="text" 
                readOnly 
                value={selectedClient.name} 
                className="w-full max-w-[240px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
              />
            </div>

            {/* EMAIL & PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Email</label>
                <input 
                  type="email" 
                  readOnly 
                  value={selectedClient.email} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Phone</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.phone} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            {/* BANK DETAILS SECTION */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-[#0088cc]">Bank details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedClient.bank?.name} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank account title</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedClient.bank?.title} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Bank account number/IBAN</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.bank?.iban} 
                  className="w-full max-w-[280px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none focus:ring-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-start gap-3 pt-4">
              <button
                onClick={() => handleAction('Delete Account', selectedClient.name)}
                className="px-4 py-1.5 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Delete account
              </button>

              <button
                onClick={() => handleAction('Block Account', selectedClient.name)}
                className="px-4 py-1.5 rounded-md bg-[#b8cefb] hover:bg-[#a6c1fa] text-[#1e3a8a] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Block account
              </button>

              <button
                onClick={() => handleAction('Suspend Account', selectedClient.name)}
                className="px-4 py-1.5 rounded-md bg-[#fcd5b5] hover:bg-[#f2c4a0] text-[#a0522d] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Suspend account
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // MAIN CLIENT MANAGEMENT TABLE VIEW
  return (
    <div 
      className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-2xl sm:max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none"
      onClick={() => setOpenMenuId(null)}
    >
      {/* HEADER SECTION */}
      <div className="text-left space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Client Management
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          View every client on the platform, and manage their accounts.
        </p>
      </div>

      {/* MAIN CONTAINER WITH GLASS FRAME */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
        
        {/* INNER WHITE CARD - OVERFLOW REMOVED SO DROPDOWNS WON'T GET CLIPPED */}
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300">
          
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-white/40 dark:bg-[#A2A6B0] border-b border-black/5 text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                <th className="py-5 px-3.5 rounded-tl-[8px] sm:rounded-tl-[6px]">CLIENT</th>
                <th className="py-5 px-3.5 text-right pr-10 rounded-tr-[8px] sm:rounded-tr-[6px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
              {clientManagementData.map((client) => (
                <tr 
                  key={client.id} 
                  className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                >
                  {/* Client Name & Avatar */}
                  <td className="py-4 px-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-[4px] font-bold text-[10px] flex items-center justify-center shrink-0 ${client.initialBg}`}>
                        {client.name.charAt(0).toLowerCase()}
                      </div>
                      <span className="font-extrabold text-xs text-black tracking-tight">
                        {client.name}
                      </span>
                    </div>
                  </td>

                  {/* Action Links */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-38 relative">
                      <button 
                        onClick={() => setSelectedClient(client)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-600 hover:underline cursor-pointer inline-block"
                      >
                        View profile
                      </button>

                      {/* Explicit Z-Index wrapper for the action menu */}
                      <div className="relative inline-block z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === client.id ? null : client.id);
                          }}
                          className="p-1 text-gray-700 dark:text-gray-800 hover:text-black rounded-md hover:bg-gray-200/50 transition-all cursor-pointer flex items-center"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* POPUP OPENING UPWARDS & ELEVATED ABOVE THE CARD BOUNDARY */}
                        {openMenuId === client.id && (
                          <div 
                            className="absolute bottom-full right-0 mb-1.5 w-44 bg-white rounded-md shadow-xl border border-gray-200/80 py-1 z-50 text-left text-xs font-semibold text-gray-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => handleMenuAction('Delete Account', client.name)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100"
                            >
                              <Trash2 size={13} className="shrink-0" />
                              <span>Delete account</span>
                            </button>

                            <button
                              onClick={() => handleMenuAction('Suspend Account', client.name)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100"
                            >
                              <UserX size={13} className="shrink-0" />
                              <span>Suspend account</span>
                            </button>

                            <button
                              onClick={() => handleMenuAction('Block Account', client.name)}
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

        </div>
      </div>

    </div>
  );
}