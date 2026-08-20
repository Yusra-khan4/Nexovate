import React, { useState, useEffect } from 'react';
import { FileText, Loader2, X } from 'lucide-react';
import { fetchOpenProjects, applyToProject, downloadProjectReport } from '../../services/api';

const fallbackProjectsData = [
  {
    id: 21,
    title: "Bon Appetit - Ordering app",
    client: "Ramsha Zain",
    postedTime: "Posted recently",
    description: "Web ordering platform with live table availability and a staff order screen for a mid-size restaurant.",
    budget: "PKR 45,000",
    numericBudget: 45000,
    timeline: "3 - 6 months"
  },
  {
    id: 22,
    title: "Blue Sky Travel - Booking Engine",
    client: "Ramsha Zain",
    postedTime: "Posted recently",
    description: "Redesign of a flight + hotel booking engine with multi-currency pricing and a partner API integration.",
    budget: "PKR 70,000",
    numericBudget: 70000,
    timeline: "3 - 6 months"
  }
];

export default function DeveloperProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchOpenProjects();

      const rawList = Array.isArray(res) 
        ? res 
        : Array.isArray(res?.data) 
          ? res.data 
          : Array.isArray(res?.projects) 
            ? res.projects 
            : [];

      if (rawList.length > 0) {
        const mapped = rawList.map((p) => {
          const rawBudget = parseFloat(p.budget) || 0;
          const postedDate = p.created_at
            ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent';

          return {
            id: p.id,
            title: p.projectname || p.title || `Project #${p.id}`,
            client: p.client_name || (p.client_id ? `Client #${p.client_id}` : 'Client'),
            postedTime: `Posted ${postedDate}`,
            description: p.projectoverview || p.overview || p.description || "No overview provided.",
            budget: rawBudget > 0 ? `PKR ${rawBudget.toLocaleString()}` : "Open for bidding",
            numericBudget: rawBudget > 0 ? rawBudget : '',
            timeline: p.timeline || "3 - 6 months"
          };
        });
        setProjects(mapped);
      } else {
        setProjects(fallbackProjectsData);
      }
    } catch (err) {
      console.warn("Could not load open projects, using fallback:", err);
      setProjects(fallbackProjectsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDownloadReport = async (project) => {
    try {
      setDownloadingId(project.id);
      const blobData = await downloadProjectReport(project.id);

      const fileBlob = new Blob([blobData], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(fileBlob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${(project.title || 'Scope_Document').replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        window.URL.revokeObjectURL(downloadUrl);
      }, 1000);
    } catch (err) {
      alert(err.message || 'Failed to download scope report.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleOpenApplyModal = (project) => {
    setSelectedProject(project);
    setBidAmount(project.numericBudget || '');
    setCoverLetter('');
    setStatusMessage({ type: '', text: '' });
  };

  const handleCloseModal = () => {
    if (submitting) return;
    setSelectedProject(null);
    setCoverLetter('');
    setBidAmount('');
    setStatusMessage({ type: '', text: '' });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(Number(bidAmount))) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid bid amount.' });
      return;
    }
    if (!coverLetter.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide a cover letter.' });
      return;
    }

    try {
      setSubmitting(true);
      setStatusMessage({ type: '', text: '' });

      const res = await applyToProject(selectedProject.id, {
        cover_letter: coverLetter.trim(),
        bid_amount: Number(bidAmount),
      });

      if (res?.success) {
        alert(res.message || 'Application submitted successfully!');
        handleCloseModal();
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to submit application.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full font-['Raleway',sans-serif] px-3 sm:px-4 pb-8 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Page Title Section */}
      <div className="mb-4 sm:mb-5 text-left space-y-0.5 max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight">Open Projects</h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-200 font-medium">
          Discover new projects and connect with clients to bring their ideas to life.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500 gap-2">
          <Loader2 size={20} className="animate-spin text-[#DC6B0F]" />
          <span className="text-xs font-semibold">Loading open projects...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto items-stretch">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="p-0 dark:p-2 sm:dark:p-6 bg-transparent dark:bg-white/10 border border-transparent dark:border-white/15 rounded-[10px] dark:backdrop-blur-xl dark:shadow-xl flex flex-col justify-between transition-all duration-300 w-full max-w-[360px] mx-auto"
            >
              <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] rounded-[8px] sm:rounded-[6px] p-3 sm:p-4 text-black flex-1 flex flex-col justify-between border border-black/5 dark:border-transparent shadow-xs dark:shadow-none transition-all duration-300">
                
                <div className="text-left space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight leading-snug text-black">{project.title}</h3>
                  <p className="text-[9px] text-gray-600 font-bold">
                    Client: {project.client} · <span className="font-medium text-gray-500">{project.postedTime}</span>
                  </p>
                  
                  <p className="text-[11px] text-gray-700 font-medium pt-2 sm:pt-2.5 leading-snug sm:min-h-[44px]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-black/10 dark:border-black/5">
                  <div className="flex gap-6 sm:gap-8 mb-3 sm:mb-3.5 text-left">
                    <div>
                      <span className="block text-[8px] font-bold tracking-wider text-gray-500 uppercase">Budget</span>
                      <span className="text-xs font-bold text-black mt-0.5 block">{project.budget}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold tracking-wider text-gray-500 uppercase">Timeline</span>
                      <span className="text-xs font-bold text-black mt-0.5 block">{project.timeline}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 w-full">
                    <button 
                      type="button" 
                      disabled={downloadingId === project.id}
                      onClick={() => handleDownloadReport(project)}
                      className="w-full sm:flex-1 bg-white border border-gray-300 rounded-[4px] py-1.5 px-2.5 text-[10px] font-bold text-black shadow-xs hover:bg-gray-50 active:scale-[0.99] flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {downloadingId === project.id ? (
                        <>
                          <Loader2 size={12} className="animate-spin text-[#DC6B0F]" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <FileText size={12} strokeWidth={2.2} className="text-black shrink-0" />
                          <span>Download Report</span>
                        </>
                      )}
                    </button>

                    <button 
                      type="button" 
                      onClick={() => handleOpenApplyModal(project)}
                      className="w-full sm:flex-1 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold py-1.5 px-2.5 rounded-[4px] text-[10px] shadow-xs hover:brightness-105 active:scale-[0.98] flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-2 text-center py-12 text-gray-500 text-xs font-semibold">
              No open projects currently available for bidding.
            </div>
          )}
        </div>
      )}

      {/* Apply to Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-all">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 p-6 sm:p-7 w-full max-w-md text-left space-y-4 font-['Raleway',sans-serif]">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-black tracking-tight">
                  Apply for Project
                </h3>
                <p className="text-[11px] font-medium text-gray-500">
                  {selectedProject.title} · Budget: {selectedProject.budget}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {statusMessage.text && (
              <div className={`p-2.5 rounded-md text-xs font-semibold ${
                statusMessage.type === 'error' 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmitApplication} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Your Bid Amount (PKR)
                </label>
                <input
                  type="number"
                  required
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="e.g. 45000"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#DC6B0F] shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Cover Letter / Proposal
                </label>
                <textarea
                  rows={4}
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you are the best fit for this project..."
                  className="w-full border border-gray-300 rounded-md p-3 text-xs font-medium text-gray-800 outline-none focus:border-[#DC6B0F] resize-none shadow-2xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 font-extrabold text-xs hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-1.5 rounded-md bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}