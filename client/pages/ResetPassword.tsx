import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from '@shared/api-client';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Lock } from 'lucide-react';

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('forms.validation.passwordMinLength') || 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError(t('forms.validation.passwordMismatch') || 'Passwords do not match');
      return;
    }

    if (!token || !email) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.resetPassword(token, email, password);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Invalid or expired reset link.</p>
            <Button onClick={() => navigate('/signin')} className="rounded-full">
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl">
        {!isSuccess ? (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Lock className="h-6 w-6" />
              </div>
              <CardTitle>{t('auth.createNewPassword') || 'Create New Password'}</CardTitle>
              <CardDescription>
                {t('auth.enterNewPassword') || 'Enter your new password below'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t('auth.newPassword') || 'New Password'}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('auth.confirmPassword') || 'Confirm Password'}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-10"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !password || !confirmPassword}
                  className="w-full h-10"
                >
                  {isLoading ? (t('common.saving') || 'Saving...') : (t('auth.resetPassword') || 'Reset Password')}
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">{t('auth.passwordResetSuccess') || 'Password Reset Successfully'}</h3>
            <p className="text-sm text-muted-foreground">
              {t('auth.passwordResetSuccessMessage') || 'You can now sign in with your new password.'}
            </p>
            <Button onClick={() => navigate('/signin')} className="w-full rounded-full">
              {t('auth.signIn') || 'Sign In'}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
