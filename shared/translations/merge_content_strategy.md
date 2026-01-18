# Content Merging Strategy for Translation Duplicates

## Critical Content That Must Be Preserved

### Macedonian (mk.ts)

#### 1. Forms Object - 3 occurrences to merge:

**From Line 61 (Primary - keep this location):**
- placeholders: 40+ entries (selectMake, selectModel, etc.)
- labels: 25+ entries (businessName, firstName, etc.) 
- buttons: 35+ entries (submit, register, etc.)
- actions: sendMessage
- validation: 20+ entries

**From Line 4419 (Merge into primary):**
- labels.emailAddress: 'Е-пошта адреса' (unique)
- Additional validation entries
- Overlapping but sometimes different translations

**From Line 5352 (Merge into primary):**
- placeholders.egFiftyThousand: 'пр. 50.000 км' (unique)

**Merge Strategy:**
1. Keep line 61 structure
2. Add unique keys from line 4419
3. Add the egFiftyThousand placeholder from line 5352
4. Resolve conflicts by keeping most specific/recent translations

#### 2. FinalFixes Object - 5 occurrences to merge:

**Merge All Into Line 3417:**
- expressSell from occurrence 1 (line 3417) + comprehensive version from occurrence 3 (line 4808)
- savedCars from occurrence 2 (line 3601) + enhanced version from occurrence 5 (line 5290)
- Remove duplicate savedCars from occurrence 4 (line 5260) - identical to occurrence 2

**Critical Content to Preserve:**
- Car brands/models arrays (comprehensive lists)
- All savedCars functionality (sorting, filtering, etc.)
- All expressSell workflow translations
- Vehicle data and specifications

#### 3. Other Objects:

**browseCars (2 occurrences):**
- Merge line 3626 content into line 545
- Preserve all sorting options and view controls

**carDetail (2 occurrences):**  
- Merge line 3722 comprehensive version into line 1335
- Preserve all vehicle specifications and features

**errors (2 occurrences):**
- Merge line 4342 detailed error pages into line 1134
- Preserve both basic and detailed error handling

**indexPage (2 occurrences):**
- Merge line 4191 comprehensive homepage into line 2673
- Preserve all hero, features, and testimonial content

### Albanian (sq.ts)

#### Similar merging strategy for:
1. forms (4 occurrences) - merge into line 57
2. finalFixes (3 occurrences) - merge into line 4177  
3. errors (2 occurrences) - merge into line 1414
4. advancedSearch (2 occurrences) - merge into line 1559
5. uiDemo (2 occurrences) - merge into line 4167

## Pre-Merge Extraction Commands

Before running the deletion script, extract unique content:

```bash
# Extract unique content from duplicates for manual merging
echo "=== FORMS UNIQUE CONTENT ===" > merge_content.txt

echo "From mk.ts line 4419 (unique labels):" >> merge_content.txt
sed -n '4419,4533p' mk.ts | grep -E "^\s+[a-zA-Z].*:" | sort | uniq >> merge_content.txt

echo "From mk.ts line 5352 (unique placeholders):" >> merge_content.txt  
sed -n '5352,5357p' mk.ts | grep -E "^\s+[a-zA-Z].*:" >> merge_content.txt

echo "=== FINALFIXES UNIQUE CONTENT ===" >> merge_content.txt
echo "From mk.ts savedCars variations:" >> merge_content.txt
sed -n '3601,3625p' mk.ts >> merge_content.txt
echo "---" >> merge_content.txt
sed -n '5290,5351p' mk.ts >> merge_content.txt

# Repeat for other duplicates...
```

## Manual Merge Process

1. **Run extraction commands** to capture unique content
2. **Review merge_content.txt** for unique translations  
3. **Manually add unique content** to primary objects before deletion
4. **Run fix_duplicates.sh** to remove duplicates
5. **Validate syntax and test functionality**

## Quality Assurance Checklist

- [ ] All unique translation keys preserved
- [ ] No syntax errors in resulting files
- [ ] Application loads and functions correctly
- [ ] Native speaker review of merged translations
- [ ] Backup files created and verified
- [ ] File size reduction achieved (30-40% expected)

## Recovery Plan

If issues arise:
1. Restore from timestamped backups
2. Use manual merge process instead of automated deletion
3. Consider per-object consolidation instead of bulk cleanup
4. Test individual sections before full deployment

---

This strategy ensures no translation content is lost while eliminating the duplicate key overwrites.