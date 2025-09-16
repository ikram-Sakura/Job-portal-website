import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import JobCard from './JobCard';
import { jobsAPI } from '@/services/api';

const JobsList = ({ onApply, showApplications = false, language = 'en' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translations = {
    en: {
      searchPlaceholder: 'Search jobs, companies, locations...',
      filterByType: 'Filter by type',
      allTypes: 'All types',
      internship: 'Internship',
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      clearFilters: 'Clear Filters',
      jobsFound: 'jobs found'
    },
    fr: {
      searchPlaceholder: 'Rechercher emplois, entreprises, lieux...',
      filterByType: 'Filtrer par type',
      allTypes: 'Tous les types',
      internship: 'Stage',
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      clearFilters: 'Effacer les filtres',
      jobsFound: 'emplois trouvés'
    }
  };

  const t = translations[language];

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, typeFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const filters = {
        search: searchTerm,
        type: typeFilter !== 'all' ? typeFilter : undefined
      };
      
      const response = await jobsAPI.getJobs(filters);
      setJobs(response.jobs);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">
          {language === 'en' ? 'Loading jobs...' : 'Chargement des emplois...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">{error}</p>
        <Button onClick={fetchJobs} className="mt-4">
          {language === 'en' ? 'Try Again' : 'Réessayer'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={t.filterByType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allTypes}</SelectItem>
            <SelectItem value="internship">{t.internship}</SelectItem>
            <SelectItem value="full-time">{t['full-time']}</SelectItem>
            <SelectItem value="part-time">{t['part-time']}</SelectItem>
          </SelectContent>
        </Select>

        {(searchTerm || typeFilter !== 'all') && (
          <Button variant="outline" onClick={clearFilters}>
            {t.clearFilters}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {jobs.length} {t.jobsFound}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={onApply}
            showApplications={showApplications}
            language={language}
          />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {language === 'en' ? 'No jobs found matching your criteria.' : 'Aucun emploi trouvé correspondant à vos critères.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobsList;