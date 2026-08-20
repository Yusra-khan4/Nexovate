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

export const fetchAllChats = async () => {
  const response = await fetch(`${BASE_URL}/admin/chats`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch chats.');
};

export const fetchChatByProjectId = async (projectId) => {
  const response = await fetch(`${BASE_URL}/admin/chats/${projectId}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch conversation history.');
};

export const updateMinWithdrawal = async (amount) => {
  const response = await fetch(`${BASE_URL}/admin/settings/min-withdrawal`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({
      min_withdrawal_amount: Number(amount)
    }),
  });

  return handleResponse(response, 'Failed to update minimum withdrawal amount.');
};

export const updateCommission = async (percentage) => {
  const response = await fetch(`${BASE_URL}/admin/settings/commission`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({
      commission_percentage: Number(percentage)
    }),
  });

  return handleResponse(response, 'Failed to update commission percentage.');
};

export const fetchPlatformSettings = async () => {
  const response = await fetch(`${BASE_URL}/admin/settings`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch platform settings.');
};

export const releaseEscrowFunds = async (paymentId) => {
  const response = await fetch(`${BASE_URL}/payment/${paymentId}/release`, {
    method: 'PATCH',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to release escrow funds.');
};

export const fetchAdminPaymentHistory = async () => {
  const response = await fetch(`${BASE_URL}/payment/admin/history`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch payment history.');
};

export const deleteDeveloperAdmin = async (developerId) => {
  const response = await fetch(`${BASE_URL}/admin/developers/${developerId}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to delete developer account.');
};

export const deleteClientAdmin = async (clientId) => {
  const response = await fetch(`${BASE_URL}/admin/clients/${clientId}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to delete client account.');
};

export const fetchProjectMonitoring = async () => {
  const response = await fetch(`${BASE_URL}/admin/project-monitoring`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch project monitoring data.');
};

export const updateClientStatusAdmin = async (clientId, status) => {
  const response = await fetch(`${BASE_URL}/admin/clients/${clientId}/status`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({
      account_status: status.toLowerCase(),
    }),
  });

  return handleResponse(response, `Failed to update client status to ${status}.`);
};
export const fetchAllClientsAdmin = async () => {
  const response = await fetch(`${BASE_URL}/admin/clients`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch clients list.');
};

export const fetchAdminDashboard = async () => {
  const response = await fetch(`${BASE_URL}/admin/dashboard`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch admin dashboard data.');
};

export const fetchAdminProjectDetails = async (projectId) => {
  const response = await fetch(`${BASE_URL}/admin/projects/${projectId}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch project details.');
};

export const fetchDeveloperStatsAdmin = async () => {
  const response = await fetch(`${BASE_URL}/admin/stats`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developer statistics.');
};

export const fetchDevelopersByApprovalAdmin = async (status = '') => {
  const url = status 
    ? `${BASE_URL}/admin/approval?status=${status}` 
    : `${BASE_URL}/admin/approval`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developers list.');
};

export const updateDeveloperApprovalAdmin = async (developerId, approvalStatus) => {
  const response = await fetch(`${BASE_URL}/admin/approval/${developerId}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({
      approval_status: approvalStatus.toLowerCase(),
    }),
  });

  return handleResponse(response, `Failed to update developer approval status.`);
};

export const updateDeveloperAccountStatusAdmin = async (developerId, accountStatus) => {
  const response = await fetch(`${BASE_URL}/admin/${developerId}/account-status`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({
      account_status: accountStatus.toLowerCase(),
    }),
  });

  return handleResponse(response, `Failed to update developer account status.`);
};

export const fetchDeveloperDetailsAdmin = async (developerId) => {
  const response = await fetch(`${BASE_URL}/admin/developers/${developerId}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developer details.');
};

export const fetchAdminPayments = async () => {
  const response = await fetch(`${BASE_URL}/admin/payments`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch admin payments list.');
};

export const fetchClientDetailsAdmin = async (clientId) => {
  const response = await fetch(`${BASE_URL}/admin/clients/${clientId}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch client profile details.');
};

export const applyToProject = async (projectId, applicationData) => {
  const response = await fetch(`${BASE_URL}/api/projects/${projectId}/apply`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({
      cover_letter: applicationData.cover_letter,
      bid_amount: Number(applicationData.bid_amount),
    }),
  });

  return handleResponse(response, 'Failed to submit project application.');
};

export const fetchDeveloperDashboard = async () => {
  const response = await fetch(`${BASE_URL}/api/developers/dashboard`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developer dashboard data.');
};

export const fetchDeveloperMyProjects = async () => {
  const response = await fetch(`${BASE_URL}/api/developers/projects`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch developer projects.');
};

export const fetchOpenProjects = async () => {
  const response = await fetch(`${BASE_URL}/api/projects/`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch open projects.');
};

export const updateDeveloperProjectProgress = async (projectId, progressData) => {
  const response = await fetch(`${BASE_URL}/api/developers/${projectId}/progress`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({
      progress_percentage: Number(progressData.progress_percentage),
      status: progressData.status || 'in_progress',
      milestone_note: progressData.milestone_note || '',
    }),
  });

  return handleResponse(response, 'Failed to update project progress.');
};

export const downloadProjectReport = async (projectId) => {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');

  const response = await fetch(`${BASE_URL}/api/projects/${projectId}/download`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    let errorMsg = 'Failed to download scope document.';
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || errorMsg;
    } catch {
      const errText = await response.text();
      if (errText) errorMsg = errText;
    }
    throw new Error(errorMsg);
  }

  return await response.blob();
};

export const updateClientProfile = async (clientId, profileData) => {
  const response = await fetch(`${BASE_URL}/api/client/${clientId}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify({
      full_name: profileData.fullName,
      email_address: profileData.emailAddress,
      phone: profileData.phoneNumber,
      account_title: profileData.bankAccountTitle,
      bank_name: profileData.bankName,
      account_number: profileData.bankAccountNumber,
      ...(profileData.password ? { password: profileData.password } : {}),
    }),
  });

  return handleResponse(response, 'Failed to update client profile.');
};

export const fetchClientProjectsList = async () => {
  const response = await fetch(`${BASE_URL}/api/projects/projectsDetail`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch client projects list.');
};

export const fetchProjectMilestoneReport = async (projectId) => {
  const response = await fetch(`${BASE_URL}/api/projects/${projectId}/milestone-report`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch project milestone report.');
};

export const verifyDeveloperAdmin = async (developerId, isVerified = true) => {
  const response = await fetch(`${BASE_URL}/admin/developers/${developerId}/verify`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({
      is_verified: isVerified,
    }),
  });

  return handleResponse(response, 'Failed to update developer verification status.');
};
//confirmation
export const updateDeveloperEnabledStatusAdmin = async (developerId, isEnabled = true) => {
  const response = await fetch(`${BASE_URL}/admin/developers/${developerId}/status`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({
      is_enabled: Boolean(isEnabled),
    }),
  });

  return handleResponse(response, `Failed to update developer enabled status.`);
};

export const depositEscrowPayment = async ({ projectId, amount, transactionRef }) => {
  const response = await fetch(`${BASE_URL}/payment/deposit`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      projectId: Number(projectId),
      amount: Number(amount),
      transactionRef: transactionRef || `TXN-${Date.now()}`,
    }),
  });

  return handleResponse(response, 'Failed to deposit escrow funds.');
};
//confirmation
export const fetchPaymentHistory = async () => {
  const response = await fetch(`${BASE_URL}/payment/history`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse(response, 'Failed to fetch payment history.');
};

