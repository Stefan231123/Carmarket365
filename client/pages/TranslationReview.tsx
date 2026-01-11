import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  Edit3, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle,
  Lock,
  Globe,
  User,
  Clock,
  Search,
  Filter,
  Save,
  Download
} from "lucide-react";

// Import all translation files for review
import { enTranslations } from "@shared/translations/en";
import { mkTranslations } from "@shared/translations/mk";
import { sqTranslations } from "@shared/translations/sq";
import { slTranslations } from "@shared/translations/sl";
import { ruTranslations } from "@shared/translations/ru";
import { lvTranslations } from "@shared/translations/lv";

interface ReviewFeedback {
  translationKey: string;
  originalText: string;
  currentTranslation: string;
  suggestedTranslation: string;
  comment: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  reviewerId: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

interface ReviewSession {
  sessionId: string;
  reviewerId: string;
  language: string;
  startTime: Date;
  lastActivity: Date;
  progress: number;
  feedbackCount: number;
}

const LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸', translations: enTranslations },
  mk: { name: 'Macedonian', flag: '🇲🇰', translations: mkTranslations },
  sq: { name: 'Albanian', flag: '🇦🇱', translations: sqTranslations },
  sl: { name: 'Slovenian', flag: '🇸🇮', translations: slTranslations },
  ru: { name: 'Russian', flag: '🇷🇺', translations: ruTranslations },
  lv: { name: 'Latvian', flag: '🇱🇻', translations: lvTranslations },
};

const REVIEWER_ACCESS_LEVELS = {
  read: { name: 'Read Only', icon: Eye, color: 'bg-gray-100' },
  comment: { name: 'Comment', icon: MessageCircle, color: 'bg-blue-100' },
  suggest: { name: 'Suggest Changes', icon: Edit3, color: 'bg-green-100' },
};

export default function TranslationReview() {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof LANGUAGES>('mk');
  const [reviewerInfo, setReviewerInfo] = useState({
    name: '',
    email: '',
    accessLevel: 'comment' as keyof typeof REVIEWER_ACCESS_LEVELS,
    language: 'mk',
    verified: false
  });
  const [currentSection, setCurrentSection] = useState('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [feedback, setFeedback] = useState<ReviewFeedback[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState({
    translationKey: '',
    suggestedTranslation: '',
    comment: '',
    priority: 'medium' as ReviewFeedback['priority']
  });
  const [session, setSession] = useState<ReviewSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');

  // Security: Authentication check
  useEffect(() => {
    const token = localStorage.getItem('review_token');
    const reviewer = localStorage.getItem('reviewer_info');
    
    if (token && reviewer) {
      setAuthToken(token);
      setReviewerInfo(JSON.parse(reviewer));
      setIsAuthenticated(true);
      
      // Initialize session
      const newSession: ReviewSession = {
        sessionId: `session_${Date.now()}`,
        reviewerId: JSON.parse(reviewer).email,
        language: selectedLanguage,
        startTime: new Date(),
        lastActivity: new Date(),
        progress: 0,
        feedbackCount: 0
      };
      setSession(newSession);
    }
  }, [selectedLanguage]);

  // Security: Session timeout (2 hours)
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleLogout();
    }, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = (token: string, reviewer: any) => {
    localStorage.setItem('review_token', token);
    localStorage.setItem('reviewer_info', JSON.stringify(reviewer));
    setAuthToken(token);
    setReviewerInfo(reviewer);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('review_token');
    localStorage.removeItem('reviewer_info');
    setAuthToken('');
    setIsAuthenticated(false);
    setSession(null);
  };

  // Get translation object for current language
  const getCurrentTranslations = () => {
    return LANGUAGES[selectedLanguage]?.translations || {};
  };

  // Get English reference translations
  const getEnglishTranslations = () => {
    return LANGUAGES.en.translations;
  };

  // Extract translation keys recursively
  const extractTranslationKeys = (obj: any, prefix = ''): Array<{key: string, value: string}> => {
    const keys: Array<{key: string, value: string}> = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        keys.push({ key: fullKey, value });
      } else if (typeof value === 'object' && value !== null) {
        keys.push(...extractTranslationKeys(value, fullKey));
      }
    });
    
    return keys;
  };

  // Get translation keys for current section
  const getTranslationKeysForSection = () => {
    const currentTranslations = getCurrentTranslations();
    const englishTranslations = getEnglishTranslations();
    
    if (currentSection === 'all') {
      return extractTranslationKeys(currentTranslations);
    }
    
    const sectionData = (currentTranslations as any)[currentSection];
    if (sectionData) {
      return extractTranslationKeys(sectionData, currentSection);
    }
    
    return [];
  };

  // Get English reference for a key
  const getEnglishReference = (key: string) => {
    const keys = key.split('.');
    let current = getEnglishTranslations() as any;
    
    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k];
      } else {
        return 'Reference not found';
      }
    }
    
    return typeof current === 'string' ? current : 'Reference not found';
  };

  // Submit feedback
  const submitFeedback = (translationKey: string, currentTranslation: string) => {
    if (!currentFeedback.comment.trim()) {
      alert('Please provide a comment');
      return;
    }

    const newFeedback: ReviewFeedback = {
      translationKey,
      originalText: getEnglishReference(translationKey),
      currentTranslation,
      suggestedTranslation: currentFeedback.suggestedTranslation,
      comment: currentFeedback.comment,
      priority: currentFeedback.priority,
      reviewerId: reviewerInfo.email,
      timestamp: new Date(),
      status: 'pending'
    };

    setFeedback(prev => [...prev, newFeedback]);
    setCurrentFeedback({
      translationKey: '',
      suggestedTranslation: '',
      comment: '',
      priority: 'medium'
    });

    // Update session
    if (session) {
      setSession(prev => prev ? {
        ...prev,
        lastActivity: new Date(),
        feedbackCount: prev.feedbackCount + 1,
        progress: Math.min(prev.progress + 1, 100)
      } : null);
    }
  };

  // Export feedback as JSON
  const exportFeedback = () => {
    const exportData = {
      session,
      reviewer: reviewerInfo,
      language: selectedLanguage,
      feedback,
      exportDate: new Date(),
      totalFeedback: feedback.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-review-${selectedLanguage}-${reviewerInfo.email}-${Date.now()}.json`;
    a.click();
  };

  // Filter translations based on search and priority
  const filteredTranslations = getTranslationKeysForSection().filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEnglishReference(item.key).toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <CardTitle className="text-2xl">Secure Translation Review</CardTitle>
            <p className="text-muted-foreground">
              Access restricted to authorized reviewers only
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This is a secure review environment for CarMarket365 translations. 
                Please contact the administrator for access credentials.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <Input
                placeholder="Access Token"
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
              />
              <Input
                placeholder="Reviewer Email"
                type="email"
                onChange={(e) => setReviewerInfo(prev => ({...prev, email: e.target.value}))}
              />
              <Button 
                onClick={() => {
                  // Simulated authentication - in production, verify token with backend
                  if (authToken === 'CARMARKET365_REVIEW_2024') {
                    handleLogin(authToken, {
                      ...reviewerInfo,
                      verified: true,
                      accessLevel: 'suggest'
                    });
                  } else {
                    alert('Invalid access token');
                  }
                }}
                className="w-full"
              >
                Enter Review Environment
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo Access Token: <code>CARMARKET365_REVIEW_2024</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white border-b shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">Translation Review System</h1>
                <p className="text-sm text-muted-foreground">
                  CarMarket365 • Secure Proofreading Environment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {session && (
                <div className="text-sm">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{session.feedbackCount} feedback submitted</span>
                  </div>
                </div>
              )}
              
              <Badge variant="outline" className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{reviewerInfo.name || reviewerInfo.email}</span>
              </Badge>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-white rounded-lg border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Review Language</label>
              <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as keyof typeof LANGUAGES)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).filter(([key]) => key !== 'en').map(([key, lang]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Select value={currentSection} onValueChange={setCurrentSection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="hero">Homepage</SelectItem>
                  <SelectItem value="cars">Cars</SelectItem>
                  <SelectItem value="forms">Forms</SelectItem>
                  <SelectItem value="dealer">Dealer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search translations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex space-x-2">
                <Button onClick={exportFeedback} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Badge variant="secondary">{filteredTranslations.length} items</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Review Interface */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTranslations.slice(0, 50).map((item, index) => (
            <TranslationItem
              key={`${item.key}-${index}`}
              translationKey={item.key}
              currentTranslation={item.value}
              englishReference={getEnglishReference(item.key)}
              reviewerAccess={reviewerInfo.accessLevel}
              currentFeedback={currentFeedback}
              setCurrentFeedback={setCurrentFeedback}
              onSubmitFeedback={submitFeedback}
              existingFeedback={feedback.filter(f => f.translationKey === item.key)}
            />
          ))}
        </div>

        {filteredTranslations.length > 50 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Showing first 50 results. Use search to narrow down specific translations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Individual translation item component
interface TranslationItemProps {
  translationKey: string;
  currentTranslation: string;
  englishReference: string;
  reviewerAccess: string;
  currentFeedback: any;
  setCurrentFeedback: (feedback: any) => void;
  onSubmitFeedback: (key: string, translation: string) => void;
  existingFeedback: ReviewFeedback[];
}

function TranslationItem({
  translationKey,
  currentTranslation,
  englishReference,
  reviewerAccess,
  currentFeedback,
  setCurrentFeedback,
  onSubmitFeedback,
  existingFeedback
}: TranslationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="font-mono text-xs">
                {translationKey}
              </Badge>
              {existingFeedback.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {existingFeedback.length} feedback
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
              
              {reviewerAccess === 'suggest' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  {isEditing ? 'Cancel' : 'Suggest'}
                </Button>
              )}
            </div>
          </div>

          {/* Translations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                English (Reference)
              </label>
              <div className="bg-gray-50 p-3 rounded border text-sm">
                {englishReference}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-blue-600 block mb-2">
                Current Translation
              </label>
              <div className="bg-blue-50 p-3 rounded border text-sm">
                {currentTranslation}
              </div>
            </div>
          </div>

          {/* Feedback Interface */}
          {isExpanded && (
            <div className="border-t pt-4 space-y-4">
              {/* Existing Feedback */}
              {existingFeedback.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Previous Feedback:</h4>
                  {existingFeedback.map((feedback, idx) => (
                    <div key={idx} className="bg-yellow-50 p-3 rounded border-l-4 border-l-yellow-400">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{feedback.priority}</Badge>
                        <span className="text-xs text-gray-500">
                          {feedback.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{feedback.comment}</p>
                      {feedback.suggestedTranslation && (
                        <div className="text-sm bg-white p-2 rounded border">
                          <strong>Suggested:</strong> {feedback.suggestedTranslation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* New Feedback Form */}
              {isEditing && (
                <div className="bg-green-50 p-4 rounded border space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        Priority Level
                      </label>
                      <Select 
                        value={currentFeedback.priority} 
                        onValueChange={(value) => setCurrentFeedback(prev => ({...prev, priority: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Suggested Translation (Optional)
                    </label>
                    <Input
                      placeholder="Your suggested translation..."
                      value={currentFeedback.suggestedTranslation}
                      onChange={(e) => setCurrentFeedback(prev => ({...prev, suggestedTranslation: e.target.value}))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Comment / Feedback *
                    </label>
                    <Textarea
                      placeholder="Provide your feedback about this translation..."
                      value={currentFeedback.comment}
                      onChange={(e) => setCurrentFeedback(prev => ({...prev, comment: e.target.value}))}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={() => {
                        onSubmitFeedback(translationKey, currentTranslation);
                        setIsEditing(false);
                      }}
                      size="sm"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Submit Feedback
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}