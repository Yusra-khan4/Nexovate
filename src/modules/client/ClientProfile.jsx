import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ClientProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: 'Bilal ahmed',
    emailAddress: 'bilalahmed@gmail.com',
    phoneNumber: '+923311673628',
    bankAccountTitle: '',
    bankName: '',
    bankAccountNumber: ''
  });

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log('Profile metrics successfully secured:', profileData);
  };

  const labelStyles = "block text-[11px] font-black text-gray-900 tracking-wide mb-1 text-left";
  const inputStyles = "w-full bg-white border border-gray-300 rounded-[5px] py-2 px-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-200 font-medium shadow-sm";

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 px-3 sm:px-6 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8 space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-200 font-medium">Manage your personal payment information.</p>     
      </div>

      {/* CARD CONTAINER */}
      <div className="p-0 dark:p-4 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/10 dark:backdrop-blur-md shadow-none dark:shadow-2xl w-full max-w-lg mx-auto overflow-hidden transition-all duration-300">
        
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-gray-900 dark:text-black p-4 sm:p-8 rounded-[8px] sm:rounded-[4px] shadow-inner border border-black/5 sm:border-transparent w-full transition-colors duration-300">
          <form onSubmit={handleSaveChanges} className="space-y-3.5 sm:space-y-4">
            
            {/* AVATAR & EDIT LINK */}
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
              <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-xs sm:text-sm font-black shadow-md mb-1.5">
                BA
              </div>
              <button 
                type="button" 
                className="text-[11px] font-black text-gray-900 hover:underline tracking-wide cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* FULL NAME */}
            <div>
              <label className={labelStyles}>Your name</label>
              <input 
                type="text" 
                className={inputStyles} 
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                required 
              />
            </div>

            {/* EMAIL & PHONE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 sm:gap-4">
              <div className="sm:col-span-3">
                <label className={labelStyles}>Email</label>
                <input 
                  type="email" 
                  className={inputStyles} 
                  value={profileData.emailAddress}
                  onChange={(e) => setProfileData({ ...profileData, emailAddress: e.target.value })}
                  required 
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelStyles}>Phone</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  required 
                />
              </div>
            </div>

            {/* BANK ACCOUNT TITLE */}
            <div>
              <label className={labelStyles}>Bank account title</label>
              <input 
                type="text" 
                className={inputStyles} 
                value={profileData.bankAccountTitle}
                placeholder="Enter account title"
                onChange={(e) => setProfileData({ ...profileData, bankAccountTitle: e.target.value })}
              />
            </div>

            {/* BANK NAME */}
            <div>
              <label className={labelStyles}>Bank name</label>
              <input 
                type="text" 
                className={inputStyles} 
                value={profileData.bankName}
                placeholder="Enter bank name"
                onChange={(e) => setProfileData({ ...profileData, bankName: e.target.value })}
              />
            </div>

            {/* BANK ACCOUNT / IBAN */}
            <div>
              <label className={labelStyles}>Bank account number/IBAN</label>
              <input 
                type="text" 
                className={inputStyles} 
                value={profileData.bankAccountNumber}
                placeholder="Enter account number or IBAN"
                onChange={(e) => setProfileData({ ...profileData, bankAccountNumber: e.target.value })}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2 sm:pt-3 flex justify-start">
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 px-6 rounded-[5px] font-extrabold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer text-center"
              >
                Save changes
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}