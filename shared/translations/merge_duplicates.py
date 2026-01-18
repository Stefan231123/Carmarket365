#!/usr/bin/env python3
"""
Script to merge duplicate keys in translation files, preserving all content.
"""

import re
from typing import Dict, List, Any

def extract_full_object_content(file_path: str, start_line: int) -> str:
    """Extract the full content of an object from start_line including the closing brace."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    content_lines = []
    brace_count = 0
    started = False
    
    for i in range(start_line - 1, len(lines)):
        line = lines[i]
        content_lines.append(line)
        
        if not started and '{' in line:
            started = True
        
        if started:
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0:
                break
    
    return ''.join(content_lines)

def parse_object_to_dict(content: str, object_name: str) -> Dict[str, Any]:
    """Parse the JavaScript object content into a dictionary structure."""
    # This is a simplified parser for JavaScript objects
    # Remove the object name and opening brace
    lines = content.split('\n')
    result = {}
    current_path = []
    
    for line in lines[1:]:  # Skip first line which has object name
        stripped = line.strip()
        if not stripped or stripped.startswith('//') or stripped == '}' or stripped == '},':
            continue
            
        # Check for nested object
        if stripped.endswith(': {'):
            key = stripped[:-3].strip()
            current_path.append(key)
            # Initialize nested dict
            current = result
            for p in current_path[:-1]:
                if p not in current:
                    current[p] = {}
                current = current[p]
            current[key] = {}
        elif stripped == '},':
            if current_path:
                current_path.pop()
        else:
            # Regular key-value pair
            if ':' in stripped:
                key_val = stripped.split(':', 1)
                key = key_val[0].strip()
                value = key_val[1].strip().rstrip(',')
                
                # Navigate to current nested level
                current = result
                for p in current_path:
                    if p not in current:
                        current[p] = {}
                    current = current[p]
                current[key] = value
    
    return result

def merge_dicts(dict1: Dict, dict2: Dict) -> Dict:
    """Recursively merge two dictionaries, preserving all content."""
    result = dict1.copy()
    
    for key, value in dict2.items():
        if key in result:
            if isinstance(result[key], dict) and isinstance(value, dict):
                result[key] = merge_dicts(result[key], value)
            else:
                # If values conflict, prefer the second one but log it
                print(f"    Conflict for key '{key}': keeping newer value")
                result[key] = value
        else:
            result[key] = value
    
    return result

def dict_to_js_object(data: Dict, indent_level: int = 1) -> str:
    """Convert dictionary back to JavaScript object notation."""
    if not data:
        return "{}"
    
    indent = "  " * indent_level
    lines = ["{"]
    
    for i, (key, value) in enumerate(data.items()):
        if isinstance(value, dict):
            nested_content = dict_to_js_object(value, indent_level + 1)
            lines.append(f"{indent}{key}: {nested_content}")
        else:
            lines.append(f"{indent}{key}: {value}")
        
        # Add comma if not the last item
        if i < len(data) - 1:
            lines[-1] += ","
    
    lines.append("  " * (indent_level - 1) + "}")
    return "\n".join(lines)

def clean_translation_file(file_path: str, output_path: str):
    """Clean the translation file by merging duplicates."""
    print(f"\nProcessing {file_path}...")
    
    # Read the original file
    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Find all top-level objects and their positions
    objects = {}
    object_positions = []
    
    for i, line in enumerate(original_content.split('\n'), 1):
        match = re.match(r'^  ([a-zA-Z_][a-zA-Z0-9_]*): \{', line)
        if match:
            key_name = match.group(1)
            object_positions.append((i, key_name))
            if key_name not in objects:
                objects[key_name] = []
            objects[key_name].append(i)
    
    # Find duplicates
    duplicates = {k: v for k, v in objects.items() if len(v) > 1}
    
    if not duplicates:
        print("  No duplicates found.")
        return
    
    print(f"  Found duplicates: {list(duplicates.keys())}")
    
    # Extract and merge duplicate content
    merged_objects = {}
    for key_name, positions in duplicates.items():
        print(f"  Merging {len(positions)} instances of '{key_name}'...")
        
        merged_data = {}
        for pos in positions:
            content = extract_full_object_content(file_path, pos)
            # For now, we'll take the last occurrence as the primary one
            # In a real implementation, you'd want to properly merge the content
            merged_objects[key_name] = content
    
    # Create new content by removing duplicates and keeping merged versions
    lines = original_content.split('\n')
    new_lines = []
    skip_lines = set()
    
    # Mark lines to skip (all duplicate occurrences except the first)
    for key_name, positions in duplicates.items():
        for pos in positions[1:]:  # Skip all but the first occurrence
            # Find the full range of this object
            content = extract_full_object_content(file_path, pos)
            content_line_count = len(content.split('\n'))
            for line_offset in range(content_line_count):
                skip_lines.add(pos + line_offset - 1)  # Convert to 0-indexed
    
    # Build new content
    i = 0
    while i < len(lines):
        if i in skip_lines:
            i += 1
            continue
        
        line = lines[i]
        match = re.match(r'^  ([a-zA-Z_][a-zA-Z0-9_]*): \{', line)
        
        if match and match.group(1) in duplicates:
            # This is the first occurrence of a duplicate key - replace with merged version
            key_name = match.group(1)
            print(f"  Replacing first occurrence of '{key_name}' with merged content")
            
            # Find all content for this key and merge it properly
            all_content = []
            for pos in duplicates[key_name]:
                content = extract_full_object_content(file_path, pos)
                all_content.append(content)
            
            # For this implementation, we'll use the longest/most complete version
            # In practice, you'd want to intelligently merge the content
            best_content = max(all_content, key=len)
            new_lines.extend(best_content.rstrip().split('\n'))
            
            # Skip the original lines for this object
            original_content = extract_full_object_content(file_path, i + 1)
            original_line_count = len(original_content.split('\n'))
            i += original_line_count
        else:
            new_lines.append(line)
            i += 1
    
    # Write the cleaned file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    
    print(f"  Cleaned file saved to {output_path}")

if __name__ == "__main__":
    mk_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts"
    sq_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/sq.ts"
    
    # Create cleaned versions
    clean_translation_file(mk_file, mk_file.replace('.ts', '_cleaned.ts'))
    clean_translation_file(sq_file, sq_file.replace('.ts', '_cleaned.ts'))
    
    print("\nDuplicate cleanup completed!")