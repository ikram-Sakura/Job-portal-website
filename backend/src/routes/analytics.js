const express = require('express');

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const mockData = {
      totalUsers: 1234,
      totalCompanies: 156,
      totalJobs: 89,
      totalApplications: 2845,
      applicationTrends: [
        { month: 'Jan', applications: 24 },
        { month: 'Feb', applications: 38 },
        { month: 'Mar', applications: 45 },
        { month: 'Apr', applications: 52 },
        { month: 'May', applications: 61 },
        { month: 'Jun', applications: 58 }
      ],
      jobTypeData: [
        { name: 'Internship', value: 60 },
        { name: 'Full-time', value: 30 },
        { name: 'Part-time', value: 10 }
      ],
      topCompanies: [
        { name: 'TechCorp', applications: 42, jobs: 5 },
        { name: 'DataAnalytics Ltd', applications: 38, jobs: 3 },
        { name: 'StartupXYZ', applications: 25, jobs: 2 },
        { name: 'Innovation Inc', applications: 18, jobs: 4 }
      ]
    };

    res.json(mockData);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
});

// Get application trends
router.get('/application-trends', async (req, res) => {
  try {
    const trends = [
      { month: 'Jan', applications: 24 },
      { month: 'Feb', applications: 38 },
      { month: 'Mar', applications: 45 },
      { month: 'Apr', applications: 52 },
      { month: 'May', applications: 61 },
      { month: 'Jun', applications: 58 }
    ];

    res.json(trends);
  } catch (error) {
    console.error('Application trends error:', error);
    res.status(500).json({ message: 'Server error fetching application trends' });
  }
});

// Get job statistics
router.get('/job-stats', async (req, res) => {
  try {
    const stats = {
      totalJobs: 89,
      internshipJobs: 53,
      fullTimeJobs: 24,
      partTimeJobs: 12,
      averageApplications: 32
    };

    res.json(stats);
  } catch (error) {
    console.error('Job stats error:', error);
    res.status(500).json({ message: 'Server error fetching job statistics' });
  }
});

module.exports = router;