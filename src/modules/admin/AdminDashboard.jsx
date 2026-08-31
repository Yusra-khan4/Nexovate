import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboard } from '../../services/api';
import {
  Zap,
  Hourglass,
  Wallet,
  UserCheck,
  Users,
  FolderKanban,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const fallbackDashboardData = {
  profile: { name: "Hassan", role: "Admin" },
  stats: {
    activeProjects: "03",
    pendingApproval: "03",
    paymentsHeld: "0",
    totalDevelopers: "23",
    totalCustomers: "20",
    totalProjects: "12"
  },
  projectsAwaitingApproval: [
    { id: 1, title: "Bon appetit", submittedBy: "Zara Ahmed", budget: "PKR 90,000" },
    { id: 2, title: "Ecommerce Store", submittedBy: "Sara Ahmed", budget: "PKR 90,000" },
  ]
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetchAdminDashboard();

        if (res?.dashboard) {
          const d = res.dashboard;
          const rawPaymentHeld = d.paymentHeld?.amount ?? 0;
          const formattedPaymentHeld = rawPaymentHeld >= 1000
            ? `${Math.round(rawPaymentHeld / 1000)}k`
            : `${rawPaymentHeld}`;

          setData({
            profile: { name: "Hassan", role: "Admin" },
            stats: {
              activeProjects: String(d.activeProjects ?? 0).padStart(2, '0'),
              pendingApproval: String(d.pendingApproval ?? 0).padStart(2, '0'),
              paymentsHeld: formattedPaymentHeld,
              totalDevelopers: String(d.totalDevelopers ?? 0),
              totalCustomers: String(d.totalClients ?? d.totalCustomers ?? 0),
              totalProjects: String(d.totalProjects ?? 0)
            },
            projectsAwaitingApproval: Array.isArray(d.projectsAwaitingApproval)
              ? d.projectsAwaitingApproval.map(p => ({
                id: p.id || p.project_id,
                title: p.projectname || p.project_name || p.title || "Untitled Project",
                submittedBy: p.submittedBy || p.client_name || (p.purpose ? `Client (${p.purpose})` : "Client"),
                budget: p.budget ? `PKR ${parseFloat(p.budget).toLocaleString()}` : "PKR 0"
              }))
              : []
          });
        } else {
          setData(fallbackDashboardData);
        }
      } catch (err) {
        console.warn("Could not load admin dashboard from API, using fallback data:", err);
        setData(fallbackDashboardData);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-black dark:text-white">
        <Loader2 className="w-6 h-6 animate-spin text-[#DC6B0F] mr-2" />
        <span className="text-xs font-semibold">Loading Admin Console...</span>
      </div>
    );
  }

  const stats = data?.stats || {};
  const awaitingProjects = Array.isArray(data?.projectsAwaitingApproval)
    ? data.projectsAwaitingApproval
    : [];

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl mx-auto pb-8 px-3 sm:px-4">

      <div className="text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Welcome back, Hassan!
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {/* Active Projects */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#93c5fd]/40 text-blue-600 flex items-center justify-center shrink-0">
            <Zap size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Active Projects
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.activeProjects || "00"}
            </span>
          </div>
        </div>

        {/* Pending Approval */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#fca5a5]/40 text-red-500 flex items-center justify-center shrink-0">
            <Hourglass size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Pending Approval
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.pendingApproval || "00"}
            </span>
          </div>
        </div>

        {/* Payments Held */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20 sm:col-span-2 lg:col-span-1">
          <div className="w-8 h-8 rounded-[8px] bg-[#86efac]/40 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Payments Held (PKR)
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.paymentsHeld || "0"}
            </span>
          </div>
        </div>

        {/* Total Developers */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#a7f3d0]/50 text-teal-600 flex items-center justify-center shrink-0">
            <UserCheck size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Developers
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalDevelopers || "0"}
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#ddd6fe]/50 text-purple-600 flex items-center justify-center shrink-0">
            <Users size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Customers
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalCustomers || "0"}
            </span>
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-[#FFF6E9] dark:bg-white text-gray-900 px-3.5 py-2.5 rounded-[10px] shadow-xs dark:shadow-md flex items-center gap-3 border border-black/5 dark:border-white/20">
          <div className="w-8 h-8 rounded-[8px] bg-[#fecdd3]/50 text-rose-600 flex items-center justify-center shrink-0">
            <FolderKanban size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
              Total Projects
            </span>
            <span className="text-sm font-bold text-black leading-tight mt-0.5 block">
              {stats.totalProjects || "0"}
            </span>
          </div>
        </div>

      </div>

      {/* Main List Box Container */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-black/5 dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden shadow-xs dark:shadow-md">
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[12px] sm:rounded-[6px] overflow-hidden pb-3 transition-colors duration-300 border border-black/5 dark:border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-xl">

          <div className="bg-white/40 dark:bg-white/80 px-3.5 sm:px-4 py-2.5 flex justify-between items-center border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2 text-black">
              <div className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 size={13} strokeWidth={2.2} />
              </div>
              <h2 className="text-xs font-bold text-black tracking-tight uppercase">
                Projects Awaiting Approval
              </h2>
            </div>

            <button
              onClick={() => navigate('/admin/project-approval')}
              className="text-[11px] font-bold text-blue-600 hover:underline tracking-wide cursor-pointer uppercase"
            >
              review all
            </button>
          </div>

          {/* List Items */}
          <div className="p-3 sm:p-4 space-y-2.5 text-left">
            {awaitingProjects.slice(0,3).map((project, idx) => (
              <div
                key={project.id || idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-black/5 dark:border-gray-200/40 last:border-0 pb-2 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-mono font-bold text-gray-700">
                      {project.id}
                    </span>
                    <h3 className="font-bold text-xs text-black tracking-tight">{project.title}</h3>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-700 font-medium mt-0.5">
                    Submitted by {project.submittedBy} · Budget {project.budget}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/admin/project-approval', { state: { projectId: project.id } })}
                  className="text-[11px] font-bold text-blue-600 hover:underline self-start sm:self-auto cursor-pointer"
                >
                  View project
                </button>
              </div>
            ))}

            {awaitingProjects.length === 0 && (
              <div className="text-center py-4 text-xs text-gray-500 font-medium">
                No projects awaiting approval.
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}