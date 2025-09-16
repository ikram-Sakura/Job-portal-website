import { useState } from 'react';
import { Calendar, MapPin, Building, Clock, CheckCircle, XCircle, Clock4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApplicationsArchive = ({ language = 'en' }) => {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Software Engineering Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      appliedDate: '2023-10-15',
      status: 'accepted',
      statusDate: '2023-10-20'
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      company: 'WebSolutions Inc',
      location: 'Remote',
      appliedDate: '2023-10-10',
      status: 'rejected',
      statusDate: '2023-10-18'
    },
    {
      id: 3,
      jobTitle: 'Data Science Intern',
      company: 'DataAnalytics Ltd',
      location: 'New York, NY',
      appliedDate: '2023-10-05',
      status: 'pending',
      statusDate: '2023-10-05'
    },
    {
      id: 4,
      jobTitle: 'Full-stack Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      appliedDate: '2023-09-28',
      status: 'accepted',
      statusDate: '2023-10-03'
    },
    {
      id: 5,
      jobTitle: 'UX Designer',
      company: 'DesignStudio',
      location: 'Los Angeles, CA',
      appliedDate: '2023-10-01',
      status: 'accepted',
      statusDate: '2023-10-05'
    },
    {
      id: 6,
      jobTitle: 'Backend Developer',
      company: 'DevSolutions',
      location: 'Seattle, WA',
      appliedDate: '2023-09-25',
      status: 'accepted',
      statusDate: '2023-09-30'
    },
    {
      id: 7,
      jobTitle: 'Marketing Intern',
      company: 'MarketingAgency',
      location: 'Remote',
      appliedDate: '2023-10-02',
      status: 'accepted',
      statusDate: '2023-10-06'
    },
    {
      id: 8,
      jobTitle: 'Product Manager',
      company: 'ProductCo',
      location: 'Chicago, IL',
      appliedDate: '2023-09-20',
      status: 'pending',
      statusDate: '2023-09-20'
    },
    {
      id: 9,
      jobTitle: 'DevOps Engineer',
      company: 'CloudServices',
      location: 'Austin, TX',
      appliedDate: '2023-09-15',
      status: 'accepted',
      statusDate: '2023-09-20'
    },
    {
      id: 10,
      jobTitle: 'QA Tester',
      company: 'TestLab',
      location: 'Boston, MA',
      appliedDate: '2023-09-10',
      status: 'pending',
      statusDate: '2023-09-10'
    }
  ]);

  const translations = {
    en: {
      title: 'Applications Archive',
      all: 'All',
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      applied: 'Applied',
      status: 'Status',
      noApplications: 'No applications found',
      viewDetails: 'View Details'
    },
    fr: {
      title: 'Archives des candidatures',
      all: 'Toutes',
      pending: 'En attente',
      accepted: 'Acceptées',
      rejected: 'Rejetées',
      applied: 'Postulé le',
      status: 'Statut',
      noApplications: 'Aucune candidature trouvée',
      viewDetails: 'Voir les détails'
    }
  };

  const t = translations[language];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock4 className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return language === 'en' ? 'Accepted' : 'Accepté';
      case 'rejected':
        return language === 'en' ? 'Rejected' : 'Rejeté';
      case 'pending':
        return language === 'en' ? 'Pending' : 'En attente';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  const filteredApplications = {
    all: applications,
    pending: applications.filter(app => app.status === 'pending'),
    accepted: applications.filter(app => app.status === 'accepted'),
    rejected: applications.filter(app => app.status === 'rejected')
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>
          {applications.length} {language === 'en' ? 'total applications' : 'candidatures au total'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            <TabsTrigger value="pending">{t.pending}</TabsTrigger>
            <TabsTrigger value="accepted">{t.accepted}</TabsTrigger>
            <TabsTrigger value="rejected">{t.rejected}</TabsTrigger>
          </TabsList>

          {Object.entries(filteredApplications).map(([key, apps]) => (
            <TabsContent key={key} value={key}>
              {apps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t.noApplications}
                </div>
              ) : (
                <div className="space-y-4">
                  {apps.map((application) => (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{application.jobTitle}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {application.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {application.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {t.applied}: {formatDate(application.appliedDate)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant={
                                application.status === 'accepted' ? 'default' :
                                application.status === 'rejected' ? 'destructive' : 'secondary'
                              }
                              className="flex items-center gap-1"
                            >
                              {getStatusIcon(application.status)}
                              {getStatusText(application.status)}
                            </Badge>
                            {application.status !== 'pending' && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(application.statusDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationsArchive;