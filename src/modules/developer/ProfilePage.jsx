import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext'; 
// import { updateUserProfile } from '../../services/api';
import { UserRound, Edit3, Camera, Plus, Trash2, Check } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const { profile, setProfile, loading, errorMessage, setErrorMessage } = useProfile();
  const [avatarFile, setAvatarFile] = useState(null);

  // Hardcoded blueprint matrix mirroring your skill selection boards exactly
  const skillCategories = {
    "Web Development": ["React.js", "Vue.js", "Next.js", "HTML", "CSS", "Tailwind", "Node.js", "Angular"],
    "Mobile Development": ["React native", "Flutter", "Swift", "Kotlin"],
    "Backend": ["Django", "ASP.net", "Spring Boot"],
    "Database": ["MongoDB", "Firebase", "MySQL", "PostgreSQL"],
    "Cloud": ["Google cloud", "Azure", "AWS"]
  };

  // Helper utility to parse active list from string
  const currentSkills = profile?.Tech_stack 
    ? profile.Tech_stack.split(',').map(s => s.trim()).filter(Boolean) 
    : [];

  // Parse or fall back project links array safely
  const projectLinks = profile?.project_links || [''];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Skill toggle logic handler
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

  // Dynamic input project array links controller mechanics
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
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-white text-xs font-bold tracking-wide">
        Loading Profile Parameters...
      </div>
    );
  }

  const labelStyles = "block text-xs font-bold text-gray-900 dark:text-[#FFFFFF] tracking-wide mb-1.5 transition-colors duration-300";
  const inputStyles = "w-full bg-white dark:bg-[#000000]/30 border border-gray-300 dark:border-white/10 rounded-[5px] py-2.5 px-4 text-xs text-gray-900 dark:text-[#FFFFFF] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#DC6B0F] transition-colors duration-300 font-medium shadow-sm";

  return (
    <div className="flex flex-col min-h-screen py-10 px-4 max-w-5xl mx-auto w-full font-['Raleway',sans-serif] antialiased">
      
      <div className="w-full mb-8 text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-[#FFFFFF] tracking-tight mb-1">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Configure metrics and infrastructure profile specifications.</p>
      </div>

      <div className="w-full flex justify-center items-start flex-1">
        <div className="w-full max-w-2xl bg-[#FFF6E9] dark:bg-[#1c1a17]/40 border border-black/5 dark:border-white/10 p-8 rounded-[12px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300">
          
          {errorMessage && (
            <div className="mb-5 p-3 bg-red-100 dark:bg-red-950/40 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold rounded-[5px]">{errorMessage}</div>
          )}
          
          <form onSubmit={handleUploadSubmit} className="space-y-6">
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />

            {/* AVATAR UPLOAD ELEMENT HEADER */}
            <div className="flex flex-col items-center mb-4">
              <button type="button" onClick={isEditing ? triggerFileInput : undefined} className={`focus:outline-none flex flex-col items-center ${isEditing ? 'cursor-pointer group' : 'cursor-default'}`}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#DC6B0F] shadow-md relative mb-1">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F2A508] to-[#BD1C22] flex items-center justify-center text-white font-black text-lg">
                      {profile.full_Name ? profile.full_Name.split(' ').map(n => n[0]).join('').toUpperCase() : "HK"}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-gray-600 dark:text-gray-400 font-bold tracking-wide">
                  {isEditing ? 'Edit' : ''}
                </span>
              </button>
            </div>

            {/* CORE BASE PROFILE INPUT FIELDS */}
            <div className="w-full space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyles}>Your name</label>
                  <input type="text" name="full_Name" value={profile.full_Name || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Bilal ahmed" required />
                </div>
                <div>
                  <label className={labelStyles}>Domain</label>
                  <input type="text" name="your_domain" value={profile.your_domain || ''} onChange={handleChange} className={inputStyles} disabled={!isEditing} placeholder="e.g. Full stack development" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <textarea name="bio" rows={3} value={profile.bio || ''} onChange={handleChange} className={`${inputStyles} resize-none leading-relaxed`} disabled={!isEditing} placeholder="Tell us about your development experience and specialized domain focus..." />
              </div>
            </div>

            {/* DYNAMIC SELECTABLE SKILLS SECTION CATEGORY WRAPPERS */}
            <div className="text-left space-y-5 pt-2">
              <h3 className="text-lg font-black tracking-tight text-[#DC6B0F] dark:text-[#F2A508]">Skills</h3>
              
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-xs font-black tracking-wide text-gray-900 dark:text-white uppercase opacity-80">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => {
                      const isSelected = currentSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleSkill(skill)}
                          disabled={!isEditing}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border select-none ${
                            isSelected 
                              ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-sm' 
                              : 'bg-white text-gray-800 dark:bg-white/5 dark:text-gray-300 border-gray-300 dark:border-white/10 hover:border-gray-400'
                          } ${isEditing ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                        >
                          <span>{skill}</span>
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* PROJECT LINKS ELEMENT COLLECTION BUILDER */}
            <div className="text-left space-y-3 pt-2">
              <label className={labelStyles}>Project links</label>
              <div className="space-y-2">
                {projectLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
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
                        className="p-2.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-[5px] hover:brightness-95 transition-all cursor-pointer shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={addProjectLinkField}
                  className="mt-1 flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-[#F2A508] bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[5px] py-1.5 px-3 hover:bg-white transition-all cursor-pointer shadow-sm"
                >
                  <Plus size={13} strokeWidth={2.5} /> Add more
                </button>
              )}
            </div>

            {/* BANK ACCOUNT ARCHITECTURE SECTION */}
            <div className="text-left space-y-4 pt-2 border-t border-black/5 dark:border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* SUBMIT CONTROLLER ACTIONS FLUID GRID BAR */}
            <div className="w-full flex justify-start gap-2.5 pt-4">
              {isEditing ? (
                <>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-xs py-2.5 px-6 rounded-[5px] shadow-lg hover:brightness-105 active:scale-[0.98] transition-all uppercase cursor-pointer"
                  >
                    Save changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="bg-white dark:bg-[#FFFFFF]/10 text-black dark:text-white font-bold text-xs py-2.5 px-4 rounded-[5px] border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)} 
                  className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] dark:bg-[#FFFFFF] text-white dark:text-[#000000] font-extrabold text-xs px-5 py-2.5 rounded-[5px] shadow-md border border-black/10 dark:border-transparent flex items-center gap-2 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Edit3 size={13} /> Edit Profile Info
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}