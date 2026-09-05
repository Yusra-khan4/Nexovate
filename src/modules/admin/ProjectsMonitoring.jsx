import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { fetchProjectMonitoring } from '../../services/api';

const fallbackMonitoringData = [
  {
    id: 1,
    projectName: "Bon appetit",
    status: "in progress",
    statusType: "progress",
    client: "Bilal ahmed",
    developer: "Bilal ahmed",
    progress: 40,
    progressColor: "bg-blue-600",
    budget: "PKR 50,000",
    milestonesCount: { completed: 4, total: 10 },
    milestones: [
      { id: 1, title: "Requirements & project setup", status: "completed", detail: "Completed · Jun 20, 2026", index: "1/10" },
      { id: 2, title: "Authentication completed", status: "completed", detail: "Bilal Ahmed · Jun 28, 2026", index: "2/10" },
      { id: 3, title: "Dashboard finished", status: "completed", detail: "Bilal Ahmed · Jul 2, 2026", index: "3/10" },
      { id: 4, title: "Database integrated", status: "completed", detail: "Bilal Ahmed · Jul 5, 2026", index: "4/10" },
      { id: 5, title: "Payment module completed", status: "pending", detail: "Pending", index: "5/10" },
      { id: 6, title: "Menu & ordering flow", status: "pending", detail: "Pending", index: "6/10" },
      { id: 7, title: "Order tracking & notifications", status: "pending", detail: "Pending", index: "7/10" },
      { id: 8, title: "Admin panel for restaurant staff", status: "pending", detail: "Pending", index: "8/10" },
      { id: 9, title: "QA & bug fixes", status: "pending", detail: "Pending", index: "9/10" },
      { id: 10, title: "Final delivery & deployment", status: "pending", detail: "Pending", index: "10/10" }
    ]
  }
];

export default function ProjectsMonitoring() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consume search query from DashboardLayout outlet context
  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  useEffect(() => {
    const loadMonitoringData = async () => {
      try {
        setLoading(true);
        const res = await fetchProjectMonitoring();

        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const mappedProjects = res.data.map((item) => {
            const progress = Number(item.progress_percentage) || 0;
            const rawStatus = (item.project_status || 'in_progress').toLowerCase().trim();
            const isCompleted = rawStatus === 'completed' || progress >= 100;
            const isDraft = rawStatus === 'draft';
            
            let color = 'bg-blue-600';
            if (progress >= 100) color = 'bg-emerald-600';
            else if (progress === 0) color = 'bg-gray-300';
            else if (progress < 50) color = 'bg-orange-500';

            const rawBudget = parseFloat(item.budget) || 0;
            const completedMilestones = Math.round((progress / 100) * 10);

            let displayStatus = 'In Progress';
            let statusType = 'progress';

            if (isCompleted) {
              displayStatus = 'Completed';
              statusType = 'completed';
            } else if (isDraft) {
              displayStatus = 'Draft';
              statusType = 'draft';
            } else {
              displayStatus = rawStatus.replace(/_/g, ' ');
              statusType = 'progress';
            }

            return {
              id: item.project_id,
              projectName: item.project_name || `Project #${item.project_id}`,
              status: displayStatus,
              statusType: statusType,
              client: item.client_name || (item.client_id ? `Client #${item.client_id}` : '-'),
              developer: item.developer_name || (item.developer_id ? `Dev #${item.developer_id}` : '-'),
              progress: progress,
              progressColor: color,
              budget: rawBudget > 0 ? `PKR ${rawBudget.toLocaleString()}` : 'PKR 0',
              milestonesCount: { completed: completedMilestones, total: 10 },
              milestones: Array.from({ length: 10 }, (_, i) => {
                const milestoneIndex = i + 1;
                const isMilestoneDone = milestoneIndex <= completedMilestones;
                return {
                  id: milestoneIndex,
                  title: `Milestone ${milestoneIndex}: Phase Deliverable`,
                  status: isMilestoneDone ? 'completed' : 'pending',
                  detail: isMilestoneDone ? `${item.developer_name || 'Developer'} · Completed` : 'Pending',
                  index: `${milestoneIndex}/10`
                };
              })
            };
          });

          setProjects(mappedProjects);
        } else {
          setProjects(fallbackMonitoringData);
        }
      } catch (err) {
        console.warn('API error, loading fallback monitoring data:', err);
        setProjects(fallbackMonitoringData);
      } finally {
        setLoading(false);
      }
    };

    loadMonitoringData();
  }, []);

  const getStatusBadge = (status, type) => {
    if (type === 'completed') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-100/90 dark:text-emerald-800 inline-block capitalize whitespace-nowrap">
          {status}
        </span>
      );
    }
    if (type === 'draft') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-200 text-gray-700 dark:bg-violet-200/90 dark:text-gray-800 inline-block capitalize whitespace-nowrap">
          {status}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-100/90 dark:text-blue-800 inline-block capitalize whitespace-nowrap">
        {status}
      </span>
    );
  };

  // Realtime search filter across Project ID, Name, Client, Developer, and Status
  const filteredProjects = projects.filter((item) => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;

    return (
      String(item.id).toLowerCase().includes(q) ||
      (item.projectName || '').toLowerCase().includes(q) ||
      (item.client || '').toLowerCase().includes(q) ||
      (item.developer || '').toLowerCase().includes(q) ||
      (item.status || '').toLowerCase().includes(q) ||
      (item.budget || '').toLowerCase().includes(q)
    );
  });

  if (selectedProject) {
    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-4 max-w-2xl sm:max-w-3xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to monitoring
          </button>
        </div>

        <div className="text-left space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
            {selectedProject.projectName}
          </h1>
          <p className="text-[12px] font-mono font-bold text-gray-700 dark:text-gray-300">
            Project ID: #{selectedProject.id}
          </p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
            Track development progress and milestone updates in real time.
          </p>
        </div>

        <div className="w-full bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] p-6 sm:p-8 shadow-xl border border-amber-100/60 dark:border-transparent space-y-6 text-left transition-colors duration-300">
          
          <h2 className="text-lg font-black text-black tracking-tight border-b border-gray-200/80 pb-3">
            Project Milestones
          </h2>

          <div className="flex items-center gap-4 py-1">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-600"
                  strokeDasharray={`${selectedProject.progress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-black">
                {selectedProject.progress}%
              </span>
            </div>

            <div className="space-y-0.5 text-left">
              <h3 className="text-sm font-extrabold text-black">
                {selectedProject.milestonesCount.completed} of {selectedProject.milestonesCount.total} milestones completed
              </h3>
              <p className="text-[10px] font-medium text-gray-500 leading-snug">
                Progress is calculated automatically as developer completes milestones - it can't be set manually by anyone.
              </p>
            </div>
          </div>

          <hr className="border-gray-200/80" />

          <div className="divide-y divide-gray-200/70">
            {selectedProject.milestones.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <h4 className={`text-xs font-extrabold tracking-tight ${
                    m.status === 'completed' ? 'text-emerald-600' : 'text-black'
                  }`}>
                    {m.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-gray-400">
                    {m.detail}
                  </p>
                </div>

                <span className="text-xs font-bold text-gray-800 shrink-0">
                  {m.index}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-4xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">
      
      <div className="text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          Project monitoring
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
          Live view of customer progress, developer progress, milestones, and deadlines.
        </p>
      </div>

      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
        
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading monitored projects...</span>
            </div>
          ) : (
            <div className="w-full overflow-x-hidden">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[9px] tracking-wider">
                    <th className="py-3 px-1 sm:px-2 w-[7%]">ID</th>
                    <th className="py-3 px-2 sm:px-3 w-[20%]">PROJECT</th>
                    <th className="py-3 px-1 sm:px-2 text-center w-[12%]">STATUS</th>
                    <th className="py-3 px-1 sm:px-2 w-[13%] truncate">CLIENT</th>
                    <th className="py-3 px-1 sm:px-2 w-[13%] truncate">DEV</th>
                    <th className="py-3 px-1 sm:px-2 w-[15%]">PROGRESS</th>
                    <th className="py-3 px-1 sm:px-2 text-center w-[9%]">MILES</th>
                    <th className="py-3 px-1 sm:px-2 text-right w-[11%]">BUDGET</th>
                    <th className="py-3 px-1 sm:px-2 text-center w-[10%]">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {filteredProjects.map((item) => (
                    <tr 
                      key={item.id} 
                      className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      {/* Project ID */}
                      <td className="py-3 px-1 sm:px-2 text-[11px] font-mono font-bold text-gray-600 whitespace-nowrap">
                        {item.id}
                      </td>

                      {/* Project Name */}
                      <td className="py-3 px-2 sm:px-3 truncate">
                        <span className="font-bold text-[11px] sm:text-xs text-black tracking-tight block truncate" title={item.projectName}>
                          {item.projectName}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-1 sm:px-2 text-center truncate">
                        {getStatusBadge(item.status, item.statusType)}
                      </td>

                      {/* Client */}
                      <td className="py-3 px-1 sm:px-2 text-[11px] font-bold text-gray-800 truncate" title={item.client}>
                        {item.client}
                      </td>

                      {/* Developer */}
                      <td className="py-3 px-1 sm:px-2 text-[11px] font-bold text-gray-800 truncate" title={item.developer}>
                        {item.developer}
                      </td>

                      {/* Progress Bar & Percentage */}
                      <td className="py-3 px-1 sm:px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 sm:w-14 bg-gray-200 rounded-full h-1.5 overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${item.progressColor}`} 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-extrabold text-gray-800 shrink-0">
                            {item.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Milestones Achieved Column */}
                      <td className="py-3 px-1 sm:px-2 text-center text-[11px] font-extrabold text-gray-700 whitespace-nowrap">
                        {item.milestonesCount.completed}/{item.milestonesCount.total}
                      </td>

                      {/* Budget */}
                      <td className="py-3 px-1 sm:px-2 text-right text-[11px] font-bold text-black whitespace-nowrap">
                        {item.budget}
                      </td>

                      {/* Gradient View Button Column */}
                      <td className="py-3 px-1 sm:px-2 text-center whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedProject(item)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[9px] px-2.5 py-1 rounded-[4px] shadow-xs hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer tracking-wide inline-block"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              {searchQuery ? `No monitored projects matching "${searchQuery}".` : 'No projects being monitored.'}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}