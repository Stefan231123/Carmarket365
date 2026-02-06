/**
 * 🇲🇰 Macedonian Proofreading Agent Configuration
 * 
 * This configuration file integrates the specialized Macedonian Proofreading Agent
 * with the existing CarMarket365 translation proofreading system.
 */

module.exports = {
  // Agent identification
  agent: {
    name: 'Macedonian Proofreading Agent',
    version: '1.0.0',
    language: 'mk',
    specialization: 'automotive_macedonian',
    created: new Date().toISOString()
  },

  // Integration with existing system
  integration: {
    // Existing proofreading tools
    existingExtractor: 'scripts/extract-translations-simple.cjs',
    existingImporter: 'scripts/import-proofreading.cjs',
    
    // Specialized agent
    specializedAgent: 'scripts/macedonian-proofreading-agent.cjs',
    
    // Output paths
    reportsPath: 'macedonian-proofreading-reports',
    extractsPath: 'proofreading-exports',
    backupsPath: 'translation-backups'
  },

  // Language-specific configuration
  language: {
    code: 'mk',
    name: 'Macedonian',
    script: 'Cyrillic',
    direction: 'ltr',
    market: 'North Macedonia',
    
    // File paths
    translationFile: 'shared/translations/mk.ts',
    backupPattern: 'mk-{timestamp}.ts',
    
    // Quality thresholds
    qualityThresholds: {
      excellent: 9.0,
      good: 7.0,
      acceptable: 5.0,
      poor: 0
    }
  },

  // Automotive terminology configuration
  automotive: {
    // Critical automotive terms that must be consistent
    criticalTerms: {
      'engine': 'мотор',
      'transmission': 'менувач',
      'automatic': 'автоматски',
      'manual': 'рачен',
      'diesel': 'дизел',
      'petrol': 'бензин',
      'condition': 'состојба',
      'price': 'цена',
      'year': 'година',
      'mileage': 'километража'
    },

    // Context-specific terms
    contextualTerms: {
      formal: {
        'car': 'автомобил',
        'vehicle': 'возило',
        'purchase': 'купување'
      },
      informal: {
        'car': 'кола',
        'vehicle': 'кола',
        'purchase': 'купи'
      }
    },

    // Technical specifications
    specifications: {
      power: {
        unit: 'кс', // коњски сили
        format: '{value} кс ({kw} kW)'
      },
      displacement: {
        unit: 'л',
        format: '{value}л'
      },
      fuel_economy: {
        unit: 'л/100км',
        format: '{value} л/100км'
      }
    }
  },

  // Cultural localization settings
  cultural: {
    // Formality levels for different sections
    formalityLevels: {
      'auth': 'formal',      // Login, registration
      'legal': 'formal',     // Terms, privacy policy
      'errors': 'formal',    // Error messages
      'common': 'neutral',   // General UI
      'hero': 'friendly',    // Marketing content
      'cars': 'neutral',     // Car listings
      'sell': 'helpful'      // Selling process
    },

    // Regional preferences
    regional: {
      currency: {
        primary: 'ден', // Macedonian Denar
        secondary: '€', // Euro (for international cars)
        format: '{value} {currency}'
      },
      measurements: {
        distance: 'км',
        volume: 'л',
        weight: 'кг'
      },
      dateFormat: 'dd.mm.yyyy'
    },

    // Business culture considerations
    businessCulture: {
      greetings: 'neutral', // Not too formal, not too casual
      politeness: 'moderate',
      directness: 'balanced'
    }
  },

  // Quality assessment criteria
  quality: {
    // Scoring weights
    weights: {
      grammar: 0.30,       // Grammar and syntax accuracy
      terminology: 0.25,   // Automotive term consistency
      cultural: 0.20,      // Cultural appropriateness
      ux: 0.15,           // User experience clarity
      technical: 0.10      // Technical implementation
    },

    // Assessment criteria details
    criteria: {
      grammar: {
        checks: [
          'cyrillic_usage',
          'verb_agreement',
          'gender_agreement',
          'punctuation',
          'spelling'
        ],
        weight: 0.30
      },
      terminology: {
        checks: [
          'automotive_terms',
          'consistency',
          'technical_accuracy',
          'market_appropriateness'
        ],
        weight: 0.25
      },
      cultural: {
        checks: [
          'formality_level',
          'local_references',
          'business_culture',
          'regional_adaptation'
        ],
        weight: 0.20
      },
      ux: {
        checks: [
          'clarity',
          'readability',
          'action_clarity',
          'text_length',
          'user_friendliness'
        ],
        weight: 0.15
      },
      technical: {
        checks: [
          'variable_handling',
          'special_characters',
          'encoding',
          'ui_compatibility'
        ],
        weight: 0.10
      }
    }
  },

  // Workflow configuration
  workflow: {
    // Standard workflow steps
    steps: [
      'backup_creation',
      'extraction',
      'quality_analysis',
      'report_generation',
      'recommendations',
      'validation'
    ],

    // Automation settings
    automation: {
      autoBackup: true,
      autoValidation: true,
      autoReporting: true
    },

    // Report settings
    reporting: {
      format: 'markdown',
      includeDetails: true,
      includeExamples: true,
      includeRecommendations: true,
      outputPath: 'macedonian-proofreading-reports'
    }
  },

  // Integration commands
  commands: {
    // Quick quality check
    quickCheck: 'node scripts/macedonian-proofreading-agent.cjs validate --quick',
    
    // Full quality review
    fullReview: 'node scripts/macedonian-proofreading-agent.cjs review',
    
    // Extract for external proofreading
    extract: 'node scripts/macedonian-proofreading-agent.cjs extract',
    
    // Combined workflow with existing tools
    combinedWorkflow: [
      // Step 1: Extract using existing tool for compatibility
      'node scripts/extract-translations-simple.cjs mk:shared/translations/mk.ts',
      
      // Step 2: Run specialized analysis
      'node scripts/macedonian-proofreading-agent.cjs review',
      
      // Step 3: Validate results
      'node scripts/macedonian-proofreading-agent.cjs validate'
    ]
  },

  // Error handling and fallbacks
  errorHandling: {
    // Fallback behavior for parsing errors
    fallbackOnParseError: true,
    
    // Backup strategy
    backupStrategy: 'timestamp',
    
    // Validation strictness
    validationLevel: 'moderate', // strict, moderate, lenient
    
    // Recovery options
    autoRecover: true
  },

  // Performance settings
  performance: {
    // Batch processing settings
    batchSize: 100,
    
    // Progress reporting
    progressReporting: true,
    progressInterval: 50,
    
    // Memory management
    memoryOptimization: true
  },

  // Advanced features
  advanced: {
    // Machine learning integration (future)
    mlIntegration: {
      enabled: false,
      modelPath: null,
      confidenceThreshold: 0.8
    },
    
    // User feedback integration
    userFeedback: {
      enabled: true,
      feedbackPath: 'user-feedback/macedonian',
      integrationFrequency: 'weekly'
    },
    
    // Analytics tracking
    analytics: {
      enabled: true,
      metricsPath: 'analytics/macedonian-quality',
      trackingLevel: 'detailed'
    }
  },

  // Usage examples and templates
  examples: {
    // Example workflow for new features
    newFeatureWorkflow: [
      '1. Extract new translations: node scripts/extract-translations-simple.cjs mk:shared/translations/mk.ts',
      '2. Run quality check: node scripts/macedonian-proofreading-agent.cjs review',
      '3. Address high priority issues',
      '4. Validate improvements: node scripts/macedonian-proofreading-agent.cjs validate',
      '5. Import changes: node scripts/import-proofreading.cjs changes.json mk:shared/translations/mk.ts'
    ],

    // Example report request
    reportRequest: {
      command: 'node scripts/macedonian-proofreading-agent.cjs review',
      expectedOutput: 'macedonian-proofreading-reports/macedonian-quality-report-[timestamp].md',
      keyMetrics: ['overallScore', 'issuesByCategory', 'priorityRecommendations']
    },

    // Example quality improvement cycle
    improvementCycle: {
      frequency: 'weekly',
      steps: [
        'Generate quality report',
        'Identify priority improvements',
        'Apply improvements',
        'Validate changes',
        'Monitor user feedback'
      ]
    }
  }
};