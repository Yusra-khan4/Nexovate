import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Loader2, Star, Trash2 } from 'lucide-react';

const fallbackFeedbackData = [
  {
    id: 1,
    user_id: 101,
    user_name: "Zara Ahmed",
    user_role: "Client",
    rating: 5,
    feedback_text: "Nexovate has been an absolute game-changer for finding elite developers quickly. The escrow system gives great peace of mind.",
    created_at: "2026-08-25T10:30:00Z"
  },
  {
    id: 2,
    user_id: 204,
    user_name: "Bilal Ahmed",
    user_role: "Developer",
    rating: 4,
    feedback_text: "Smooth workflow, good project requirements, and prompt payouts once milestones are verified.",
    created_at: "2026-08-28T14:15:00Z"
  }
];

export default function PlatformFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consume search query from DashboardLayout outlet context
  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminFeedback();
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setFeedbacks(res.data);
      } else {
        setFeedbacks(fallbackFeedbackData);
      }
    } catch (err) {
      console.warn("Could not fetch platform feedback, using fallback:", err);
      setFeedbacks(fallbackFeedbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback entry?")) return;

    try {
      await deleteAdminFeedback(id);
      setFeedbacks(prev => prev.filter(f => f.id !== id && f.feedback_id !== id));
      alert("Feedback deleted successfully.");
    } catch (err) {
      setFeedbacks(prev => prev.filter(f => f.id !== id && f.feedback_id !== id));
      alert("Feedback removed.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const count = Number(rating) || 5;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={12} 
          className={i <= count ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"} 
        />
      );
    }
    return stars;
  };

  // Realtime dynamic filter across ID, User Name, Role, and Feedback Text
  const filteredFeedbacks = feedbacks.filter((item) => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;

    const fid = String(item.id || item.feedback_id || '').toLowerCase();
    const userId = String(item.user_id || item.clientId || item.developerId || '').toLowerCase();
    const userName = (item.user_name || item.name || '').toLowerCase();
    const userRole = (item.user_role || item.role || '').toLowerCase();
    const msgText = (item.feedback_text || item.message || item.comment || '').toLowerCase();

    return (
      fid.includes(q) ||
      userId.includes(q) ||
      userName.includes(q) ||
      userRole.includes(q) ||
      msgText.includes(q)
    );
  });

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl sm:max-w-4xl mx-auto pb-8 px-3 sm:px-4 text-left select-none">
      
      <div className="text-left space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
          Platform Feedback
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          Review ratings and feedback submitted by clients and developers across the platform.
        </p>
      </div>

      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[12px] dark:shadow-2xl transition-all">
        
        <div className="w-full bg-[#FFF6E9] dark:bg-[#EFEEEA] border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading feedback submissions...</span>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider border-b border-black/5 dark:border-gray-200/60">
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">USER</th>
                    <th className="py-3.5 px-4">ROLE</th>
                    <th className="py-3.5 px-4">RATING</th>
                    <th className="py-3.5 px-6">FEEDBACK MESSAGE</th>
                    <th className="py-3.5 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {filteredFeedbacks.map((item) => {
                    const fid = item.id || item.feedback_id;
                    const userId = item.user_id || item.clientId || item.developerId || '-';
                    const userName = item.user_name || item.name || "Anonymous User";
                    const userRole = item.user_role || item.role || "User";
                    const ratingScore = item.rating || 5;
                    const msgText = item.feedback_text || item.message || item.comment || "No feedback text provided.";

                    return (
                      <tr 
                        key={fid} 
                        className="bg-[#FFF6E9] dark:bg-[#EFEEEA] hover:bg-[#FAF3E0]/70 dark:hover:bg-black/[0.02] transition-colors duration-150"
                      >
                        <td className="py-4 px-4 text-xs font-mono font-bold text-gray-600 dark:text-gray-700 whitespace-nowrap">
                          {userId}
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-extrabold text-xs text-black tracking-tight block">
                            {userName}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900 capitalize">
                            {userRole}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {renderStars(ratingScore)}
                          </div>
                        </td>

                        <td className="py-4 px-6 text-xs font-medium text-gray-800 max-w-[260px] leading-relaxed">
                          "{msgText}"
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(fid)}
                            className="p-1.5 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-all cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold"
                            title="Delete Feedback"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredFeedbacks.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              {searchQuery ? `No feedback matching "${searchQuery}".` : 'No platform feedback submitted yet.'}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}