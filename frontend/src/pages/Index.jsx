import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import JobsList from '@/components/JobsList';
import ApplyDialog from '@/components/ApplyDialog';
import Analytics from '@/components/Analytics';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Building, Users, FileText, Briefcase } from 'lucide-react';
import { authAPI } from '@/services/api';
import UserProfile from '@/components/UserProfile';
import ApplicationsArchive from '@/components/ApplicationsArchive';
import SavedJobs from '@/components/SavedJobs';


const Index = () => {
  const [currentView, setCurrentView] = useState('jobs');
  const [userType, setUserType] = useState('student');
  const [language, setLanguage] = useState('en');
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getProfile()
        .then(response => {
          setIsLoggedIn(true);
          setCurrentUser(response.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const translations = {
    en: {
      switchTo: 'Switch to',
      student: 'Student',
      company: 'Company',
      admin: 'Admin',
      postNewJob: 'Post New Job',
      jobTitle: 'Job Title',
      jobDescription: 'Job Description',
      requirements: 'Requirements',
      salary: 'Salary (optional)',
      location: 'Location',
      jobType: 'Job Type',
      internship: 'Internship',
      fullTime: 'Full-time',
      partTime: 'Part-time',
      deadline: 'Application Deadline',
      postJob: 'Post Job',
      companyDashboard: 'Company Dashboard',
      yourJobs: 'Your Posted Jobs',
      applications: 'Applications',
      manageUsers: 'Manage Users',
      userManagement: 'User Management',
      students: 'Students',
      companies: 'Companies',
      jobPosted: 'Job Posted Successfully!',
      jobPostedDesc: 'Your job posting is now live and visible to students.',
      welcome: 'Welcome to JobPortal',
      pleaseLogin: 'Please log in to continue',
      logout: 'Logout'
    },
    fr: {
      switchTo: 'Passer à',
      student: 'Étudiant',
      company: 'Entreprise',
      admin: 'Administrateur',
      postNewJob: 'Publier un nouvel emploi',
      jobTitle: 'Titre du poste',
      jobDescription: 'Description du poste',
      requirements: 'Exigences',
      salary: 'Salaire (optionnel)',
      location: 'Lieu',
      jobType: 'Type d\'emploi',
      internship: 'Stage',
      fullTime: 'Temps plein',
      partTime: 'Temps partiel',
      deadline: 'Date limite de candidature',
      postJob: 'Publier l\'emploi',
      companyDashboard: 'Tableau de bord entreprise',
      yourJobs: 'Vos offres publiées',
      applications: 'Candidatures',
      manageUsers: 'Gérer les utilisateurs',
      userManagement: 'Gestion des utilisateurs',
      students: 'Étudiants',
      companies: 'Entreprises',
      jobPosted: 'Emploi publié avec succès !',
      jobPostedDesc: 'Votre offre d\'emploi est maintenant en ligne et visible par les étudiants.',
      welcome: 'Bienvenue sur JobPortal',
      pleaseLogin: 'Veuillez vous connecter pour continuer',
      logout: 'Déconnexion'
    }
  };

  const t = translations[language];

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setUserType(user.userType);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserType('student');
    setCurrentView('jobs');
    
    toast({
      title: language === 'en' ? 'Logged out' : 'Déconnecté',
      description: language === 'en' ? 'You have been logged out successfully' : 'Vous avez été déconnecté avec succès',
    });
  };

  const handleJobApply = (jobId) => {
    if (!isLoggedIn) {
      toast({
        title: language === 'en' ? 'Login Required' : 'Connexion requise',
        description: language === 'en' ? 'Please log in to apply for jobs' : 'Veuillez vous connecter pour postuler aux emplois',
        variant: 'destructive',
      });
      return;
    }
    
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
  };

  const handleJobPost = (e) => {
    e.preventDefault();
    toast({
      title: t.jobPosted,
      description: t.jobPostedDesc,
    });
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <LoginForm onLogin={handleLogin} language={language} />
        </div>
      );
    }

    switch (currentView) {
      case 'jobs':
        return (
          <JobsList 
            onApply={handleJobApply}
            language={language}
          />
        );
      
      case 'applications':
        if (userType === 'student') {
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t.applications}</h2>
              <div className="text-muted-foreground">
                {language === 'en' ? 'Your job applications will appear here.' : 'Vos candidatures apparaîtront ici.'}
              </div>
            </div>
          );
        } else {
          return (
            <JobsList 
              showApplications={true}
              language={language}
            />
          );
        }

      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.companyDashboard}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {t.yourJobs}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t.applications}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'postJob':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {t.postNewJob}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJobPost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t.jobTitle}</Label>
                  <Input id="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">{t.jobDescription}</Label>
                  <Textarea id="description" rows={4} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">{t.requirements}</Label>
                  <Textarea id="requirements" rows={3} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">{t.salary}</Label>
                    <Input id="salary" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.location}</Label>
                    <Input id="location" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.jobType}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t.jobType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">{t.internship}</SelectItem>
                        <SelectItem value="full-time">{t.fullTime}</SelectItem>
                        <SelectItem value="part-time">{t.partTime}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">{t.deadline}</Label>
                    <Input id="deadline" type="date" required />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {t.postJob}
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      case 'analytics':
        return <Analytics language={language} />;

    
        case 'profile':
  return <UserProfile user={currentUser} language={language} />;

case 'savedJobs':
  return <SavedJobs language={language} />;

case 'archive':
  return <ApplicationsArchive language={language} />;

      case 'manageUsers':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.userManagement}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t.students}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-muted-foreground">Registered students</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t.companies}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-muted-foreground">Registered companies</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-20 right-4 z-50">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">{t.switchTo}:</p>
            <div className="flex flex-col gap-1">
              {(['student', 'company', 'admin']).map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={userType === type ? 'default' : 'outline'}
                  onClick={() => {
                    setUserType(type);
                    setCurrentView(type === 'student' ? 'jobs' : type === 'company' ? 'dashboard' : 'analytics');
                  }}
                  className="justify-start"
                >
                  {t[type]}
                </Button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="justify-start mt-2"
            >
              {t.logout}
            </Button>
          </div>
        </Card>
      </div>

      <Layout 
        currentView={currentView}
        onViewChange={setCurrentView}
        userType={userType}
        language={language}
        onLanguageChange={setLanguage}
      >
        {renderContent()}
      </Layout>

      <ApplyDialog
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        jobId={selectedJobId}
        language={language}
      />
    </div>
  );
};

export default Index;