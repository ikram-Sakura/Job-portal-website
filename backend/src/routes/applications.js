const express = require('express');
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'), false);
    }
  }
});

// Apply for a job
router.post('/', upload.single('cv'), [
  check('jobId', 'Job ID is required').not().isEmpty(),
  check('fullName', 'Full name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('university', 'University is required').not().isEmpty(),
  check('major', 'Major is required').not().isEmpty(),
  check('year', 'Year of study is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    const {
      jobId,
      fullName,
      email,
      university,
      major,
      year,
      coverLetter
    } = req.body;

    // Simulate saving the application
    console.log('Application received:', {
      jobId,
      fullName,
      email,
      university,
      major,
      year,
      coverLetter: coverLetter || 'No cover letter provided',
      cvFile: req.file.filename
    });

    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: Date.now()
    });

  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: 'Server error during application submission' });
  }
});

// Get applications
router.get('/', async (req, res) => {
  try {
    const { jobId, status } = req.query;
    
    // Mock applications data
    const mockApplications = [
      {
        id: 1,
        job_title: 'Software Engineering Intern',
        fullName: 'John Doe',
        email: 'john@example.com',
        university: 'Tech University',
        major: 'Computer Science',
        status: 'pending',
        applied_at: '2023-10-15',
        cover_letter: 'I am excited to apply for this position...'
      },
      {
        id: 2,
        job_title: 'Frontend Developer',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        university: 'State University',
        major: 'Web Development',
        status: 'reviewed',
        applied_at: '2023-10-10',
        cover_letter: 'I have extensive experience with React...'
      }
    ];

    // Simple filtering
    let filteredApplications = mockApplications;
    
    if (jobId) {
      filteredApplications = filteredApplications.filter(app => 
        app.job_title.toLowerCase().includes(jobId.toLowerCase())
      );
    }
    
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    res.json({ applications: filteredApplications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
});

module.exports = router;