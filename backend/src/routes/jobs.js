const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "internship",
    salary: "$25-$35/hr",
    description: "Join our engineering team to develop cutting-edge software solutions.",
    requirements: ["JavaScript", "React", "Node.js"],
    postedDate: "2023-10-01",
    deadline: "2023-12-15",
    applications: 42
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebSolutions Inc",
    location: "Remote",
    type: "full-time",
    salary: "$80,000-$100,000",
    description: "Build responsive and accessible web applications.",
    requirements: ["HTML", "CSS", "JavaScript", "React"],
    postedDate: "2023-10-05",
    deadline: "2023-11-30",
    applications: 38
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataAnalytics Ltd",
    location: "New York, NY",
    type: "internship",
    salary: "$22-$30/hr",
    description: "Work with our data team to analyze and visualize complex datasets.",
    requirements: ["Python", "SQL", "Machine Learning"],
    postedDate: "2023-10-10",
    deadline: "2023-12-20",
    applications: 25
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "DevSolutions",
    location: "Austin, TX",
    type: "full-time",
    salary: "$90,000-$120,000",
    description: "Develop and maintain server-side applications.",
    requirements: ["Node.js", "Express", "MongoDB"],
    postedDate: "2023-10-12",
    deadline: "2023-12-30",
    applications: 30
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Remote",
    type: "full-time",
    salary: "$100,000-$130,000",
    description: "Lead cross-functional teams to deliver innovative products.",
    requirements: ["Agile", "Scrum", "Product Management"],
    postedDate: "2023-10-15",
    deadline: "2023-12-15",
    applications: 20
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "DataInsights",
    location: "Chicago, IL",
    type: "full-time",
    salary: "$80,000-$100,000",
    description: "Analyze and interpret complex data sets to drive business solutions.",
    requirements: ["SQL", "Tableau", "Data Visualization"],
    postedDate: "2023-10-18",
    deadline: "2023-12-18",
    applications: 15
  },
  {
    id: 7,
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Remote",
    type: "full-time",
    salary: "$110,000-$140,000",
    description: "Develop and implement machine learning models.",
    requirements: ["Python", "TensorFlow", "Data Science"],
    postedDate: "2023-10-20",
    deadline: "2023-12-20",
    applications: 10
  },
  {
    id: 8,
    title: "Cloud Engineer",
    company: "CloudSolutions",
    location: "Remote",
    type: "full-time",
    salary: "$95,000-$125,000",
    description: "Design and manage cloud infrastructure.",
    requirements: ["AWS", "Azure", "DevOps"],
    postedDate: "2023-10-22",
    deadline: "2023-12-22",
    applications: 5
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "full-time",
    salary: "$100,000-$130,000",
    description: "Implement and manage CI/CD pipelines.",
    requirements: ["Docker", "Kubernetes", "AWS"],
    postedDate: "2023-10-12",
    deadline: "2023-12-30",
    applications: 30
  },
    {
    id: 10,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "full-time",
    salary: "$90,000-$110,000",
    description: "Create user-centered designs for web and mobile applications.",
    requirements: ["Figma", "Adobe XD", "User Research"],
    postedDate: "2023-10-25",
    deadline: "2023-12-25",
    applications: 2
  }
];

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;
    let filteredJobs = mockJobs;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    if (type && type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    res.json({
      jobs: filteredJobs,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalJobs: filteredJobs.length,
        hasNext: false,
        hasPrev: false
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = mockJobs.find(j => j.id === parseInt(id));
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new job
router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('type', 'Type must be internship, full-time, or part-time').isIn(['internship', 'full-time', 'part-time'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      requirements,
      location,
      type,
      salary,
      application_deadline
    } = req.body;

    // Simulate job creation
    const newJob = {
      id: Date.now(),
      title,
      description,
      requirements: requirements || [],
      location,
      type,
      salary,
      application_deadline,
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0,
      company: "Your Company"
    };

    res.status(201).json({ 
      message: 'Job posted successfully',
      job: newJob
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;