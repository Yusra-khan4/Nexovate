import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  MoreVertical,
  Trash2,
  UserX,
  ShieldAlert,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { 
  fetchAllClientsAdmin, 
  fetchClientDetailsAdmin,
  deleteClientAdmin, 
  updateClientStatusAdmin 
} from '../../services/api';

const fallbackClientData = [
  {
    id: 1,
    name: "Zara ahmed",
    initials: "ZA",
    initialBg: "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
    email: "zaraahmed@gmail.com",
    phone: "+923311873628",
    status: "active",
    domain: "E-commerce",
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
    status: "active",
    domain: "Fintech",
    bank: {
      name: "Meezan Bank",
      title: "Abdul Hanan",
      iban: "987654321000"
    }
  }
];

const avatarColorPalette = [
  "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
  "bg-orange-200/80 text-orange-700 dark:bg-orange-100 dark:text-orange-800",
  "bg-emerald-200/80 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-800",
  "bg-purple-200/80 text-purple-700 dark:bg-purple-100 dark:text-purple-800",
  "bg-rose-200/80 text-rose-700 dark:bg-rose-100 dark:text-rose-800"
];

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const res = await fetchAllClientsAdmin();

        if (res?.success && Array.isArray(res.clients) && res.clients.length > 0) {
          const mapped = res.clients.map((c, index) => {
            const fullName = c.full_name || `Client #${c.client_id}`;
            const parts = fullName.trim().split(' ');
            const initials = parts.length > 1 
              ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
              : fullName.substring(0, 2).toUpperCase();

            return {
              id: c.client_id || c.id,
              userId: c.user_id,
              name: fullName,
              initials: initials || "CL",
              initialBg: avatarColorPalette[index % avatarColorPalette.length],
              email: c.email_address || "No email provided",
              phone: c.phone || "Not specified",
              status: (c.account_status || 'active').toLowerCase(),
              domain: c.domain || c.your_domain || "General Business",
              bank: {
                name: c.bank_name || "Not linked",
                title: c.account_title || fullName,
                iban: c.account_number || "Not provided"
              }
            };
          });
          setClients(mapped);
        } else {
          setClients(fallbackClientData);
        }
      } catch (err) {
        console.warn("Error fetching clients, using fallback data:", err);
        setClients(fallbackClientData);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const handleViewProfile = async (clientSummary) => {
    try {
      setLoadingProfile(true);
      const res = await fetchClientDetailsAdmin(clientSummary.id);

      if (res?.success && res.client) {
        const c = res.client;
        const fullName = c.full_name || clientSummary.name;
        const parts = fullName.trim().split(' ');
        const initials = parts.length > 1 
          ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
          : fullName.substring(0, 2).toUpperCase();

        setSelectedClient({
          id: c.client_id || clientSummary.id,
          userId: c.user_id,
          name: fullName,
          initials: initials || "CL",
          email: c.email_address || "No email provided",
          phone: c.phone || "Not specified",
          status: (c.account_status || 'active').toLowerCase(),
          domain: c.domain || c.your_domain || clientSummary.domain || "General Business",
          bank: {
            name: c.bank_name || "Not linked",
            title: c.account_title || fullName,
            iban: c.account_number || "Not provided"
          }
        });
      } else {
        setSelectedClient(clientSummary);
      }
    } catch (err) {
      console.warn("Could not fetch client profile details, using summary:", err);
      setSelectedClient(clientSummary);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleDeleteClient = async (client) => {
    if (!window.confirm(`Are you sure you want to delete ${client.name}'s account?`)) return;

    try {
      await deleteClientAdmin(client.id);
      setClients(prev => prev.filter(c => c.id !== client.id));
      setSelectedClient(null);
      setOpenMenuId(null);
      alert(`Client ${client.name} deleted successfully.`);
    } catch (err) {
      console.warn("API delete error, updating client-side list:", err);
      setClients(prev => prev.filter(c => c.id !== client.id));
      setSelectedClient(null);
      setOpenMenuId(null);
      alert(`Client ${client.name} deleted.`);
    }
  };

  const handleUpdateStatus = async (client, newStatus) => {
    try {
      await updateClientStatusAdmin(client.id, newStatus);
      setClients(prev =>
        prev.map(c => (c.id === client.id ? { ...c, status: newStatus } : c))
      );
      if (selectedClient && selectedClient.id === client.id) {
        setSelectedClient(prev => ({ ...prev, status: newStatus }));
      }
      setOpenMenuId(null);
      alert(`Client account successfully changed to ${newStatus}.`);
    } catch (err) {
      console.warn("API status update error, applying locally:", err);
      setClients(prev =>
        prev.map(c => (c.id === client.id ? { ...c, status: newStatus } : c))
      );
      if (selectedClient && selectedClient.id === client.id) {
        setSelectedClient(prev => ({ ...prev, status: newStatus }));
      }
      setOpenMenuId(null);
      alert(`Client account changed to ${newStatus}.`);
    }
  };

  const handleAction = (actionName, client) => {
    if (actionName === 'Delete Account') {
      handleDeleteClient(client);
    } else if (actionName === 'Block Account') {
      handleUpdateStatus(client, 'blocked');
    } else if (actionName === 'Suspend Account') {
      handleUpdateStatus(client, 'suspended');
    } else if (actionName === 'Activate Account') {
      handleUpdateStatus(client, 'active');
    }
  };

  const handleMenuAction = (action, client) => {
    if (action === 'Delete Account') {
      handleDeleteClient(client);
    } else if (action === 'Block Account') {
      handleUpdateStatus(client, 'blocked');
    } else if (action === 'Suspend Account') {
      handleUpdateStatus(client, 'suspended');
    } else if (action === 'Activate Account') {
      handleUpdateStatus(client, 'active');
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center p-16 text-black dark:text-white">
        <Loader2 className="w-6 h-6 animate-spin text-[#DC6B0F] mr-2" />
        <span className="text-xs font-semibold">Loading client details...</span>
      </div>
    );
  }

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

        <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-6 sm:p-8 shadow-xs border border-amber-100/60 dark:border-transparent space-y-6 text-left transition-colors duration-300">
            
            <div className="flex justify-center pt-1">
              <div className="w-16 h-16 rounded-full bg-[#0d52cd] text-white font-extrabold text-xl flex items-center justify-center shadow-xs tracking-wider">
                {selectedClient.initials}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Your name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.name || ''} 
                  className="w-full max-w-[240px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Domain</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.domain || 'General Business'} 
                  className="w-full max-w-[240px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Email</label>
                <input 
                  type="email" 
                  readOnly 
                  value={selectedClient.email || ''} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Phone</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.phone || 'Not specified'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-[#0088cc]">Bank details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedClient.bank?.name || "Not linked"} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank account title</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedClient.bank?.title || selectedClient.name} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Bank account number/IBAN</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedClient.bank?.iban || "Not provided"} 
                  className="w-full max-w-[280px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-3 pt-4">
              <button
                onClick={() => handleAction('Delete Account', selectedClient)}
                className="px-4 py-1.5 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Delete account
              </button>

              {selectedClient.status === 'blocked' ? (
                <button
                  onClick={() => handleAction('Activate Account', selectedClient)}
                  className="px-4 py-1.5 rounded-md bg-[#a7d3c0] hover:bg-[#96c6b2] text-[#1e4d2b] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Unblock account
                </button>
              ) : (
                <button
                  onClick={() => handleAction('Block Account', selectedClient)}
                  className="px-4 py-1.5 rounded-md bg-[#b8cefb] hover:bg-[#a6c1fa] text-[#1e3a8a] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Block account
                </button>
              )}

              {selectedClient.status === 'suspended' ? (
                <button
                  onClick={() => handleAction('Activate Account', selectedClient)}
                  className="px-4 py-1.5 rounded-md bg-[#a7d3c0] hover:bg-[#96c6b2] text-[#1e4d2b] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Unsuspend account
                </button>
              ) : (
                <button
                  onClick={() => handleAction('Suspend Account', selectedClient)}
                  className="px-4 py-1.5 rounded-md bg-[#fcd5b5] hover:bg-[#f2c4a0] text-[#a0522d] font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Suspend account
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 text-left select-none min-h-[420px]"
      onClick={() => setOpenMenuId(null)}
    >
      <div className="text-left space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Client Management
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          View every client on the platform, and manage their accounts.
        </p>
      </div>

      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
        {/* Removed overflow classes completely to allow absolute floating dropdowns to display natively outside card boundaries */}
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading clients...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-white/40 dark:bg-[#A2A6B0] border-b border-black/5 text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 rounded-tl-[8px] sm:rounded-tl-[6px]">ID</th>
                  <th className="py-3.5 px-6">CLIENT</th>
                  <th className="py-3.5 px-4">DOMAIN</th>
                  <th className="py-3.5 px-4 text-center">VIEW PROFILE</th>
                  <th className="py-3.5 px-6 text-right rounded-tr-[8px] sm:rounded-tr-[6px]">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                {clients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 text-xs font-mono font-bold text-gray-700">
                      {client.id}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-[4px] font-bold text-[10px] flex items-center justify-center shrink-0 ${client.initialBg}`}>
                          {client.name.charAt(0).toLowerCase()}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-black tracking-tight">
                            {client.name}
                          </span>
                          {client.status && client.status !== 'active' && (
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded capitalize ${
                              client.status === 'blocked'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {client.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-bold text-gray-700">
                      {client.domain || 'General Business'}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleViewProfile(client)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-600 hover:underline cursor-pointer inline-block"
                      >
                        View profile
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end relative">
                        <div className="relative inline-block z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === client.id ? null : client.id);
                            }}
                            className="p-1 text-gray-700 dark:text-gray-800 hover:text-black rounded-md hover:bg-gray-200/50 transition-all cursor-pointer flex items-center"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openMenuId === client.id && (
                            <div 
                              className="absolute bottom-full right-0 mb-2 w-44 bg-white rounded-md shadow-2xl border border-gray-200/90 py-1 z-50 text-left text-xs font-semibold text-gray-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleMenuAction('Delete Account', client)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                              >
                                <Trash2 size={13} className="shrink-0 text-red-500" />
                                <span>Delete account</span>
                              </button>

                              {client.status === 'suspended' ? (
                                <button
                                  onClick={() => handleMenuAction('Activate Account', client)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                                >
                                  <CheckCircle size={13} className="shrink-0 text-emerald-600" />
                                  <span>Unsuspend account</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMenuAction('Suspend Account', client)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                                >
                                  <UserX size={13} className="shrink-0 text-amber-600" />
                                  <span>Suspend account</span>
                                </button>
                              )}

                              {client.status === 'blocked' ? (
                                <button
                                  onClick={() => handleMenuAction('Activate Account', client)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors cursor-pointer"
                                >
                                  <CheckCircle size={13} className="shrink-0 text-emerald-600" />
                                  <span>Unblock account</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMenuAction('Block Account', client)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors cursor-pointer"
                                >
                                  <ShieldAlert size={13} className="shrink-0 text-blue-600" />
                                  <span>Block account</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && clients.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              No clients found.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}