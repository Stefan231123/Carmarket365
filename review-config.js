// CarMarket365 Translation Review System Configuration
// SECURITY: This file contains sensitive configuration - do not commit to public repositories

export const REVIEW_CONFIG = {
  // Security Settings
  security: {
    enabled: true,
    sessionTimeout: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    maxConcurrentSessions: 5,
    requireHTTPS: true,
    allowedOrigins: [
      'http://localhost:8083',
      'https://staging.carmarket365.com',
      'https://review.carmarket365.com'
    ]
  },

  // Access Tokens (In production, store in environment variables or secure database)
  accessTokens: {
    'CARMARKET365_REVIEW_2024': {
      name: 'Master Review Token',
      permissions: ['read', 'comment', 'suggest', 'export'],
      languages: ['mk', 'sq', 'sl', 'ru', 'lv'],
      expiryDate: '2024-12-31',
      active: true
    },
    'MK_REVIEWER_2024': {
      name: 'Macedonian Reviewer',
      permissions: ['read', 'comment', 'suggest'],
      languages: ['mk'],
      expiryDate: '2024-12-31',
      active: true
    },
    'SQ_REVIEWER_2024': {
      name: 'Albanian Reviewer',
      permissions: ['read', 'comment', 'suggest'],
      languages: ['sq'],
      expiryDate: '2024-12-31',
      active: true
    },
    'SL_REVIEWER_2024': {
      name: 'Slovenian Reviewer',
      permissions: ['read', 'comment', 'suggest'],
      languages: ['sl'],
      expiryDate: '2024-12-31',
      active: true
    },
    'RU_REVIEWER_2024': {
      name: 'Russian Reviewer',
      permissions: ['read', 'comment', 'suggest'],
      languages: ['ru'],
      expiryDate: '2024-12-31',
      active: true
    },
    'LV_REVIEWER_2024': {
      name: 'Latvian Reviewer',
      permissions: ['read', 'comment', 'suggest'],
      languages: ['lv'],
      expiryDate: '2024-12-31',
      active: true
    }
  },

  // Authorized Reviewers Database
  authorizedReviewers: {
    'macedonian@reviewer.com': {
      name: 'Macedonian Language Expert',
      language: 'mk',
      accessLevel: 'suggest',
      expertise: ['automotive', 'business'],
      verified: true,
      joinDate: '2024-09-15'
    },
    'albanian@reviewer.com': {
      name: 'Albanian Language Expert',
      language: 'sq',
      accessLevel: 'suggest',
      expertise: ['automotive', 'legal'],
      verified: true,
      joinDate: '2024-09-15'
    },
    'slovenian@reviewer.com': {
      name: 'Slovenian Language Expert',
      language: 'sl',
      accessLevel: 'suggest',
      expertise: ['technical', 'business'],
      verified: true,
      joinDate: '2024-09-15'
    },
    'russian@reviewer.com': {
      name: 'Russian Language Expert',
      language: 'ru',
      accessLevel: 'suggest',
      expertise: ['automotive', 'technical'],
      verified: true,
      joinDate: '2024-09-15'
    },
    'latvian@reviewer.com': {
      name: 'Latvian Language Expert',
      language: 'lv',
      accessLevel: 'suggest',
      expertise: ['legal', 'business'],
      verified: true,
      joinDate: '2024-09-15'
    }
  },

  // Review Environment Settings
  environment: {
    mode: 'development', // 'development' | 'staging' | 'production'
    baseUrl: 'http://localhost:8083',
    reviewPath: '/translation-review',
    enableLogging: true,
    enableExport: true,
    enableBackup: true,
    maxFeedbackPerSession: 200
  },

  // Language Configuration
  languages: {
    supported: ['mk', 'sq', 'sl', 'ru', 'lv'],
    reference: 'en',
    priorityOrder: ['mk', 'sq', 'sl', 'ru', 'lv'] // Order for review priority
  },

  // Feedback System
  feedback: {
    priorities: ['low', 'medium', 'high', 'critical'],
    statuses: ['pending', 'reviewed', 'approved', 'rejected'],
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    exportFormats: ['json', 'csv', 'xlsx']
  },

  // Notification Settings
  notifications: {
    enabled: true,
    emailNotifications: false, // Disable for demo
    slackWebhook: null, // Add webhook URL for production
    discordWebhook: null, // Add webhook URL for production
    adminEmail: 'admin@carmarket365.com'
  }
};

// Security validation function
export const validateAccessToken = (token, language = null) => {
  const tokenData = REVIEW_CONFIG.accessTokens[token];
  
  if (!tokenData) {
    return { valid: false, reason: 'Invalid token' };
  }

  if (!tokenData.active) {
    return { valid: false, reason: 'Token deactivated' };
  }

  const expiryDate = new Date(tokenData.expiryDate);
  if (expiryDate < new Date()) {
    return { valid: false, reason: 'Token expired' };
  }

  if (language && !tokenData.languages.includes(language)) {
    return { valid: false, reason: 'Unauthorized for this language' };
  }

  return { 
    valid: true, 
    tokenData,
    permissions: tokenData.permissions 
  };
};

// Session management
export const createReviewSession = (reviewerEmail, language, token) => {
  return {
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    reviewerId: reviewerEmail,
    language,
    token,
    startTime: new Date(),
    lastActivity: new Date(),
    progress: 0,
    feedbackCount: 0,
    status: 'active'
  };
};

// Export configuration for use in components
export default REVIEW_CONFIG;