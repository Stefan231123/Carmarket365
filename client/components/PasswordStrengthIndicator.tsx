import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface PasswordStrengthIndicatorProps {
  password: string;
  showDetails?: boolean;
}

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

// Create password requirements function to avoid dependency on external state
function createPasswordRequirements() {
  return [
    {
      id: 'length',
      test: (password: string) => password.length >= 8,
    },
    {
      id: 'uppercase',
      test: (password: string) => /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      test: (password: string) => /[a-z]/.test(password),
    },
    {
      id: 'number',
      test: (password: string) => /\d/.test(password),
    },
    {
      id: 'special',
      test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
}

export default function PasswordStrengthIndicator({ 
  password, 
  showDetails = true 
}: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();
  
  const passwordRequirements = useMemo(() => [
    {
      id: 'length',
      label: t('auth.passwordStrength.requirements.length'),
      test: (password: string) => password.length >= 8,
    },
    {
      id: 'uppercase',
      label: t('auth.passwordStrength.requirements.uppercase'),
      test: (password: string) => /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: t('auth.passwordStrength.requirements.lowercase'),
      test: (password: string) => /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: t('auth.passwordStrength.requirements.number'),
      test: (password: string) => /\d/.test(password),
    },
    {
      id: 'special',
      label: t('auth.passwordStrength.requirements.special'),
      test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ], [t]);
  
  const strength = useMemo(() => {
    if (!password) return { score: 0, level: 'empty', color: 'bg-gray-200' };
    
    const passedRequirements = passwordRequirements.filter(req => req.test(password));
    const score = (passedRequirements.length / passwordRequirements.length) * 100;
    
    if (score < 40) {
      return { score, level: 'weak', color: 'bg-red-500' };
    } else if (score < 80) {
      return { score, level: 'medium', color: 'bg-yellow-500' };
    } else {
      return { score, level: 'strong', color: 'bg-green-500' };
    }
  }, [password, passwordRequirements]);

  const getStrengthText = () => {
    switch (strength.level) {
      case 'weak':
        return t('auth.passwordStrength.levels.weak');
      case 'medium':
        return t('auth.passwordStrength.levels.medium');
      case 'strong':
        return t('auth.passwordStrength.levels.strong');
      default:
        return '';
    }
  };

  const getStrengthBadgeVariant = () => {
    switch (strength.level) {
      case 'weak':
        return 'destructive' as const;
      case 'medium':
        return 'secondary' as const;
      case 'strong':
        return 'default' as const;
      default:
        return 'outline' as const;
    }
  };

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Progress bar and strength label */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('auth.passwordStrength.label')}</span>
          {strength.level !== 'empty' && (
            <Badge variant={getStrengthBadgeVariant()} className="text-xs">
              {getStrengthText()}
            </Badge>
          )}
        </div>
        <Progress 
          value={strength.score} 
          className="h-2"
        />
      </div>

      {/* Detailed requirements */}
      {showDetails && (
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">{t('auth.passwordStrength.requirements.label')}</span>
          <div className="grid grid-cols-1 gap-1.5">
            {passwordRequirements.map((requirement) => {
              const isPassed = requirement.test(password);
              return (
                <div
                  key={requirement.id}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    isPassed ? 'text-green-600' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isPassed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {isPassed ? (
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    ) : (
                      <X className="w-2.5 h-2.5 text-gray-400" />
                    )}
                  </div>
                  <span>{requirement.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to check if password meets all requirements
export function isPasswordStrong(password: string): boolean {
  const requirements = createPasswordRequirements();
  return requirements.every(req => req.test(password));
}

// Helper function to get password score
export function getPasswordScore(password: string): number {
  if (!password) return 0;
  const requirements = createPasswordRequirements();
  const passedRequirements = requirements.filter(req => req.test(password));
  return (passedRequirements.length / requirements.length) * 100;
}