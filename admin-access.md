# CarMarket365 - Admin Access to Global Site

## Admin Access Methods

### URL Parameters

To access the global site without customer redirect prompts, use these URL parameters:

1. **Admin Mode**: `?admin=1`
   ```
   https://carmarket365.com/?admin=1
   ```

2. **No Redirect Mode**: `?no-redirect=1`  
   ```
   https://carmarket365.com/?no-redirect=1
   ```

### What These Parameters Do

- **Disables automatic redirect dialogs** - customers won't see them
- **Enables admin features** in the Country Switcher
- **Shows "Stay on Global Site (Admin)" option** in country selection
- **Bypasses all customer-facing redirect logic**
- **Maintains global site access** for testing and administration

### Admin Features Available

#### In Country Switcher (with admin mode):
- **Orange "Stay on Global Site (Admin)" button**
- **Admin/testing mode indicator**
- **Warning that this isn't available to customers**

#### System Behavior:
- **Regular customers**: Always redirected to country-specific subdomains
- **Admin with parameters**: Can stay on global site and access all features
- **No UI hints for customers**: Global site option completely hidden

### Use Cases

1. **Testing**: Test global site functionality without redirects
2. **Administration**: Access admin panels or global content management
3. **Development**: Debug issues across all country configurations
4. **Analytics**: View global analytics without country filtering

### Customer Experience (No Admin Params)

1. Visit `carmarket365.com`
2. System detects country from IP
3. Shows dialog: "Continue to [Country] site" or "Choose different country"
4. **No global site option shown**
5. Must select a country to continue

### Security Notes

- **URL parameters are visible** - not meant for sensitive admin access
- **No authentication** - anyone can use these parameters
- **For convenience only** - add proper authentication for sensitive operations
- **Global site remains accessible** - just hidden from customer UI

### Implementation Details

#### Files Modified:
- `redirect-service.ts`: Added URL parameter checks
- `CountrySwitcher.tsx`: Admin mode detection and conditional UI
- `CountryContext.tsx`: Restored global site support

#### Logic Flow:
```typescript
// Check for admin parameters
const urlParams = new URLSearchParams(window.location.search);
const isAdminMode = urlParams.has('admin') || urlParams.has('no-redirect');

if (isAdminMode) {
  // Skip customer redirects
  // Show admin options in UI
  // Allow global site access
} else {
  // Normal customer flow
  // Force country selection
  // Hide global site option
}
```