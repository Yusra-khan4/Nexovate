import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { updateClientProfile } from '../../services/api';

export default function ClientProfile() {
  const navigate = useNavigate();

  // Retrieve current user/client details from localStorage
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const clientId = storedUser.client_id || storedUser.id || 2;

  const [profileData, setProfileData] = useState({
    fullName: storedUser.full_name || storedUser.name || 'Bilal ahmed',
    emailAddress: storedUser.email_address || storedUser.email || 'bilalahmed@gmail.com',
    phoneNumber: storedUser.phone || '+923311673628',
    cnic: storedUser.cnic || '',
    domain: storedUser.domain || storedUser.industry || '',
    city: storedUser.city || '',
    country: storedUser.country || 'Pakistan',
    bankAccountTitle: storedUser.account_title || '',
    bankName: storedUser.bank_name || '',
    bankAccountNumber: storedUser.account_number || ''
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Compute initials dynamically
  const getInitials = (name) => {
    if (!name) return 'CL';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMessage({ type: '', text: '' });

      const res = await updateClientProfile(clientId, profileData);

      // Update local storage session cache with latest profile
      const updatedUser = {
        ...storedUser,
        full_name: profileData.fullName,
        email_address: profileData.emailAddress,
        phone: profileData.phoneNumber,
        cnic: profileData.cnic,
        domain: profileData.domain,
        city: profileData.city,
        country: profileData.country,
        account_title: profileData.bankAccountTitle,
        bank_name: profileData.bankName,
        account_number: profileData.bankAccountNumber,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const labelStyles = "block text-[11px] font-black text-gray-900 dark:text-gray-900 tracking-wide mb-1 text-left";
  const inputStyles = "w-full bg-white border border-gray-300 rounded-[5px] py-2 px-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-200 font-medium shadow-sm";

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 px-3 sm:px-6 font-['Raleway',sans-serif] select-none text-left text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8 space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-200 font-medium">Manage your personal and business details.</p>    
      </div>

      {/* CARD CONTAINER */}
      <div className="p-0 dark:p-4 sm:dark:p-6 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/10 dark:backdrop-blur-md shadow-none dark:shadow-2xl w-full max-w-lg mx-auto overflow-hidden transition-all duration-300">
        
        <div className="bg-[#FFF6E9] dark:bg-[#EFEEEA] text-gray-900 dark:text-black p-4 sm:p-8 rounded-[8px] sm:rounded-[4px] shadow-inner border border-black/5 sm:border-transparent w-full transition-colors duration-300">
          
          {statusMessage.text && (
            <div className={`mb-4 p-2.5 rounded-md text-xs font-semibold ${
              statusMessage.type === 'error'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSaveChanges} className="space-y-3.5 sm:space-y-4">
            
            {/* AVATAR */}
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
              <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-xs sm:text-sm font-black shadow-md mb-1.5">
                {getInitials(profileData.fullName)}
              </div>
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

            {/* CNIC & DOMAIN / INDUSTRY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className={labelStyles}>CNIC (National ID)</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder="e.g. 42101-1234567-1"
                  value={profileData.cnic}
                  onChange={(e) => setProfileData({ ...profileData, cnic: e.target.value })}
                />
              </div>
              <div>
                <label className={labelStyles}>Business Domain / Industry</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder="e.g. E-commerce, Healthcare, EdTech"
                  value={profileData.domain}
                  onChange={(e) => setProfileData({ ...profileData, domain: e.target.value })}
                />
              </div>
            </div>

            {/* CITY & COUNTRY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className={labelStyles}>City</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder="e.g. Karachi"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                />
              </div>
              <div>
                <label className={labelStyles}>Country</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder="e.g. Pakistan"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
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
                disabled={saving}
                className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 px-6 rounded-[5px] font-extrabold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}