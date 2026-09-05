import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  UserCheck,
  Hourglass,
  XCircle,
  ArrowLeft,
  Check,
  MoreVertical,
  Trash2,
  UserX,
  ShieldAlert,
  BadgeCheck,
  Loader2
} from 'lucide-react';
import { 
  deleteDeveloperAdmin,
  fetchDeveloperStatsAdmin,
  fetchDevelopersByApprovalAdmin,
  fetchDeveloperDetailsAdmin,
  updateDeveloperApprovalAdmin,
  updateDeveloperAccountStatusAdmin,
  verifyDeveloperAdmin
} from '../../services/api';

const avatarColors = [
  "bg-blue-200/80 text-blue-700 dark:bg-blue-100 dark:text-blue-800",
  "bg-orange-200/80 text-orange-700 dark:bg-orange-100 dark:text-orange-800",
  "bg-emerald-200/80 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-800",
  "bg-amber-200/80 text-amber-700 dark:bg-amber-100 dark:text-amber-800",
  "bg-purple-200/80 text-purple-700 dark:bg-purple-100 dark:text-purple-800"
];

export default function DeveloperApproval() {
  const [stats, setStats] = useState({ approved: 0, pending: 0, rejected: 0 });
  const [developers, setDevelopers] = useState([]);
  const [activeTab, setActiveTab] = useState('approved');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Consume search query from DashboardLayout outlet context
  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  const loadStats = async () => {
    try {
      const res = await fetchDeveloperStatsAdmin();
      if (res?.success && res.stats) {
        setStats({
          approved: res.stats.total_approved ?? 0,
          pending: res.stats.total_pending ?? 0,
          rejected: res.stats.total_rejected ?? 0
        });
      }
    } catch (err) {
      console.warn("Could not load developer stats:", err);
    }
  };

  const loadDevelopers = async () => {
    try {
      setLoading(true);
      const statusParam = activeTab === 'suspended' ? '' : activeTab;
      const res = await fetchDevelopersByApprovalAdmin(statusParam);

      if (res?.success && Array.isArray(res.developers)) {
        let list = res.developers;

        if (activeTab === 'suspended') {
          list = list.filter(d => (d.account_status || '').toLowerCase() === 'suspended');
        }

        const mapped = list.map((dev, idx) => {
          const name = dev.full_name || `Developer #${dev.id}`;
          const parts = name.trim().split(' ');
          const initials = parts.length > 1 
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
            : name.substring(0, 2).toUpperCase();

          const rawDate = dev.created_at || dev.updated_at;
          const formattedDate = rawDate 
            ? new Date(rawDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'Recent';

          return {
            id: dev.id,
            name: name,
            date: formattedDate,
            initials: initials || "DV",
            initialBg: avatarColors[idx % avatarColors.length],
            domain: dev.your_domain || dev.domain || "Full Stack Development",
            email: dev.email_address || "developer@example.com",
            phone: dev.phone_number || dev.phone || "+923000000000",
            cnic: dev.cnic || "Not specified",
            city: dev.city || "Not specified",
            country: dev.country || "Pakistan",
            is_verified: Boolean(dev.is_verified),
            approval_status: dev.approval_status || 'pending',
            account_status: dev.account_status || 'active'
          };
        });

        setDevelopers(mapped);
      } else {
        setDevelopers([]);
      }
    } catch (err) {
      console.warn("Could not fetch developers:", err);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadDevelopers();
  }, [activeTab]);

  const handleViewProfile = async (devSummary) => {
    try {
      setLoadingProfile(true);
      const res = await fetchDeveloperDetailsAdmin(devSummary.id);

      if (res?.success && res.developer) {
        const d = res.developer;
        const name = d.full_name || devSummary.name;
        const parts = name.trim().split(' ');
        const initials = parts.length > 1 
          ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
          : name.substring(0, 2).toUpperCase();

        setSelectedDeveloper({
          id: d.id,
          name: name,
          initials: initials || "DV",
          domain: d.your_domain || d.domain || devSummary.domain || "Full Stack Development",
          email: d.email_address || "developer@example.com",
          phone: d.phone_number || d.phone || "+923000000000",
          cnic: d.cnic || devSummary.cnic || "Not specified",
          city: d.city || devSummary.city || "Not specified",
          country: d.country || devSummary.country || "Pakistan",
          bank: {
            name: d.bank_name || "Not linked",
            title: d.bank_account_title || name,
            iban: d.bank_account_number_iban || d.account_number || "Not provided"
          },
          is_verified: Boolean(d.is_verified),
          approval_status: d.approval_status || devSummary.approval_status,
          account_status: d.account_status || devSummary.account_status
        });
      } else {
        setSelectedDeveloper(devSummary);
      }
    } catch (err) {
      console.warn("Could not fetch detailed developer profile, using summary:", err);
      setSelectedDeveloper(devSummary);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleToggleVerification = async (dev) => {
    const nextStatus = !dev.is_verified;
    try {
      await verifyDeveloperAdmin(dev.id, nextStatus);

      setDevelopers(prev => 
        prev.map(d => d.id === dev.id ? { ...d, is_verified: nextStatus } : d)
      );

      if (selectedDeveloper && selectedDeveloper.id === dev.id) {
        setSelectedDeveloper(prev => ({ ...prev, is_verified: nextStatus }));
      }

      setOpenMenuId(null);
      alert(`Developer ${dev.name} is now ${nextStatus ? 'verified' : 'unverified'}.`);
    } catch (err) {
      alert(err.message || 'Failed to update verification status.');
    }
  };

  const handleApprovalAction = async (dev, approvalStatus) => {
    try {
      await updateDeveloperApprovalAdmin(dev.id, approvalStatus);
      alert(`Developer application has been ${approvalStatus}.`);
      setSelectedDeveloper(null);
      loadStats();
      loadDevelopers();
    } catch (err) {
      alert(`Failed to ${approvalStatus} developer.`);
    }
  };

  const handleAccountStatusChange = async (dev, accountStatus) => {
    try {
      await updateDeveloperAccountStatusAdmin(dev.id, accountStatus);
      alert(`Developer account status changed to ${accountStatus}.`);
      setSelectedDeveloper(null);
      setOpenMenuId(null);
      loadDevelopers();
    } catch (err) {
      alert(`Failed to update account status to ${accountStatus}.`);
    }
  };

  const handleDeleteDeveloper = async (dev) => {
    if (!window.confirm(`Are you sure you want to delete ${dev.name}'s account?`)) return;

    try {
      await deleteDeveloperAdmin(dev.id);
      alert(`Developer ${dev.name} deleted successfully.`);
      setSelectedDeveloper(null);
      setOpenMenuId(null);
      loadStats();
      loadDevelopers();
    } catch (err) {
      alert(`Failed to delete developer.`);
    }
  };

  // 🔍 Realtime dynamic filter across ID, Developer Name, Domain, and Email
  const filteredDevelopers = developers.filter((dev) => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;

    return (
      String(dev.id).toLowerCase().includes(q) ||
      (dev.name || '').toLowerCase().includes(q) ||
      (dev.domain || '').toLowerCase().includes(q) ||
      (dev.email || '').toLowerCase().includes(q)
    );
  });

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center p-16 text-black dark:text-white">
        <Loader2 className="w-6 h-6 animate-spin text-[#DC6B0F] mr-2" />
        <span className="text-xs font-semibold">Loading developer profile...</span>
      </div>
    );
  }

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

        <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-5 sm:p-7 shadow-xs border border-amber-100/60 dark:border-transparent space-y-5 text-left transition-colors duration-300">
            
            <div className="flex flex-col items-center justify-center pt-1 gap-1">
              <div className="w-14 h-14 rounded-full bg-[#0d52cd] text-white font-extrabold text-lg flex items-center justify-center shadow-xs tracking-wider">
                {selectedDeveloper.initials}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {selectedDeveloper.is_verified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <BadgeCheck size={12} /> Verified Developer
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                    Unverified
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-bold text-black block mb-1">Name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.name || ''} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Domain</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.domain || 'Full Stack Development'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Phone</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.phone || 'Not specified'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">City</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.city || 'Not specified'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Country</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.country || 'Pakistan'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">CNIC</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.cnic || 'Not specified'} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Email</label>
                <input 
                  type="email" 
                  readOnly 
                  value={selectedDeveloper.email || ''} 
                  className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-[#0088cc]">Bank details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDeveloper.bank?.name || "Not linked"} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black block mb-1">Bank account title</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDeveloper.bank?.title || selectedDeveloper.name} 
                    className="w-full max-w-[220px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">Account number / IBAN</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDeveloper.bank?.iban || "Not provided"} 
                  className="w-full max-w-[280px] bg-white border border-gray-300/80 rounded-md h-7 px-2.5 text-xs font-medium text-gray-800 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 w-full">
              <button
                onClick={() => handleToggleVerification(selectedDeveloper)}
                className={`w-full py-1.5 px-2 rounded-md font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1 truncate ${
                  selectedDeveloper.is_verified 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1e40af]'
                }`}
              >
                <BadgeCheck size={13} className="shrink-0" />
                <span className="truncate">{selectedDeveloper.is_verified ? 'Unverify dev' : 'Verify dev'}</span>
              </button>

              {activeTab === 'pending' ? (
                <>
                  <button
                    onClick={() => handleApprovalAction(selectedDeveloper, 'rejected')}
                    className="w-full py-1.5 px-2 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleApprovalAction(selectedDeveloper, 'approved')}
                    className="w-full py-1.5 px-2 rounded-md bg-[#a7d3c0] hover:bg-[#96c6b2] text-[#1e4d2b] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Accept
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleDeleteDeveloper(selectedDeveloper)}
                    className="w-full py-1.5 px-2 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Delete account
                  </button>

                  <button
                    onClick={() => handleAccountStatusChange(selectedDeveloper, selectedDeveloper.account_status === 'blocked' ? 'active' : 'blocked')}
                    className="w-full py-1.5 px-2 rounded-md bg-[#b8cefb] hover:bg-[#a6c1fa] text-[#1e3a8a] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 truncate"
                  >
                    {selectedDeveloper.account_status === 'blocked' ? 'Unblock' : 'Block account'}
                  </button>

                  {activeTab === 'suspended' || selectedDeveloper.account_status === 'suspended' ? (
                    <button
                      onClick={() => handleAccountStatusChange(selectedDeveloper, 'active')}
                      className="w-full py-1.5 px-2 rounded-md bg-[#a7d3c0] hover:bg-[#96c6b2] text-[#1e4d2b] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 truncate"
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAccountStatusChange(selectedDeveloper, 'suspended')}
                      className="w-full py-1.5 px-2 rounded-md bg-[#fcd5b5] hover:bg-[#f2c4a0] text-[#a0522d] font-bold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 truncate"
                    >
                      Suspend account
                    </button>
                  )}
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
      className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 text-left select-none"
      onClick={() => setOpenMenuId(null)}
    >
      <div className="text-left">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Developer Approval
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">APPROVED</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{stats.approved}</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">PENDING</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{stats.pending}</span>
          </div>
        </div>

        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-4 py-3 rounded-[10px] shadow-xs flex items-center gap-3 border border-amber-100/60 dark:border-transparent">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
            <XCircle size={16} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">REJECTED</span>
            <span className="text-sm font-extrabold text-black leading-tight mt-0.5 block">{stats.rejected}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
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

      {/* Table Container */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent dark:p-0 rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading developers...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-white/40 dark:bg-[#A2A6B0] border-b border-black/5 text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 rounded-tl-[8px] sm:rounded-tl-[6px]">ID</th>
                  <th className="py-3.5 px-6">DEVELOPER</th>
                  <th className="py-3.5 px-4">DOMAIN</th>
                  <th className="py-3.5 px-4 text-center">
                    {activeTab === 'approved' ? 'APPROVED ON' : 'APPLIED ON'}
                  </th>
                  <th className="py-3.5 px-4 text-center">VIEW PROFILE</th>
                  <th className="py-3.5 px-6 text-right rounded-tr-[8px] sm:rounded-tr-[6px]">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                {filteredDevelopers.map((dev) => (
                  <tr 
                    key={dev.id} 
                    className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 text-xs font-mono font-bold text-gray-700">
                      {dev.id}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-[4px] font-bold text-[10px] flex items-center justify-center shrink-0 ${dev.initialBg}`}>
                          {dev.name.charAt(0).toLowerCase()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-black tracking-tight">
                            {dev.name}
                          </span>
                          {dev.is_verified && (
                            <BadgeCheck size={14} className="text-blue-600" title="Verified Developer" />
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-bold text-gray-700">
                      {dev.domain || 'Full Stack Development'}
                    </td>

                    <td className="py-4 px-4 text-center text-[11px] font-medium text-gray-500">
                      {dev.date}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleViewProfile(dev)}
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
                              setOpenMenuId(openMenuId === dev.id ? null : dev.id);
                            }}
                            className="p-1 text-gray-700 dark:text-gray-800 hover:text-black rounded-md hover:bg-gray-200/50 transition-all cursor-pointer flex items-center"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openMenuId === dev.id && (
                            <div 
                              className="absolute bottom-full right-0 mb-2 w-44 bg-white rounded-md shadow-2xl border border-gray-200/90 py-1 z-50 text-left text-xs font-semibold text-gray-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleToggleVerification(dev)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                              >
                                <BadgeCheck size={13} className="shrink-0 text-blue-600" />
                                <span>{dev.is_verified ? 'Unverify' : 'Verify developer'}</span>
                              </button>

                              <button
                                onClick={() => handleDeleteDeveloper(dev)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                              >
                                <Trash2 size={13} className="shrink-0 text-red-500" />
                                <span>Delete account</span>
                              </button>

                              {activeTab === 'suspended' ? (
                                <button
                                  onClick={() => handleAccountStatusChange(dev, 'active')}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                                >
                                  <UserCheck size={13} className="shrink-0 text-emerald-600" />
                                  <span>Unsuspend account</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAccountStatusChange(dev, 'suspended')}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors border-b border-gray-100 cursor-pointer"
                                >
                                  <UserX size={13} className="shrink-0 text-amber-600" />
                                  <span>Suspend account</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleAccountStatusChange(dev, 'blocked')}
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap transition-colors cursor-pointer"
                              >
                                <ShieldAlert size={13} className="shrink-0 text-blue-600" />
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
          )}

          {!loading && filteredDevelopers.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              {searchQuery ? `No developers matching "${searchQuery}".` : `No developers found in ${activeTab}.`}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}