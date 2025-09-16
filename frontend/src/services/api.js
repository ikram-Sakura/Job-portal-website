import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Mock data fallback for development
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
  }
];

// API functions with fallback to mock data
export const jobsAPI = {
  getJobs: async (filters = {}) => {
    try {
      const response = await api.get('/jobs', { params: filters });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message);
      // Filter mock data based on filters
      let filteredJobs = [...mockJobs];
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.type && filters.type !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
      }
      
      return {
        jobs: filteredJobs,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalJobs: filteredJobs.length,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  },
  
  getJob: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message);
      return mockJobs.find(job => job.id === parseInt(id)) || mockJobs[0];
    }
  }
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock auth:', error.message);
      // Mock successful login
      const mockUser = {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: credentials.email,
          firstName: 'Test',
          lastName: 'User',
          userType: 'student'
        }
      };
      localStorage.setItem('token', mockUser.token);
      return mockUser;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock registration:', error.message);
      // Mock successful registration
      const mockUser = {
        token: 'mock-jwt-token',
        user: {
          id: Date.now(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userType: userData.userType
        }
      };
      localStorage.setItem('token', mockUser.token);
      return mockUser;
    }
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock profile:', error.message);
      return {
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          userType: 'student'
        }
      };
    }
  }
};

export const applicationsAPI = {
  apply: async (applicationData) => {
    try {
      const response = await api.post('/applications', applicationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock application:', error.message);
      return {
        message: 'Application submitted successfully (mock)',
        applicationId: Date.now()
      };
    }
  }
};

export const analyticsAPI = {
  getDashboard: async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock analytics:', error.message);
      return {
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
    }
  }
};

export default api;