#!/bin/bash

# Script to add subdomain entries to /etc/hosts for CarMarket365 development
# Run with: sudo bash setup-hosts.sh

echo "Adding CarMarket365 subdomain entries to /etc/hosts..."

# Check if entries already exist
if grep -q "mk.localhost" /etc/hosts; then
  echo "mk.localhost already exists in /etc/hosts"
else
  echo "127.0.0.1 mk.localhost" >> /etc/hosts
  echo "Added mk.localhost"
fi

if grep -q "al.localhost" /etc/hosts; then
  echo "al.localhost already exists in /etc/hosts"
else
  echo "127.0.0.1 al.localhost" >> /etc/hosts
  echo "Added al.localhost"
fi

if grep -q "xk.localhost" /etc/hosts; then
  echo "xk.localhost already exists in /etc/hosts"
else
  echo "127.0.0.1 xk.localhost" >> /etc/hosts
  echo "Added xk.localhost"
fi

if grep -q "si.localhost" /etc/hosts; then
  echo "si.localhost already exists in /etc/hosts"
else
  echo "127.0.0.1 si.localhost" >> /etc/hosts
  echo "Added si.localhost"
fi

if grep -q "lv.localhost" /etc/hosts; then
  echo "lv.localhost already exists in /etc/hosts"
else
  echo "127.0.0.1 lv.localhost" >> /etc/hosts
  echo "Added lv.localhost"
fi

echo "Done! You can now access:"
echo "  http://mk.localhost:8081 (North Macedonia - Macedonian/Albanian)"
echo "  http://al.localhost:8081 (Albania - Albanian only)"
echo "  http://xk.localhost:8081 (Kosovo - Albanian only)"
echo "  http://si.localhost:8081 (Slovenia - Slovenian only)"
echo "  http://lv.localhost:8081 (Latvia - Latvian/Russian)"