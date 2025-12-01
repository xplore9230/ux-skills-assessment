/**
 * Unlock Card - Resource Style (Premium Design)
 * 
 * Matches the curated resources card style (horizontal carousel)
 * Same dimensions and styling as ResourceCard
 * Premium redesign with dark gradient background and enhanced visuals
 */

import { LockKeyhole, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePremiumAccess } from "@/context/PremiumAccessContext";

interface UnlockCardResourceProps {
  count?: number; // Number of locked items
  redirectTo?: string;
}

export default function UnlockCardResource({ 
  count, 
  redirectTo = "/premium/results" 
}: UnlockCardResourceProps) {
  const { startCheckout, isLoading } = usePremiumAccess();

  const handleUnlock = () => {
    startCheckout(redirectTo);
  };

  return (
    <div className="relative flex-shrink-0 w-72 md:w-80" style={{ paddingTop: '2rem', overflow: 'visible' }}>
      {/* Floating Premium Badge - positioned relative to wrapper */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ transform: 'translateX(-50%)' }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-black/80 px-4 py-1 text-xs font-medium tracking-wide text-amber-100 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur whitespace-nowrap">
          <LockKeyhole className="h-3.5 w-3.5" />
          <span>Premium Access</span>
        </div>
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center group
                   bg-[linear-gradient(135deg,#E6F2FF_0%,#FFFFFF_50%,#E6F2FF_100%)]
                   backdrop-blur-xl border border-white/40
                   shadow-[0_10px_40px_rgba(56,189,248,0.15)]
                   hover:shadow-[0_20px_60px_rgba(56,189,248,0.25)]
                   transition-all duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) perspective(1000px) rotateX(2deg) rotateY(-2deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }}
      >
        {/* Glow Overlay on Hover */}
        <div className="absolute inset-0 rounded-3xl bg-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

        {/* Glass Orb Icon Container - Centered */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center my-4"
        >
          <div className="flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#ffffff33,#18181b)] p-[2px] shadow-[0_14px_40px_rgba(0,0,0,0.65)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 backdrop-blur">
              <Sparkles className="h-7 w-7 text-amber-200" />
            </div>
          </div>
        </motion.div>

        {/* Headline - Centered */}
        <h3 className="mt-2 text-center text-xl md:text-2xl font-semibold tracking-tight text-gray-900 w-full">
          Go Deeper in Your UX Journey
        </h3>

        {/* Subtext - Centered */}
        <p className="mt-3 max-w-xs text-center text-sm md:text-base text-gray-700 leading-relaxed mx-auto">
          {count 
            ? `Unlock ${count} extra expert-picked articles, case studies, and tools curated for serious product designers.`
            : "Unlock expert-picked articles, case studies, and tools curated for serious product designers."
          }
        </p>

        {/* Primary CTA Button - Centered */}
        <motion.div
          className="mt-6 w-full flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleUnlock}
            disabled={isLoading}
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm md:text-base font-semibold tracking-tight
                       bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 text-white
                       shadow-[0_18px_40px_rgba(0,0,0,0.55)]
                       hover:shadow-[0_22px_50px_rgba(0,0,0,0.7)]
                       hover:from-sky-400 hover:via-sky-300 hover:to-sky-500
                       hover:-translate-y-[1px]
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Unlock premium UX resources"
          >
            <motion.span
              className="inline-flex items-center gap-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isLoading ? "Processing..." : "Unlock Premium Resources"}</span>
            </motion.span>
          </Button>
        </motion.div>

        {/* Value Strip / Trust Row - Centered */}
        <p className="mt-3 text-center text-[11px] md:text-xs text-gray-600 font-light w-full">
          High-signal content only · Curated by senior UX leads
        </p>
      </motion.div>
    </div>
  );
}
