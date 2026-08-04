import React, { useState } from 'react';

export default function PaymentHistory() {
  const [paymentLogs] = useState([
    {
      id: 1,
      date: 'Jul 9, 2026',
      project: 'Bon appetit',
      client: 'Zara ahmed',
      developer: 'Bilal ahmed',
      amount: 'PKR 275,000',
      commission: 'PKR 35,000',
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
      status: 'Released',
      statusType: 'released'
    }
  ]);

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

  return (
    <div className="flex flex-col min-h-screen py-4 sm:py-6 px-3 sm:px-4 max-w-4xl sm:max-w-4xl mx-auto w-full font-['Raleway',sans-serif] antialiased text-left select-none">
      
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
            
            <div className="block md:hidden p-3 space-y-2.5">
              {paymentLogs.map((log) => (
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

                  <div className="flex justify-between items-center pt-1.5 border-t border-black/5 dark:border-gray-100 text-[11px]">
                    <div>
                      <span className="text-[8px] font-bold text-gray-400 block uppercase">Amount</span>
                      <span className="font-extrabold text-black">{log.amount}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-gray-400 block uppercase">Commission</span>
                      <span className="font-bold text-gray-700">{log.commission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[580px]">
                <thead>
                  <tr className="bg-white/40 dark:bg-[#A2A6B0] text-gray-600 dark:text-black uppercase font-['Raleway',sans-serif] font-extrabold text-[10px] tracking-wider">
                    <th className="py-3.5 px-5">DATE</th>
                    <th className="py-3.5 px-4">PROJECT</th>
                    <th className="py-3.5 px-4">CLIENT</th>
                    <th className="py-3.5 px-4">DEVELOPER</th>
                    <th className="py-3.5 px-4">AMOUNT</th>
                    <th className="py-3.5 px-4">COMMISSION</th>
                    <th className="py-3.5 px-5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                  {paymentLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className="group bg-[#FFF6E9] dark:bg-white hover:bg-[#FAF3E0]/70 dark:hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-5 text-[11px] font-medium text-gray-500 dark:text-gray-500 whitespace-normal max-w-[80px] leading-tight">
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

                      <td className="py-4 px-5 text-center">
                        {getStatusBadge(log.statusType, log.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}