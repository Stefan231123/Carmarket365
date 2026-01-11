# CarMarket365 - Multi-Country Subdomain Configuration

## Subdomain Setup

The application is configured to support the following country-specific subdomains:

### Countries and Languages

| Country | Subdomain | Languages Available | Default Language |
|---------|-----------|-------------------|------------------|
| 🇲🇰 North Macedonia | `mk.carmarket365.com` | Macedonian, Albanian | Macedonian |
| 🇦🇱 Albania | `al.carmarket365.com` | Albanian | Albanian |
| 🇽🇰 Kosovo | `xk.carmarket365.com` | Albanian | Albanian |
| 🇸🇮 Slovenia | `si.carmarket365.com` | Slovenian | Slovenian |
| 🇱🇻 Latvia | `lv.carmarket365.com` | Latvian, Russian | Latvian |

### Language Selector Behavior

- **Multi-language countries** (North Macedonia, Latvia): Show language selector dropdown in header
- **Single-language countries** (Albania, Kosovo, Slovenia): Show only country and language info, no dropdown

## DNS Configuration Required

For production deployment, configure the following DNS records:

```
A mk.carmarket365.com → [SERVER_IP]
A al.carmarket365.com → [SERVER_IP]
A xk.carmarket365.com → [SERVER_IP]
A si.carmarket365.com → [SERVER_IP]
A lv.carmarket365.com → [SERVER_IP]
```

## Web Server Configuration (Nginx)

```nginx
server {
    listen 80;
    server_name mk.carmarket365.com al.carmarket365.com xk.carmarket365.com si.carmarket365.com lv.carmarket365.com;
    
    root /var/www/carmarket365;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Set country header for backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Country $server_name;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Development Testing

1. **Using the Dev Subdomain Tester**: 
   - A floating widget appears in development mode
   - Click to switch between country subdomains
   - Test different language configurations

2. **Manual Hosts File Testing**:
   Add to `/etc/hosts` (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
   ```
   127.0.0.1 mk.localhost
   127.0.0.1 al.localhost
   127.0.0.1 xk.localhost
   127.0.0.1 si.localhost
   127.0.0.1 lv.localhost
   ```

3. **Test URLs**:
   - `http://mk.localhost:5173` - North Macedonia (Macedonian/Albanian)
   - `http://al.localhost:5173` - Albania (Albanian only)
   - `http://xk.localhost:5173` - Kosovo (Albanian only)
   - `http://si.localhost:5173` - Slovenia (Slovenian only)
   - `http://lv.localhost:5173` - Latvia (Latvian/Russian)

## Implementation Details

### Country Detection
- Automatic detection based on subdomain
- Fallback to North Macedonia in development
- Language preference stored per country in localStorage

### File Structure
```
shared/
├── country-config.ts          # Country and language definitions
client/
├── contexts/
│   └── CountryContext.tsx    # Country/language state management
├── components/
│   ├── LanguageSelector.tsx  # Updated with conditional rendering
│   └── DevSubdomainTester.tsx # Development testing tool
```

### Language Codes
- `mk` - Macedonian (Македонски)
- `sq` - Albanian (Shqip)  
- `sl` - Slovenian (Slovenščina)
- `lv` - Latvian (Latviešu)
- `ru` - Russian (Русский)

## Deployment Checklist

- [ ] Configure DNS records for all subdomains
- [ ] Set up SSL certificates for each subdomain
- [ ] Configure web server to serve same build to all subdomains
- [ ] Test language detection and switching
- [ ] Verify localStorage persistence per country
- [ ] Remove development tester component in production
- [ ] Test with actual devices/browsers in target countries