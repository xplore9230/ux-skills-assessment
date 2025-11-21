import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import QuizPage from "@/pages/quiz";
import ResultsPage from "@/pages/results";
import { questions } from "@/data/questions";
import { calculateResults } from "@/lib/scoring";

type AppState = "landing" | "quiz" | "results";

interface ResultsData {
  stage: string;
  totalScore: number;
  maxScore: number;
  summary: string;
  categories: any[];
  improvementPlan: any[];
}

function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [results, setResults] = useState<ResultsData | null>(null);

  const handleStartQuiz = () => {
    setAppState("quiz");
  };

  const handleCompleteQuiz = (answers: Record<string, number>) => {
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
    setAppState("results");
  };

  const handleRestart = () => {
    setResults(null);
    setAppState("landing");
  };

  const handleBackToLanding = () => {
    setAppState("landing");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {appState === "landing" && <LandingPage onStart={handleStartQuiz} />}
        {appState === "quiz" && (
          <QuizPage
            questions={questions}
            onComplete={handleCompleteQuiz}
            onBack={handleBackToLanding}
          />
        )}
        {appState === "results" && results && (
          <ResultsPage {...results} onRestart={handleRestart} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
