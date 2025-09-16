import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/services/api';

export default function LoginForm({ onLogin, language = 'en' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Login',
      description: 'Enter your credentials to access your account',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      loginError: 'Failed to login. Please try again.'
    },
    fr: {
      title: 'Connexion',
      description: 'Entrez vos identifiants pour accéder à votre compte',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Se connecter',
      loginError: 'Échec de la connexion. Veuillez réessayer.'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authAPI.login({ email, password });
      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' ? 'Logged in successfully' : 'Connecté avec succès',
      });
      if (onLogin) {
        onLogin(result.user);
      }
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: t.loginError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (language === 'en' ? 'Loading...' : 'Chargement...') : t.login}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {language === 'en' ? 'Demo credentials: any email + password (min 6 chars)' : 'Identifiants de démo : n\'importe quel email + mot de passe (min 6 caractères)'}
        </div>
      </CardContent>
    </Card>
  );
}