# CarMarket365 - IP-Based Geolocation System

## Overview

The CarMarket365 platform now includes automatic IP-based geolocation to detect users' countries and redirect them to the most relevant country-specific subdomain for the best local experience.

## How It Works

### 1. IP Detection Providers

The system uses multiple geolocation providers in order of preference:

#### Primary Provider: IP-API.com
- **Free tier**: 1,000 requests/month
- **No API key required**
- **Accuracy**: ~80% confidence
- **Response time**: Fast (< 2 seconds)
- **Endpoint**: `http://ip-api.com/json/`

#### Fallback Provider: IPify + Mock Geolocation
- **Purpose**: Development and fallback
- **Uses**: Mock geolocation based on IP patterns
- **Confidence**: ~60% (lower due to mock data)

#### Backup Provider: Browser Timezone/Locale
- **Uses**: `Intl.DateTimeFormat().resolvedOptions().timeZone`
- **Also uses**: `navigator.language`
- **Confidence**: ~30% (timezone isn't very specific)
- **Purpose**: Last resort when IP services fail

### 2. Country Mapping

Users from these countries get redirected to local subdomains:

| Detected Country | Redirects To | Languages Available |
|-----------------|--------------|-------------------|
| North Macedonia (MK) | `mk.carmarket365.com` | Macedonian, Albanian |
| Albania (AL) | `al.carmarket365.com` | Albanian |
| Kosovo (XK) | `xk.carmarket365.com` | Albanian |
| Slovenia (SI) | `si.carmarket365.com` | Slovenian |
| Latvia (LV) | `lv.carmarket365.com` | Latvian, Russian |

#### Regional Fallbacks
- Serbia (RS) → North Macedonia
- Bulgaria (BG) → North Macedonia  
- Croatia (HR) → Slovenia
- Hungary (HU) → Slovenia
- Estonia (EE) → Latvia
- Lithuania (LT) → Latvia

### 3. User Experience Flow

1. **First Visit**: User visits `carmarket365.com`
2. **Geolocation**: System detects country from IP
3. **Redirect Dialog**: Shows friendly dialog asking if user wants to switch
4. **User Choice**: 
   - Accept → Redirect to country subdomain
   - Decline → Stay on global site, remember preference
5. **Preference Storage**: Choice saved in localStorage
6. **Future Visits**: Respects user's previous choice

### 4. Smart Redirect Logic

#### When Redirects DON'T Happen:
- User already on a country subdomain
- User previously chose "Stay on Global"
- Redirect dialog already shown in this session
- No supported country detected
- Geolocation fails

#### User Preference Management:
- **Global preference**: `carmarket365_country_preference` in localStorage
- **Per-country language**: `selectedLanguage_${countryCode}` in localStorage
- **Session tracking**: `carmarket365_redirect_shown` in sessionStorage

## Implementation Details

### Files Structure
```
shared/
├── geolocation-service.ts     # Core IP geolocation logic
├── redirect-service.ts        # Redirect and preference management
└── country-config.ts          # Country/language definitions

client/
├── contexts/CountryContext.tsx    # Country state management
├── hooks/useGeolocation.ts        # Geolocation React hook
├── components/
│   ├── RedirectDialog.tsx         # User-friendly redirect dialog
│   ├── CountrySwitcher.tsx        # Manual country selection
│   └── DevSubdomainTester.tsx     # Development testing tool
```

### Key Components

#### GeolocationService
```typescript
// Detect country from IP
const result = await geolocationService.detectCountry();
// Get recommended country for our platform
const country = await geolocationService.getRecommendedCountry();
```

#### RedirectService
```typescript
// Check if should redirect
const { shouldRedirect, targetCountry } = await redirectService.shouldRedirect();
// Perform redirect
redirectService.redirectToCountry(targetCountry);
```

#### CountryContext
Provides country/language state throughout the app:
```typescript
const { 
  country, 
  detectedCountry, 
  isGeolocationLoading 
} = useCountry();
```

## Development Testing

### Dev Subdomain Tester
- **Location**: Floating widget in top-right corner (dev only)
- **Features**:
  - Switch between country subdomains
  - Test IP geolocation with refresh button
  - View raw geolocation data
  - See detected country vs current country

### Manual Testing URLs
```bash
# Test different country subdomains locally
http://mk.localhost:5173  # North Macedonia
http://al.localhost:5173  # Albania  
http://xk.localhost:5173  # Kosovo
http://si.localhost:5173  # Slovenia
http://lv.localhost:5173  # Latvia
```

### Hosts File Setup (Optional)
Add to `/etc/hosts` (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts`:
```
127.0.0.1 mk.localhost
127.0.0.1 al.localhost  
127.0.0.1 xk.localhost
127.0.0.1 si.localhost
127.0.0.1 lv.localhost
```

## Production Configuration

### Environment Variables (Optional)
```env
# For production IP geolocation services that require API keys
VITE_IPSTACK_API_KEY=your_api_key
VITE_MAXMIND_LICENSE_KEY=your_license_key
```

### DNS Configuration
```bash
# Required DNS records
A mk.carmarket365.com → [SERVER_IP]
A al.carmarket365.com → [SERVER_IP]  
A xk.carmarket365.com → [SERVER_IP]
A si.carmarket365.com → [SERVER_IP]
A lv.carmarket365.com → [SERVER_IP]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name carmarket365.com mk.carmarket365.com al.carmarket365.com xk.carmarket365.com si.carmarket365.com lv.carmarket365.com;
    
    root /var/www/carmarket365;
    index index.html;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Pass country info to backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header X-Country $server_name;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Performance Considerations

### Caching
- **Geolocation results**: Cached for 30 minutes
- **User preferences**: Stored permanently in localStorage
- **Session tracking**: Cleared on browser close

### Fallback Strategy
1. Try IP-API.com (free, reliable)
2. Fallback to IPify + mock data
3. Final fallback to timezone detection
4. Default to North Macedonia if all fail

### Error Handling
- All geolocation failures are gracefully handled
- Users never see errors, just stay on global site
- Console logging for debugging
- Retry mechanisms available

## Analytics & Monitoring

### Recommended Tracking
- Geolocation detection success rate
- User redirect acceptance rate
- Country detection accuracy
- API response times
- Fallback provider usage

### Debug Information
Available in browser console:
```javascript
// Test geolocation manually
geolocationService.detectCountry().then(console.log);

// Clear cache and retry
geolocationService.clearCache();

// Check user preference
redirectService.getUserPreference();
```

## Privacy & Compliance

### Data Collection
- **IP Address**: Used only for geolocation, not stored
- **Country Detection**: Country code stored in localStorage
- **User Preferences**: Language/country choices stored locally
- **No Personal Data**: System doesn't collect personal information

### GDPR Compliance
- User consent implied by using the service
- Users can change country preference anytime
- Data stored locally (user controlled)
- No cross-border data transfer for geolocation

## Troubleshooting

### Common Issues

1. **Geolocation Not Working**
   - Check browser console for errors
   - Verify IP-API.com is accessible
   - Test with dev subdomain tester

2. **Wrong Country Detected**
   - IP geolocation isn't 100% accurate
   - Users can manually switch countries
   - VPN/proxy users may get wrong location

3. **Redirect Loop**
   - Check localStorage preferences
   - Clear sessionStorage redirect tracking
   - Verify DNS configuration

### Debug Commands
```javascript
// Clear all preferences
localStorage.removeItem('carmarket365_country_preference');
sessionStorage.removeItem('carmarket365_redirect_shown');

// Force fresh geolocation
geolocationService.clearCache();
window.location.reload();
```