import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext'; 
import { UserRound, Edit3, Camera, Plus, Trash2, Check } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const { profile, setProfile, loading, errorMessage, setErrorMessage } = useProfile();
  const [avatarFile, setAvatarFile] = useState(null);

  const skillCategories = {
    "Web Development": ["React.js", "Vue.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js", "Angular"],
    "Mobile Development": ["Reaxt native", "Flutter", "Swift", "Kotlin"],
    "Backend": ["Django", "ASP.net", "Spring Boot"],
    "Database": ["MongoDB", "Firebase", "MySQL", "PostgreSQL"],
    "Cloud": ["Google cloud", "Azure", "AWS"]
  };

  const currentSkills = profile?.Tech_stack 
    ? profile.Tech_stack.split(',').map(s => s.trim()).filter(Boolean) 
    : [];

  const projectLinks = profile?.project_links || [''];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleToggleSkill = (skill) => {
    if (!isEditing) return;
    let updatedSkills;
    if (currentSkills.includes(skill)) {
      updatedSkills = currentSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...currentSkills, skill];
    }
    setProfile({ ...profile, Tech_stack: updatedSkills.join(', ') });
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...projectLinks];
    updatedLinks[index] = value;
    setProfile({ ...profile, project_links: updatedLinks });
  };

  const addProjectLinkField = () => {
    setProfile({ ...profile, project_links: [...projectLinks, ''] });
  };

  const removeProjectLinkField = (index) => {
    const updatedLinks = projectLinks.filter((_, i) => i !== index);
    setProfile({ ...profile, project_links: updatedLinks.length ? updatedLinks : [''] });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setProfile({ ...profile, avatar: URL.createObjectURL(file) });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      const profileData = {
        full_Name: profile.full_Name,
        your_domain: profile.your_domain,
        email_address: profile.email_address,
        phone_number: profile.phone_number,
        bio: profile.bio,
        Tech_stack: profile.Tech_stack,
        project_links: profile.project_links,
        bank_name: profile.bank_name,
        bank_account_title: profile.bank_account_title,
        bank_account_iban: profile.bank_account_iban
      };

      const updatedData = await updateUserProfile(profileData);
      const dev = updatedData.developer;
      
      setProfile({
        full_Name: dev.full_name,
        your_domain: dev.your_domain,
        email_address: dev.email_address || profile.email_address,
        phone_number: dev.phone_number || '',
        bio: dev.bio || '',
        Tech_stack: dev.tech_stack,
        project_links: dev.project_links || [''],
        bank_name: dev.bank_name || '',
        bank_account_title: dev.bank_account_title || '',
        bank_account_iban: dev.bank_account_iban || '',
        avatar: profile.avatar,
      });

      setIsEditing(false);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save profile parameters.');
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
  const inputStyles = "w-full bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[4px] py-1.5 px-3 text-[11px] text-gray-900 dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC6B0F] dark:focus:border-[#0284c7] transition-colors duration-300 font-medium shadow-xs disabled:opacity-90";

  return (
    <div className="flex flex-col min-h-screen py-4 sm:py-6 px-3 sm:px-4 max-w-2xl sm:max-w-3xl mx-auto w-full font-['Raleway',sans-serif] antialiased">
      
      {/* HEADER SECTION */}
      <div className="w-full mb-4 sm:mb-5 text-left space-y-0.5">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFFFFF] tracking-tight">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-200 text-[11px] font-medium">Configure metrics and infrastructure profile specifications.</p>
      </div>

      <div className="w-full flex justify-center items-start flex-1">
        
        {/* OUTER GLASSMORPHIC BORDER WRAPPER */}
        <div className="w-full dark:p-6 sm:dark:p-6 dark:bg-white/10 dark:backdrop-blur-2xl dark:border dark:border-white/15 dark:rounded-[10px] dark:shadow-xl transition-all">
          
          {/* MAIN PROFILE CARD */}
          <div className="w-full bg-[#FFF6E9] dark:bg-[#EFEEEA] border border-black/5 dark:border-transparent p-3.5 sm:p-5 rounded-[8px] sm:rounded-[6px] shadow-xs dark:shadow-none transition-all duration-300">
            
            {errorMessage && (
              <div className="mb-4 p-2.5 bg-red-100 dark:bg-red-100 border border-red-500/20 text-red-700 dark:text-red-700 text-[11px] font-semibold rounded-[4px]">{errorMessage}</div>
            )}
            
            <form onSubmit={handleUploadSubmit} className="space-y-4 sm:space-y-5">
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />

              {/* AVATAR UPLOAD ELEMENT HEADER */}
              <div className="flex flex-col items-center mb-1 sm:mb-2">
                <button type="button" onClick={isEditing ? triggerFileInput : undefined} className={`focus:outline-none flex flex-col items-center ${isEditing ? 'cursor-pointer group' : 'cursor-default'}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#DC6B0F] dark:border-transparent shadow-xs relative mb-1 dark:bg-[#1D61E7] flex items-center justify-center">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] dark:bg-none dark:bg-[#1D61E7] flex items-center justify-center text-white font-extrabold text-sm sm:text-base">
                        {profile.full_Name ? profile.full_Name.split(' ').map(n => n[0]).join('').toUpperCase() : "HK"}
                      </div>
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={13} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-600 dark:text-black font-bold tracking-wide">
                    {isEditing ? 'Edit' : 'Edit'}
                  </span>
                </button>
              </div>

              {/* CORE BASE PROFILE INPUT FIELDS */}
              <div className="w-full space-y-2.5 sm:space-y-3 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Your name</label>
                    <input type="text" name="full_Name" value={profile.full_Name || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Bilal ahmed" required />
                  </div>
                  <div>
                    <label className={labelStyles}>Domain</label>
                    <input type="text" name="your_domain" value={profile.your_domain || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Full stack development" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Email</label>
                    <input type="email" name="email_address" value={profile.email_address || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. bilalahmed@gmail.com" required />
                  </div>
                  <div>
                    <label className={labelStyles}>Phone</label>
                    <input type="text" name="phone_number" value={profile.phone_number || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. +923311673628" />
                  </div>
                </div>

                <div>
                  <label className={labelStyles}>Bio</label>
                  <textarea name="bio" rows={2} value={profile.bio || ''} onChange={handleChange} className={`${inputStyles} resize-none leading-snug`} disabled={!isEditing} placeholder="Tell us about your development experience and specialized domain focus..." />
                </div>
              </div>

              {/* DYNAMIC SELECTABLE SKILLS SECTION CATEGORY WRAPPERS */}
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
                            disabled={!isEditing}
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 border select-none ${
                              isSelected 
                                ? 'bg-black text-white dark:bg-[#111111] dark:text-white border-transparent shadow-xs' 
                                : 'bg-white text-gray-800 dark:bg-white dark:text-gray-900 border-gray-300 dark:border-gray-200 hover:border-gray-400'
                            } ${isEditing ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
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

              {/* PROJECT LINKS ELEMENT COLLECTION BUILDER */}
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
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeProjectLinkField(index)}
                          className="p-1.5 bg-red-100 dark:bg-red-100 text-red-600 dark:text-red-600 rounded-[4px] hover:brightness-95 transition-all cursor-pointer shadow-xs shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={addProjectLinkField}
                    className="mt-1 flex items-center gap-1 text-[11px] font-bold text-gray-900 dark:text-gray-900 bg-white/60 dark:bg-white border border-black/10 dark:border-gray-300 rounded-[4px] py-1 px-2.5 hover:bg-white transition-all cursor-pointer shadow-xs"
                  >
                    <Plus size={12} strokeWidth={2.2} /> Add more
                  </button>
                )}
              </div>

              {/* BANK ACCOUNT ARCHITECTURE SECTION */}
              <div className="text-left space-y-2.5 sm:space-y-3 pt-1 border-t border-black/5 dark:border-gray-300/70">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelStyles}>Bank name</label>
                    <input type="text" name="bank_name" value={profile.bank_name || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Meezan Bank" />
                  </div>
                  <div>
                    <label className={labelStyles}>Bank account title</label>
                    <input type="text" name="bank_account_title" value={profile.bank_account_title || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Account Holder Name" />
                  </div>
                </div>
                <div>
                  <label className={labelStyles}>Bank account number / IBAN</label>
                  <input type="text" name="bank_account_iban" value={profile.bank_account_iban || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. PK44MEZN..." />
                </div>
              </div>

              {/* SUBMIT CONTROLLER ACTIONS */}
              <div className="w-full flex flex-col sm:flex-row justify-start gap-2 pt-2 dark:border-t dark:border-gray-300/70">
                {isEditing ? (
                  <>
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-[11px] py-1.5 px-4 rounded-[4px] shadow-xs hover:brightness-105 active:scale-[0.98] transition-all uppercase cursor-pointer text-center"
                    >
                      Save changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)} 
                      className="w-full sm:w-auto bg-white dark:bg-white text-black dark:text-black font-bold text-[11px] py-1.5 px-3 rounded-[4px] border border-black/10 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)} 
                    className="w-full sm:w-auto bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] dark:bg-gradient-to-r dark:from-[#F2A508] dark:via-[#DC6B0F] dark:to-[#BD1C22] text-white dark:text-white font-extrabold text-[11px] px-4 py-1.5 rounded-[4px] shadow-xs border border-black/10 dark:border-transparent flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Edit3 size={12} /> Edit Profile Info
                  </button>
                )}
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}