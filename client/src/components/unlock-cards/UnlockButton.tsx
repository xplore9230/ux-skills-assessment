/**
 * Compact Unlock Button
 * 
 * Reusable compact button for unlock cards
 */

import { Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePremiumAccess } from "@/context/PremiumAccessContext";

interface UnlockButtonProps {
  redirectTo?: string;
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
}

export default function UnlockButton({ 
  redirectTo = "/premium/results",
  size = "default",
  fullWidth = true
}: UnlockButtonProps) {
  const { startCheckout, isLoading } = usePremiumAccess();

  const handleClick = () => {
    startCheckout(redirectTo);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size={size}
      className={`gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 ${fullWidth ? "w-full" : ""}`}
    >
      <Sparkle size={14} weight="duotone" />
      {isLoading ? "Processing..." : "Unlock Now"}
    </Button>
  );
}

