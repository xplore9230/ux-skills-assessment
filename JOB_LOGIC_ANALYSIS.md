# Job Role Logic Analysis

## Overview
This document provides a comprehensive analysis of the job role mapping and job search URL generation logic in the UX Skill Quiz application.

---

## Current Implementation

### 1. Stage-to-Role Mapping (`STAGE_ROLES`)

**Location:** `client/src/lib/results/stage-config.ts` (lines 53-60)

The application uses a **direct stage-to-role mapping** with 6 distinct stages:

```typescript
export const STAGE_ROLES: Record<Stage, string> = {
  "Explorer": "Junior Product Designer",
  "Practitioner": "Product Designer",
  "Emerging Lead": "Lead Product Designer",
  "Strategic Lead - Senior": "Design Director / AVP of Design",
  "Strategic Lead - Executive": "VP of Design",
  "Strategic Lead - C-Suite": "SVP of Design / Chief Design Officer",
};
```

**Key Observations:**
- ✅ **6 stages** are defined (not 4 as mentioned in user's description)
- ✅ Each stage maps to a **single default job title**
- ✅ Strategic Lead is **already split into 3 sub-stages** (Senior, Executive, C-Suite)
- ❌ **No score-based granularity** within Strategic Lead stages currently implemented

---

### 2. Score-Based Granularity (NOT IMPLEMENTED)

**Expected Behavior (from user description):**
For Strategic Lead (86-100), titles should vary by total score:
- Score 100: "VP of Design / Head of Design"
- Score 95-99: "Design Director / Head of Design"
- Score 90-94: "Principal Product Designer"
- Score 86-89: "Lead Product Designer / Design Manager" (default)

**Current Reality:**
- ❌ The `generateJobSearchUrls` function does **NOT** accept `totalScore` parameter
- ❌ No score-based logic exists in the current implementation
- ✅ Instead, Strategic Lead is split into **3 separate stages** based on score ranges:
  - "Strategic Lead - Senior" (85-89)
  - "Strategic Lead - Executive" (90-94)
  - "Strategic Lead - C-Suite" (95-100)

**Stage Score Ranges (from `types.ts`):**
```typescript
// Explorer: 0-40
// Practitioner: 41-80
// Emerging Lead: 81-84
// Strategic Lead - Senior: 85-89
// Strategic Lead - Executive: 90-94
// Strategic Lead - C-Suite: 95-100
```

**Analysis:**
The current implementation uses **stage-based granularity** (separate stages) rather than **score-based granularity** (single stage with score ranges). This is actually a cleaner architectural approach, but differs from the user's described expectation.

---

### 3. Alternative Roles (Available but Unused)

**Location:** `client/src/lib/results/stage-config.ts` (lines 65-104)

```typescript
export const ALTERNATIVE_ROLES: Record<Stage, string[]> = {
  "Explorer": ["Associate UX Designer", "Junior UX Designer", ...],
  "Practitioner": ["UX Designer", "Interaction Designer", ...],
  // ... etc
};
```

**Status:**
- ✅ Defined for all 6 stages
- ❌ **Not used in main job search logic**
- ✅ Available via `getAlternativeRole(stage)` helper function
- 💡 Could be used for A/B testing or variety in future

---

### 4. Job Search URL Generation

**Location:** `client/src/lib/results/stage-config.ts` (lines 113-133)

```typescript
export function generateJobSearchUrls(
  stage: Stage,
  location: string = "Remote"
): NextRoleData {
  const suggestedTitle = STAGE_ROLES[stage];
  const encodedTitle = encodeURIComponent(suggestedTitle);
  const encodedLocation = encodeURIComponent(location);
  
  // Google Jobs search URL
  const googleQuery = encodeURIComponent(`${suggestedTitle} jobs in ${location}`);
  const googleJobsUrl = `https://www.google.com/search?q=${googleQuery}&ibp=htl;jobs`;
  
  // LinkedIn Jobs search URL
  const linkedInUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=${encodedLocation}`;
  
  return {
    suggestedTitle,
    googleJobsUrl,
    linkedInUrl,
  };
}
```

**Key Features:**
- ✅ Pure client-side computation (no API calls)
- ✅ Generates both Google Jobs and LinkedIn URLs
- ✅ Default location: "Remote"
- ✅ Proper URL encoding for special characters
- ❌ **Does NOT accept `totalScore` parameter** (as described in user's expectation)

**URL Format:**
- **Google Jobs:** `https://www.google.com/search?q={title} jobs in {location}&ibp=htl;jobs`
- **LinkedIn:** `https://www.linkedin.com/jobs/search/?keywords={title}&location={location}`

---

### 5. Hook Implementation

**Location:** `client/src/hooks/results/useJobSearchLinks.ts`

```typescript
export function useJobSearchLinks(
  options: UseJobSearchLinksOptions
): UseJobSearchLinksResult {
  const { stage, location = "Remote" } = options;
  
  const data = useMemo(() => {
    return getNextRoleData(stage, location);
  }, [stage, location]);
  
  return { data };
}
```

**Usage in Results Page:**
```typescript
// client/src/pages/results/index.tsx (line 151-153)
const jobSearchHook = useJobSearchLinks({
  stage: results?.stage || "Practitioner",
  // ❌ totalScore is NOT passed
});
```

**Observations:**
- ✅ Uses `useMemo` for performance optimization
- ✅ Pure computation, no async operations
- ❌ **Does NOT accept `totalScore` in options**
- ❌ **Does NOT use `totalScore` for granularity**

---

### 6. Component Usage

**Location:** `client/src/pages/results/sections/NextRole.tsx`

**Component Structure:**
- Displays suggested job title
- Shows two CTA buttons (Google Jobs, LinkedIn)
- Clean, modern UI with icons

**Data Flow:**
```
ResultsEntry → useJobSearchLinks → getNextRoleData → generateJobSearchUrls → NextRole component
```

---

## Discrepancies: Expected vs. Actual

### Expected (from user description):
1. **4 stages** with Strategic Lead as single stage (86-100)
2. **Score-based granularity** within Strategic Lead using `totalScore` parameter
3. `generateJobSearchUrls` accepts `totalScore?: number`
4. Hook accepts `totalScore` in options

### Actual Implementation:
1. **6 stages** with Strategic Lead split into 3 sub-stages
2. **Stage-based granularity** (separate stages, not score ranges)
3. `generateJobSearchUrls` does **NOT** accept `totalScore`
4. Hook does **NOT** accept `totalScore`

---

## Architecture Analysis

### Current Approach: Stage-Based Granularity
**Pros:**
- ✅ Cleaner separation of concerns
- ✅ Type-safe with distinct Stage types
- ✅ Easier to maintain and extend
- ✅ No conditional logic needed in URL generation
- ✅ Stage determination happens once in scoring logic

**Cons:**
- ❌ Less flexible for fine-grained score variations
- ❌ Requires stage enum updates for new score ranges

### Alternative Approach: Score-Based Granularity
**Pros:**
- ✅ More granular control within a stage
- ✅ Can adjust titles without changing stage enum
- ✅ More dynamic based on exact score

**Cons:**
- ❌ More complex conditional logic
- ❌ Requires passing `totalScore` through multiple layers
- ❌ Potential for inconsistencies if score changes

---

## Recommendations

### Option 1: Keep Current Implementation (Recommended)
The current **stage-based approach** is architecturally sound. The 6 stages already provide good granularity:
- Strategic Lead - Senior (85-89)
- Strategic Lead - Executive (90-94)
- Strategic Lead - C-Suite (95-100)

**Action:** Update documentation to reflect actual implementation.

### Option 2: Add Score-Based Granularity
If fine-grained score-based titles are desired within Strategic Lead stages:

1. **Modify `generateJobSearchUrls`:**
   ```typescript
   export function generateJobSearchUrls(
     stage: Stage,
     location: string = "Remote",
     totalScore?: number  // Add this parameter
   ): NextRoleData {
     let suggestedTitle: string;
     
     // Add score-based logic for Strategic Lead stages
     if (stage.startsWith("Strategic Lead") && totalScore !== undefined) {
       if (stage === "Strategic Lead - C-Suite" && totalScore === 100) {
         suggestedTitle = "VP of Design / Head of Design";
       } else if (stage === "Strategic Lead - C-Suite" && totalScore >= 95) {
         suggestedTitle = "Design Director / Head of Design";
       } else if (stage === "Strategic Lead - Executive" && totalScore >= 90) {
         suggestedTitle = "Principal Product Designer";
       } else {
         suggestedTitle = STAGE_ROLES[stage];
       }
     } else {
       suggestedTitle = STAGE_ROLES[stage];
     }
     // ... rest of function
   }
   ```

2. **Update hook to accept `totalScore`:**
   ```typescript
   interface UseJobSearchLinksOptions {
     stage: Stage;
     location?: string;
     totalScore?: number;  // Add this
   }
   ```

3. **Update usage in ResultsEntry:**
   ```typescript
   const jobSearchHook = useJobSearchLinks({
     stage: results?.stage || "Practitioner",
     totalScore: results?.totalScore,  // Add this
   });
   ```

---

## Code Flow Diagram

```
User completes quiz
    ↓
calculateQuizResults() → Determines stage based on totalScore
    ↓
ResultsEntry component
    ↓
useJobSearchLinks({ stage, location })
    ↓
getNextRoleData(stage, location)
    ↓
generateJobSearchUrls(stage, location)
    ↓
Returns: { suggestedTitle, googleJobsUrl, linkedInUrl }
    ↓
NextRole component displays
```

---

## Files Involved

1. **Configuration:** `client/src/lib/results/stage-config.ts`
   - `STAGE_ROLES` mapping
   - `ALTERNATIVE_ROLES` (unused)
   - `generateJobSearchUrls()` function
   - `getNextRoleData()` wrapper

2. **Hook:** `client/src/hooks/results/useJobSearchLinks.ts`
   - React hook with memoization
   - Calls `getNextRoleData()`

3. **Component:** `client/src/pages/results/sections/NextRole.tsx`
   - UI component for displaying job search links

4. **Usage:** `client/src/pages/results/index.tsx`
   - Calls `useJobSearchLinks()` hook
   - Passes data to `NextRole` component

5. **Types:** `client/src/lib/results/types.ts`
   - `Stage` type definition
   - `NextRoleData` interface

---

## Summary

**Current State:**
- ✅ Working implementation with 6 distinct stages
- ✅ Clean stage-based role mapping
- ✅ Proper URL generation for Google Jobs and LinkedIn
- ✅ Client-side computation with memoization
- ❌ No score-based granularity within stages
- ❌ Does not match user's described expectation

**Key Finding:**
The implementation uses **stage-based granularity** (separate stages) rather than **score-based granularity** (single stage with conditional logic). This is a valid architectural choice, but differs from the described expectation.

**Next Steps:**
1. Decide whether to keep current approach or add score-based granularity
2. Update documentation to match actual implementation
3. If score-based granularity is needed, implement Option 2 above

