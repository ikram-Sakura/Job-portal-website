import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings, 
  Globe,
  Menu,
  X,
  User,
  Bookmark,
  Archive
} from 'lucide-react';
import NotificationBell from './NotificationBell';

const Layout = ({ 
  children, 
  currentView, 
  onViewChange, 
  userType, 
  language, 
  onLanguageChange,
  currentUser
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const translations = {
    en: {
      jobs: 'Jobs',
      applications: 'Applications',
      analytics: 'Analytics',
      settings: 'Settings',
      dashboard: 'Dashboard',
      postJob: 'Post Job',
      manageUsers: 'Manage Users',
      student: 'Student',
      company: 'Company',
      admin: 'Admin',
      profile: 'Profile',
      savedJobs: 'Saved Jobs',
      archive: 'Archive'
    },
    fr: {
      jobs: 'Emplois',
      applications: 'Candidatures',
      analytics: 'Analyses',
      settings: 'Paramètres',
      dashboard: 'Tableau de bord',
      postJob: 'Publier un emploi',
      manageUsers: 'Gérer les utilisateurs',
      student: 'Étudiant',
      company: 'Entreprise',
      admin: 'Administrateur',
      profile: 'Profil',
      savedJobs: 'Emplois sauvegardés',
      archive: 'Archives'
    }
  };

  const t = translations[language];

  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          { id: 'jobs', label: t.jobs, icon: Briefcase },
          { id: 'applications', label: t.applications, icon: Archive },
          { id: 'savedJobs', label: t.savedJobs, icon: Bookmark },
          { id: 'profile', label: t.profile, icon: User }
        ];
      case 'company':
        return [
          { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
          { id: 'postJob', label: t.postJob, icon: Briefcase },
          { id: 'applications', label: t.applications, icon: Users }
        ];
      case 'admin':
        return [
          { id: 'analytics', label: t.analytics, icon: BarChart3 },
          { id: 'manageUsers', label: t.manageUsers, icon: Settings },
          { id: 'jobs', label: t.jobs, icon: Briefcase }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold text-primary">JobPortal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell language={language} />
            <Badge variant="secondary">{t[userType]}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out mt-16
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:mt-0
        `}>
          <nav className="h-full px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onViewChange(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:ml-0">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;