import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Car, ArrowLeft, User, Building2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";
import { SocialLoginModal } from "@/components/SocialLoginModal";
import { useTranslation } from "@/hooks/useTranslation";

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useSafeAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<'private' | 'dealer'>('private');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSocialLogin, setShowSocialLogin] = useState(false);
  const [socialProvider, setSocialProvider] = useState<'google' | 'facebook'>('google');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    try {
      await login({ email, password });
      
      // Navigate based on the actual user role from backend
      // The auth context will contain the user info after successful login
      navigate('/');
    } catch (error) {
      // Error is handled by auth context
      console.error('Login failed:', error);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDealerSignUp = () => {
    navigate('/dealer-signup');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setSocialProvider(provider);
    setShowSocialLogin(true);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="mb-4 text-muted-foreground hover:text-foreground rounded-full px-4 py-3 min-h-[44px]"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('auth.backToHome')}
        </Button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">{t('brand.name')}</span>
          </div>
          <p className="text-muted-foreground text-sm">{t('auth.signInToAccount')}</p>
        </div>

        <Card className="border-zinc-100 rounded-2xl">
          <CardHeader className="space-y-1 p-6 sm:p-8">
            <CardTitle className="text-xl text-center sm:text-2xl">{t('auth.welcomeBack')}</CardTitle>
            <CardDescription className="text-center sm:text-lg">
              {t('auth.enterCredentials')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 sm:p-8 pt-0">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">{t('auth.userType')}</Label>
              <div className="bg-white rounded-full p-1 border grid grid-cols-2 gap-1">
                <Button
                  type="button"
                  variant={userType === 'private' ? 'default' : 'ghost'}
                  className={`h-auto p-4 min-h-[60px] flex flex-col items-center gap-1 relative rounded-full transition-all ${
                    userType === 'private' 
                      ? 'bg-black text-white shadow-sm' 
                      : 'bg-zinc-100 text-muted-foreground hover:bg-zinc-200'
                  }`}
                  onClick={() => setUserType('private')}
                >
                  <User className="h-4 w-4" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{t('auth.privatePerson')}</div>
                    <div className="text-xs opacity-70">
                      {t('auth.privatePersonDescription')}
                    </div>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={userType === 'dealer' ? 'default' : 'ghost'}
                  className={`h-auto p-4 min-h-[60px] flex flex-col items-center gap-1 relative rounded-full transition-all ${
                    userType === 'dealer' 
                      ? 'bg-black text-white shadow-sm' 
                      : 'bg-zinc-100 text-muted-foreground hover:bg-zinc-200'
                  }`}
                  onClick={() => setUserType('dealer')}
                >
                  <Building2 className="h-4 w-4" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{t('common.dealer')}</div>
                    <div className="text-xs opacity-70">
                      {t('auth.dealerDescription')}
                    </div>
                  </div>
                  <Badge variant="secondary" className="absolute -top-4 -right-4 text-xs px-1 py-0.5 h-auto rounded-full bg-secondary text-secondary-foreground">
                    {t('auth.pro')}
                  </Badge>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.enterYourEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.enterYourPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 text-sm bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    {t('auth.rememberMe')}
                  </Label>
                </div>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm"
                  onClick={handleForgotPassword}
                  type="button"
                >
                  {t('auth.forgotPassword')}
                </Button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 text-sm bg-black text-white hover:bg-black/90 rounded-full disabled:opacity-50"
              >
                {isLoading ? t('auth.signingIn') : t('auth.signIn')}
              </Button>
            </form>

            <Separator />

            {/* Social Sign In */}
            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground">
                {t('auth.orContinueWith')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 border-zinc-100 rounded-full text-sm min-h-[44px]"
                  onClick={() => handleSocialLogin('google')}
                  type="button"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('auth.google')}
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-zinc-100 rounded-full text-sm min-h-[44px]"
                  onClick={() => handleSocialLogin('facebook')}
                  type="button"
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {t('auth.facebook')}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Sign Up Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('auth.dontHaveAccount')}
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-zinc-100 rounded-full text-sm min-h-[44px]"
                  onClick={() => navigate('/signup')}
                >
                  {t('auth.createPrivateAccount')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-zinc-100 rounded-full text-sm min-h-[44px]"
                  onClick={handleDealerSignUp}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {t('auth.registerAsDealer')}
                </Button>
              </div>
            </div>

            {/* Benefits for dealers */}
            {userType === 'dealer' && (
              <div className="bg-muted/30 rounded-2xl p-4 space-y-2">
                <h3 className="font-semibold text-sm">{t('auth.dealerBenefits')}</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>{t('auth.professionalDashboard')}</li>
                  <li>{t('auth.inventoryManagement')}</li>
                  <li>{t('auth.customerTracking')}</li>
                  <li>{t('auth.enhancedVisibility')}</li>
                  <li>{t('auth.analyticsInsights')}</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
      
      <SocialLoginModal 
        isOpen={showSocialLogin}
        onClose={() => setShowSocialLogin(false)}
        provider={socialProvider}
      />
    </div>
  );
}
