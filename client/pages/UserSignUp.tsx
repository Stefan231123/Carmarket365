import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useSafeAuth } from '@/contexts/AuthContextSafe';
import { Eye, EyeOff, Car, User, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function UserSignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useSafeAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      setError(t('auth.pleaseAgreeTerms'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordsNotMatch'));
      return;
    }

    if (formData.password.length < 8) {
      setError(t('auth.passwordMinLength'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: 'USER'
      });
      
      // Navigate to dashboard on successful registration
      navigate('/private-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.registrationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-muted-foreground hover:text-foreground rounded-full px-4 py-3 min-h-[44px]"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('auth.backToHome')}
        </Button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">CarMarket365</span>
          </div>
          <p className="text-muted-foreground text-sm">{t('auth.createYourAccount')}</p>
        </div>

        <Card className="border-zinc-100 rounded-2xl">
          <CardHeader className="space-y-1 p-6 sm:p-8">
            <CardTitle className="text-xl text-center sm:text-2xl">{t('auth.createYourAccount')}</CardTitle>
            <CardDescription className="text-center sm:text-lg">
              {t('auth.joinThousands')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 sm:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">{t('auth.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('auth.enterFullName')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="pl-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">{t('auth.emailAddress')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('auth.enterYourEmail')}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.createStrongPassword')}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{t('auth.mustBeCharacters')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground">{t('auth.confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('auth.confirmYourPassword')}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {t('auth.agreeToTerms')}{' '}
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    {t('auth.termsOfService')}
                  </Link>{' '}
                  {t('auth.and')}{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    {t('auth.privacyPolicy')}
                  </Link>
                </Label>
              </div>

              <Separator />

              <Button
                type="submit"
                disabled={isLoading || !agreeToTerms}
                className="w-full h-12 text-sm bg-black text-white hover:bg-black/90 rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t('auth.creatingAccount')}
                  </div>
                ) : (
                  t('auth.createAccount')
                )}
              </Button>
            </form>

            <Separator />

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('auth.alreadyHaveAccount')}{' '}
                <Link to="/signin" className="text-primary hover:underline font-medium">
                  {t('auth.signIn')}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                {t('auth.wantSellAsDealer')}{' '}
                <Link to="/dealer-signup" className="text-primary hover:underline font-medium">
                  {t('auth.createDealerAccount')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}