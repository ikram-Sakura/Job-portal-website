import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Bookmark } from 'lucide-react';
import { useState } from 'react';

const JobCard = ({ job, onApply, showApplications = false, language = 'en' }) => {
  const [isSaved, setIsSaved] = useState(false);

  const translations = {
    en: {
      apply: 'Apply Now',
      viewApplications: 'View Applications',
      posted: 'Posted',
      deadline: 'Deadline',
      applications: 'applications',
      internship: 'Internship',
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      save: 'Save',
      unsave: 'Unsave'
    },
    fr: {
      apply: 'Postuler',
      viewApplications: 'Voir les candidatures',
      posted: 'Publié le',
      deadline: 'Date limite',
      applications: 'candidatures',
      internship: 'Stage',
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      save: 'Sauvegarder',
      unsave: 'Désenregistrer'
    }
  };

  const t = translations[language];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow relative">
      {/* Save Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSave}
        className="absolute top-4 right-4 z-10"
      >
        <Bookmark 
          className={`h-5 w-5 ${isSaved ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
        />
      </Button>

      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="text-lg font-medium text-foreground">
              {job.company}
            </CardDescription>
          </div>
          <Badge variant={job.type === 'internship' ? 'default' : 'secondary'}>
            {t[job.type]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>

        {job.salary && (
          <div className="font-medium text-primary">
            {job.salary}
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 3).map((req) => (
            <Badge key={req} variant="outline" className="text-xs">
              {req}
            </Badge>
          ))}
          {job.requirements.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.requirements.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{t.posted}: {formatDate(job.postedDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{job.applications} {t.applications}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {t.deadline}: {formatDate(job.deadline)}
        </div>
      </CardContent>

      <CardFooter>
        {showApplications ? (
          <Button variant="outline" className="w-full">
            {t.viewApplications} ({job.applications})
          </Button>
        ) : (
          <Button 
            onClick={() => onApply?.(job.id)} 
            className="w-full"
          >
            {t.apply}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;