import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  // 🟢 Initialized with default frontend mock values matching your form layout fields
  const [profile, setProfile] = useState({
    full_Name: "Bilal Ahmed",
    your_domain: "Full stack development",
    Tech_stack: "React, Node.js, MongoDB",
    Linkdin_URL: "https://linkedin.com",
    Github_URL: "https://github.com",
    avatar: null
  });
  
  // Set loading to false by default since local state loads instantly
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 🟢 Simulates fetching data without hitting any network endpoints
  const getProfileData = async () => {
    try {
      setLoading(true);
      // Simulate a tiny, imperceptible delay for realistic interface transitions
      await new Promise(resolve => setTimeout(resolve, 100));
      setErrorMessage('');
    } catch (err) {
      setErrorMessage("Failed to load local simulation profile parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      setProfile, 
      loading, 
      errorMessage, 
      setErrorMessage, 
      refreshProfile: getProfileData 
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}