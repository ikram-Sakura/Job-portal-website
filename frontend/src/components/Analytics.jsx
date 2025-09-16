import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Building, 
  Briefcase, 
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';

const Analytics = ({ language = 'en' }) => {
  const translations = {
    en: {
      title: 'Analytics Dashboard',
      overview: 'Overview',
      totalUsers: 'Total Users',
      totalCompanies: 'Total Companies',
      totalJobs: 'Total Jobs',
      totalApplications: 'Total Applications',
      applicationTrends: 'Application Trends',
      jobsByType: 'Jobs by Type',
      topCompanies: 'Top Companies by Applications',
      recentActivity: 'Recent Activity',
      students: 'Students',
      companies: 'Companies',
      applications: 'Applications',
      thisMonth: 'This Month',
      internship: 'Internship',
      fullTime: 'Full-time',
      partTime: 'Part-time',
      viewRate: 'View Rate',
      applicationRate: 'Application Rate'
    },
    fr: {
      title: 'Tableau de bord analytique',
      overview: 'Vue d\'ensemble',
      totalUsers: 'Total utilisateurs',
      totalCompanies: 'Total entreprises',
      totalJobs: 'Total emplois',
      totalApplications: 'Total candidatures',
      applicationTrends: 'Tendances des candidatures',
      jobsByType: 'Emplois par type',
      topCompanies: 'Top entreprises par candidatures',
      recentActivity: 'Activité récente',
      students: 'Étudiants',
      companies: 'Entreprises',
      applications: 'Candidatures',
      thisMonth: 'Ce mois-ci',
      internship: 'Stage',
      fullTime: 'Temps plein',
      partTime: 'Temps partiel',
      viewRate: 'Taux de vues',
      applicationRate: 'Taux de candidatures'
    }
  };

  const applicationTrends = [
    { month: 'Jan', applications: 24 },
    { month: 'Feb', applications: 38 },
    { month: 'Mar', applications: 45 },
    { month: 'Apr', applications: 52 },
    { month: 'May', applications: 61 },
    { month: 'Jun', applications: 58 }
  ];

  const jobTypeData = [
    { name: 'Internship', value: 60, color: 'hsl(var(--primary))' },
    { name: 'Full-time', value: 30, color: 'hsl(var(--secondary))' },
    { name: 'Part-time', value: 10, color: 'hsl(var(--accent))' }
  ];

  const topCompanies = [
    { name: 'TechCorp', applications: 42, jobs: 5 },
    { name: 'DataAnalytics Ltd', applications: 38, jobs: 3 },
    { name: 'StartupXYZ', applications: 25, jobs: 2 },
    { name: 'Innovation Inc', applications: 18, jobs: 4 }
  ];

  const t = translations[language];

  const stats = [
    {
      title: t.totalUsers,
      value: '1,234',
      change: '+12%',
      icon: Users,
      description: t.thisMonth
    },
    {
      title: t.totalCompanies,
      value: '156',
      change: '+8%',
      icon: Building,
      description: t.thisMonth
    },
    {
      title: t.totalJobs,
      value: '89',
      change: '+15%',
      icon: Briefcase,
      description: t.thisMonth
    },
    {
      title: t.totalApplications,
      value: '2,845',
      change: '+23%',
      icon: TrendingUp,
      description: t.thisMonth
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.overview}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.applicationTrends}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.jobsByType}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.topCompanies}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={company.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {company.jobs} jobs posted
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{company.applications}</p>
                  <p className="text-sm text-muted-foreground">{t.applications}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t.viewRate}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Job Views</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Company Pages</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t.applicationRate}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Week</span>
                <span>24%</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span>18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;