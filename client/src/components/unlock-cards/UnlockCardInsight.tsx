/**
 * Unlock Card - Deep Insight Style
 * 
 * Matches the deep insights card style (grid layout)
 * Same styling as InsightCard
 */

import { Lock, Sparkle } from "@phosphor-icons/react";
import UnlockButton from "./UnlockButton";

interface UnlockCardInsightProps {
  count?: number; // Number of locked items
  redirectTo?: string;
}

export default function UnlockCardInsight({ 
  count, 
  redirectTo = "/premium/results" 
}: UnlockCardInsightProps) {
  return (
    <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-primary/10/50 to-card p-5 flex flex-col justify-center items-center text-center relative overflow-hidden group min-h-[280px]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header badges */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium">
            <Lock size={12} weight="duotone" />
            <span>Premium</span>
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            Advanced
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkle size={24} weight="duotone" className="text-primary" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
          Unlock Deep Insights
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {count
            ? `Get access to ${count} more strategic insights to accelerate your UX career`
            : "Get access to all advanced strategic content and insights"
          }
        </p>
        
        {/* Footer CTA */}
        <div className="mt-auto pt-2">
          <UnlockButton redirectTo={redirectTo} size="default" />
        </div>
      </div>
    </div>
  );
}

