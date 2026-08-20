import React, { useState, useEffect } from 'react';
import { fetchAdminPayments, releaseEscrowFunds } from '../../services/api';
import { Loader2 } from 'lucide-react';

const fallbackPaymentData = [
  {
    id: 1,
    paymentId: 2,
    project: "Bon appetit",
    client: "Zara ahmed",
    developer: "Bilal ahmed",
    amount: "PKR 180,000",
    numericAmount: 180000,
    status: "Ready to release",
    statusType: "ready",
    subtext: null,
    hasAction: true,
  },
  {
    id: 2,
    paymentId: 3,
    project: "TN-HRMS",
    client: "Rabia ali",
    developer: "Mustafa raza",
    amount: "PKR 275,000",
    numericAmount: 275000,
    status: "Received",
    statusType: "received",
    subtext: "Awaiting completion",
    hasAction: false,
  },
  {
    id: 3,
    paymentId: 4,
    project: "Blue sky travel",
    client: "Shazia raza",
    developer: "-",
    amount: "PKR 275,000",
    numericAmount: 275000,
    status: "Pending payment",
    statusType: "pending",
    subtext: "Awaiting client payment",
    hasAction: false,
  },
  {
    id: 4,
    paymentId: 5,
    project: "Nexus desktop",
    client: "Sara kareem",
    developer: "Zain khan",
    amount: "PKR 275,000",
    numericAmount: 275000,
    status: "Released",
    statusType: "released",
    subtext: "Commission: PKR 33,000",
    hasAction: false,
  }
];

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPayments = async () => {
    try {
      setLoadingList(true);
      const res = await fetchAdminPayments();

      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped = res.data.map((item) => {
          const rawAmount = parseFloat(item.amount) || 0;
          const commissionAmount = Math.round(rawAmount * 0.12);
          const rawStatus = (item.status || '').toLowerCase();

          let statusLabel = 'Pending payment';
          let statusType = 'pending';
          let hasAction = false;
          let subtext = 'Awaiting client payment';

          if (rawStatus === 'verified' || rawStatus === 'held') {
            statusLabel = 'Ready to release';
            statusType = 'ready';
            hasAction = true;
            subtext = null;
          } else if (rawStatus === 'released') {
            statusLabel = 'Released';
            statusType = 'released';
            hasAction = false;
            subtext = `Commission: PKR ${commissionAmount.toLocaleString()}`;
          } else if (rawStatus === 'received') {
            statusLabel = 'Received';
            statusType = 'received';
            hasAction = false;
            subtext = 'Awaiting completion';
          }

          return {
            id: item.payment_id,
            paymentId: item.payment_id,
            project: item.project_name || `Project #${item.project_id}`,
            client: item.client_name || (item.client_id ? `Client #${item.client_id}` : '-'),
            developer: item.developer_name || (item.developer_id ? `Dev #${item.developer_id}` : '-'),
            amount: `PKR ${rawAmount.toLocaleString()}`,
            numericAmount: rawAmount,
            status: statusLabel,
            statusType: statusType,
            subtext: subtext,
            hasAction: hasAction
          };
        });

        setPayments(mapped);
      } else {
        setPayments(fallbackPaymentData);
      }
    } catch (err) {
      console.warn("Could not load admin payments, using fallback data:", err);
      setPayments(fallbackPaymentData);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleOpenReleaseModal = (paymentItem) => {
    setErrorMessage('');
    setSelectedPayment(paymentItem);
  };

  const handleConfirmRelease = async () => {
    if (!selectedPayment) return;

    const targetPaymentId = selectedPayment.paymentId || selectedPayment.id;
    const commissionAmount = Math.round(selectedPayment.numericAmount * 0.12);

    try {
      setLoading(true);
      setErrorMessage('');

      await releaseEscrowFunds(targetPaymentId);

      setPayments(prev =>
        prev.map(item =>
          item.id === selectedPayment.id
            ? {
                ...item,
                status: "Released",
                statusType: "released",
                subtext: `Commission: PKR ${commissionAmount.toLocaleString()}`,
                hasAction: false,
              }
            : item
        )
      );

      setSelectedPayment(null);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to release escrow funds.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status, statusType) => {
    switch (statusType) {
      case 'ready':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] dark:bg-[#FEF3C7] dark:text-[#92400E] inline-block whitespace-nowrap shadow-2xs">
            {status}
          </span>
        );
      case 'received':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#DBEAFE] text-[#1E40AF] dark:bg-[#DBEAFE] dark:text-[#1E40AF] inline-block whitespace-nowrap shadow-2xs">
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#991B1B] dark:bg-[#FEE2E2] dark:text-[#991B1B] inline-block whitespace-nowrap shadow-2xs">
            {status}
          </span>
        );
      case 'released':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#D1FAE5] text-[#065F46] dark:bg-[#D1FAE5] dark:text-[#065F46] inline-block whitespace-nowrap shadow-2xs">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 inline-block whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full text-black dark:text-white font-['Raleway',sans-serif] space-y-4 sm:space-y-5 max-w-3xl mx-auto pb-8 px-3 sm:px-4 text-left select-none relative">
      
      <div className="text-left mb-5 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          Payment management
        </h1>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-200 leading-relaxed max-w-2xl">
          Track every payment's status - pending, received into escrow, or released to developer - and release funds upon project completion.
        </p>
      </div>

      <div className={`w-full dark:p-3 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-2xl transition-all ${selectedPayment ? 'filter blur-xs' : ''}`}>
        
        <div className="w-full bg-[#FFF6E9] dark:bg-white border border-amber-100/60 dark:border-transparent rounded-[8px] sm:rounded-[6px] shadow-xs transition-all duration-300 overflow-hidden">
          
          {loadingList ? (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 size={18} className="animate-spin text-[#DC6B0F]" />
              <span className="text-xs font-semibold">Loading payments...</span>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-700 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">PROJECT</th>
                    <th className="py-3.5 px-4">CLIENT</th>
                    <th className="py-3.5 px-4">DEVELOPER</th>
                    <th className="py-3.5 px-4">AMOUNT</th>
                    <th className="py-3.5 px-10 ">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {payments.map((item) => (
                    <tr 
                      key={item.id} 
                      className="bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-5">
                        <span className="font-extrabold text-xs text-black tracking-tight block">
                          {item.project}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-800">
                        {item.client}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-800">
                        {item.developer}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-gray-800 whitespace-nowrap">
                        {item.amount}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-between gap-3 min-w-[210px]">
                          <div>
                            {getStatusBadge(item.status, item.statusType)}
                          </div>

                          <div className="text-right shrink-0">
                            {item.hasAction ? (
                              <button
                                onClick={() => handleOpenReleaseModal(item)}
                                className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-[5px] shadow-2xs hover:brightness-105 active:scale-95 transition-all cursor-pointer tracking-wider"
                              >
                                Release funds
                              </button>
                            ) : (
                              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-600 block leading-tight max-w-[110px]">
                                {item.subtext}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loadingList && payments.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium">
              No payments found.
            </div>
          )}

        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-all">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 p-6 sm:p-7 w-full max-w-md text-left space-y-4 font-['Raleway',sans-serif]">
            
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-black text-black tracking-tight">
                Release Funds to Developer
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                The customer confirmed completion of "{selectedPayment.project}". You're about to release {selectedPayment.amount} from escrow to {selectedPayment.developer}, minus a 12% platform commission (PKR {(selectedPayment.numericAmount * 0.12).toLocaleString()}). They'll receive PKR {(selectedPayment.numericAmount * 0.88).toLocaleString()}. This action cannot be undone.
              </p>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md font-medium">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={loading}
                onClick={() => setSelectedPayment(null)}
                className="px-5 h-9 rounded-md bg-white border border-gray-300 text-gray-700 font-extrabold text-xs hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleConfirmRelease}
                className="px-5 h-9 rounded-md bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Releasing...</span>
                  </>
                ) : (
                  'Confirm & Release'
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}