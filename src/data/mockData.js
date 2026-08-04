export const clientDashboardData = {
  profile: { name: "Sarah Ahmed", type: "Client" },
  stats: { totalProjectsPosted: 12, activeProjects: 3, totalSpent: "Rs.120k" },
  postedProjects: [
    { id: "p-901", title: "Blule Sky Trave", description: "Booking Engine Redesign", status: "High Priority" },
    { id: "p-902", title: "Bon Apetite", description: "Restuarant Website", status: "On Track" }
  ]
};

export const developerDashboardData = {
  profile: { name: "Bilal Ahmed", type: "Full Stack Developer" },
  stats: { totalProjects: 12, activeProjects: 3, earned: "120k pkr" },
  activeProjects: [
    { id: 1, title: "Bon Apetite", description: "Booking Engine Redesign", progress: 80, priority: "In Progress" },
    { id: 2, title: "Blue Sky Travel", description: "Workflow Automation Tools", progress: 10, priority: "In Progress" },
    { id: 3, title: "AK Apparel Store", description: "Cultural Heritage Puzzle Game", progress: 100, priority: "Completed" }
  ],
  recentBids: [
    { client: "Zara Ahmed", value: "80,400 Rs.", deadline: "June 12, 2026", status: "Under Review" },
    { client: "Mehak Khan", value: "19,500 Rs.", deadline: "May 28, 2026", status: "Accepted" }
  ]
};

export const adminDashboardData = {
  profile: { 
    name: "Hassan Ahmed", 
    role: "Admin",
    type: "Master Console"
  },
  stats: {
    activeProjects: "03",
    pendingApproval: "03",
    paymentsHeld: "220k",
    totalDevelopers: "23",
    totalCustomers: "20",
    totalProjects: "12"
  },
  projectsAwaitingApproval: [
    { 
      id: 1, 
      title: "Bon appetit", 
      submittedBy: "Zara Ahmed", 
      budget: "PKR 90,000" 
    },
    { 
      id: 2, 
      title: "Ecommerce Store", 
      submittedBy: "Sara Ahmed", 
      budget: "PKR 90,000" 
    },
    { 
      id: 3, 
      title: "TN-HRMS", 
      submittedBy: "Zara Ahmed", 
      budget: "PKR 90,000" 
    }
  ],
  
};