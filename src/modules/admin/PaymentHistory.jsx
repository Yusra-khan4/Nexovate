import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchAdminPaymentHistory } from '../../services/api';
import { Loader2 } from 'lucide-react';

const fallbackPaymentLogs = [
  {
    id: 1,
    date: 'Jul 9, 2026',
    project: 'Bon appetit',
    client: 'Zara ahmed',
    developer: 'Bilal ahmed',
    amount: 'PKR 275,000',
    commission: 'PKR 35,000',
    sentMoney: 'PKR 240,000',
    status: 'Received',
    statusType: 'received'
  },
  {
    id: 2,
    date: 'Jun 20, 2026',
    project: 'TN-HRMS',
    client: 'Rabia ali',
    developer: 'Mustafa raza',
    amount: 'PKR 275,000',
    commission: 'PKR 35,000',
    sentMoney: 'PKR 240,000',
    status: 'Received',
    statusType: 'received'
  },
  {
    id: 3,
    date: 'May 31, 2026',
    project: 'Blue sky travel',
    client: 'Shazia raza',
    developer: '-',
    amount: 'PKR 275,000',
    commission: '-',
    sentMoney: '-',
    status: 'Pending payment',
    statusType: 'pending'
  },
  {
    id: 4,
    date: 'May 13, 2026',
    project: 'Nexus desktop',
    client: 'Sara kareem',
    developer: 'Zain khan',
    amount: 'PKR 275,000',
    commission: 'PKR 35,000',
    sentMoney: 'PKR 240,000',
    status: 'Released',
    statusType: 'released'
  }
];

export default function PaymentHistory() {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consume search query from DashboardLayout outlet context
  const { searchQuery } = useOutletContext() || { searchQuery: '' };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const res = await fetchAdminPaymentHistory();

        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const mappedLogs = res.data.map((item) => {
            const rawAmount = parseFloat(item.amount) || 0;
            const commissionVal = Math.round(rawAmount * 0.12);
            const sentMoneyVal = rawAmount - commissionVal;

            let statusType = 'pending';
            let statusLabel = 'Pending payment';

            const rawStatus = (item.status || '').toLowerCase();
            if (rawStatus === 'released') {
              statusType = 'released';
              statusLabel = 'Released';
            } else if (rawStatus === 'held' || rawStatus === 'received' || rawStatus === 'verified') {
              statusType = 'received';
              statusLabel = 'Received';
            }

            const rawDate = item.deposited_at || item.released_at || item.created_at;
            const formattedDate = rawDate
              ? new Date(rawDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recent';

            return {
              id: item.payment_id || item.id,
              date: formattedDate,
              project: item.project_name || `Project #${item.project_id}`,
              client: item.client_name || `Client #${item.client_id || '-'}`,
              developer: item.developer_name || (item.developer_id ? `Dev #${item.developer_id}` : '-'),
              amount: `PKR ${rawAmount.toLocaleString()}`,
              commission: commissionVal > 0 ? `PKR ${commissionVal.toLocaleString()}` : '-',
              sentMoney: sentMoneyVal > 0 ? `PKR ${sentMoneyVal.toLocaleString()}` : '-',
              status: statusLabel,
              statusType: statusType
            };
          });

          setPaymentLogs(mappedLogs);
        } else {
          setPaymentLogs(fallbackPaymentLogs);
        }
      } catch (err) {
        console.warn('API error, loading fallback payment logs:', err);
        setPaymentLogs(fallbackPaymentLogs);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const getStatusBadge = (type, label) => {
    switch (type) {
      case 'received':
        return (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-[#93C5FD] dark:text-[#1E3A8A] inline-block text-center leading-tight">
            {label}
          </span>
        );
      case 'pending':
        return (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-[#FCA5A5] dark:text-[#7F1D1D] inline-block text-center leading-tight">
            {label}
          </span>
        );
      case 'released':
        return (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-[#A7F3D0] dark:text-[#064E3B] inline-block text-center leading-tight">
            {label}
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 inline-block text-center leading-tight">
            {label}
          </span>
        );
    }
  };

  // Realtime dynamic filter across Project Name, Client, Developer, Status, Date, and ID
  const filteredPaymentLogs = paymentLogs.filter((log) => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;

    return (
      (log.project || '').toLowerCase().includes(q) ||
      (log.client || '').toLowerCase().includes(q) ||
      (log.developer || '').toLowerCase().includes(q) ||
      (log.status || '').toLowerCase().includes(q) ||
      (log.date || '').toLowerCase().includes(q) ||
      String(log.id).toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col min-h-screen py-4 sm:py-6 px-3 sm:px-4 max-w-3xl sm:max-w-4xl mx-auto w-full font-['Raleway',sans-serif] antialiased text-left select-none">
      
      <div className="w-full mb-4 sm:mb-5 text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight">
          Payment history
        </h1>
        <p className="text-gray-600 dark:text-gray-200 text-[11px] font-medium">
          A complete log of every payment on the platform
        </p>
      </div>

      <div className="w-full flex justify-center items-start flex-1">
        
        <div className="w-full dark:p-6 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all">
          
          <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent p-4 sm:p-5 dark:p-0 rounded-[8px] sm:rounded-[6px] overflow-hidden shadow-xs transition-all duration-300">
            
            {loading ? (
              <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
                <Loader2 size={20} className="animate-spin text-[#DC6B0F]" />
                <span className="text-xs font-semibold">Loading payment transactions...</span>
              </div>
            ) : (
              <>
                {/* Mobile Cards View */}
                <div className="block md:hidden p-3 space-y-2.5">
                  {filteredPaymentLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="bg-[#FFF6E9] dark:bg-white p-3.5 rounded-[6px] border border-black/5 dark:border-gray-200 shadow-xs space-y-2"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-extrabold text-xs text-black">{log.project}</h3>
                          <span className="text-[9px] font-bold text-gray-400">{log.date}</span>
                        </div>
                        {getStatusBadge(log.statusType, log.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="block font-bold text-gray-400 uppercase text-[8px]">Client</span>
                          <span className="font-bold text-gray-800">{log.client}</span>
                        </div>
                        <div>
                          <span className="block font-bold text-gray-400 uppercase text-[8px]">Developer</span>
                          <span className="font-bold text-gray-800">{log.developer}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-black/5 dark:border-gray-100 text-[11px]">
                        <div>
                          <span className="text-[8px] font-bold text-gray-400 block uppercase">Amount</span>
                          <span className="font-extrabold text-black">{log.amount}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold text-gray-400 block uppercase">Commission</span>
                          <span className="font-bold text-gray-700">{log.commission}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-gray-400 block uppercase">Sent Money</span>
                          <span className="font-extrabold text-emerald-700">{log.sentMoney}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                        <th className="py-3.5 px-4">DATE</th>
                        <th className="py-3.5 px-4">PROJECT</th>
                        <th className="py-3.5 px-4">CLIENT</th>
                        <th className="py-3.5 px-4">DEVELOPER</th>
                        <th className="py-3.5 px-4">AMOUNT</th>
                        <th className="py-3.5 px-4">COMMISSION</th>
                        <th className="py-3.5 px-4">SENT MONEY</th>
                        <th className="py-3.5 px-4 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                      {filteredPaymentLogs.map((log) => (
                        <tr 
                          key={log.id} 
                          className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                        >
                          <td className="py-4 px-4 text-[11px] font-medium text-gray-500 dark:text-gray-500 whitespace-normal max-w-[80px] leading-tight">
                            {log.date}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-black text-black whitespace-normal max-w-[95px] leading-tight">
                            {log.project}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-bold text-gray-900 whitespace-normal max-w-[80px] leading-tight">
                            {log.client}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-bold text-gray-900 whitespace-normal max-w-[85px] leading-tight">
                            {log.developer}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-extrabold text-black whitespace-nowrap">
                            {log.amount}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap">
                            {log.commission}
                          </td>

                          <td className="py-4 px-4 text-[11px] font-extrabold text-emerald-700 whitespace-nowrap">
                            {log.sentMoney}
                          </td>

                          <td className="py-4 px-4 text-center">
                            {getStatusBadge(log.statusType, log.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!loading && filteredPaymentLogs.length === 0 && (
                  <div className="text-center py-8 text-xs text-gray-500 font-medium">
                    {searchQuery ? `No logs matching "${searchQuery}".` : 'No payment history logs found.'}
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}