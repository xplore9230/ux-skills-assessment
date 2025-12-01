import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import QuizWrapper from "@/pages/QuizWrapper";
import ResultsEntry from "@/pages/results";
import PremiumQuizWrapper from "@/pages/premium/PremiumQuizWrapper";
import PremiumResultsEntry from "@/pages/premium/PremiumResultsEntry";
import PaymentSuccess from "@/pages/premium/payment-success";
import UnlockCardsDemo from "@/pages/premium/unlock-cards-demo";
import PaywallModal from "@/components/premium/PaywallModal";
import { PremiumAccessProvider, usePremiumAccess } from "@/context/PremiumAccessContext";
import UXLevelProPricing from "@/pages/pricing/uxlevel-pro";
import AdminDashboard from "@/pages/admin/Dashboard";
import ContentReviewPage from "@/pages/admin/ContentReview";
import ContentDetailPage from "@/pages/admin/ContentDetail";
import PendingReviewPage from "@/pages/admin/PendingReview";

// Conditionally load Analytics component
function ConditionalAnalytics() {
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load Analytics in production
    if (import.meta.env.PROD) {
      import("@vercel/analytics/react")
        .then((module) => {
          setAnalyticsComponent(() => module.Analytics);
        })
        .catch((error) => {
          // Silently fail if Analytics can't be loaded (e.g., not on Vercel)
          console.warn("Vercel Analytics not available:", error);
        });
    }
  }, []);

  if (!AnalyticsComponent) {
    return null;
  }

  return <AnalyticsComponent />;
}

function LandingPageWrapper() {
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return <LandingPage onStart={handleStartQuiz} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-foreground focus:text-background focus:rounded-lg focus:font-semibold focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Toaster />
            <ConditionalAnalytics />
            <PremiumAccessProvider>
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<LandingPageWrapper />} />
                  <Route path="/quiz" element={<QuizWrapper />} />
                  <Route path="/results" element={<ResultsEntry />} />
                  <Route path="/results/:resultId" element={<ResultsEntry />} />
                  
                  {/* Premium Routes (kept for now; will be deprecated) */}
                  <Route path="/premium/quiz" element={<QuizWrapper />} />
                  <Route path="/premium/results" element={<ResultsEntry />} />
                  <Route path="/premium/results/:resultId" element={<ResultsEntry />} />
                  <Route path="/premium/payment-success" element={<PaymentSuccess />} />
                  <Route path="/premium/unlock-cards-demo" element={<UnlockCardsDemo />} />
                  {/* Pricing */}
                  <Route path="/pricing/pro" element={<UXLevelProPricing />} />
                  {/* Admin / knowledge bank management (no auth yet) */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/content" element={<ContentReviewPage />} />
                  <Route path="/admin/content/detail" element={<ContentDetailPage />} />
                  <Route path="/admin/pending" element={<PendingReviewPage />} />
                </Routes>
              </main>
              <GlobalPaywallHost />
            </PremiumAccessProvider>
          </TooltipProvider>
        </MotionConfig>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

function GlobalPaywallHost() {
  const { isPaywallOpen, unlockType, closePaywall, startCheckout } = usePremiumAccess();
  return (
    <PaywallModal
      isOpen={isPaywallOpen}
      unlockType={unlockType}
      onClose={closePaywall}
      onConfirm={(type) => {
        // type-aware checkout; we can extend later if needed
        startCheckout(window.location.pathname);
      }}
    />
  );
}
