#!/usr/bin/env python3
"""
Fix duplicate keys in mk.ts translation file
"""
import re
import sys

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

def find_duplicate_keys(content):
    """Find all duplicate keys in the translation object"""
    # Match object keys at root level
    key_pattern = r'^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*{'
    
    lines = content.split('\n')
    keys_found = {}
    duplicates = []
    
    for i, line in enumerate(lines, 1):
        match = re.search(key_pattern, line)
        if match:
            key = match.group(1)
            if key in keys_found:
                duplicates.append({
                    'key': key,
                    'first_line': keys_found[key],
                    'duplicate_line': i,
                    'line_content': line.strip()
                })
                print(f"Duplicate key '{key}' found:")
                print(f"  First occurrence: line {keys_found[key]}")
                print(f"  Duplicate: line {i} -> {line.strip()}")
            else:
                keys_found[key] = i
    
    return duplicates

def remove_duplicate_sections(content, duplicates):
    """Remove duplicate sections from content"""
    lines = content.split('\n')
    lines_to_remove = set()
    
    for duplicate in duplicates:
        # Find the complete section to remove
        start_line = duplicate['duplicate_line'] - 1  # Convert to 0-based index
        
        # Find the closing bracket for this section
        brace_count = 0
        end_line = start_line
        
        for i in range(start_line, len(lines)):
            line = lines[i]
            brace_count += line.count('{') - line.count('}')
            
            if brace_count == 0 and i > start_line:
                end_line = i
                break
        
        # Mark lines for removal
        for i in range(start_line, min(end_line + 1, len(lines))):
            lines_to_remove.add(i)
            
        print(f"Removing duplicate '{duplicate['key']}' section: lines {start_line + 1}-{end_line + 1}")
    
    # Remove marked lines
    cleaned_lines = []
    for i, line in enumerate(lines):
        if i not in lines_to_remove:
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)

def main():
    file_path = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts'
    
    # Read the file
    content = read_file(file_path)
    if content is None:
        sys.exit(1)
    
    print(f"Analyzing {file_path}...")
    
    # Find duplicates
    duplicates = find_duplicate_keys(content)
    
    if not duplicates:
        print("No duplicate keys found!")
        return
    
    print(f"\nFound {len(duplicates)} duplicate key(s)")
    
    # Create backup
    backup_path = file_path + '.backup-duplicate-fix'
    if write_file(backup_path, content):
        print(f"Created backup: {backup_path}")
    
    # Remove duplicates
    cleaned_content = remove_duplicate_sections(content, duplicates)
    
    # Write cleaned content
    if write_file(file_path, cleaned_content):
        print(f"Successfully cleaned {file_path}")
        
        # Verify no duplicates remain
        print("\nVerifying cleanup...")
        remaining_duplicates = find_duplicate_keys(cleaned_content)
        if remaining_duplicates:
            print(f"WARNING: {len(remaining_duplicates)} duplicates still remain!")
        else:
            print("✅ All duplicates successfully removed!")
    else:
        print("Failed to write cleaned file")
        sys.exit(1)

if __name__ == '__main__':
    main()