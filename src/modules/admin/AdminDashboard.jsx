import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { apiService } from '../../api/apiClient';
import DashboardLayout from '../../layouts/DashboardLayout'; // Ensure matching name string

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getAdminDashboard().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 font-medium">Loading Security Ledger...</div>;

  return (
    <DashboardLayout panelTitle="Master Admin Console" userRole="admin">
      <div className="p-6">
        <h2 className="text-xl font-bold">System Console: {data.profile.type}</h2>
        <p>Pending Moderations: {data.stats.pendingVerifications} accounts</p>
        
        <div className="mt-4">
          <h3 className="font-semibold">Security Action Items:</h3>
          {data.systemAlerts.map((alert, index) => (
            <div key={index} className="border-b py-2 text-red-700">
              [{alert.type}] {alert.user}: {alert.message} ({alert.severity})
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}