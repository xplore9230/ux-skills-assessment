import { memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { CategoryInsight } from "@/types";

interface CategoryInsightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insight: CategoryInsight | null;
  score: number;
  maxScore: number;
}

// Shared content component to avoid duplication
function InsightContent({ insight }: { insight: CategoryInsight }) {
  return (
    <div className="space-y-6">
        {/* Brief Summary */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Quick Take
          </h3>
          <p className="text-base leading-relaxed">
            {insight.brief}
          </p>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-2 border-t border-border pt-4">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Detailed Analysis
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {insight.detailed}
          </p>
        </div>

        {/* Actionable Steps */}
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            Actionable Next Steps
          </h3>
          <ul className="space-y-3">
            {insight.actionable.map((action, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed pt-0.5">
                  {action}
                </span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

const CategoryInsightModal = memo(function CategoryInsightModal({
  open,
  onOpenChange,
  insight,
  score,
  maxScore,
}: CategoryInsightModalProps) {
  const isMobile = useIsMobile();

  if (!insight) return null;

  // score is already a percentage (0-100), use it directly
  const percentage = Math.round(score);

  // Mobile: Use Drawer (bottom sheet)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader className="text-left pb-2 px-4 pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DrawerTitle className="text-2xl font-serif mb-3">
                  {insight.category}
                </DrawerTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {percentage}% Score
                  </Badge>
                  <Badge variant="secondary" className="text-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Analysis
                  </Badge>
                </div>
              </div>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="px-4 pb-4 mb-0">
            <InsightContent insight={insight} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Dialog (centered popup)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-serif mb-2">
                {insight.category}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {percentage}% Score
                </Badge>
                <Badge variant="secondary" className="text-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Analysis
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="pt-4">
          <InsightContent insight={insight} />
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default CategoryInsightModal;

