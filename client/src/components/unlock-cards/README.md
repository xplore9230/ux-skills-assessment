# Unlock Card Components

Reusable unlock card components that match different section styles. These cards appear inline in their respective sections when content is locked for free users.

## Components

### 1. `UnlockCardResource`
**Style**: Horizontal carousel card (matches `ResourceCard`)
**Use**: Curated Resources section
**Dimensions**: `w-72 md:w-80` (same as resource cards)

```tsx
import { UnlockCardResource } from "@/components/unlock-cards";

<UnlockCardResource 
  count={5}  // Optional: number of locked items
  redirectTo="/premium/results" 
/>
```

### 2. `UnlockCardInsight`
**Style**: Grid card (matches `InsightCard`)
**Use**: Deep Insights section
**Dimensions**: Full width in grid, `min-h-[280px]`

```tsx
import { UnlockCardInsight } from "@/components/unlock-cards";

<UnlockCardInsight 
  count={4}  // Optional: number of locked insights
  redirectTo="/premium/results" 
/>
```

### 3. `UnlockCardChecklist`
**Style**: Compact inline (fits in checklist section)
**Use**: Skill Analysis checklists
**Dimensions**: Compact, fits inline with checklist items

```tsx
import { UnlockCardChecklist } from "@/components/unlock-cards";

<UnlockCardChecklist 
  categoryName="User Research"  // Optional
  count={3}  // Optional: number of locked items
  redirectTo="/premium/results" 
/>
```

### 4. `UnlockCardBlog`
**Style**: Grid card (similar to insights)
**Use**: Blog/Articles section
**Dimensions**: Full width in grid, `min-h-[280px]`

```tsx
import { UnlockCardBlog } from "@/components/unlock-cards";

<UnlockCardBlog 
  count={6}  // Optional: number of locked articles
  redirectTo="/premium/results" 
/>
```

### 5. `UnlockButton`
**Style**: Compact button component
**Use**: Reusable unlock button for any card
**Props**: `size`, `fullWidth`, `redirectTo`

```tsx
import { UnlockButton } from "@/components/unlock-cards";

<UnlockButton 
  size="sm"  // "sm" | "default" | "lg"
  fullWidth={false}
  redirectTo="/premium/results" 
/>
```

## Design Features

All unlock cards include:
- ✅ Primary color border (`border-primary/30`)
- ✅ Gradient background (`from-primary/5 via-primary/10/50`)
- ✅ Decorative blur elements
- ✅ Premium badge with lock icon
- ✅ Responsive sizing matching their section styles
- ✅ Hover effects and transitions
- ✅ Integrated unlock button

## Usage Examples

### In Curated Resources Carousel
```tsx
<div className="flex gap-4 overflow-x-auto">
  {freeResources.map(resource => <ResourceCard resource={resource} />)}
  {!isPremium && <UnlockCardResource count={lockedCount} />}
</div>
```

### In Deep Insights Grid
```tsx
<div className="grid md:grid-cols-2 gap-4">
  {freeInsights.map(insight => <InsightCard insight={insight} />)}
  {!isPremium && <UnlockCardInsight count={lockedCount} />}
</div>
```

### In Checklist Section
```tsx
<div className="space-y-3">
  {freeChecklistItems.map(item => <ChecklistItem item={item} />)}
  {!isPremium && hasMoreItems && (
    <UnlockCardChecklist categoryName={category.name} count={lockedCount} />
  )}
</div>
```

## Styling Consistency

Each unlock card matches its corresponding content card:
- Same border radius (`rounded-xl`)
- Same padding (`p-5`)
- Same dimensions (where applicable)
- Same hover effects
- Seamless integration in carousel/grid layouts

