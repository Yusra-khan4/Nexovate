import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  ArrowLeft, 
  Check, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    title: "Bon appetit",
    subTitle: "Restaurant website",
    submittedBy: "Zara ahmed",
    email: "zaraahmed@gmail.com",
    initials: "ZA",
    budget: "PKR 90,000",
    client: "Foodies Ltd.",
    category: "Full Stack Web App",
    timeline: "3 weeks",
    targetAudience: "Young adults and professionals who want to explore new restaurants.",
    features: [
      "Searchable book catalog with categories",
      "Member accounts and borrowing history",
      "Due-date reminders via email",
      "Librarian admin panel for inventory"
    ],
    description: "I run a small restaurant and want an app where customers can browse our menu, place orders for delivery or pickup, and pay online with a card or wallet. I also need a simple staff-facing dashboard to see incoming orders in real time and mark them as preparing, ready, or delivered. Eventually I'd like loyalty points for repeat customers.",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    projectUrl: "https://bonappetit-demo.com"
  },
  {
    id: 2,
    title: "Bon appetit",
    subTitle: "Mobile Application",
    submittedBy: "Zara ahmed",
    email: "zaraahmed@gmail.com",
    initials: "ZA",
    budget: "PKR 90,000",
    client: "Gourmet Group",
    category: "Mobile Application",
    timeline: "4 weeks",
    targetAudience: "Food enthusiasts seeking quick ordering and reward tracking.",
    features: [
      "Customer loyalty rewards",
      "Quick order status tracking",
      "Push notifications"
    ],
    description: "Cross-platform mobile application for customer loyalty rewards and quick order tracking.",
    techStack: ["React Native", "Firebase", "Redux Toolkit"],
    projectUrl: "https://bonappetit-mobile.com"
  },
  {
    id: 3,
    title: "TN-HRMS",
    subTitle: "Enterprise HR Portal",
    submittedBy: "Zara ahmed",
    email: "zaraahmed@gmail.com",
    initials: "ZA",
    budget: "PKR 90,000",
    client: "Tech Solutions Inc.",
    category: "Enterprise System",
    timeline: "6 weeks",
    targetAudience: "HR managers and internal company personnel.",
    features: [
      "Automated monthly payroll generation",
      "Leave management and approvals",
      "Employee attendance monitoring"
    ],
    description: "Human Resource Management System for handling payroll, employee attendance, leaves, and performance evaluations.",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    projectUrl: "https://tnhrms.com"
  }
];

export default function ProjectApproval() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');
  const navigate = useNavigate();

  const handleAction = (status) => {
    alert(`Project ${status}!`);
    setSelectedProject(null);
    setShowRequestModal(false);
    setRequestNotes('');
  };

  const handleSendRequest = () => {
    if (!requestNotes.trim()) {
      alert("Please enter details for the requested changes.");
      return;
    }
    alert(`Change request sent to ${selectedProject.submittedBy}: "${requestNotes}"`);
    setSelectedProject(null);
    setShowRequestModal(false);
    setRequestNotes('');
  };

  if (selectedProject) {
    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-3 max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none relative">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to projects
          </button>
        </div>

        {/* Outer Glass Container */}
        <div className={`w-full dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md dark:shadow-xl transition-all duration-300 ${showRequestModal ? 'filter blur-xs' : ''}`}>
          
          {/* Inner White Card */}
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[10px] p-6 sm:p-8 shadow-md border border-black/5 dark:border-transparent space-y-6 text-left transition-colors duration-300">
            
            {/* Header: Title & Customer Info */}
            <div className="flex justify-between items-start pt-1">
              
              {/* LEFT: Title, Subtitle, and Short Underline */}
              <div className="text-left pb-2 border-b border-gray-300/80 max-w-[210px] sm:max-w-[240px] w-full">
                <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-none">
                  {selectedProject.title}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1.5">
                  {selectedProject.subTitle || selectedProject.category}
                </p>
              </div>

              {/* RIGHT: Customer Avatar & Details */}
              <div className="text-right space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-600 block">
                  CUSTOMER
                </span>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0d52cd] text-white text-[9px] font-extrabold flex items-center justify-center shrink-0">
                    {selectedProject.initials || 'ZA'}
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-xs font-bold text-black">
                      {selectedProject.submittedBy}
                    </span>
                    <span className="block text-[10px] font-medium text-gray-500">
                      {selectedProject.email || 'zaraahmed@gmail.com'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Q&A Section */}
            <div className="space-y-4 text-xs pt-1">
              
              {/* 1. Target Audience */}
              <div className="space-y-1">
                <h3 className="font-bold text-black text-xs">1. Who is target audience?</h3>
                <p className="font-extrabold text-black pl-3 text-xs leading-relaxed">
                  {selectedProject.targetAudience}
                </p>
              </div>
              <hr className="border-gray-200/60" />

              {/* 2. Budget */}
              <div className="space-y-1">
                <h3 className="font-bold text-black text-xs">2. What is the estimated budget?</h3>
                <p className="font-extrabold text-black pl-3 text-xs">
                  {selectedProject.budget}
                </p>
              </div>
              <hr className="border-gray-200/60" />

              {/* 3. Timeline */}
              <div className="space-y-1">
                <h3 className="font-bold text-black text-xs">3. What is the timeline?</h3>
                <p className="font-extrabold text-black pl-3 text-xs">
                  {selectedProject.timeline || '3 weeks'}
                </p>
              </div>
              <hr className="border-gray-200/60" />

              {/* 4. Features */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-black text-xs">4. Write few features that you want?</h3>
                <ul className="list-disc list-inside space-y-1 pl-3 font-extrabold text-black text-xs leading-relaxed">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <hr className="border-gray-200/60" />

              {/* 5. Description */}
              <div className="space-y-1">
                <h3 className="font-bold text-black text-xs">5. Describe your project.</h3>
                <p className="font-extrabold text-black pl-3 text-xs leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

            </div>

            <hr className="border-gray-200/80 pt-1" />

            {/* Bottom Action Buttons */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <button
                onClick={() => handleAction('Approved')}
                className="w-full h-9 rounded-md bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
              >
                Approve
              </button>

              <button
                onClick={() => setShowRequestModal(true)}
                className="w-full h-9 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-xs shadow-xs active:scale-[0.99] transition-all cursor-pointer"
              >
                Request changes
              </button>

              <button
                onClick={() => handleAction('Rejected')}
                className="w-full h-9 rounded-md bg-[#f8bdc4] hover:bg-[#f4aab3] text-[#9b2226] font-extrabold text-xs shadow-xs active:scale-[0.99] transition-all cursor-pointer"
              >
                Reject
              </button>
            </div>

          </div>
        </div>

        {/* Request Changes Modal Popup */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 p-6 sm:p-7 w-full max-w-md text-left space-y-4 font-['Raleway',sans-serif]">
              
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-black tracking-tight">
                  Request Changes
                </h3>
                <p className="text-[11px] font-medium text-gray-500 leading-snug">
                  Tell the customer what needs to be updated before this project can be approved.
                </p>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="e.g Please clarify the budget range and release payment."
                  className="w-full border border-gray-300 rounded-lg p-3 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] resize-none shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="px-5 h-8 rounded-md bg-white border border-gray-300 text-gray-700 font-extrabold text-xs hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSendRequest}
                  className="px-5 h-8 rounded-md bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs hover:brightness-105 transition-all cursor-pointer shadow-xs"
                >
                  Send Request
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl mx-auto pb-8 px-3 sm:px-4">

      <div className="text-left">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Project approval
        </h1>
      </div>

      {/* Outer Wrapper */}
      <div className="p-0 dark:p-3 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-black/5 shadow-xs dark:shadow-md dark:border-white/20 dark:backdrop-blur-md w-full transition-all duration-300 overflow-hidden">
        
        {/* Main Outer Box */}
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-black rounded-[8px] sm:rounded-[6px] border border-black/10 dark:border-transparent shadow-xs dark:shadow-xl overflow-hidden transition-colors duration-300">

          {/* Table Header Section */}
          <div className="bg-[#FFFaf3]/80 dark:bg-[#A2A6B0] px-3.5 py-4 flex items-center justify-between border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 size={13} strokeWidth={2.2} />
              </div>
              <h2 className="text-xs font-bold text-black tracking-tight uppercase">
                PROJECTS AWAITING APPROVAL
              </h2>
            </div>
          </div>

          {/* Table Rows Section */}
          <div className="divide-y divide-gray-300/40 bg-[#FFF6E9] dark:bg-[#EFEEEA]">
            {mockProjects.map((project) => (
              <div 
                key={project.id} 
                className="px-10 py-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
              >
                {/* Left Side: Title & Info */}
                <div className="text-left space-y-0.5">
                  <h3 className="font-bold text-xs text-black tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-gray-600 font-medium">
                    Submitted by {project.submittedBy} <span className="mx-0.5">•</span> Budget {project.budget}
                  </p>
                </div>

                {/* Right Side: View Project Link */}
                <button 
                  onClick={() => setSelectedProject(project)}
                  className=" px-10 text-[11px] font-bold text-blue-600 hover:underline cursor-pointer transition-all shrink-0"
                >
                  View project
                </button>
              </div>
            ))}

            {mockProjects.length === 0 && (
              <div className="text-center py-6 text-xs text-gray-500 font-medium">
                No projects awaiting approval.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}