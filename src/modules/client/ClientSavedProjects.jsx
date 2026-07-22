import React, { useState } from 'react';
// 🎯 DUAL-THEME COMPATIBLE VECTOR GRAPHICS VIA LUCIDE
import { Eye, Image, Trash2, UploadCloud, FolderHeart, ArrowLeft } from 'lucide-react';

export default function ClientSavedProjects() {
  // null = show saved projects list view, object = show upload form for that project
  const [uploadingProject, setUploadingProject] = useState(null);

  // Form input states
  const [projectName, setProjectName] = useState('');
  const [overview, setOverview] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  const savedProjectsList = [
    { id: 'save-01', title: 'Blue sky travel', date: 'Generated on 12 June 2026' },
    { id: 'save-02', title: 'Ecommerce web', date: 'Generated on 18 June 2026' },
    { id: 'save-03', title: 'Bon appetit', date: 'Generated on 20 June 2026' }
  ];

  const handleUploadClick = (project) => {
    setUploadingProject(project);
    setProjectName(project.title); // Auto-populate project name field
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Project Brief:", { projectName, overview, budget, timeline });
    setUploadingProject(null); // Return to list view on finish
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 px-4 sm:px-6 font-['Raleway',sans-serif] text-left animate-fade-in select-none transition-colors duration-300">
      
      {/* Dynamic Upper Header Content */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#FFFFFF] transition-colors duration-300">
          {uploadingProject ? "Upload Project Brief" : "Saved Projects"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
          {uploadingProject ? "Upload your project to find perfect match developers." : "View your saved projects."}
        </p>
      </div>

      {/* 🎯 OUTER FRAME CARD MODULE: Transforms into solid #FF6 panel with beautiful drop shadow in light theme */}
      <div className="bg-[#FFF6E9] dark:bg-[#1c1a17]/20 border border-black/5 dark:border-white/10 p-0 dark:p-5 rounded-[5px] dark:rounded-[16px] dark:backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] max-w-4xl mx-auto transition-all duration-300 overflow-hidden">
        
        {/* Core Layout Inner Wrapper */}
        <div className="rounded-none dark:rounded-[5px] overflow-hidden bg-transparent dark:bg-[#ece9e6] flex flex-col">
          
          {/* ========================================================================= */}
          {/* CONDITION A: SHOW UPLOAD PROJECT BRIEF FORM VIEW                           */}
          {/* ========================================================================= */}
          {uploadingProject ? (
            <form onSubmit={handleFormSubmit} className="p-8 max-w-xl w-full mx-auto space-y-5 text-black">
              
              {/* 1. File Upload Drag & Drop Box Area */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-black text-gray-900 dark:text-gray-700 tracking-wide transition-colors">Upload document</label>
                <div className="w-full bg-white/20 dark:bg-transparent border-2 border-dashed border-gray-400/80 rounded-[5px] py-8 px-4 flex flex-col items-center justify-center gap-2 hover:bg-black/[0.02] transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <UploadCloud size={20} className="text-gray-700 dark:text-gray-500" strokeWidth={2} />
                  <div className="text-center font-sans">
                    <p className="text-[11px] font-extrabold text-gray-900 dark:text-gray-800">
                      Drag & Drop or <span className="text-blue-900 dark:text-blue-600 underline">browse</span>
                    </p>
                    <p className="text-[9px] text-gray-600 dark:text-gray-400 font-bold mt-0.5 uppercase tracking-tighter">PDF, DOC or DOCX • Up to 25MB</p>
                  </div>
                </div>
              </div>

              {/* 2. Project Name Input Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-black text-gray-900 dark:text-gray-700 tracking-wide transition-colors">Project name</label>
                <input 
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-[5px] px-3 py-2 text-xs font-medium outline-none focus:border-gray-500 shadow-sm transition-colors text-gray-800"
                  required
                />
              </div>

              {/* 3. Overview TextArea Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-black text-gray-900 dark:text-gray-700 tracking-wide transition-colors">Overview</label>
                <textarea 
                  rows={3}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-[5px] px-3 py-2 text-xs font-medium outline-none focus:border-gray-500 shadow-sm transition-colors text-gray-800 resize-none"
                  required
                />
              </div>

              {/* 4. Budget & Timeline Double Inline Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-black text-gray-900 dark:text-gray-700 tracking-wide transition-colors">Budget</label>
                  <input 
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-[5px] px-3 py-2 text-xs font-medium outline-none focus:border-gray-500 shadow-sm transition-colors text-gray-800"
                    required
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-black text-gray-900 dark:text-gray-700 tracking-wide transition-colors">Timeline</label>
                  <input 
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-[5px] px-3 py-2 text-xs font-medium outline-none focus:border-gray-500 shadow-sm transition-colors text-gray-800"
                    required
                  />
                </div>
              </div>

              {/* 5. Bottom Action Deck Submit & Cancel Controls */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[11px] px-6 py-2.5 rounded-[5px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wide cursor-pointer"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setUploadingProject(null)}
                  className="text-xs font-bold text-gray-900 dark:text-gray-500 hover:underline transition-colors cursor-pointer px-2 py-1 flex items-center gap-1"
                >
                  <ArrowLeft size={13} strokeWidth={2.5} /> Cancel
                </button>
              </div>

            </form>
          ) : (
            /* ========================================================================= */
            /* CONDITION B: SHOW BASE SAVED PROJECTS CARD LIST VIEW                      */
            /* ========================================================================= */
            <>
              {/* Sub-Header Banner Row */}
              <div className="px-6 py-5 bg-white/40 dark:bg-[#fbf9f6] border-b border-black/5 dark:border-gray-300/40 text-left flex items-center gap-2.5">
                <FolderHeart size={16} className="text-gray-900 dark:text-black shrink-0" strokeWidth={2.5} />
                <h3 className="text-sm font-black text-[#000000] tracking-wide">Saved Projects</h3>
              </div>

              {/* Table List Layout Split Wrapper containing items and custom scroll track */}
              <div className="p-6 flex gap-4 items-stretch relative">
                
                <div className="flex-1 space-y-4 max-h-[380px] overflow-y-auto pr-4 custom-scrollbar">
                  {savedProjectsList.map((project) => (
                    <div 
                      key={project.id} 
                      className="bg-transparent pb-4 flex items-center justify-between gap-6 transition-all border-b border-black/5 dark:border-gray-400/40 last:border-none last:pb-0 dark:last:border-b dark:last:pb-4"
                    >
                      {/* Left Column Metadata Descriptions */}
                      <div className="min-w-0 text-left">
                        <h4 className="font-extrabold text-sm text-[#000000] leading-snug tracking-tight">
                          {project.title}
                        </h4>
                        <p className="text-[10px] text-gray-700 dark:text-gray-400 font-bold tracking-wide mt-0.5">
                          {project.date}
                        </p>
                      </div>

                      {/* Right Hand Interaction Decks */}
                      <div className="shrink-0 flex items-center gap-6">
                        <div className="flex items-center gap-4 shrink-0">
                          <button type="button" className="text-emerald-900 dark:text-[#2e7d32] hover:scale-110 transition-transform cursor-pointer" title="View Report">
                            <Eye size={16} strokeWidth={2.5} />
                          </button>
                          <button type="button" className="text-blue-900 dark:text-[#1565c0] hover:scale-110 transition-transform cursor-pointer" title="View Layout Images">
                            <Image size={16} strokeWidth={2.5} />
                          </button>
                          <button type="button" className="text-red-900 dark:text-[#c62828] hover:scale-110 transition-transform cursor-pointer" title="Delete Saved Project">
                            <Trash2 size={16} strokeWidth={2.5} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleUploadClick(project)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[11px] px-6 py-2 rounded-[5px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wide cursor-pointer"
                        >
                          Upload
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Sidebar Scroll track indicator */}
                <div className="w-2 bg-black/10 dark:bg-white/40 rounded-full relative overflow-hidden shrink-0 flex flex-col items-center shadow-inner">
                  <div className="w-full h-1/3 bg-gray-700 dark:bg-gray-600 rounded-full absolute top-6 shadow" />
                </div>

              </div>
            </>
          )}

          <div className="pb-2 dark:pb-2" />
        </div>
      </div>

    </div>
  );
}