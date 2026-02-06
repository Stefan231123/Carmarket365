# Albanian Proofreading Agent - Usage Guide

## Quick Start

### Activating the Albanian Agent

To activate the Albanian Proofreading Agent, simply reference it in your request:

```
Please activate the Albanian Proofreading Agent to review [specific content/section]
```

### Common Usage Scenarios

#### 1. Full Translation File Review
```
Activate Albanian Proofreading Agent for comprehensive review of /shared/translations/sq.ts
Priority: All aspects (Grammar/Cultural/Technical/UX)
```

#### 2. Specific Section Review
```
Albanian Agent: Review car listing interface translations
Focus: User experience and automotive terminology
```

#### 3. New Content Proofreading
```
Albanian Agent: Proofread new features added to translation file
Focus: Consistency with existing translations
```

## Output Examples

### Standard Quality Review
When you request a review, the agent will provide:
- Overall quality score (1-10)
- Specific corrections with explanations
- Alternative phrasings
- Cultural adaptation suggestions
- Technical accuracy improvements

### Sample Agent Response Format
```
## Albanian Translation Review Report
**Section:** Common Interface Elements
**Overall Quality Score:** 7/10

### Summary
The translations are generally good but need improvements in automotive terminology consistency and some cultural adaptations for the Albanian market.

### Corrections Made
1. **Key:** `common.mileage`
   - **Original:** "Kilometrazhi"
   - **Corrected:** "Kilometrazh"
   - **Reason:** More natural spelling in standard Albanian
   - **Impact:** Medium

### Alternative Phrasings
**Current:** "Po ngarkohet..."
**Alternatives:**
1. "Duke u ngarkuar..." (more standard)
2. "Në proces ngarkimi..." (formal)
```

## Integration with Existing Workflow

The Albanian Agent works with your existing tools:

1. **Extract translations**: Use existing extraction scripts for Albanian (`sq`)
2. **Agent review**: Apply Albanian Agent expertise
3. **Import improvements**: Use existing import tools with agent-approved changes

## Best Practices

### When to Use the Albanian Agent

✅ **Do use for:**
- Complete translation file reviews
- New feature translations
- Automotive terminology validation
- Cultural adaptation checks
- User interface text optimization

❌ **Don't use for:**
- Single word translations
- Non-Albanian language content
- Code-related issues (non-text)

### Getting the Best Results

1. **Be specific about scope**: Mention which sections or types of content to focus on
2. **Indicate priorities**: Grammar, cultural adaptation, technical accuracy, or UX
3. **Provide context**: Mention if it's for specific car types or user groups
4. **Request examples**: Ask for alternative phrasings when needed

### Working with Agent Feedback

The agent provides different types of feedback:

- **High Priority**: Critical errors affecting user understanding
- **Medium Priority**: Improvements for naturalness and consistency  
- **Low Priority**: Style preferences and minor enhancements

## Agent Capabilities

### Language Expertise
- Native-level Albanian grammar and syntax
- Automotive industry terminology
- Cultural adaptation for Albanian market
- UI/UX text optimization

### Technical Knowledge
- Car specifications and features
- Technical automotive terms
- European automotive standards
- Albanian regulatory terminology

### Cultural Understanding
- Albanian business culture
- Family-oriented car marketing
- Economic sensitivity in pricing
- Regional preferences and variations

## Troubleshooting

### If Agent Responses Seem Generic
- Be more specific about your needs
- Mention the type of cars or features involved
- Ask for cultural context explanations

### If Technical Terms Don't Match Your Preference
- Ask the agent to explain terminology choices
- Request alternatives with different formality levels
- Mention your target audience (family buyers, luxury market, etc.)

### If You Need Quick Fixes
- Specify "urgent review" in your request
- Focus on specific problem areas
- Ask for immediate corrections only, not comprehensive analysis

## File Locations

- **Agent Specification**: `/ALBANIAN_PROOFREADING_AGENT.md`
- **Usage Guide**: `/ALBANIAN_AGENT_USAGE_GUIDE.md` (this file)
- **Albanian Translations**: `/shared/translations/sq.ts`
- **Reports Directory**: `/albanian-proofreading-reports/` (created as needed)

## Contact & Support

For issues with the Albanian Agent:
1. Review this usage guide
2. Check the main agent specification
3. Ensure you're requesting Albanian content specifically
4. Verify the translation file paths are correct

The Albanian Agent is designed to be intuitive and helpful - don't hesitate to ask for clarification or additional assistance!