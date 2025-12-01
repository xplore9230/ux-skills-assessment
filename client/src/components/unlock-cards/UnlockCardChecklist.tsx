/**
 * Unlock Card - Checklist Inline Style
 * 
 * Compact inline unlock prompt for checklist items
 * Fits within the expanded checklist section
 */

import { Lock } from "@phosphor-icons/react";
import UnlockButton from "./UnlockButton";

interface UnlockCardChecklistProps {
  categoryName?: string;
  count?: number; // Number of locked checklist items
  redirectTo?: string;
}

export default function UnlockCardChecklist({ 
  categoryName,
  count, 
  redirectTo = "/premium/results" 
}: UnlockCardChecklistProps) {

  return (
    <div className="rounded-lg border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-4 flex items-start gap-3 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Lock size={14} weight="duotone" className="text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Premium</span>
        </div>
        
        <h4 className="text-sm font-semibold text-foreground mb-1">
          Unlock Full Checklist
        </h4>
        
        <p className="text-xs text-muted-foreground mb-3">
          {categoryName && count
            ? `Get ${count} more action items for ${categoryName}`
            : count
            ? `Get ${count} more action items`
            : "Get access to complete interactive checklist"
          }
        </p>
        
        <UnlockButton redirectTo={redirectTo} size="sm" fullWidth={false} />
      </div>
    </div>
  );
}

