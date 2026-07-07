// src/services/api.js

const AUTH_URL = 'https://nexovate-soft.vercel.app'; 

export const loginUser = async (email, password) => {
  const response = await fetch(`${AUTH_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  
  return await response.json(); 
};

export const registerUser = async (role, userData) => {
  const response = await fetch(`${AUTH_URL}/api/developers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, ...userData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json();
};

// 1. Fetch developer by ID (GET /api/developers/id)
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  const developerId = localStorage.getItem('developerId');

  if (!developerId) {
    throw new Error("No developer ID found. Please log in again.");
  }

  const response = await fetch(`${AUTH_URL}/api/developers/${developerId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  const responseText = await response.text();
  
  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || "Failed to load developer profile data");
    } catch{ throw new Error('Server Error (${response.status}): The backend returned an invalid page instead of data.');
    }
  }

const result = JSON.parse(responseText);

return result.data;
};

export const updateUserProfile = async (profileFormData) => {
  const token = localStorage.getItem('token');
  const developerId = localStorage.getItem('developerId');

  if (!developerId) {
    throw new Error("No developer ID found. Please log in again.");
  }

  const response = await fetch(`${AUTH_URL}/api/developers/${developerId}`, {
    method: 'PUT', 
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
     body: JSON.stringify(profileFormData),
  });

  const responseText = await response.text();

  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || "Failed to update profile parameters");
    } catch {
      throw new Error(`Server Error (${response.status}): The backend crashed processing form-data data.`);
    }
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { success: true, message: "Profile updated successfully, but response formatting varied." };
  }
};
export const fetchDashboardData = async (role) => {
  const token = localStorage.getItem('token'); 

  const response = await fetch(`${AUTH_URL}/${role}/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    throw new Error(`Failed to fetch ${role} data`);
  }

  return await response.json();
};

export const submitProjectWizard = async (wizardData) => {
  const token = localStorage.getItem("token");
  console.log("Calling:", `${AUTH_URL}/api/ai/wizard`);

  const response = await fetch(`${AUTH_URL}/api/ai/wizard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(wizardData),
  });

  const text = await response.text();

  console.log("Status:", response.status);
  console.log("Response:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};
// ===========================
// Scope Generation APIs
// ===========================

export const saveQuestionnaire = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${AUTH_URL}/api/ai/questionnaire`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const generateScope = async (questionnaireId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${AUTH_URL}/api/ai/generate-scope`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      questionnaireId,
    }),
  });

  const responseText = await response.text();

  console.log("==================================");
  console.log("Generate Scope Status:", response.status);
  console.log("Generate Scope Response:", responseText);
  console.log("==================================");

  if (!response.ok) {
    throw new Error(responseText);
  }

  return JSON.parse(responseText);
};

export const downloadScopePdf = async (scopeId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `${AUTH_URL}/api/ai/scope/${scopeId}/download`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    if (!response.ok) {

        throw new Error(await response.text());

    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `Scope_${scopeId}.pdf`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

};