import React, { useState, useEffect } from 'react';
import { 
  fetchPlatformSettings, 
  updateCommission, 
  updateMinWithdrawal 
} from '../../services/api';
import { Loader2 } from 'lucide-react';

export default function PlatformSetting() {
  const [commissionRate, setCommissionRate] = useState(12);
  const [minWithdrawal, setMinWithdrawal] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [currentConfig, setCurrentConfig] = useState({
    commission: 12,
    minWithdrawal: 5000,
  });

  // Fetch current database configuration on initial load
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoadingInitial(true);
        const res = await fetchPlatformSettings();
        if (res?.success && res?.settings) {
          const comm = Number(res.settings.commission_percentage) || 12;
          const minWith = Number(res.settings.min_withdrawal_amount) || 5000;

          setCommissionRate(comm);
          setMinWithdrawal(minWith);
          setCurrentConfig({
            commission: comm,
            minWithdrawal: minWith,
          });
        }
      } catch (err) {
        console.warn('Using default platform settings fallback:', err);
      } finally {
        setLoadingInitial(false);
      }
    };

    loadSettings();
  }, []);

  const handleApprove = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      setLoading(true);

      const [commissionRes, withdrawalRes] = await Promise.all([
        updateCommission(commissionRate),
        updateMinWithdrawal(minWithdrawal)
      ]);

      if (commissionRes?.success && withdrawalRes?.success) {
        setCurrentConfig({
          commission: Number(commissionRate),
          minWithdrawal: Number(minWithdrawal),
        });
        setSuccessMessage('Platform settings updated successfully!');
      } else {
        throw new Error('Failed to update one or more settings.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error updating settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exampleAmount = 180000;
  const examplePayout = Math.round(
    exampleAmount * (1 - currentConfig.commission / 100)
  );

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-5 max-w-xl sm:max-w-2xl mx-auto pb-12 px-3 sm:px-4 text-left select-none">
      
      <div className="text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          Platform Settings
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
          Configure commission, payouts.
        </p>
      </div>

      {/* CARD 1: COMMISSION & PAYOUTS FORM */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">  
        <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] p-6 sm:p-7 border border-amber-100/60 dark:border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-xl space-y-5 transition-colors duration-300">
          
          <div className="border-b border-gray-300/80 pb-2 max-w-[190px]">
            <h2 className="text-[11px] font-extrabold text-black uppercase tracking-wider">
              COMMISSION & PAYOUTS
            </h2>
          </div>

          {/* Alert messages */}
          {errorMessage && (
            <div className="p-2.5 bg-red-100  border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold rounded-[6px]">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 bg-emerald-100  border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-[6px]">
              {successMessage}
            </div>
          )}

          {loadingInitial ? (
            <div className="flex items-center justify-center py-8 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-medium">Loading current settings...</span>
            </div>
          ) : (
            <form onSubmit={handleApprove} className="space-y-4">
              
              <div className="space-y-1 text-left">
                <label className="block text-xs font-extrabold text-black tracking-tight">
                  Platform Commission (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full bg-white/40 dark:bg-gray-100/90 border border-gray-300 rounded-[6px] h-9 px-3 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#DC6B0F] transition-colors"
                  required
                />
                <p className="text-[10px] font-semibold text-gray-500 leading-snug">
                  Deducted from the project amount before funds are released to the developer.
                </p>
              </div>

              <div className="space-y-1 text-left">
                <label className="block text-xs font-extrabold text-black tracking-tight">
                  Minimum Withdrawal Amount (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={minWithdrawal}
                  onChange={(e) => setMinWithdrawal(e.target.value)}
                  className="w-full bg-white/40 dark:bg-gray-100/90 border border-gray-300 rounded-[6px] h-9 px-3 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#DC6B0F] transition-colors"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 h-9 rounded-[6px] bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Approve'
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

      {/* CARD 2: CURRENT CONFIGURATION DISPLAY */}
      <div className="w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">   
        <div className="bg-[#FFF6E9] dark:bg-white text-black rounded-[12px] p-6 sm:p-7 border border-amber-100/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-xl dark:border-transparent space-y-4 transition-colors duration-300">
          
          <div className="border-b border-gray-300/80 pb-2 max-w-[190px]">
            <h2 className="text-[11px] font-extrabold text-black uppercase tracking-wider">
              CURRENT CONFIGURATION
            </h2>
          </div>

          <div className="space-y-3 text-xs pt-1">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-gray-800">Commission Rate</span>
              <span className="font-extrabold text-black">{currentConfig.commission}%</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-extrabold text-gray-800">Min. Withdrawal</span>
              <span className="font-extrabold text-black">
                PKR {currentConfig.minWithdrawal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="font-extrabold text-gray-800">Example Payout</span>
              <span className="font-extrabold text-black whitespace-nowrap">
                PKR {exampleAmount.toLocaleString()} → PKR {examplePayout.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}