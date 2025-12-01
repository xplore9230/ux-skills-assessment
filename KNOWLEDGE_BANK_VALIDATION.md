# Knowledge Bank URL Validation

## Important: Always Test URLs Before Adding

**CRITICAL**: Before adding any new resources to the knowledge bank, you MUST validate that all URLs are working.

### Validation Script

Use the validation script to test all URLs:

```bash
node scripts/validate-knowledge-bank-links.js
```

This script will:
- Test all URLs in `client/src/data/knowledge-bank.ts`
- Report which URLs are valid (200), redirects (3xx), or invalid (403/404)
- Exit with error code 1 if any invalid URLs are found

### Rules

1. **Never add resources with untested URLs** - Always run the validation script after adding new resources
2. **Replace invalid URLs immediately** - If a URL returns 403 (forbidden) or 404 (not found), replace it with a working alternative
3. **Prefer trusted sources** - Use URLs from:
   - Nielsen Norman Group (nngroup.com)
   - Interaction Design Foundation (interaction-design.org)
   - Smashing Magazine (smashingmagazine.com)
   - Official documentation sites
4. **Avoid Medium/UX Collective links** - These often return 403 errors due to bot blocking
5. **Test redirects** - If a URL redirects (3xx), verify the final destination is correct

### Common Issues

- **403 Forbidden**: Usually means bot blocking. Replace with direct source or archive link
- **404 Not Found**: Page moved or deleted. Find updated URL or remove resource
- **Medium/UX Collective**: These platforms often block automated requests. Use alternative sources

### Last Validation

Last validated: After expanding to 150 resources and fixing all invalid URLs
- Total URLs: 150
- Valid: 150 (100%)
- Invalid: 0
- Status: ✅ All URLs validated and working

### Validation Process

1. Added 37 new resources to knowledge bank
2. Ran validation script - found 30 invalid URLs (403/404 errors)
3. Replaced all invalid URLs with working alternatives from trusted sources:
   - Replaced Medium/UX Collective links (403 errors) with IxDF alternatives
   - Replaced broken NN/g links (404 errors) with working IxDF or alternative URLs
   - Replaced broken Smashing Magazine links with working alternatives
4. Re-ran validation - all 90 URLs now valid

