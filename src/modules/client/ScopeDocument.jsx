import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileText, Download, Loader2, Calendar } from 'lucide-react';
import { fetchClientProjectsList, downloadScopePdf } from '../../services/api';

const fallbackScopeDocs = [
  {
    id: 56,
    title: "Bon Appetit restaurant app",
    purpose: "Restaurant web",
    budget: "PKR 50,000",
    timeline: "6-8 weeks",
    generatedDate: "Jun 20, 2026"
  },
  {
    id: 57,
    title: "Food Delivery Logistics",
    purpose: "Online store",
    budget: "PKR 85,000",
    timeline: "4-6 weeks",
    generatedDate: "Aug 12, 2026"
  }
];

export default function ScopeDocument() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  useEffect(() => {
    const loadScopeDocuments = async () => {
      try {
        setLoading(true);
        const res = await fetchClientProjectsList();

        if (res?.success && Array.isArray(res.projects) && res.projects.length > 0) {
          const mapped = res.projects.map((p) => {
            const rawDate = p.created_at || p.updated_at;
            const formattedDate = rawDate 
              ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recent';

            return {
              id: p.project_id,
              title: p.projectname || `Project #${p.project_id}`,
              purpose: p.purpose || 'Custom Application',
              budget: p.budget ? (typeof p.budget === 'string' && p.budget.startsWith('Rs.') ? p.budget.replace('Rs.', 'PKR') : `PKR ${p.budget}`) : 'PKR 50,000',
              timeline: p.timeline || '6-8 weeks',
              generatedDate: formattedDate
            };
          });
          setDocuments(mapped);
        } else {
          setDocuments(fallbackScopeDocs);
        }
      } catch (err) {
        console.warn("Could not fetch scope documents list, using fallback:", err);
        setDocuments(fallbackScopeDocs);
      } finally {
        setLoading(false);
      }
    };

    loadScopeDocuments();
  }, []);

  const handleDownload = async (doc) => {
    try {
      setDownloadingId(doc.id);
      await downloadScopePdf(doc.id);
    } catch (err) {
      alert(err.message || 'Failed to download scope document PDF.');
    } finally {
      setDownloadingId(null);
    }
  };

  const q = (searchQuery || '').trim().toLowerCase();
  const filteredDocs = documents.filter((doc) => {
    if (!q) return true;
    return (
      String(doc.id).toLowerCase().includes(q) ||
      (doc.title || '').toLowerCase().includes(q) ||
      (doc.purpose || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-4xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">
      
      <div className="text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          Scope Documents Library
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
          Access and download AI-generated scope documents for all your submitted projects.
        </p>
      </div>

      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading scope documents...</span>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-4 w-[10%]">ID</th>
                    <th className="py-3.5 px-5">PROJECT NAME</th>
                    <th className="py-3.5 px-4">PURPOSE / DOMAIN</th>
                    <th className="py-3.5 px-4">TIMELINE</th>
                    <th className="py-3.5 px-4">GENERATED DATE</th>
                    <th className="py-3.5 px-5 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {filteredDocs.map((doc) => (
                    <tr 
                      key={doc.id} 
                      className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-xs text-gray-700 whitespace-nowrap">
                        {doc.id}
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-[#DC6B0F] shrink-0" />
                          <span className="font-extrabold text-xs text-black tracking-tight block">
                            {doc.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-800">
                        {doc.purpose}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-700 whitespace-nowrap">
                        {doc.timeline}
                      </td>

                      <td className="py-4 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap">
                        {doc.generatedDate}
                      </td>

                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <button
                          type="button"
                          disabled={downloadingId === doc.id}
                          onClick={() => handleDownload(doc)}
                          className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-[4px] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {downloadingId === doc.id ? (
                            <>
                              <Loader2 size={12} className="animate-spin" />
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <Download size={12} />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDocs.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-500 font-medium">
                  {searchQuery ? `No scope documents matching "${searchQuery}".` : 'No scope documents generated yet.'}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}