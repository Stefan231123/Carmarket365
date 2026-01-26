#!/usr/bin/env python3
"""
Fix remaining duplicate keys across all translation files
This script handles more complex duplicate patterns including nested duplicates
"""
import re
import sys
import os

def read_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def write_file(file_path, content):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully wrote {file_path}")
        return True
    except Exception as e:
        print(f"Error writing file {file_path}: {e}")
        return False

def find_all_duplicate_keys(content):
    """Find all duplicate keys at all levels, including nested objects"""
    lines = content.split('\n')
    
    # Stack to track nested objects
    stack = []
    # Track keys at each level 
    key_trackers = [{}]  # Start with root level
    duplicates = []
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        
        # Count braces to track nesting level
        open_braces = line.count('{')
        close_braces = line.count('}')
        
        # Handle closing braces
        for _ in range(close_braces):
            if len(key_trackers) > 1:
                key_trackers.pop()
        
        # Look for key definitions
        key_match = re.match(r'^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*', line)
        if key_match:
            key = key_match.group(1)
            current_level = len(key_trackers) - 1
            
            # Check current level for duplicates
            if key in key_trackers[-1]:
                duplicates.append({
                    'key': key,
                    'first_line': key_trackers[-1][key],
                    'duplicate_line': i,
                    'line_content': line.strip(),
                    'level': current_level
                })
                print(f"Duplicate key '{key}' found at level {current_level}:")
                print(f"  First occurrence: line {key_trackers[-1][key]}")
                print(f"  Duplicate: line {i} -> {line.strip()}")
            else:
                key_trackers[-1][key] = i
        
        # Handle opening braces - create new nesting level
        for _ in range(open_braces):
            key_trackers.append({})
    
    return duplicates

def remove_duplicate_key_simple(content, key, duplicate_line_num):
    """Remove a simple key:value duplicate"""
    lines = content.split('\n')
    line_index = duplicate_line_num - 1
    
    if line_index < len(lines):
        line = lines[line_index]
        # Check if this is a simple key:value line (no opening brace)
        if ':' in line and '{' not in line:
            # Remove this single line
            lines.pop(line_index)
            print(f"  Removed simple duplicate '{key}' at line {duplicate_line_num}")
        else:
            # This is an object, find its closing brace
            brace_count = line.count('{') - line.count('}')
            end_line = line_index
            
            for i in range(line_index + 1, len(lines)):
                brace_count += lines[i].count('{') - lines[i].count('}')
                if brace_count == 0:
                    end_line = i
                    break
            
            # Remove the entire section
            for i in range(end_line, line_index - 1, -1):
                lines.pop(i)
            
            print(f"  Removed object duplicate '{key}' from lines {duplicate_line_num}-{end_line + 1}")
    
    return '\n'.join(lines)

def fix_file_duplicates(file_path):
    """Fix duplicates in a single file"""
    print(f"\n=== Processing {file_path} ===")
    
    content = read_file(file_path)
    if content is None:
        return False
    
    # Create backup
    backup_path = file_path + '.backup-final-fix'
    write_file(backup_path, content)
    print(f"Created backup: {backup_path}")
    
    # Multiple passes to catch all duplicates
    max_passes = 5
    for pass_num in range(max_passes):
        print(f"\nPass {pass_num + 1}:")
        duplicates = find_all_duplicate_keys(content)
        
        if not duplicates:
            print(f"No duplicates found in pass {pass_num + 1}")
            break
            
        print(f"Found {len(duplicates)} duplicates in pass {pass_num + 1}")
        
        # Sort duplicates by line number in reverse order (remove from bottom up)
        duplicates.sort(key=lambda x: x['duplicate_line'], reverse=True)
        
        # Remove duplicates
        for duplicate in duplicates:
            content = remove_duplicate_key_simple(content, duplicate['key'], duplicate['duplicate_line'])
    
    # Write cleaned content
    if write_file(file_path, content):
        # Final verification
        final_duplicates = find_all_duplicate_keys(content)
        if final_duplicates:
            print(f"WARNING: {len(final_duplicates)} duplicates still remain!")
            for dup in final_duplicates[:5]:  # Show first 5
                print(f"  {dup['key']} at line {dup['duplicate_line']}")
        else:
            print("✅ All duplicates successfully removed!")
        return True
    else:
        print("❌ Failed to write cleaned file")
        return False

def main():
    translation_files = [
        '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts',
        '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/sq.ts',
        '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts'
    ]
    
    success_count = 0
    
    for file_path in translation_files:
        if os.path.exists(file_path):
            if fix_file_duplicates(file_path):
                success_count += 1
        else:
            print(f"❌ File not found: {file_path}")
    
    print(f"\n=== Summary ===")
    print(f"Successfully processed {success_count}/{len(translation_files)} files")
    
    if success_count == len(translation_files):
        print("🎉 All translation files cleaned successfully!")
    else:
        print("⚠️  Some files could not be processed")

if __name__ == '__main__':
    main()