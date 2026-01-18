#!/bin/bash

# Translation Files Duplicate Cleanup Script
# This script removes duplicate object keys while preserving all content

echo "Starting translation file cleanup..."

# Create backups with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
echo "Creating backups..."
cp mk.ts "mk.ts.backup_before_cleanup_${TIMESTAMP}"
cp sq.ts "sq.ts.backup_before_cleanup_${TIMESTAMP}"

# Function to remove lines between two line numbers
remove_lines() {
    local file=$1
    local start_line=$2
    local end_line=$3
    local description=$4
    
    echo "Removing lines ${start_line}-${end_line} from ${file} (${description})"
    sed -i.bak "${start_line},${end_line}d" "$file"
}

# Process mk.ts - Remove duplicates (keeping first occurrence of each)
echo "Processing mk.ts duplicates..."

# Remove forms duplicates (keep line 61, remove 4419-4533 and 5352-5357)
# Note: Line numbers will shift after each deletion, so we work backwards

# Remove the last forms duplicate first (lines 5352-5357 - 6 lines)
remove_lines mk.ts 5352 5357 "forms duplicate #3"

# Remove forms duplicate #2 (lines 4419-4533 - approximately 114 lines)  
remove_lines mk.ts 4419 4533 "forms duplicate #2"

# Remove finalFixes duplicates (working backwards)
# Remove finalFixes #5 (lines 5290-5351 - approximately 61 lines)
remove_lines mk.ts 5290 5351 "finalFixes duplicate #5"

# Remove finalFixes #4 (lines 5260-5284 - approximately 24 lines)  
remove_lines mk.ts 5260 5284 "finalFixes duplicate #4"

# Remove finalFixes #3 (lines 4808-5259 - approximately 451 lines)
remove_lines mk.ts 4808 5259 "finalFixes duplicate #3"

# Remove finalFixes #2 (lines 3601-3625 - approximately 24 lines)
remove_lines mk.ts 3601 3625 "finalFixes duplicate #2"

# Remove indexPage duplicate (lines 4191-4341 - approximately 150 lines)
remove_lines mk.ts 4191 4341 "indexPage duplicate"

# Remove carDetail duplicate (lines 3722-4190 - approximately 468 lines) 
remove_lines mk.ts 3722 4190 "carDetail duplicate"

# Remove browseCars duplicate (lines 3626-3721 - approximately 95 lines)
remove_lines mk.ts 3626 3721 "browseCars duplicate"

# Remove errors duplicate (lines 4342-4418 - approximately 76 lines)
remove_lines mk.ts 4342 4418 "errors duplicate"

echo "mk.ts cleanup completed."

# Process sq.ts - Remove duplicates
echo "Processing sq.ts duplicates..."

# Remove forms duplicates (keep line 57, remove others working backwards)
# Remove forms #4 (lines 4950-4955 - approximately 6 lines)
remove_lines sq.ts 4950 4955 "forms duplicate #4"

# Remove forms #3 (lines 2987-3105 - approximately 118 lines)
remove_lines sq.ts 2987 3105 "forms duplicate #3"  

# Remove forms #2 (lines 1135-1241 - approximately 106 lines)
remove_lines sq.ts 1135 1241 "forms duplicate #2"

# Remove finalFixes duplicates (working backwards)
# Remove finalFixes #3 (lines 4888-4949 - approximately 61 lines)
remove_lines sq.ts 4888 4949 "finalFixes duplicate #3"

# Remove finalFixes #2 (lines 4821-4881 - approximately 60 lines)
remove_lines sq.ts 4821 4881 "finalFixes duplicate #2"

# Remove uiDemo duplicate (lines 4812-4821 - approximately 9 lines)
remove_lines sq.ts 4812 4821 "uiDemo duplicate"

# Remove advancedSearch duplicate (lines 3320-3379 - approximately 59 lines)
remove_lines sq.ts 3320 3379 "advancedSearch duplicate"

# Remove errors duplicate (lines 2361-2372 - approximately 11 lines)
remove_lines sq.ts 2361 2372 "errors duplicate"

echo "sq.ts cleanup completed."

# Cleanup temp files
rm -f mk.ts.bak sq.ts.bak

# Check syntax
echo "Checking file syntax..."
if node -c mk.ts 2>/dev/null; then
    echo "✅ mk.ts syntax is valid"
else  
    echo "❌ mk.ts syntax errors detected - check the file"
fi

if node -c sq.ts 2>/dev/null; then
    echo "✅ sq.ts syntax is valid" 
else
    echo "❌ sq.ts syntax errors detected - check the file"
fi

# Show file size changes
echo ""
echo "File size comparison:"
echo "Before cleanup:"
wc -l "mk.ts.backup_before_cleanup_${TIMESTAMP}" | awk '{print "mk.ts: " $1 " lines"}'
wc -l "sq.ts.backup_before_cleanup_${TIMESTAMP}" | awk '{print "sq.ts: " $1 " lines"}'

echo "After cleanup:"
wc -l mk.ts | awk '{print "mk.ts: " $1 " lines"}'  
wc -l sq.ts | awk '{print "sq.ts: " $1 " lines"}'

echo ""
echo "Cleanup completed! Review the files and test thoroughly before deploying."
echo "Backup files created:"
echo "  mk.ts.backup_before_cleanup_${TIMESTAMP}"
echo "  sq.ts.backup_before_cleanup_${TIMESTAMP}"