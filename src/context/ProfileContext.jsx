import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    id: '',
    full_name: '',
    full_Name: '',
    your_domain: '',
    tech_stack: '',
    Tech_stack: '',
    linkdin_url: '',
    github_url: '',
    email_address: '',
    phone_number: '',
    cnic: '',
    city: '',
    country: '',
    experience_years: '',
    project_links: [''],
    bank_name: '',
    bank_account_title: '',
    bank_account_iban: '',
    certificate_name: '',
    avatar: null
  });
  
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getProfileData = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const isDeveloper = Boolean(localStorage.getItem('developerId') || storedUser.your_domain || localStorage.getItem('role') === 'developer');
      const role = isDeveloper ? 'developer' : 'client';
      const id = isDeveloper 
        ? (localStorage.getItem('developerId') || storedUser.id || storedUser._id) 
        : (localStorage.getItem('clientId') || storedUser.id || storedUser._id);
      
      if (id) {
        const response = await fetchUserProfile(role, id);
        const data = response.data || response.developer || response.client || response.user || response;
        
        setProfile({
          id: data.id || id,
          full_name: data.full_name || data.full_Name || '',
          full_Name: data.full_name || data.full_Name || '',
          your_domain: data.your_domain || '',
          tech_stack: data.tech_stack || data.Tech_stack || '',
          Tech_stack: data.tech_stack || data.Tech_stack || '',
          linkdin_url: data.linkdin_url || data.linkdinUrl || '',
          github_url: data.github_url || data.githubUrl || '',
          email_address: data.email_address || data.email || '',
          phone_number: data.phone_number || '',
          cnic: data.cnic || '',
          city: data.city || '',
          country: data.country || '',
          experience_years: data.experience_years || '',
          project_links: data.project_links || [''],
          bank_name: data.bank_name || '',
          bank_account_title: data.bank_account_title || '',
          bank_account_iban: data.bank_account_iban || '',
          certificate_name: data.certificate_name || '',
          avatar: data.avatar || null,
        });
      }
      setErrorMessage('');
    } catch (err) {
      console.error("Failed to load profile data:", err);
      setErrorMessage("Failed to load profile parameters.");
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
      setLoading, 
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