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
    submittedBy: "Zara Ahmed",
    budget: "PKR 90,000",
    client: "Foodies Ltd.",
    category: "Full Stack Web App",
    description: "A food ordering platform featuring interactive menus, cart management, and online payment gateway integration.",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    projectUrl: "https://bonappetit-demo.com"
  },
  {
    id: 2,
    title: "Bon appetit",
    submittedBy: "Zara Ahmed",
    budget: "PKR 90,000",
    client: "Gourmet Group",
    category: "Mobile Application",
    description: "Cross-platform mobile application for customer loyalty rewards and quick order tracking.",
    techStack: ["React Native", "Firebase", "Redux Toolkit"],
    projectUrl: "https://bonappetit-mobile.com"
  },
  {
    id: 3,
    title: "TN-HRMS",
    submittedBy: "Zara Ahmed",
    budget: "PKR 90,000",
    client: "Tech Solutions Inc.",
    category: "Enterprise System",
    description: "Human Resource Management System for handling payroll, employee attendance, leaves, and performance evaluations.",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    projectUrl: "https://tnhrms.com"
  }
];

export default function ProjectApproval() {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const handleAction = (status) => {
    alert(`Project ${status}!`);
    setSelectedProject(null);
  };

  if (selectedProject) {
    return (
      <div className="w-full text-black font-['Raleway',sans-serif] space-y-3 max-w-4xl mx-auto pb-8 px-3 sm:px-4">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-white/10 px-3 py-1 rounded-lg border border-black/5 dark:border-white/15 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft size={14} /> Back to projects
          </button>
        </div>

        {/* Detail Container */}
        <div className="p-0 dark:p-2 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/20 dark:backdrop-blur-md dark:shadow-xl transition-all duration-300">
          
          <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[10px] p-3.5 sm:p-4 shadow-md border border-black/5 dark:border-transparent space-y-3 text-left transition-colors duration-300">
            
            <div className="flex justify-between items-center border-b border-gray-300/60 pb-2.5">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-black leading-tight">{selectedProject.title}</h2>
                <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                  Submitted by <span className="text-black font-bold">{selectedProject.submittedBy}</span>
                </p>
              </div>
              <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                {selectedProject.budget}
              </span>
            </div>

            {/* Field Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-black block mb-0.5">Project Name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedProject.title} 
                  className="w-full bg-white border border-gray-300 rounded-md h-7 px-2.5 text-[11px] font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-black block mb-0.5">Client / Category</label>
                <input 
                  type="text" 
                  readOnly 
                  value={`${selectedProject.client} • ${selectedProject.category}`} 
                  className="w-full bg-white border border-gray-300 rounded-md h-7 px-2.5 text-[11px] font-medium text-gray-800 outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[11px] font-bold text-black block mb-0.5">Project Description</label>
              <textarea 
                readOnly 
                rows={2} 
                value={selectedProject.description} 
                className="w-full bg-white border border-gray-300 rounded-md p-2 text-[11px] font-medium text-gray-800 leading-snug resize-none outline-none focus:ring-0"
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-black">Technologies Used</p>
              <div className="flex flex-wrap gap-1">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                    {tech} <Check size={10} strokeWidth={2.5} />
                  </span>
                ))}
              </div>
            </div>

            {/* Live Link */}
            <div>
              <label className="text-[11px] font-bold text-black block mb-0.5">Project Link</label>
              <div className="flex items-center gap-1.5">
                <input 
                  type="text" 
                  readOnly 
                  value={selectedProject.projectUrl} 
                  className="w-full bg-white border border-gray-300 rounded-md h-7 px-2.5 text-[11px] font-medium text-gray-800 outline-none focus:ring-0"
                />
                <a 
                  href={selectedProject.projectUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-7 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center transition-colors shrink-0"
                  title="Open Link"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2.5 border-t border-gray-300/60">
              <button
                onClick={() => handleAction('rejected')}
                className="px-6 h-7 rounded-md bg-[#df9196] hover:bg-[#d88388] text-[#9b2226] font-extrabold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 uppercase tracking-wider"
              >
                Reject Project
              </button>

              <button
                onClick={() => handleAction('approved')}
                className="px-6 h-7 rounded-md bg-[#8cb3a8] hover:bg-[#7fa89d] text-[#1e4d2b] font-extrabold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 uppercase tracking-wider"
              >
                Approve Project
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // ---------------- MAIN PROJECTS LIST VIEW ----------------
  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-4xl mx-auto pb-8 px-3 sm:px-4">

      {/* Title */}
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
          <div className="bg-[#FFFaf3]/80 dark:bg-white/80 px-3.5 py-2.5 flex items-center justify-between border-b border-black/5 dark:border-gray-200/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 size={13} strokeWidth={2.2} />
              </div>
              <h2 className="text-xs font-bold text-black tracking-tight uppercase">
                PROJECTS AWAITING APPROVAL
              </h2>
            </div>

            <button 
              onClick={() => navigate('/admin/projects')}
              className="text-[11px] font-bold text-blue-600 hover:underline tracking-wide cursor-pointer uppercase"
            >
              review all
            </button>
          </div>

          {/* Table Rows Section */}
          <div className="divide-y divide-gray-300/40 bg-[#FFF6E9] dark:bg-[#EFEEEA]">
            {mockProjects.map((project) => (
              <div 
                key={project.id} 
                className="px-3.5 py-2.5 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
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
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer transition-all shrink-0"
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