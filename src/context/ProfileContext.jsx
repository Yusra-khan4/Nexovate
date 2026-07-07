import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    full_Name: "",
    your_domain: "",
    Tech_stack: "",
    Linkdin_URL: "",
    Github_URL: "",
    avatar: null
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getProfileData = async () => {
    const token = localStorage.getItem('token');
    const developerId = localStorage.getItem('developerId');
    
    if (!token || !developerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchUserProfile();
      
      
setProfile({
  full_Name: data.full_name || "",
  your_domain: data.your_domain || "",
  Tech_stack: data.tech_stack || "",
  Linkdin_URL: data.linkdin_url || "",
  Github_URL: data.github_url || "",
  avatar: data.avatar || null
});
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.message || "Failed to load developer parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading, errorMessage, setErrorMessage, refreshProfile: getProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}