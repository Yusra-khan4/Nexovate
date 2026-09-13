import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext'; 
import { Camera, Plus, Trash2, Check, Upload, Loader2 } from 'lucide-react';
import { updateDeveloper } from '../../services/api';

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);
  
  const { profile, setProfile, loading } = useProfile();
  
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || profile?.full_Name || storedUser.full_name || storedUser.full_Name || '',
    your_domain: profile?.your_domain || storedUser.your_domain || '',
    email_address: profile?.email_address || storedUser.email_address || storedUser.email || '',
    phone_number: profile?.phone_number || storedUser.phone_number || '',
    cnic: profile?.cnic || storedUser.cnic || '',
    city: profile?.city || storedUser.city || '',
    country: profile?.country || storedUser.country || 'Pakistan',
    experience_years: profile?.experience_years || storedUser.experience_years || '',
    tech_stack: profile?.tech_stack || profile?.Tech_stack || storedUser.tech_stack || storedUser.Tech_stack || '',
    project_links: profile?.project_links || storedUser.project_links || [''],
    bank_name: profile?.bank_name || storedUser.bank_name || '',
    bank_account_title: profile?.bank_account_title || storedUser.bank_account_title || '',
    bank_account_iban: profile?.bank_account_iban || storedUser.bank_account_iban || '',
    certificate_name: profile?.certificate_name || storedUser.certificate_name || '',
    avatar: profile?.avatar || storedUser.avatar || null,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setProfileData(prev => ({
        ...prev,
        full_name: profile.full_name || profile.full_Name || prev.full_name,
        your_domain: profile.your_domain || prev.your_domain,
        email_address: profile.email_address || prev.email_address,
        phone_number: profile.phone_number || prev.phone_number,
        cnic: profile.cnic || prev.cnic,
        city: profile.city || prev.city,
        country: profile.country || prev.country,
        experience_years: profile.experience_years || prev.experience_years,
        tech_stack: profile.tech_stack || profile.Tech_stack || prev.tech_stack,
        project_links: profile.project_links || prev.project_links,
        bank_name: profile.bank_name || prev.bank_name,
        bank_account_title: profile.bank_account_title || prev.bank_account_title,
        bank_account_iban: profile.bank_account_iban || prev.bank_account_iban,
        certificate_name: profile.certificate_name || prev.certificate_name,
        avatar: profile.avatar || prev.avatar,
      }));
    }
  }, [profile]);

  const skillCategories = {
    "Web Development": ["React.js", "Vue.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js", "Angular"],
    "Mobile Development": ["React Native", "Flutter", "Swift", "Kotlin"],
    "Backend": ["Django", "ASP.net", "Spring Boot"],
    "Database": ["MongoDB", "Firebase", "MySQL", "PostgreSQL"],
    "Cloud": ["Google cloud", "Azure", "AWS"]
  };

  const experienceOptions = [
    "0 - 1 years",
    "1 - 3 years",
    "3 - 5 years",
    "5+ years"
  ];

  const currentSkills = profileData.tech_stack 
    ? profileData.tech_stack.split(',').map(s => s.trim()).filter(Boolean) 
    : [];

  const projectLinks = profileData.project_links || [''];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'full_name' ? { full_Name: value } : {}),
    }));
  };

  const handleToggleSkill = (skill) => {
    let updatedSkills;
    if (currentSkills.includes(skill)) {
      updatedSkills = currentSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...currentSkills, skill];
    }
    const joined = updatedSkills.join(', ');
    setProfileData(prev => ({ ...prev, tech_stack: joined, Tech_stack: joined }));
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...projectLinks];
    updatedLinks[index] = value;
    setProfileData(prev => ({ ...prev, project_links: updatedLinks }));
  };

  const addProjectLinkField = () => {
    setProfileData(prev => ({ ...prev, project_links: [...projectLinks, ''] }));
  };

  const removeProjectLinkField = (index) => {
    const updatedLinks = projectLinks.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, project_links: updatedLinks.length ? updatedLinks : [''] }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setProfileData(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
      setProfileData(prev => ({ ...prev, certificate_name: file.name }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerCertInput = () => {
    certInputRef.current.click();
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });
    setSaving(true);
    
    try {
      const devId = localStorage.getItem('developerId') || storedUser.id || storedUser._id;
      const updatedData = await updateDeveloper(devId, profileData);
      const dev = updatedData.data || updatedData.developer || updatedData;
      
      const merged = {
        ...profileData,
        ...dev,
      };

      setProfileData(merged);
      setProfile(merged);
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...merged }));

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save profile parameters.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-white text-[11px] font-bold tracking-wide">
        Loading Profile Parameters...
      </div>
    );
  }

  const labelStyles = "block text-[11px] font-bold text-gray-900 dark:text-black tracking-wide mb-1 transition-colors duration-300";
  const inputStyles = "w-full bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[4px] py-1.5 px-3 text-[11px] text-gray-900 dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] dark:focus:border-[#0284c7] transition-colors duration-300 font-medium shadow-xs";

  return (
    <div className="flex flex-col min-h-screen py-4 sm:py-6 px-3 sm:px-4 max-w-2xl sm:max-w-3xl mx-auto w-full font-['Raleway',sans-serif] antialiased">
      <div className="w-full mb-4 sm:mb-5 text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-200 text-[11px] font-medium">Configure metrics and infrastructure profile specifications.</p>
      </div>

      <div className="w-full flex justify-center items-start flex-1">
        <div className="w-full dark:p-6 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-xl transition-all">
          <div className="w-full bg-[#FFF6E9] dark:bg-[#EFEEEA] border border-black/5 dark:border-transparent p-3.5 sm:p-5 rounded-[8px] sm:rounded-[6px] shadow-xs dark:shadow-none transition-all duration-300">
            
            {statusMessage.text && (
              <div className={`mb-4 p-2.5 rounded-md text-xs font-semibold ${
                statusMessage.type === 'error'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                {statusMessage.text}
              </div>
            )}
            
            <form onSubmit={handleUploadSubmit} className="space-y-4 sm:space-y-5">
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
              <input type="file" ref={certInputRef} onChange={handleCertificateChange} accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" />

              <div className="flex flex-col items-center mb-1 sm:mb-2">
                <button type="button" onClick={triggerFileInput} className="focus:outline-none flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#DC6B0F] dark:border-transparent shadow-xs relative mb-1 dark:bg-[#1D61E7] flex items-center justify-center">
                    {profileData?.avatar ? (
                      <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] dark:bg-none dark:bg-[#1D61E7] flex items-center justify-center text-white font-extrabold text-sm sm:text-base">
                        {profileData?.full_name ? profileData.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : "HK"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={13} className="text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-600 dark:text-black font-bold tracking-wide">
                    Change Photo
                  </span>
                </button>
              </div>

              <div className="w-full space-y-2.5 sm:space-y-3 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Your name</label>
                    <input type="text" name="full_name" value={profileData?.full_name || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Bilal ahmed" required />
                  </div>
                  <div>
                    <label className={labelStyles}>Domain</label>
                    <input type="text" name="your_domain" value={profileData?.your_domain || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Full stack development" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Email</label>
                    <input type="email" name="email_address" value={profileData?.email_address || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. bilalahmed@gmail.com" required />
                  </div>
                  <div>
                    <label className={labelStyles}>Phone</label>
                    <input type="text" name="phone_number" value={profileData?.phone_number || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. +923311673628" />
                  </div>
                </div>

                <div>
                  <label className={labelStyles}>CNIC</label>
                  <input type="text" name="cnic" value={profileData?.cnic || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. 42101-1234567-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>City</label>
                    <input type="text" name="city" value={profileData?.city || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Karachi" />
                  </div>
                  <div>
                    <label className={labelStyles}>Country</label>
                    <input type="text" name="country" value={profileData?.country || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Pakistan" />
                  </div>
                </div>

                <div>
                  <label className={labelStyles}>Experience (Years)</label>
                  <select 
                    name="experience_years" 
                    value={profileData?.experience_years || ''} 
                    onChange={handleChange} 
                    className={inputStyles}
                  >
                    <option value="">Select experience level</option>
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-left space-y-3 sm:space-y-3.5 pt-1">
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#DC6B0F] dark:text-[#0B7EB5]">Skills</h3>
                
                {Object.entries(skillCategories).map(([category, skills], index) => (
                  <div key={category} className="space-y-1.5">
                    <h4 className="text-[10px] font-bold tracking-wide text-gray-900 dark:text-gray-900 uppercase opacity-80">{category}</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {skills.map(skill => {
                        const isSelected = currentSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleToggleSkill(skill)}
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 border select-none cursor-pointer active:scale-95 ${
                              isSelected 
                                ? 'bg-black text-white dark:bg-[#111111] dark:text-white border-transparent shadow-xs' 
                                : 'bg-white text-gray-800 dark:bg-white dark:text-gray-900 border-gray-300 dark:border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected && <Check size={10} strokeWidth={3} className="text-white" />}
                          </button>
                        );
                      })}
                    </div>
                    {index < Object.keys(skillCategories).length - 1 && (
                      <div className="hidden dark:block pt-1.5 border-b border-gray-300/70" />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-left space-y-2 pt-1 dark:border-t dark:border-gray-300/70">
                <label className={labelStyles}>Project links</label>
                <div className="space-y-1.5">
                  {projectLinks.map((link, index) => (
                    <div key={index} className="flex gap-1.5 items-center">
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                        placeholder="https://github.com/your-build-url"
                        className={inputStyles}
                      />
                      <button
                        type="button"
                        onClick={() => removeProjectLinkField(index)}
                        className="p-1.5 bg-red-100 dark:bg-red-100 text-red-600 dark:text-red-600 rounded-[4px] hover:brightness-95 transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addProjectLinkField}
                  className="mt-1 flex items-center gap-1 text-[11px] font-bold text-gray-900 dark:text-gray-900 bg-white/60 dark:bg-white border border-black/10 dark:border-gray-300 rounded-[4px] py-1 px-2.5 hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  <Plus size={12} strokeWidth={2.2} /> Add more
                </button>
              </div>

              <div className="text-left space-y-1.5 pt-1 dark:border-t dark:border-gray-300/70">
                <label className={labelStyles}>Attach Certificate</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerCertInput}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-gray-900 dark:text-gray-900 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[4px] py-1.5 px-3 hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
                  >
                    <Upload size={12} /> Upload File
                  </button>
                  <span className="text-[11px] text-gray-600 dark:text-gray-700 truncate font-medium">
                    {profileData?.certificate_name || certificateFile?.name || "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="text-left space-y-2.5 sm:space-y-3 pt-1 border-t border-black/5 dark:border-gray-300/70">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Bank name</label>
                    <input type="text" name="bank_name" value={profileData?.bank_name || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Meezan Bank" />
                  </div>
                  <div>
                    <label className={labelStyles}>Bank account title</label>
                    <input type="text" name="bank_account_title" value={profileData?.bank_account_title || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. Account Holder Name" />
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>Bank account number / IBAN</label>
                  <input type="text" name="bank_account_iban" value={profileData?.bank_account_iban || ''} onChange={handleChange} className={inputStyles} placeholder="e.g. PK44MEZN..." />
                </div>
              </div>

              <div className="w-full flex justify-start gap-2 pt-2 dark:border-t dark:border-gray-300/70">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-[11px] py-2 px-6 rounded-[4px] shadow-xs hover:brightness-105 active:scale-[0.98] transition-all uppercase cursor-pointer text-center flex items-center justify-center gap-1.5 disabled:opacity-50"
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
    </div>
  );
}