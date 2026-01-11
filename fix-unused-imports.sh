#!/bin/bash

# Fix unused imports in TypeScript files
cd /Users/stefankocevski/documents/my-carmarket-frontend/flare-realm

# Run build to get error list and fix them
npm run build 2>&1 | grep "error TS6133" | while read line; do
    echo "Processing: $line"
done