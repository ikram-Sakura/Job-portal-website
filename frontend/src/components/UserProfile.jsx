import { useState } from 'react';
import { User, Mail, Building, GraduationCap, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserProfile = ({ user, language = 'en' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    university: 'Tech University',
    major: 'Computer Science',
    graduationYear: '2024',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineering student with experience in React, Node.js, and Python. Looking for internship opportunities in web development.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
  });

  const translations = {
    en: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      personalInfo: 'Personal Information',
      education: 'Education',
      skills: 'Skills',
      location: 'Location',
      bio: 'Bio',
      save: 'Save',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      university: 'University',
      major: 'Major',
      graduationYear: 'Graduation Year',
      yourBio: 'Your Bio'
    },
    fr: {
      title: 'Profil',
      editProfile: 'Modifier le profil',
      personalInfo: 'Informations personnelles',
      education: 'Éducation',
      skills: 'Compétences',
      location: 'Localisation',
      bio: 'Bio',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      university: 'Université',
      major: 'Domaine d\'études',
      graduationYear: 'Année de graduation',
      yourBio: 'Votre bio'
    }
  };

  const t = translations[language];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to the backend
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            {user?.firstName} {user?.lastName}
          </CardDescription>
        </div>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              {t.editProfile}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t.editProfile}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">{t.university}</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">{t.major}</Label>
                  <Input
                    id="major"
                    value={profileData.major}
                    onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">{t.graduationYear}</Label>
                <Select
                  value={profileData.graduationYear}
                  onValueChange={(value) => setProfileData({ ...profileData, graduationYear: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025, 2026, 2027].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t.location}</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t.yourBio}</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  {t.cancel}
                </Button>
                <Button onClick={handleSave}>
                  {t.save}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {profileData.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t.personalInfo}
            </h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profileData.location}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {t.education}
            </h4>
            <div className="space-y-1 text-sm">
              <p>{profileData.university}</p>
              <p className="text-muted-foreground">{profileData.major}</p>
              <p className="text-muted-foreground">Graduating {profileData.graduationYear}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">{t.bio}</h4>
          <p className="text-sm text-muted-foreground">{profileData.bio}</p>
        </div>

        <div>
          <h4 className="font-medium mb-3">{t.skills}</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;