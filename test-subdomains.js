// Test subdomain detection logic
const COUNTRIES = {
  mk: {
    code: 'mk',
    name: 'North Macedonia',
    flag: '🇲🇰',
    domain: 'mk.carmarket365.com',
    languages: [
      { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
      { code: 'sq', name: 'Shqip', flag: '🇦🇱' }
    ],
    defaultLanguage: 'mk',
    hasMultipleLanguages: true,
  },
  al: {
    code: 'al',
    name: 'Albania',
    flag: '🇦🇱',
    domain: 'al.carmarket365.com',
    languages: [{ code: 'sq', name: 'Shqip', flag: '🇦🇱' }],
    defaultLanguage: 'sq',
    hasMultipleLanguages: false,
  },
  xk: {
    code: 'xk',
    name: 'Kosovo',
    flag: '🇽🇰',
    domain: 'xk.carmarket365.com',
    languages: [{ code: 'sq', name: 'Shqip', flag: '🇦🇱' }],
    defaultLanguage: 'sq',
    hasMultipleLanguages: false,
  },
  si: {
    code: 'si',
    name: 'Slovenia',
    flag: '🇸🇮',
    domain: 'si.carmarket365.com',
    languages: [{ code: 'sl', name: 'Slovenščina', flag: '🇸🇮' }],
    defaultLanguage: 'sl',
    hasMultipleLanguages: false,
  },
  lv: {
    code: 'lv',
    name: 'Latvia',
    flag: '🇱🇻',
    domain: 'lv.carmarket365.com',
    languages: [
      { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' }
    ],
    defaultLanguage: 'lv',
    hasMultipleLanguages: true,
  },
};

function getCountryFromDomain(hostname) {
  const subdomain = hostname.split('.')[0];
  console.log('🔍 Extracting subdomain from hostname:', hostname, '-> subdomain:', subdomain);
  const country = COUNTRIES[subdomain] || null;
  console.log('🏁 Found country for subdomain:', subdomain, '->', country?.name || 'NOT FOUND');
  return country;
}

// Test the logic
const testHostnames = [
  'mk.localhost',
  'al.localhost', 
  'xk.localhost',
  'si.localhost',
  'lv.localhost',
  'localhost'
];

console.log('Testing subdomain detection logic:\n');
testHostnames.forEach(hostname => {
  console.log(`Testing: ${hostname}`);
  const country = getCountryFromDomain(hostname);
  console.log(`Result: ${country ? country.name + ' (' + country.defaultLanguage + ')' : 'No country found'}\n`);
});