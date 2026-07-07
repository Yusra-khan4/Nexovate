export const clientDashboardData = {
  profile: { name: "Sarah Ahmed", type: "Client" },
  stats: { totalProjectsPosted: 4, lockedbalance: "450k pkr", completedMilestones: 8 },
  postedProjects: [
    { id: "p-901", title: "Fintech Mobile App", budget: "300k pkr", status: "In Selection" },
    { id: "p-902", title: "Corporate Portfolio Website", budget: "150k pkr", status: "Active" }
  ]
};

export const developerDashboardData = {
  profile: { name: "Bilal Ahmed", type: "Full Stack Developer" },
  stats: { totalProjects: 12, activeProjects: 3, earned: "120k pkr" },
  activeProjects: [
    { id: 1, title: "BlueSkyTravel", description: "Booking Engine Redesign", progress: 72, priority: "High Priority" },
    { id: 2, title: "Smart Task Manager", description: "Workflow Automation Tools", progress: 45, priority: "On Track" },
    { id: 3, title: "Ajrak Quest", description: "Cultural Heritage Puzzle Game", progress: 100, priority: "Completed" }
  ],
  recentBids: [
    { client: "Zara Ahmed", value: "80,400 Rs.", deadline: "June 12, 2026", status: "Under Review" },
    { client: "Mehak Khan", value: "19,500 Rs.", deadline: "May 28, 2026", status: "Accepted" }
  ]
};

export const adminDashboardData = {
  profile: { name: "System Admin", type: "Super Administrator" },
  stats: { totalUsers: 342, pendingVerifications: 14, platformFeesCollected: "890k pkr" },
  systemAlerts: [
    { 
      type: "Dispute", 
      user: "Client #21", 
      message: "Dispute: Milestone locked balance payout review request", 
      severity: "High" 
    },
    { 
      type: "Verification", 
      user: "Dev #99", 
      message: "New bank account documentation uploaded", 
      severity: "Normal" 
    }
  ]
};