#!/bin/bash

# Fix features array translations

# Basic features
sed -i '' 's/Konditsionotr/Air Conditioning/g' en.ts
sed -i '' 's/Kozhan sidenya/Leather Seats/g' en.ts
sed -i '' 's/Navigatsionn sistema/Navigation System/g' en.ts
sed -i '' 's/USB port/USB Ports/g' en.ts
sed -i '' 's/Kamera zadnotgo vida/Backup Camera/g' en.ts
sed -i '' 's/Parkovochn datchiki/Parking Sensors/g' en.ts
sed -i '' 's/Podogrev sideniy/Heated Seats/g' en.ts
sed -i '' 's/Lit diski/Alloy Wheels/g' en.ts
sed -i '' 's/Kruiz-kontrol/Cruise Control/g' en.ts
sed -i '' 's/Sistema stabilizatsii/Stability Control/g' en.ts
sed -i '' 's/Podushki safetyi/Airbags/g' en.ts

# Advanced features
sed -i '' 's/Distantsion zapusk/Remote Start/g' en.ts
sed -i '' 's/Besklyuchevoy access/Keyless Entry/g' en.ts
sed -i '' 's/Elektrosteklopodemniki/Power Windows/g' en.ts
sed -i '' 's/Usilitel rulya/Power Steering/g' en.ts
sed -i '' 's/Tonirovann stekla/Tinted Windows/g' en.ts
sed -i '' 's/Premium audiosistema/Premium Sound System/g' en.ts
sed -i '' 's/Sputnikov radio/Satellite Radio/g' en.ts
sed -i '' 's/CD-proigryvatel/CD Player/g' en.ts
sed -i '' 's/MP3-proigryvatel/MP3 Player/g' en.ts
sed -i '' 's/DVD-proigryvatel/DVD Player/g' en.ts
sed -i '' 's/Besprovodn zaryadka/Wireless Charging/g' en.ts

# Safety features
sed -i '' 's/Preduprezhdenie o vode iz polosy/Lane Departure Warning/g' en.ts
sed -i '' 's/Kontrol slep zon/Blind Spot Monitoring/g' en.ts
sed -i '' 's/Preduprezhdenie o stolknovenii/Collision Warning/g' en.ts
sed -i '' 's/Avtomatichesk ekstrenn tormozhenie/Automatic Emergency Braking/g' en.ts
sed -i '' 's/Adaptiv kruiz-kontrol/Adaptive Cruise Control/g' en.ts
sed -i '' 's/Help pri parkovke/Parking Assist/g' en.ts
sed -i '' 's/360-gradusn kamera/360-Degree Camera/g' en.ts

# Comfort features
sed -i '' 's/Podogrev rulya/Heated Steering Wheel/g' en.ts
sed -i '' 's/Okhlazhdenie sideniy/Cooled Seats/g' en.ts
sed -i '' 's/Ventilyation sideniy/Ventilated Seats/g' en.ts
sed -i '' 's/Pamyat sideniy/Memory Seats/g' en.ts
sed -i '' 's/Elektroregulirovka sideniy/Power Adjustable Seats/g' en.ts
sed -i '' 's/Trthesey ryad sideniy/Third Row Seating/g' en.ts
sed -i '' 's/Skladn zadnie sidenya/Folding Rear Seats/g' en.ts
sed -i '' 's/Shtorka bagazhnika/Cargo Cover/g' en.ts
sed -i '' 's/Bagazhnik na kryshe/Roof Rack/g' en.ts
sed -i '' 's/Buksirovoch paket/Towing Package/g' en.ts
sed -i '' 's/Podnozhki/Running Boards/g' en.ts
sed -i '' 's/Bokov stupenki/Side Steps/g' en.ts

echo "Features translations completed."