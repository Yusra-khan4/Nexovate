import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Zap, 
  Lock,
  Loader2,
  Check,
  X,
  ExternalLink,
  FileText
} from 'lucide-react';
import { 
  fetchClientProjectsList, 
  fetchProjectMilestoneReport,
  depositEscrowPayment
} from '../../services/api';

const fallbackProjects = [
  {
    id: 56,
    title: "Bon Appetit restaurant app",
    status: "in progress",
    statusType: "progress",
    dev: "Bilal ahmed",
    assignedDevEmail: "bilal@example.com",
    hasAssignedDev: true,
    progress: 40,
    progressColor: "bg-blue-600",
    budget: "PKR 50,000",
    numericBudget: 50000,
    timeline: "6-8 weeks",
    timelineText: "6 of 8 weeks",
    paymentStatus: "IN ESCROW",
    milestonesCount: { completed: 4, total: 10 },
    milestones: [
      { id: 1, title: "Requirements & project setup", status: "completed", detail: "Completed · Jun 20, 2026", index: "1/10" },
      { id: 2, title: "Authentication completed", status: "completed", detail: "Bilal Ahmed · Jun 28, 2026", index: "2/10" },
      { id: 3, title: "Dashboard finished", status: "completed", detail: "Bilal Ahmed · Jul 2, 2026", index: "3/10" },
      { id: 4, title: "Database integrated", status: "completed", detail: "Bilal Ahmed · Jul 6, 2026", index: "4/10" },
      { id: 5, title: "Payment module completed", status: "pending", detail: "Pending", index: "5/10" },
      { id: 6, title: "Menu & ordering flow", status: "pending", detail: "Pending", index: "6/10" },
      { id: 7, title: "Order tracking & notifications", status: "pending", detail: "Pending", index: "7/10" },
      { id: 8, title: "Admin panel for restaurant staff", status: "pending", detail: "Pending", index: "8/10" },
      { id: 9, title: "QA & bug fixes", status: "pending", detail: "Pending", index: "9/10" },
      { id: 10, title: "Final delivery & deployment", status: "pending", detail: "Pending", index: "10/10" }
    ]
  },
  {
    id: 57,
    title: "Food Delivery Logistics",
    status: "Pending Review",
    statusType: "purple",
    dev: "Not assigned yet",
    hasAssignedDev: false,
    progress: 0,
    progressColor: "bg-gray-300",
    budget: "PKR 85,000",
    numericBudget: 85000,
    timeline: "4-6 weeks",
    timelineText: "4-6 weeks",
    paymentStatus: "PENDING",
    milestonesCount: { completed: 0, total: 10 }
  }
];

const fallbackRequests = [
  {
    id: 1,
    developerId: 101,
    developerName: "Hamza Tariq",
    developerEmail: "hamza.dev@gmail.com",
    domain: "Full Stack Web & Mobile",
    experience: "4 years",
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    portfolioUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com/in/hamzatariq",
    projectLinks: ["https://github.com/hamzatariq/logistics-app"],
    certificateName: "React_Advanced_Certificate.pdf",
    projectId: 57,
    projectName: "Food Delivery Logistics",
    appliedDate: "Sep 2, 2026",
    pitch: "I have built 3 similar real-time tracking logistics apps with geolocation and order dashboards."
  },
  {
    id: 2,
    developerId: 102,
    developerName: "Usman Raza",
    developerEmail: "usman.raza@tech.com",
    domain: "Frontend Specialist",
    experience: "3 years",
    techStack: ["React Native", "Next.js", "TypeScript"],
    portfolioUrl: "https://portfolio.me",
    linkedinUrl: "https://linkedin.com/in/usmanraza",
    projectLinks: ["https://github.com/usmanraza/pos-app"],
    certificateName: "Fullstack_Nanodegree.pdf",
    projectId: 56,
    projectName: "Bon Appetit restaurant app",
    appliedDate: "Sep 3, 2026",
    pitch: "Expert in responsive web and mobile restaurant POS ordering flows."
  }
];

export default function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState(fallbackRequests);
  const [activeTab, setActiveTab] = useState('running');
  const [selectedDevProfile, setSelectedDevProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [paying, setPaying] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [showSubmitPayment, setShowSubmitPayment] = useState(false);

  const [bankTitle, setBankTitle] = useState('Bilal ahmed');
  const [bankName, setBankName] = useState('Meezan bank');
  const [accountNumber, setAccountNumber] = useState('4821 9876 3584 4821');

  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchClientProjectsList();

      if (res?.success && Array.isArray(res.projects) && res.projects.length > 0) {
        const mapped = res.projects.map((p) => {
          const progress = Number(p.progress_percentage) || 0;
          const rawStatus = (p.status || 'draft').toLowerCase();
          const hasDev = Boolean(p.assigned_developer_name && p.assigned_developer_name !== 'Not assigned yet');
          
          let statusType = 'progress';
          let displayStatus = rawStatus.replace(/_/g, ' ');

          if (rawStatus === 'completed' || progress >= 100) {
            statusType = 'completed';
            displayStatus = 'Completed';
          } else if (rawStatus === 'draft') {
            statusType = 'purple';
            displayStatus = 'Draft';
          } else if (hasDev) {
            displayStatus = 'In Progress';
          }

          let color = 'bg-blue-600';
          if (progress >= 100) color = 'bg-emerald-600';
          else if (progress === 0) color = 'bg-gray-300';
          else if (progress < 40) color = 'bg-orange-500';

          const rawNum = typeof p.budget === 'string' ? parseFloat(p.budget.replace(/[^0-9.]/g, '')) : Number(p.budget) || 0;
          const budgetStr = typeof p.budget === 'string' && p.budget.startsWith('Rs.') 
            ? p.budget.replace('Rs.', 'PKR') 
            : rawNum > 0 ? `PKR ${rawNum.toLocaleString()}` : 'PKR 0';

          return {
            id: p.project_id,
            title: p.projectname || `Project #${p.project_id}`,
            status: displayStatus,
            statusType: statusType,
            dev: p.assigned_developer_name || 'Not assigned yet',
            assignedDevEmail: p.assigned_developer_email,
            hasAssignedDev: hasDev,
            progress: progress,
            progressColor: color,
            budget: budgetStr,
            numericBudget: rawNum,
            timeline: p.timeline || 'Not specified',
            timelineText: p.timeline || 'Not specified',
            paymentStatus: progress >= 100 ? 'RELEASED' : 'IN ESCROW',
            milestoneNote: p.milestone_note || '',
            milestonesCount: { completed: Math.round((progress / 100) * 10), total: 10 }
          };
        });

        setProjects(mapped);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      console.warn("Could not fetch client projects list, using fallback:", err);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSelectProject = async (projectSummary) => {
    setSelectedProjectId(projectSummary.id);
    setShowSubmitPayment(false);

    try {
      setLoadingDetails(true);
      const res = await fetchProjectMilestoneReport(projectSummary.id);

      if (res?.success && res.report) {
        const r = res.report;
        const progress = Number(r.progress_percentage) || 0;
        const completedMilestones = Math.round((progress / 100) * 10);
        
        const generatedMilestones = Array.from({ length: 10 }, (_, i) => {
          const idx = i + 1;
          const isDone = idx <= completedMilestones;
          return {
            id: idx,
            title: idx === 1 ? "Requirements & Project Setup" : `Milestone ${idx}: Project Phase Deliverable`,
            status: isDone ? 'completed' : 'pending',
            detail: isDone 
              ? `${r.assigned_developer?.name || 'Developer'} · Completed` 
              : (idx === completedMilestones + 1 && r.milestone_note ? r.milestone_note : 'Pending'),
            index: `${idx}/10`
          };
        });

        setSelectedProjectDetails({
          ...projectSummary,
          title: r.project_name || projectSummary.title,
          dev: r.assigned_developer?.name || projectSummary.dev,
          assignedDevEmail: r.assigned_developer?.email || projectSummary.assignedDevEmail,
          progress: progress,
          timelineText: r.timeline || projectSummary.timelineText,
          paymentStatus: r.status === 'completed' ? 'RELEASED' : 'IN ESCROW',
          milestonesCount: { completed: completedMilestones, total: 10 },
          milestones: generatedMilestones
        });
      } else {
        const completedMilestones = Math.round((projectSummary.progress / 100) * 10);
        setSelectedProjectDetails({
          ...projectSummary,
          milestonesCount: { completed: completedMilestones, total: 10 },
          milestones: Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            title: `Milestone ${i + 1}: Deliverable Phase`,
            status: (i + 1) <= completedMilestones ? 'completed' : 'pending',
            detail: (i + 1) <= completedMilestones ? 'Completed' : 'Pending',
            index: `${i + 1}/10`
          }))
        });
      }
    } catch (err) {
      console.warn("Could not fetch project milestone report, using list data:", err);
      const completedMilestones = Math.round((projectSummary.progress / 100) * 10);
      setSelectedProjectDetails({
        ...projectSummary,
        milestonesCount: { completed: completedMilestones, total: 10 },
        milestones: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Milestone ${i + 1}: Deliverable Phase`,
          status: (i + 1) <= completedMilestones ? 'completed' : 'pending',
          detail: (i + 1) <= completedMilestones ? 'Completed' : 'Pending',
          index: `${i + 1}/10`
        }))
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const getStatusBadge = (status, type) => {
    if (type === 'completed') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-100/90 dark:text-emerald-800 inline-block capitalize whitespace-nowrap">
          {status}
        </span>
      );
    }
    if (type === 'purple') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-100/90 dark:text-purple-800 inline-block capitalize whitespace-nowrap">
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

  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!selectedProjectDetails) return;

    try {
      setPaying(true);
      const res = await depositEscrowPayment({
        projectId: selectedProjectDetails.id,
        amount: selectedProjectDetails.numericBudget || 50000,
        transactionRef: `TXN-${Date.now()}`
      });

      alert(res?.message || `Payment deposited and held securely in platform escrow for ${selectedProjectDetails.title}!`);
      setShowSubmitPayment(false);
      setSelectedProjectId(null);
      setSelectedProjectDetails(null);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Failed to deposit escrow payment.');
    } finally {
      setPaying(false);
    }
  };

  const handleAcceptRequest = (req) => {
    alert(`You accepted ${req.developerName} for project "${req.projectName}"!`);
    setRequests(prev => prev.filter(r => r.id !== req.id));
    setSelectedDevProfile(null);
    setProjects(prev =>
      prev.map(p =>
        p.id === req.projectId
          ? {
              ...p,
              dev: req.developerName,
              hasAssignedDev: true,
              status: "In Progress",
              statusType: "progress"
            }
          : p
      )
    );
  };

  const handleRejectRequest = (req) => {
    if (!window.confirm(`Decline proposal from ${req.developerName}?`)) return;
    setRequests(prev => prev.filter(r => r.id !== req.id));
    setSelectedDevProfile(null);
    alert(`Proposal from ${req.developerName} declined.`);
  };

  const q = (searchQuery || '').trim().toLowerCase();

  const runningProjects = projects.filter(p => {
    const isRunning = p.hasAssignedDev || p.statusType === 'progress';
    if (!isRunning) return false;
    if (!q) return true;
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.dev || '').toLowerCase().includes(q) ||
      (p.status || '').toLowerCase().includes(q) ||
      String(p.id).includes(q)
    );
  });

  const pendingProjects = projects.filter(p => {
    const isPending = !p.hasAssignedDev && p.statusType !== 'progress';
    if (!isPending) return false;
    if (!q) return true;
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.status || '').toLowerCase().includes(q) ||
      String(p.id).includes(q)
    );
  });

  const filteredRequests = requests.filter(r => {
    if (!q) return true;
    return (
      (r.developerName || '').toLowerCase().includes(q) ||
      (r.projectName || '').toLowerCase().includes(q) ||
      (r.domain || '').toLowerCase().includes(q) ||
      String(r.projectId).includes(q)
    );
  });

  if (loadingDetails) {
    return (
      <div className="flex items-center justify-center p-16 text-black dark:text-white font-['Raleway',sans-serif]">
        <Loader2 className="w-6 h-6 animate-spin text-[#DC6B0F] mr-2" />
        <span className="text-xs font-semibold">Loading project milestone progress...</span>
      </div>
    );
  }

  if (selectedProjectDetails && showSubmitPayment) {
    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-4 max-w-3xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSubmitPayment(false)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to details
          </button>
        </div>

        <div className="text-left mb-6 space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
            Submit Payment
          </h1>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
            Pay securely for "{selectedProjectDetails.title}". Funds are held by Nexovate until developer delivers project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="w-full dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
            <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] p-5 sm:p-6 shadow-xl border border-amber-100/60 dark:border-transparent space-y-4 text-left">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-black">
                  Bank account title
                </label>
                <input
                  type="text"
                  value={bankTitle}
                  onChange={(e) => setBankTitle(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-9 px-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#DC6B0F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-black">
                  Bank name
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-9 px-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#DC6B0F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-black">
                  Bank account number/IBAN
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-9 px-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#DC6B0F]"
                />
              </div>
            </div>
          </div>

          <div className="w-full dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
            <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] p-5 sm:p-6 shadow-xl border border-amber-100/60 dark:border-transparent space-y-4 text-left">
              <div className="border-b border-gray-200/80 pb-2 max-w-[150px]">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-black">
                  ORDER SUMMARY
                </h2>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-gray-800">Project budget</span>
                  <span className="font-extrabold text-black">{selectedProjectDetails.budget}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-gray-800">Held in escrow</span>
                  <span className="font-bold text-gray-600">By nexovate</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-gray-800">Released to</span>
                  <span className="font-bold text-gray-600">{selectedProjectDetails.dev} on completion</span>
                </div>

                <hr className="border-gray-200/80 my-1" />

                <div className="flex justify-between items-center pt-1">
                  <span className="font-black text-sm text-black">Amount to pay</span>
                  <span className="font-black text-sm text-black">{selectedProjectDetails.budget}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={paying}
                onClick={handlePayNow}
                className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white h-9 rounded-md font-extrabold text-xs tracking-wider uppercase shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer mt-2 flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {paying ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Processing Escrow...</span>
                  </>
                ) : (
                  'Pay now'
                )}
              </button>

              <div className="bg-blue-100/80 border border-blue-200 text-blue-700 p-3 rounded-lg text-[10px] font-semibold text-center leading-relaxed">
                Your payment is held securely by Nexovate and only released to the developer after you confirm project completion.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDevProfile) {
    return (
      <div className="w-full font-['Raleway',sans-serif] space-y-4 max-w-xl sm:max-w-2xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDevProfile(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to Requests
          </button>
        </div>

        <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[8px] sm:rounded-[6px] p-6 sm:p-7 shadow-xs border border-amber-100/60 dark:border-transparent space-y-5 text-left transition-colors duration-300">
            <div className="flex items-center gap-3.5 border-b border-gray-200/80 pb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                {selectedDevProfile.developerName.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-black text-gray-900">{selectedDevProfile.developerName}</h2>
                <p className="text-xs text-gray-500 font-bold">{selectedDevProfile.domain} · {selectedDevProfile.experience}</p>
                <p className="text-[11px] text-[#DC6B0F] font-extrabold mt-0.5">Applied for: {selectedDevProfile.projectName}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-900">Developer Pitch / Proposal</h3>
              <div className="p-3 bg-white/70 dark:bg-gray-50 rounded-md border border-gray-200/80 text-xs font-medium text-gray-800 leading-relaxed">
                "{selectedDevProfile.pitch}"
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-900">Tech Stack & Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedDevProfile.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-bold px-2.5 py-1 bg-black text-white rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-900">LinkedIn Profile</h3>
              <a 
                href={selectedDevProfile.linkedinUrl || "https://linkedin.com"} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>{selectedDevProfile.linkedinUrl || "https://linkedin.com/in/developer"}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Project Links */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-gray-900">Project Links</h3>
              {selectedDevProfile.projectLinks && selectedDevProfile.projectLinks.length > 0 ? (
                selectedDevProfile.projectLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline truncate"
                    >
                      <span className="truncate">{link}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))
              ) : (
                <a 
                  href={selectedDevProfile.portfolioUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>{selectedDevProfile.portfolioUrl}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Attached Certificate */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-gray-900">Attached Certificate / Credential</h3>
              {selectedDevProfile.certificateName ? (
                <div className="inline-flex items-center gap-1.5 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-bold text-gray-800 shadow-2xs">
                  <FileText size={14} className="text-[#DC6B0F]" />
                  <span>{selectedDevProfile.certificateName}</span>
                </div>
              ) : (
                <p className="text-xs text-gray-500 font-medium">No certificate attached.</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/80">
              <button
                type="button"
                onClick={() => handleRejectRequest(selectedDevProfile)}
                className="px-5 h-9 rounded-md bg-[#FEE2E2] text-[#991B1B] font-extrabold text-xs hover:bg-[#FCA5A5] transition-all cursor-pointer flex items-center gap-1"
              >
                <X size={14} strokeWidth={2.5} />
                <span>Decline</span>
              </button>

              <button
                type="button"
                onClick={() => handleAcceptRequest(selectedDevProfile)}
                className="px-5 h-9 rounded-md bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <Check size={14} strokeWidth={2.5} />
                <span>Accept Developer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View Project Details / Milestones View
  if (selectedProjectDetails) {
    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-4 max-w-2xl sm:max-w-3xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedProjectId(null);
              setSelectedProjectDetails(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to my projects
          </button>

          {selectedProjectDetails.dev !== 'Not assigned yet' && (
            <button
              onClick={() => setShowSubmitPayment(true)}
              className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs px-4 py-1.5 rounded-md shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              Deposit Escrow Payment
            </button>
          )}
        </div>

        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {selectedProjectDetails.title}
            </h1>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
            Track development progress and milestone updates in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#FFF6E9] dark:bg-white rounded-xl p-3.5 shadow-md flex items-center gap-3 border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Calendar size={16} strokeWidth={2.2} />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 block mb-0.5">
                TIMELINE
              </span>
              <span className="text-sm font-extrabold text-black">
                {selectedProjectDetails.timelineText}
              </span>
            </div>
          </div>

          <div className="bg-[#FFF6E9] dark:bg-white rounded-xl p-3.5 shadow-md flex items-center gap-3 border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Zap size={16} strokeWidth={2.2} />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 block mb-0.5">
                COMPLETION
              </span>
              <span className="text-sm font-extrabold text-black">
                {selectedProjectDetails.progress}%
              </span>
            </div>
          </div>

          <div className="bg-[#FFF6E9] dark:bg-white rounded-xl p-3.5 shadow-md flex items-center gap-3 border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock size={16} strokeWidth={2.2} />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 block mb-0.5">
                PAYMENT
              </span>
              <span className="text-sm font-extrabold text-black">
                {selectedProjectDetails.paymentStatus}
              </span>
            </div>
          </div>
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
                  strokeDasharray={`${selectedProjectDetails.progress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-black">
                {selectedProjectDetails.progress}%
              </span>
            </div>

            <div className="space-y-0.5 text-left">
              <h3 className="text-sm font-extrabold text-black">
                {selectedProjectDetails.milestonesCount?.completed || 0} of {selectedProjectDetails.milestonesCount?.total || 10} milestones completed
              </h3>
              <p className="text-[10px] font-medium text-gray-500 leading-snug">
                Progress is calculated automatically as developer completes milestones - it can't be set manually by anyone.
              </p>
            </div>
          </div>

          <hr className="border-gray-200/80" />

          <div className="divide-y divide-gray-200/70">
            {(selectedProjectDetails.milestones || []).map((m) => (
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
          My Projects
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
          Every idea you've submitted, from intake to delivery.
        </p>
      </div>

      {/* Styled Tabs */}
      <div className="flex items-center">
        <div className="inline-flex p-1.5 sm:p-2 rounded-xl bg-[#FFF6E9] dark:bg-white/10 backdrop-blur-md border border-amber-100/60 dark:border-white/15 gap-1.5 shadow-xs">
          <button
            onClick={() => setActiveTab('running')}
            className={`px-4 sm:px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'running'
                ? 'bg-white text-black shadow-xs font-black'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            Running Projects
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 sm:px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-white text-black shadow-xs font-black'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 sm:px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer relative ${
              activeTab === 'requests'
                ? 'bg-white text-black shadow-xs font-black'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <span>Developer Requests</span>
            {requests.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] bg-[#DC6B0F] text-white font-extrabold">
                {requests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Table Card Container */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading projects...</span>
            </div>
          ) : activeTab === 'running' ? (
            /* TAB 1: RUNNING PROJECTS */
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">PROJECT NAME</th>
                    <th className="py-3.5 px-3 text-center">STATUS</th>
                    <th className="py-3.5 px-3">ASSIGNED DEV</th>
                    <th className="py-3.5 px-3">PROGRESS</th>
                    <th className="py-3.5 px-3 text-center">MILESTONES</th>
                    <th className="py-3.5 px-3">BUDGET</th>
                    <th className="py-3.5 px-3 text-right">TIMELINE</th>
                    <th className="py-3.5 px-5 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {runningProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-mono font-extrabold text-gray-700 dark:text-gray-700 shrink-0">
                            {project.id}
                          </span>
                          <span className="font-extrabold text-xs text-black tracking-tight block">
                            {project.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-center">
                        {getStatusBadge(project.status, project.statusType)}
                      </td>

                      <td className="py-4 px-3 text-xs font-bold text-gray-800">
                        {project.dev}
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${project.progressColor}`} 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-extrabold text-gray-800 min-w-[28px]">
                            {project.progress}%
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-center text-xs font-extrabold text-gray-700 whitespace-nowrap">
                        {project.milestonesCount?.completed ?? 0}/{project.milestonesCount?.total ?? 10}
                      </td>

                      <td className="py-4 px-3 text-xs font-bold text-black whitespace-nowrap">
                        {project.budget}
                      </td>

                      <td className="py-4 px-3 text-right text-xs font-bold text-gray-700 whitespace-nowrap">
                        {project.timeline}
                      </td>

                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSelectProject(project)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-[4px] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {runningProjects.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-500 font-medium">
                  {searchQuery ? `No running projects matching "${searchQuery}".` : 'No running projects found.'}
                </div>
              )}
            </div>
          ) : activeTab === 'pending' ? (
            /* TAB 2: PENDING PROJECTS */
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">PROJECT NAME</th>
                    <th className="py-3.5 px-4 text-center">STATUS</th>
                    <th className="py-3.5 px-4">BUDGET</th>
                    <th className="py-3.5 px-4">TIMELINE</th>
                    <th className="py-3.5 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {pendingProjects.map((project) => (
                    <tr 
                      key={project.id}
                      className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-mono font-extrabold text-gray-700 dark:text-gray-700 shrink-0">
                            {project.id}
                          </span>
                          <span className="font-extrabold text-xs text-black tracking-tight block">
                            {project.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(project.status, project.statusType)}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-black whitespace-nowrap">
                        {project.budget}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-700 whitespace-nowrap">
                        {project.timeline}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleSelectProject(project)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-[4px] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {pendingProjects.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-500 font-medium">
                  {searchQuery ? `No pending projects matching "${searchQuery}".` : 'No pending projects awaiting developer assignment.'}
                </div>
              )}
            </div>
          ) : (
            /* TAB 3: DEVELOPER REQUESTS */
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">DEVELOPER</th>
                    <th className="py-3.5 px-4">PROJECT</th>
                    <th className="py-3.5 px-4">DOMAIN</th>
                    <th className="py-3.5 px-4">APPLIED ON</th>
                    <th className="py-3.5 px-5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {filteredRequests.map((req) => (
                    <tr 
                      key={req.id} 
                      className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs">
                            {req.developerName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-extrabold text-xs text-black block">{req.developerName}</span>
                            <span className="text-[10px] text-gray-500 block">{req.developerEmail}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-extrabold text-gray-900">
                        <div className="flex items-center gap-1.5">
                          {/* <span className="text-[10px] font-mono font-extrabold text-gray-400 shrink-0">#{req.projectId}</span> */}
                          <span>{req.projectName}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-700">
                        {req.domain}
                      </td>

                      <td className="py-4 px-4 text-[11px] font-medium text-gray-500">
                        {req.appliedDate}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedDevProfile(req)}
                            className="bg-white border border-gray-300 text-gray-800 font-extrabold text-[10px] px-3 py-1.5 rounded-[4px] shadow-xs hover:bg-gray-50 transition-all cursor-pointer"
                          >
                            View Profile
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAcceptRequest(req)}
                            className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-[4px] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRejectRequest(req)}
                            className="bg-red-100 text-red-700 font-extrabold text-[10px] px-2.5 py-1.5 rounded-[4px] hover:bg-red-200 transition-all cursor-pointer"
                            title="Decline Request"
                          >
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRequests.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-500 font-medium">
                  {searchQuery ? `No requests matching "${searchQuery}".` : 'No developer proposals received yet.'}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}