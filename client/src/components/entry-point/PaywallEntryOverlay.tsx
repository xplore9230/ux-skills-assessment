import React from "react";
import PaywallEntryCard from "./PaywallEntryCard";
import type { UnlockType } from "@/context/EntryPointContext";

interface PaywallEntryOverlayProps {
  unlockType: UnlockType;
  onClick: () => void;
  children?: React.ReactNode; // Content to blur behind overlay
  className?: string;
  overlayWidth?: string;
  overlayHeight?: string;
  size?: "default" | "compact";
  titleOverride?: string;
  bodyOverride?: string;
  ctaOverride?: string;
}

/**
 * PaywallEntryOverlay - Glass blur overlay matching Figma designs
 * 
 * Shows blurred content behind a glass overlay with the entry card centered.
 * Matches the Figma design pattern where content is blurred and an overlay appears on top.
 */
export default function PaywallEntryOverlay({
  unlockType,
  onClick,
  children,
  className,
  overlayWidth = "w-[1099px]",
  overlayHeight = "h-[191px]",
  size = "default",
  titleOverride,
  bodyOverride,
  ctaOverride,
}: PaywallEntryOverlayProps) {
  // Adjust overlay size for compact variant
  const widthClass = size === "compact" ? "w-[529px]" : overlayWidth;
  const heightClass = size === "compact" ? "h-[134px]" : overlayHeight;

  return (
    <div className={`relative ${className || ""}`}>
      {/* Blurred content behind (if provided) */}
      {children && (
        <div className="blur-sm opacity-50 pointer-events-none select-none">
          {children}
        </div>
      )}

      {/* Glass blur overlay backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-[7px] bg-[rgba(255,255,255,0.7)] ${widthClass} ${heightClass} flex items-center justify-center`}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Centered entry card */}
        <div className="w-[250px]">
          <PaywallEntryCard
            unlockType={unlockType}
            onClick={onClick}
            variant="overlay"
            size={size}
            titleOverride={titleOverride}
            bodyOverride={bodyOverride}
            ctaOverride={ctaOverride}
          />
        </div>
      </div>
    </div>
  );
}

