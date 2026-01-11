#!/usr/bin/env python3

import re
import os

def read_file(filepath):
    """Read and return file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def remove_keys_from_translation(content, keys_to_remove):
    """Remove specified keys from the translation file"""
    
    # Group keys by their top-level sections for more efficient removal
    sections_to_remove = {}
    individual_keys_to_remove = []
    
    for key in keys_to_remove:
        parts = key.split('.')
        if len(parts) >= 2:
            section = parts[0]
            if section not in sections_to_remove:
                sections_to_remove[section] = []
            sections_to_remove[section].append('.'.join(parts[1:]))
        else:
            individual_keys_to_remove.append(key)
    
    print(f"Found {len(sections_to_remove)} sections with keys to remove:")
    for section, subkeys in sections_to_remove.items():
        print(f"  {section}: {len(subkeys)} keys")
    
    # Remove entire sections that should be completely deleted
    sections_to_completely_remove = ['business', 'carDetail', 'carSpecs', 'dashboard']
    
    for section in sections_to_completely_remove:
        # Find and remove the entire section
        pattern = rf'^\s*{re.escape(section)}:\s*\{{[^}}]*?\n\s*\}},'
        content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
        
        # Also try to match multi-line nested objects
        pattern = rf'^\s*{re.escape(section)}:\s*\{{.*?\n\s*\}},'
        matches = re.finditer(pattern, content, flags=re.MULTILINE | re.DOTALL)
        
        for match in matches:
            start_pos = match.start()
            # Find the matching closing brace by counting braces
            open_braces = 0
            pos = start_pos
            while pos < len(content):
                char = content[pos]
                if char == '{':
                    open_braces += 1
                elif char == '}':
                    open_braces -= 1
                    if open_braces == 0:
                        # Found the matching closing brace
                        # Look for a comma after the brace
                        end_pos = pos + 1
                        if end_pos < len(content) and content[end_pos] == ',':
                            end_pos += 1
                        # Include the newline if present
                        if end_pos < len(content) and content[end_pos] == '\n':
                            end_pos += 1
                        
                        # Remove the entire section
                        content = content[:start_pos] + content[end_pos:]
                        break
                pos += 1
    
    # Handle faq section - remove array items and specific properties
    if 'faq' in sections_to_remove:
        # Find the faq section and clean up array items
        faq_pattern = r'(faq:\s*\{[^}]*?)(answer|question|id|name|icon|color|faqs):\s*[^,\n]*,?([^}]*\})'
        content = re.sub(faq_pattern, r'\1\3', content, flags=re.MULTILINE | re.DOTALL)
        
        # Remove specific faq subsections
        faq_subsections = ['accountFaqs', 'buyingFaqs', 'financingFaqs', 'safetyFaqs', 'sellingFaqs', 'faqCategories', 'categories']
        for subsection in faq_subsections:
            pattern = rf'(\s+){re.escape(subsection)}:\s*[^,\n]*,'
            content = re.sub(pattern, '', content, flags=re.MULTILINE)
    
    # Handle indexPage section - remove specific keys but keep some
    if 'indexPage' in sections_to_remove:
        indexpage_keys_to_remove = [
            'cta', 'featuredListings', 'hero', 'howItWorks', 'newsletter', 
            'popularBrands', 'quickFilters', 'stats', 'testimonials'
        ]
        for key in indexpage_keys_to_remove:
            # Remove nested objects
            pattern = rf'(\s+){re.escape(key)}:\s*\{{[^}}]*?\n\s*\}},'
            content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
    
    # Handle pages section - remove specific keys
    if 'pages' in sections_to_remove:
        pages_keys_to_remove = [
            'about', 'accessibility', 'adminDashboard', 'advancedSearch', 'browseCars',
            'carDetail', 'carReviews', 'cookiePolicy', 'dashboard', 'dealerDashboard',
            'dealerSupport', 'dealers', 'faq', 'financing', 'imprint', 'myAccount',
            'privacyPolicy', 'privateDashboard', 'safetyTips', 'savedCars', 'sellCar',
            'settings', 'signIn', 'signUp', 'termsOfService'
        ]
        for key in pages_keys_to_remove:
            pattern = rf'(\s+){re.escape(key)}:\s*[^,\n]*,'
            content = re.sub(pattern, '', content, flags=re.MULTILINE)
    
    # Handle specific sections with nested removal
    for section in ['registeredDealers', 'savedCars', 'sellVehicle']:
        if section in sections_to_remove:
            # Remove the entire section
            pattern = rf'^\s*{re.escape(section)}:\s*\{{.*?\n\s*\}},'
            content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
    
    # Handle legal section
    if 'legal' in sections_to_remove:
        # Remove imprint subsection
        pattern = r'(\s+)imprint:\s*\{[^}]*?\n\s*\},'
        content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
    
    # Handle modals section
    if 'modals' in sections_to_remove:
        pattern = r'(\s+)shareListing:\s*[^,\n]*,'
        content = re.sub(pattern, '', content, flags=re.MULTILINE)
    
    # Clean up any extra commas and whitespace
    content = re.sub(r',(\s*,)+', ',', content)  # Remove duplicate commas
    content = re.sub(r',(\s*\})', r'\1', content)  # Remove comma before closing brace
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)  # Remove extra blank lines
    
    return content

def main():
    # File paths
    extra_keys_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/extra_in_mk.txt'
    mk_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts'
    
    # Read the keys to remove
    with open(extra_keys_file, 'r', encoding='utf-8') as f:
        keys_to_remove = []
        for line in f:
            line = line.strip()
            if '→' in line:
                key = line.split('→')[1]
                keys_to_remove.append(key)
            elif line and not line.startswith('#'):
                # Handle lines that don't have the arrow format
                keys_to_remove.append(line)
    
    print(f"Found {len(keys_to_remove)} keys to remove")
    
    # Read the current translation file
    content = read_file(mk_file)
    print(f"Original file size: {len(content)} characters")
    
    # Remove the extra keys
    updated_content = remove_keys_from_translation(content, keys_to_remove)
    print(f"Updated file size: {len(updated_content)} characters")
    
    # Write the updated content
    write_file(mk_file, updated_content)
    print("Successfully removed extra keys from mk.ts")

if __name__ == "__main__":
    main()