import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingResultsPage from "./loading-results";
import ResultsPage from "./results";
import type { CategoryScore, ImprovementWeek } from "@/types";
import type { PrecomputedResults, PrecomputationStatus } from "@/hooks/useBackgroundComputation";

interface ResultsLocationState {
  stage: string;
  totalScore: number;
  maxScore: number;
  summary: string;
  categories: CategoryScore[];
  improvementPlan: ImprovementWeek[];
  cachedResults?: PrecomputedResults | null;
  precomputationStatus?: PrecomputationStatus;
}

export default function ResultsWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  // Get results from location state
  const state = location.state as ResultsLocationState | null;

  // If no state, redirect to home
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  // If no state, don't render anything
  if (!state) {
    return null;
  }

  const handleRestart = () => {
    navigate("/quiz");
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Show loading page first, then results
  if (showLoading) {
    return (
      <LoadingResultsPage
        onComplete={handleLoadingComplete}
        stage={state.stage}
        precomputationStatus={state.precomputationStatus || 'idle'}
      />
    );
  }

  return (
    <ResultsPage
      stage={state.stage}
      totalScore={state.totalScore}
      maxScore={state.maxScore}
      summary={state.summary}
      categories={state.categories}
      improvementPlan={state.improvementPlan}
      onRestart={handleRestart}
      cachedResults={state.cachedResults || null}
    />
  );
}

