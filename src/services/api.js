const BASE_URL = 'https://nexovate-soft.vercel.app';

const getHeaders = (includeAuth = true) => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(includeAuth && token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response, customErrorMessage) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || customErrorMessage || 'An error occurred.');
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response, 'Login failed');
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const registerUser = async (role, userData) => {
  const endpoint = role === 'client' ? '/api/client' : '/api/developers';

  const payload = {
    full_Name: userData.full_Name,
    email_address: userData.email_address,
    password: userData.password,
    your_domain: role === 'developer' ? userData.your_domain : "Client Domain",
    Tech_stack: role === 'developer' ? userData.Tech_stack : "Client Stack",
    Linkdin_URL: userData.Linkdin_URL || "",
    Github_URL: userData.Github_URL || ""
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify(payload),
  });

  return handleResponse(response, 'Registration failed');
};

export const fetchAllDevelopers = async () => {
  const response = await fetch(`${BASE_URL}/api/developers`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developers list.');
};

export const fetchDeveloperById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/developers/${id}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developer details.');
};

export const createDeveloper = async (developerData) => {
  const payload = {
    full_Name: developerData.full_Name,
    email_address: developerData.email_address,
    password: developerData.password,
    your_domain: developerData.your_domain,
    Tech_stack: developerData.Tech_stack,
    Linkdin_URL: developerData.Linkdin_URL || "",
    Github_URL: developerData.Github_URL || ""
  };

  const response = await fetch(`${BASE_URL}/api/developers`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify(payload),
  });

  return handleResponse(response, 'Failed to create developer profile.');
};

export const updateDeveloper = async (id, updatedFields) => {
  const response = await fetch(`${BASE_URL}/api/developers/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(updatedFields),
  });

  return handleResponse(response, 'Failed to update developer profile.');
};

export const fetchUserProfile = async (role, id) => {
  const endpoint = role === 'client' ? `/api/client/${id}` : `/api/developers/${id}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch profile data.');
};

const parseBudgetToNumeric = (budgetInput) => {
  if (typeof budgetInput === 'number') return budgetInput;
  if (!budgetInput) return 0;
  const numbers = budgetInput.replace(/,/g, '').match(/\d+/g);

  if (!numbers || numbers.length === 0) return 0;
  const parsed = parseInt(numbers[numbers.length - 1], 10);
  return isNaN(parsed) ? 0 : parsed;
};

export const startProject = async (projectData) => {
  const numericBudget = parseBudgetToNumeric(projectData.budget);

  const response = await fetch(`${BASE_URL}/api/ai/start-project`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      projectName: projectData.projectName,
      purpose: projectData.purpose,
      projectOverview: projectData.projectOverview,
      budget: numericBudget, 
    }),
  });

  return handleResponse(response, 'Failed to start project.');
};

export const generateScope = async (questionnaireId) => {
  const response = await fetch(`${BASE_URL}/api/ai/generate-scope`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      questionnaireId: Number(questionnaireId)
    }),
  });

  return handleResponse(response, 'Failed to generate scope document.');
};

export const regenerateScope = async (questionnaireId, feedback) => {
  const response = await fetch(`${BASE_URL}/api/ai/scope/regenerate`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      questionnaireId: Number(questionnaireId),
      feedback: feedback
    }),
  });

  return handleResponse(response, 'Failed to regenerate scope document.');
};

export const saveScope = async (questionnaireId, scopeData) => {
  const response = await fetch(`${BASE_URL}/api/ai/save-scope`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      questionnaireId: Number(questionnaireId),
      success: true,
      scope: scopeData,
    }),
  });

  return handleResponse(response, 'Failed to save scope document.');
};

export const sendScopeToDeveloper = async (scopeId, teamLeadId = 99) => {
  const response = await fetch(`${BASE_URL}/api/ai/scope/send-to-developer`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      scopeId: Number(scopeId),
      developerDetails: {
        teamLeadId: Number(teamLeadId),
      },
    }),
  });

  return handleResponse(response, 'Failed to send scope to developer.');
};

export const downloadScopePdf = async (scopeId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/ai/scope/${scopeId}/download`, {
    method: 'GET',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to download PDF.');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Project_Scope_${scopeId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};