import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import ForgotPassword from "./views/ForgotPassword";
import DashboardLayout from './layouts/DashboardLayout';
import MessagesDashboard from './modules/shared/MessagesDashboard';
import DeveloperDashboard from './modules/developer/DeveloperDashboard';
import ClientDashboard from './modules/client/ClientDashboard';
import AdminDashboard from './modules/admin/AdminDashboard';
import ProjectCreationForm from './modules/client/ProjectCreationForm';
import ClientProjects from './modules/client/ClientProjects';
import ProfilePage from './modules/developer/ProfilePage';
import DeveloperProjects from './modules/developer/DeveloperProjects';
import ClientDevelopers from './modules/client/ClientDevelopers';
import ClientSavedProjects from './modules/client/ClientSavedProjects';
import ClientProfile from './modules/client/ClientProfile';
import DeveloperMyProject from './modules/developer/DeveloperMyProject';
import DeveloperApproval from './modules/admin/DeveloperApproval';
import ProjectApproval from './modules/admin/ProjectApproval';
import ChatMonitor from './modules/admin/ChatMonitor';
import PaymentHistory from './modules/admin/PaymentHistory';
import ClientManagement from './modules/admin/ClientManagement';
import ProjectsMonitoring from './modules/admin/ProjectsMonitoring';
import PaymentManagement from './modules/admin/PaymentManagement';
import PlatformSetting from './modules/admin/PlatformSetting';


const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');

  let user = null;
  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    console.error("Error parsing user session:", e);
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();
  if (allowedRole && userRole !== allowedRole.toLowerCase()) {
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'developer') return <Navigate to="/developer/dashboard" replace />;
    if (userRole === 'client') return <Navigate to="/client/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Signup />} />

        <Route element={<ProtectedRoute allowedRole="client" />}>
          <Route path="/client" element={<DashboardLayout userRole="client" userName="Customer" />}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjects />} />
            <Route path="post-project" element={<ProjectCreationForm />} />
            <Route path="messages" element={<MessagesDashboard />} />
            <Route path="developers" element={<ClientDevelopers />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="saved-projects" element={<ClientSavedProjects />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="developer" />}>
          <Route path="/developer" element={<DashboardLayout userRole="developer" userName="Developer" />}>
            <Route path="dashboard" element={<DeveloperDashboard />} />
            <Route path="projects" element={<DeveloperProjects />} />
            <Route path="my projects" element={<DeveloperMyProject />} />
            <Route path="Messages" element={<MessagesDashboard />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<DashboardLayout userRole="admin" userName="Admin" />}>

            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="developer-approval" element={<DeveloperApproval />} />

            <Route path="client-management" element={<ClientManagement />} />

            <Route path="project-approval" element={<ProjectApproval />} />

            <Route path="chat-monitor" element={<ChatMonitor />} />

            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="projects-monitoring" element={<ProjectsMonitoring />} />
            <Route path="payment-management" element={<PaymentManagement />} />
            <Route path="platform-setting" element={<PlatformSetting />} />
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;