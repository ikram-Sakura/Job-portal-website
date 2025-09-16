import { useState } from 'react';
import { MapPin, Building, Calendar, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SavedJobs = ({ language = 'en' }) => {
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'WebSolutions Inc',
      location: 'Remote',
      type: 'full-time',
      salary: '$80,000-$100,000',
      postedDate: '2023-10-18',
      savedDate: '2023-10-19'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'CreativeStudio',
      location: 'Los Angeles, CA',
      type: 'full-time',
      salary: '$70,000-$90,000',
      postedDate: '2023-10-15',
      savedDate: '2023-10-16'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'full-time',
      salary: '$100,000-$130,000',
      postedDate: '2023-10-12',
      savedDate: '2023-10-13'
    }
  ]);

  const translations = {
    en: {
      title: 'Saved Jobs',
      noSavedJobs: 'No saved jobs',
      remove: 'Remove',
      saved: 'Saved',
      apply: 'Apply Now',
      posted: 'Posted',
      savedOn: 'Saved on'
    },
    fr: {
      title: 'Emplois sauvegardés',
      noSavedJobs: 'Aucun emploi sauvegardé',
      remove: 'Supprimer',
      saved: 'Sauvegardé',
      apply: 'Postuler maintenant',
      posted: 'Publié le',
      savedOn: 'Sauvegardé le'
    }
  };

  const t = translations[language];

  const removeSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  if (savedJobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            {language === 'en' ? 'Your saved jobs will appear here' : 'Vos emplois sauvegardés apparaîtront ici'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t.noSavedJobs}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>
          {savedJobs.length} {language === 'en' ? 'saved jobs' : 'emplois sauvegardés'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg">{job.title}</h4>
                     <Badge variant="secondary" className="flex items-center gap-1">
                        <Bookmark className="h-3 w-3" />
                        {t.saved}
                     </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {t.posted}: {formatDate(job.postedDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="text-sm text-muted-foreground">{job.salary}</span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      {t.savedOn}: {formatDate(job.savedDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  <Button size="sm">
                    {t.apply}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSavedJob(job.id)}
                    className="flex items-center gap-1"
                  >
                    <Bookmark className="h-4 w-4" />
                    {t.remove}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedJobs;