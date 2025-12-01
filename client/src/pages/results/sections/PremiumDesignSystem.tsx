/**
 * Premium Design System Section
 * 
 * Exclusive premium content - Comprehensive Design System PDF and Quiz Learning Materials
 */

import { FilePdf, Download, BookOpen, GraduationCap, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PremiumPaywall from "@/components/PremiumPaywall";

interface PremiumDesignSystemProps {
  isPremium: boolean;
  onUnlock?: () => void;
}

export default function PremiumDesignSystem({ isPremium, onUnlock }: PremiumDesignSystemProps) {
  const handleDownload = () => {
    // Open PDF in new tab (or download)
    window.open("/design-systems-ebook.pdf", "_blank");
  };

  if (!isPremium) {
    // Show locked version with paywall
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4">
              <Sparkle size={20} weight="duotone" className="text-primary" />
              <span className="text-sm font-semibold text-primary">Premium Exclusive</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Comprehensive Design System Guide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock our complete design system PDF and interactive quiz learning materials to master professional design systems.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-border/30 bg-card/50 p-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                <FilePdf size={24} weight="duotone" className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Complete PDF Guide</h3>
              <p className="text-sm text-muted-foreground">
                150+ pages of design system principles, patterns, and best practices
              </p>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/50 p-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                <GraduationCap size={24} weight="duotone" className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Interactive Quizzes</h3>
              <p className="text-sm text-muted-foreground">
                Test your knowledge with practice quizzes and assessments
              </p>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/50 p-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                <BookOpen size={24} weight="duotone" className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Learning Modules</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step modules to build your design system expertise
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            {onUnlock ? (
              <Button
                onClick={onUnlock}
                size="lg"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 py-6"
              >
                <Sparkle size={20} weight="duotone" />
                Unlock Premium to Access
              </Button>
            ) : (
              <PremiumPaywall
                variant="inline"
                title="Unlock Design System Guide"
                description="Get access to our comprehensive design system PDF, interactive quizzes, and learning modules."
                redirectTo="/premium/results"
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Premium unlocked - show full content
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4">
            <Sparkle size={20} weight="duotone" className="text-primary" />
            <span className="text-sm font-semibold text-primary">Premium Content</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            Comprehensive Design System Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to mastering professional design systems with PDF resources, interactive quizzes, and structured learning modules.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* PDF Download Card */}
          <div className="rounded-xl border border-blue-50 bg-card p-6 hover:border-blue-400 transition-colors group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FilePdf size={32} weight="duotone" className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Design System PDF Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  150+ pages covering design tokens, components, patterns, documentation, and implementation strategies used by top design teams.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">Design Tokens</span>
                  <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">Components</span>
                  <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">Patterns</span>
                  <span className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">Documentation</span>
                </div>
                <Button
                  onClick={handleDownload}
                  className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                  <Download size={18} weight="duotone" />
                  Download PDF (150+ pages)
                </Button>
              </div>
            </div>
          </div>

          {/* Quiz Learning Card */}
          <div className="rounded-xl border border-blue-50 bg-card p-6 hover:border-blue-400 transition-colors group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <GraduationCap size={32} weight="duotone" className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Interactive Quiz Learning
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your design system knowledge with practice quizzes, assessments, and step-by-step learning modules.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Practice quizzes for each module</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Progress tracking and assessments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Structured learning paths</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-foreground/20 hover:bg-foreground/5"
                >
                  <BookOpen size={18} weight="duotone" />
                  Start Learning Modules
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-border/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">150+</div>
            <div className="text-sm text-muted-foreground">Pages of Content</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">10+</div>
            <div className="text-sm text-muted-foreground">Interactive Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Learning Modules</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

