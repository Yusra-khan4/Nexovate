import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { 
  fetchDeveloperMyProjects, 
  updateDeveloperProjectProgress 
} from '../../services/api';

const fallbackProjectsData = [
  {
    id: 56,
    projectName: "Bon appetit",
    status: "in progress",
    statusType: "progress",
    customer: "Bilal ahmed",
    budget: "PKR 50,000",
    timeline: "6-8 weeks",
    milestones: [
      { id: 1, title: "Requirements & project setup", detail: "Completed · Jun 20, 2026", index: "1/10", completed: true },
      { id: 2, title: "Authentication completed", detail: "Bilal Ahmed · Jun 28, 2026", index: "2/10", completed: true },
      { id: 3, title: "Dashboard finished", detail: "Bilal Ahmed · Jul 2, 2026", index: "3/10", completed: true },
      { id: 4, title: "Database integrated", detail: "Bilal Ahmed · Jul 6, 2026", index: "4/10", completed: true },
      { id: 5, title: "Payment module completed", detail: "Pending", index: "5/10", completed: false },
      { id: 6, title: "Menu & ordering flow", detail: "Pending", index: "6/10", completed: false },
      { id: 7, title: "Order tracking & notifications", detail: "Pending", index: "7/10", completed: false },
      { id: 8, title: "Admin panel for restaurant staff", detail: "Pending", index: "8/10", completed: false },
      { id: 9, title: "QA & bug fixes", detail: "Pending", index: "9/10", completed: false },
      { id: 10, title: "Final delivery & deployment", detail: "Pending", index: "10/10", completed: false }
    ]
  },
  {
    id: 57,
    projectName: "Blue sky travel",
    status: "in progress",
    statusType: "orange-progress",
    customer: "Faizan raza",
    budget: "PKR 100,000",
    timeline: "10 weeks",
    milestones: [
      { id: 1, title: "Requirements & project setup", detail: "Completed · May 10, 2026", index: "1/10", completed: true },
      { id: 2, title: "Wireframes & UI Design", detail: "Faizan Raza · May 20, 2026", index: "2/10", completed: true },
      { id: 3, title: "API Endpoint setup", detail: "Faizan Raza · Jun 01, 2026", index: "3/10", completed: true },
      { id: 4, title: "Flight Booking Module", detail: "Faizan Raza · Jun 12, 2026", index: "4/10", completed: true },
      { id: 5, title: "Hotel Integration Module", detail: "Faizan Raza · Jun 20, 2026", index: "5/10", completed: true },
      { id: 6, title: "Payment Gateway Integration", detail: "Faizan Raza · Jul 02, 2026", index: "6/10", completed: true },
      { id: 7, title: "User Account Dashboard", detail: "Faizan Raza · Jul 15, 2026", index: "7/10", completed: true },
      { id: 8, title: "Notification System", detail: "Faizan Raza · Jul 25, 2026", index: "8/10", completed: true },
      { id: 9, title: "Testing & Bug Fixes", detail: "Pending", index: "9/10", completed: false },
      { id: 10, title: "Final Launch & Handover", detail: "Pending", index: "10/10", completed: false }
    ]
  }
];

export default function DeveloperMyProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectid] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: Calculate progress percentage
  const calculateProgress = (milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const res = await fetchDeveloperMyProjects();

        if (res?.success && Array.isArray(res.projects) && res.projects.length > 0) {
          const mapped = res.projects.map((p) => {
            const progress = Number(p.progress_percentage) || 0;
            const completedMilestones = Math.round((progress / 100) * 10);
            const rawBudget = parseFloat(p.budget) || 0;

            const milestones = Array.from({ length: 10 }, (_, i) => {
              const idx = i + 1;
              const isDone = idx <= completedMilestones;
              return {
                id: idx,
                title: `Milestone ${idx}: Project Phase Deliverable`,
                detail: isDone ? "Completed" : "Pending",
                index: `${idx}/10`,
                completed: isDone
              };
            });

            return {
              id: p.id || p.project_id,
              projectName: p.projectname || p.name || `Project #${p.id}`,
              status: progress >= 100 ? "Completed" : (p.status || "in progress").replace(/_/g, ' '),
              statusType: progress >= 100 ? "completed" : progress < 40 ? "orange-progress" : "progress",
              customer: p.client_name || `Client #${p.client_id || '-'}`,
              budget: rawBudget > 0 ? `PKR ${rawBudget.toLocaleString()}` : "PKR 0",
              timeline: p.timeline || "6-8 weeks",
              milestones: milestones
            };
          });

          setProjects(mapped);
        } else {
          setProjects(fallbackProjectsData);
        }
      } catch (err) {
        console.warn("Could not fetch developer projects, using fallback:", err);
        setProjects(fallbackProjectsData);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const getStatusBadge = (status, type) => {
    if (type === 'completed') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-100/90 dark:text-emerald-800 inline-block capitalize whitespace-nowrap">
          {status}
        </span>
      );
    }
    if (type === 'orange-progress') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-100/90 dark:text-orange-800 inline-block capitalize whitespace-nowrap">
          {status}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-100/90 dark:text-blue-800 inline-block capitalize whitespace-nowrap">
        {status}
      </span>
    );
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return 'bg-emerald-600';
    if (progress >= 80) return 'bg-blue-600';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleToggleMilestone = async (projectId, milestoneId) => {
    const currentProject = projects.find(p => p.id === projectId);
    if (!currentProject) return;

    const updatedMilestones = currentProject.milestones.map(m =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const newProgress = calculateProgress(updatedMilestones);
    const newStatus = newProgress === 100 ? "completed" : "in_progress";
    const newStatusType = newProgress === 100 ? "completed" : newProgress < 40 ? "orange-progress" : "progress";

    // 1. Optimistic UI update
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.id !== projectId) return project;
        return {
          ...project,
          status: newProgress === 100 ? "Completed" : "in progress",
          statusType: newStatusType,
          milestones: updatedMilestones
        };
      })
    );

    // 2. Sync to Backend PUT /api/developers/:id/progress
    try {
      const completedTitles = updatedMilestones
        .filter(m => m.completed)
        .map(m => m.title)
        .join(", ");

      await updateDeveloperProjectProgress(projectId, {
        progress_percentage: newProgress,
        status: newStatus,
        milestone_note: completedTitles || "Milestone updated by developer."
      });
    } catch (err) {
      console.warn("Failed to sync progress to backend:", err);
    }
  };

  if (selectedProject) {
    const progressPct = calculateProgress(selectedProject.milestones);
    const completedCount = selectedProject.milestones.filter(m => m.completed).length;
    const totalCount = selectedProject.milestones.length;

    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-4 max-w-2xl sm:max-w-3xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProjectid(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to projects
          </button>
        </div>

        {/* Page Title */}
        <div className="text-left space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
            {selectedProject.projectName}
          </h1>
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
                  strokeDasharray={`${progressPct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-black">
                {progressPct}%
              </span>
            </div>

            {/* Summary Text */}
            <div className="space-y-0.5 text-left">
              <h3 className="text-sm font-extrabold text-black">
                {completedCount} of {totalCount} milestones completed
              </h3>
              <p className="text-[10px] font-medium text-gray-500 leading-snug">
                Progress is calculated automatically as developer completes milestones - it can't be set manually by anyone.
              </p>
            </div>
          </div>

          <hr className="border-gray-200/80" />

          <div className="divide-y divide-gray-200/70">
            {selectedProject.milestones.map((m) => (
              <div 
                key={m.id} 
                onClick={() => handleToggleMilestone(selectedProject.id, m.id)}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/60 p-1.5 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-4 h-4 rounded flex items-center justify-center transition-all shrink-0 ${
                      m.completed 
                        ? 'bg-emerald-600 text-white' 
                        : 'border-2 border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    {m.completed && <Check size={11} strokeWidth={3} />}
                  </div>

                  <div className="text-left space-y-0.5">
                    <h4 className={`text-xs font-extrabold tracking-tight ${
                      m.completed ? 'text-emerald-600' : 'text-black'
                    }`}>
                      {m.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-gray-400">
                      {m.detail}
                    </p>
                  </div>
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
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">
      
      <div className="text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          My Projects
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          Every idea you've submitted, from intake to delivery.
        </p>
      </div>

      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
        
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading assigned projects...</span>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">PROJECT NAME</th>
                    <th className="py-3.5 px-4 text-center">STATUS</th>
                    <th className="py-3.5 px-4">CUSTOMER</th>
                    <th className="py-3.5 px-4">PROGRESS</th>
                    <th className="py-3.5 px-4">BUDGET</th>
                    <th className="py-3.5 px-5 text-right">TIMELINE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {projects.map((project) => {
                    const progressPct = calculateProgress(project.milestones);
                    return (
                      <tr 
                        key={project.id} 
                        onClick={() => setSelectedProjectid(project.id)}
                        className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer"
                      >
                        <td className="py-4 px-5">
                          <span className="font-bold text-xs text-black hover:text-blue-600 transition-colors tracking-tight block">
                            {project.projectName}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          {getStatusBadge(project.status, project.statusType)}
                        </td>

                        <td className="py-4 px-4 text-xs font-bold text-gray-800">
                          {project.customer}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden shrink-0">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(progressPct)}`} 
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-extrabold text-gray-800 min-w-[28px]">
                              {progressPct}%
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-xs font-bold text-black whitespace-nowrap">
                          {project.budget}
                        </td>

                        <td className="py-4 px-5 text-right text-xs font-bold text-gray-700 whitespace-nowrap">
                          {project.timeline}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              No projects found.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}