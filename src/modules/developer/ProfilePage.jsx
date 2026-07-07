import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext'; 
import { updateUserProfile } from '../../services/api';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const { profile, setProfile, loading, errorMessage, setErrorMessage } = useProfile();
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
      Tech_stack: profile.Tech_stack,
      Linkdin_URL: profile.Linkdin_URL,
      Github_URL: profile.Github_URL,
    };
      // if (avatarFile) {
      //   formDataToSend.append('avatar', avatarFile);
      // }

      const updatedData = await updateUserProfile(profileData);
      const developer = updatedData.developer;
      
      setProfile({
      full_Name: developer.full_name,
      your_domain: developer.your_domain,
      Tech_stack: developer.tech_stack,
      Linkdin_URL: developer.linkdin_url,
      Github_URL: developer.github_url,
      avatar: profile.avatar,
    });

      // setAvatarFile(null);
      setIsEditing(false);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save updates.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-xs font-semibold tracking-wide">
        Loading Profile Parameters...
      </div>
    );
  }

  const renderSkillsBadges = () => {
    if (!profile.Tech_stack) return [];
    return profile.Tech_stack.split(',').map(s => s.trim()).filter(Boolean);
  };

  return (
    <div className="flex flex-col min-h-screen py-10 px-4 max-w-5xl mx-auto w-full font-['Raleway',sans-serif]">
      
      {/* HEADER SECTION */}
      <div className="w-full mb-8 text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Your Profile</h1>
        <p className="text-gray-400 text-xs font-medium">Review and update your developer registration details.</p>
      </div>

      {/* WORKSPACE CARD */}
      <div className="w-full flex justify-center items-start flex-1">
        <div className="w-full max-w-lg bg-[#1c1a17]/40 backdrop-blur-xl border border-white/10 p-8 rounded-[20px] shadow-2xl">
          <div className="bg-white rounded-[12px] p-8 shadow-sm">
            
            {errorMessage && (
              <div className="mb-4 p-2.5 bg-red-50 text-red-600 text-xs font-bold border border-red-200 rounded">
                {errorMessage}
              </div>
            )}
            
            {!isEditing ? (
              /* --- VIEW MODE: STABLE STATE MATCHING --- */
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.full_Name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-[#0047AB] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {profile.full_Name ? profile.full_Name.split(' ').map(n => n[0]).join('').toUpperCase() : "DV"}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Full Name</p>
                    <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">{profile.full_Name || "Not Set"}</h2>
                    
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Your Domain</p>
                    <p className="text-sm font-semibold text-gray-600">{profile.your_domain || "Not Set"}</p>
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                <div className="mb-6 text-left">
<h4 className="text-xs font-black tracking-wider uppercase text-black mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {renderSkillsBadges().length > 0 ? (
                      renderSkillsBadges().map(skill => (
                        <span key={skill} className="bg-[#EBDBCF] text-[#8B5A33] px-3 py-1 rounded-[4px] text-xs font-semibold">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">No technologies listed</span>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                <div className="space-y-3 text-left mb-6">
                  <div>
<p className="text-xs font-black tracking-wider uppercase text-black mb-1">LinkedIn URL</p>                    {profile.Linkdin_URL ? (
                      <a href={profile.Linkdin_URL} target="_blank" rel="noreferrer" className="text-xs text-[#0047AB] font-semibold break-all hover:underline">
                        {profile.Linkdin_URL}
                      </a>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No LinkedIn profile linked</p>
                    )}
                  </div>
                  
                  <div>
<p className="text-xs font-black tracking-wider uppercase text-black mb-1">GitHub URL</p>                    {profile.Github_URL ? (
                      <a href={profile.Github_URL} target="_blank" rel="noreferrer" className="text-xs text-[#1a1a1a] font-semibold break-all hover:underline">
                        {profile.Github_URL}
                      </a>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No GitHub profile linked</p>
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-start">
                  <button onClick={() => setIsEditing(true)} className="bg-white border border-gray-300 px-6 py-1.5 rounded-[4px] text-xs font-bold text-[#1a1a1a] shadow-sm hover:bg-gray-50 cursor-pointer">
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              /* --- EDIT MODE: LABELS AND CODES RIGIDLY TIED TO BACKEND KEYS --- */
              <form onSubmit={handleUploadSubmit} className="flex flex-col items-center">
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />

                <div className="flex flex-col items-center mb-10 relative group">
                  <button type="button" onClick={triggerFileInput} className="focus:outline-none flex flex-col items-center cursor-pointer">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Preview" className="w-12 h-12 rounded-full object-cover mb-1" />
                    ) : (
                      <div className="w-12 h-12 bg-[#0047AB] rounded-full flex items-center justify-center text-white font-bold text-lg mb-1">
                        {profile.full_Name ? profile.full_Name.split(' ').map(n => n[0]).join('').toUpperCase() : "DV"}
                      </div>
                    )}
                    <span className="text-xs text-gray-600 font-medium">Change Avatar</span>
                  </button>
                </div>

                <div className="w-full space-y-4 mb-6 text-left">
                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Full Name</label>
                    <input type="text" name="full_Name" value={profile.full_Name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none" required />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Your Domain</label>
                    <input type="text" name="your_domain" value={profile.your_domain || ''} onChange={handleChange} placeholder="e.g ui/ux designing" className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none" required />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Tech Stack</label>
                    <input type="text" name="Tech_stack" value={profile.Tech_stack || ''} onChange={handleChange} placeholder="Tailwind, React, Typescript etc" className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none" required />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">LinkedIn URL</label>
                    <input type="url" name="Linkdin_URL" value={profile.Linkdin_URL || ''} onChange={handleChange} placeholder="linkedin.com/in/..." className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">GitHub URL</label>
                    <input type="url" name="Github_URL" value={profile.Github_URL || ''} onChange={handleChange} placeholder="github.com/..." className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none" />
                  </div>
                </div>

                <div className="w-full flex justify-start gap-2">
                  <button type="submit" className="bg-gradient-to-r from-[#e37e14] to-[#c72c1e] text-white font-bold text-xs py-2 px-6 rounded-[6px] shadow-md cursor-pointer">
                    Complete Update
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 border border-gray-300 text-gray-700 font-bold text-xs py-2 px-4 rounded-[6px] cursor-pointer">
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}