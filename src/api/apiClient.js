import { clientDashboardData, developerDashboardData, adminDashboardData } from '../data/mockData';
const simulateNetworkLag = () => new Promise(resolve => setTimeout(resolve, 350));

export const apiService = {
  getClientDashboard: async () => {
    await simulateNetworkLag();
    return clientDashboardData;
  },
  getDeveloperDashboard: async () => {
    await simulateNetworkLag();
    return developerDashboardData;
  },
  getAdminDashboard: async () => {
    await simulateNetworkLag();
    return adminDashboardData;
  }
};