#!/bin/bash

# Replace specific 'English' placeholders with appropriate translations

# Country names
sed -i '' "s/city: 'English'/city: 'City'/g" en.ts
sed -i '' "s/germany: 'English'/germany: 'Germany'/g" en.ts
sed -i '' "s/austria: 'English'/austria: 'Austria'/g" en.ts
sed -i '' "s/switzerland: 'English'/switzerland: 'Switzerland'/g" en.ts
sed -i '' "s/nottherlands: 'English'/nottherlands: 'Netherlands'/g" en.ts
sed -i '' "s/belgium: 'English'/belgium: 'Belgium'/g" en.ts
sed -i '' "s/france: 'English'/france: 'France'/g" en.ts
sed -i '' "s/italy: 'English'/italy: 'Italy'/g" en.ts
sed -i '' "s/spain: 'English'/spain: 'Spain'/g" en.ts

# Form validations
sed -i '' "s/required: 'English'/required: 'Required'/g" en.ts

# Car makes - replace individual 'English' entries with actual car brands
sed -i '' "s/'English', 'Honda'/'Toyota', 'Honda'/g" en.ts
sed -i '' "s/'Nissan', 'English'/'Nissan', 'Hyundai'/g" en.ts
sed -i '' "s/'EUR', 'English'/'Chevrolet', 'Chrysler'/g" en.ts

# Features
sed -i '' "s/sunroof: 'English'/sunroof: 'Sunroof'/g" en.ts

# Countries/Regions
sed -i '' "s/albania: 'English'/albania: 'Albania'/g" en.ts
sed -i '' "s/slovenia: 'English'/slovenia: 'Slovenia'/g" en.ts

# Common form fields
sed -i '' "s/any: 'English'/any: 'Any'/g" en.ts
sed -i '' "s/electric: 'English'/electric: 'Electric'/g" en.ts

# Body types - replace 'English' placeholders with actual body types
sed -i '' "s/'Sports Car', 'English', 'English', 'Hybrid'/'Sports Car', 'Luxury', 'Economy', 'Hybrid'/g" en.ts

# Fuel types - replace with actual fuel type
sed -i '' "s/'Hybrid', 'English', 'Plug-in Hybrid'/'Hybrid', 'Electric', 'Plug-in Hybrid'/g" en.ts

# Colors - replace color placeholders
sed -i '' "s/'Black', 'English', 'English', 'English', 'English', 'English', 'Red'/'Black', 'White', 'Silver', 'Gray', 'Blue', 'Maroon', 'Red'/g" en.ts
sed -i '' "s/'English', 'English', 'English', 'English', 'English', 'Tan'/'Brown', 'Gold', 'Yellow', 'Orange', 'Purple', 'Tan'/g" en.ts
sed -i '' "s/'Charcoal', 'English', 'English'/'Charcoal', 'Navy', 'Beige'/g" en.ts

# Conditions
sed -i '' "s/'Refurbished', 'English', 'Vintage'/'Refurbished', 'Salvage', 'Vintage'/g" en.ts

# Features with 'English' placeholders
sed -i '' "s/'Heated Seats', 'English', 'Alloy Wheels'/'Heated Seats', 'Moonroof', 'Alloy Wheels'/g" en.ts

# General UI elements
sed -i '' "s/reviews: 'English'/reviews: 'Reviews'/g" en.ts
sed -i '' "s/results: 'English'/results: 'Results'/g" en.ts
sed -i '' "s/lastName: 'English'/lastName: 'Last Name'/g" en.ts
sed -i '' "s/notifications: 'English'/notifications: 'Notifications'/g" en.ts
sed -i '' "s/newest: 'English'/newest: 'Newest'/g" en.ts
sed -i '' "s/oldest: 'English'/oldest: 'Oldest'/g" en.ts
sed -i '' "s/notxt: 'English'/notxt: 'No'/g" en.ts
sed -i '' "s/motorcycles: 'English'/motorcycles: 'Motorcycles'/g" en.ts
sed -i '' "s/luxury: 'English'/luxury: 'Luxury'/g" en.ts
sed -i '' "s/subscribe: 'English'/subscribe: 'Subscribe'/g" en.ts
sed -i '' "s/country: 'English'/country: 'Country'/g" en.ts
sed -i '' "s/inquiries: 'English'/inquiries: 'Inquiries'/g" en.ts
sed -i '' "s/title: 'English'/title: 'Title'/g" en.ts
sed -i '' "s/november: 'English'/november: 'November'/g" en.ts
sed -i '' "s/views: 'English'/views: 'Views'/g" en.ts
sed -i '' "s/actions: 'English'/actions: 'Actions'/g" en.ts
sed -i '' "s/conversionRate: 'English'/conversionRate: 'Conversion Rate'/g" en.ts
sed -i '' "s/category: 'English'/category: 'Category'/g" en.ts
sed -i '' "s/joinotdOn: 'English'/joinotdOn: 'Joined On'/g" en.ts
sed -i '' "s/disputes: 'English'/disputes: 'Disputes'/g" en.ts
sed -i '' "s/componotnts: 'English'/componotnts: 'Components'/g" en.ts
sed -i '' "s/forms: 'English'/forms: 'Forms'/g" en.ts
sed -i '' "s/languages: 'English'/languages: 'Languages'/g" en.ts
sed -i '' "s/enabled: 'English'/enabled: 'Enabled'/g" en.ts
sed -i '' "s/disabled: 'English'/disabled: 'Disabled'/g" en.ts
sed -i '' "s/transmission: 'English'/transmission: 'Transmission'/g" en.ts
sed -i '' "s/register: 'English'/register: 'Register'/g" en.ts
sed -i '' "s/signIn: 'English'/signIn: 'Sign In'/g" en.ts
sed -i '' "s/signUp: 'English'/signUp: 'Sign Up'/g" en.ts
sed -i '' "s/signOut: 'English'/signOut: 'Sign Out'/g" en.ts
sed -i '' "s/connect: 'English'/connect: 'Connect'/g" en.ts
sed -i '' "s/sortByDistance: 'English'/sortByDistance: 'Sort by Distance'/g" en.ts
sed -i '' "s/sortByRating: 'English'/sortByRating: 'Sort by Rating'/g" en.ts
sed -i '' "s/hybrids: 'English'/hybrids: 'Hybrids'/g" en.ts
sed -i '' "s/convertibles: 'English'/convertibles: 'Convertibles'/g" en.ts
sed -i '' "s/specialtyLabel: 'English'/specialtyLabel: 'Specialty'/g" en.ts
sed -i '' "s/certificationsHeader: 'English'/certificationsHeader: 'Certifications'/g" en.ts
sed -i '' "s/featured: 'English'/featured: 'Featured'/g" en.ts
sed -i '' "s/inspection: 'English'/inspection: 'Inspection'/g" en.ts
sed -i '' "s/history: 'English'/history: 'History'/g" en.ts
sed -i '' "s/dealerRating: 'English'/dealerRating: 'Dealer Rating'/g" en.ts
sed -i '' "s/'English': 'Hybrid'/'Electric': 'Hybrid'/g" en.ts
sed -i '' "s/filters: 'English'/filters: 'Filters'/g" en.ts
sed -i '' "s/warranty: 'English'/warranty: 'Warranty'/g" en.ts
sed -i '' "s/contact: 'English'/contact: 'Contact'/g" en.ts

echo "English placeholders fix completed."