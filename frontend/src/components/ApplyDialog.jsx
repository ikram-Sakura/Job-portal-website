import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText } from 'lucide-react';
import { applicationsAPI } from '@/services/api';

const ApplyDialog = ({ open, onOpenChange, jobId, language = 'en' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    major: '',
    year: '',
    coverLetter: '',
    cv: null
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Apply for Position',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      email: 'Email',
      university: 'University',
      major: 'Major/Field of Study',
      year: 'Year of Study',
      year1: '1st Year',
      year2: '2nd Year',
      year3: '3rd Year',
      year4: '4th Year',
      graduate: 'Graduate',
      coverLetter: 'Cover Letter',
      coverLetterPlaceholder: 'Tell us why you\'re interested in this position...',
      uploadCV: 'Upload CV/Resume',
      selectFile: 'Select File',
      noFileSelected: 'No file selected',
      submit: 'Submit Application',
      cancel: 'Cancel',
      successTitle: 'Application Submitted!',
      successMessage: 'Your application has been submitted successfully.',
      errorMessage: 'Please fill in all required fields.',
      uploadError: 'Please upload your CV/Resume'
    },
    fr: {
      title: 'Postuler pour le poste',
      personalInfo: 'Informations personnelles',
      fullName: 'Nom complet',
      email: 'Email',
      university: 'Université',
      major: 'Domaine d\'études',
      year: 'Année d\'études',
      year1: '1ère année',
      year2: '2ème année',
      year3: '3ème année',
      year4: '4ème année',
      graduate: 'Diplômé',
      coverLetter: 'Lettre de motivation',
      coverLetterPlaceholder: 'Dites-nous pourquoi ce poste vous intéresse...',
      uploadCV: 'Télécharger CV',
      selectFile: 'Sélectionner un fichier',
      noFileSelected: 'Aucun fichier sélectionné',
      submit: 'Soumettre la candidature',
      cancel: 'Annuler',
      successTitle: 'Candidature soumise !',
      successMessage: 'Votre candidature a été soumise avec succès.',
      errorMessage: 'Veuillez remplir tous les champs obligatoires.',
      uploadError: 'Veuillez télécharger votre CV'
    }
  };

  const t = translations[language];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, cv: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.university || 
        !formData.major || !formData.year || !formData.cv) {
      toast({
        title: "Error",
        description: !formData.cv ? t.uploadError : t.errorMessage,
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      const applicationFormData = new FormData();
      applicationFormData.append('jobId', jobId || '');
      applicationFormData.append('fullName', formData.fullName);
      applicationFormData.append('email', formData.email);
      applicationFormData.append('university', formData.university);
      applicationFormData.append('major', formData.major);
      applicationFormData.append('year', formData.year);
      applicationFormData.append('coverLetter', formData.coverLetter);
      applicationFormData.append('cv', formData.cv);

      await applicationsAPI.apply(applicationFormData);
      
      toast({
        title: t.successTitle,
        description: t.successMessage,
      });
      
      setFormData({
        fullName: '',
        email: '',
        university: '',
        major: '',
        year: '',
        coverLetter: '',
        cv: null
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: 'Failed to submit application',
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t.personalInfo}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.fullName} *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">{t.university} *</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="major">{t.major} *</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.year} *</Label>
              <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t.year} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t.year1}</SelectItem>
                  <SelectItem value="2">{t.year2}</SelectItem>
                  <SelectItem value="3">{t.year3}</SelectItem>
                  <SelectItem value="4">{t.year4}</SelectItem>
                  <SelectItem value="graduate">{t.graduate}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">{t.coverLetter}</Label>
            <Textarea
              id="coverLetter"
              placeholder={t.coverLetterPlaceholder}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>{t.uploadCV} *</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('cv-upload')?.click()}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {t.selectFile}
              </Button>
              {formData.cv ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {formData.cv.name}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">{t.noFileSelected}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
              {t.cancel}
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (language === 'en' ? 'Submitting...' : 'Soumission...') : t.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;