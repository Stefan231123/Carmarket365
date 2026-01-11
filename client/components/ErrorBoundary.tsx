import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorFallbackProps {
  error?: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p>{t('errors.errorBoundary.message')}</p>
            {error && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium">{t('errors.errorBoundary.details')}</summary>
                <pre className="mt-2 p-2 bg-gray-100 text-xs overflow-auto max-h-40 rounded">
                  {error.message}
                  {error.stack && (
                    <>
                      {'\n\n' + t('errors.errorBoundary.stackTrace') + '\n'}
                      {error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('errors.errorBoundary.refreshPage')}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ApiErrorProps {
  error: string | null;
  onRetry?: () => void;
  className?: string;
}

export function ApiError({ error, onRetry, className = "" }: ApiErrorProps) {
  const { t } = useTranslation();
  
  if (!error) return null;

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p>{error}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('errors.errorBoundary.tryAgain')}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}