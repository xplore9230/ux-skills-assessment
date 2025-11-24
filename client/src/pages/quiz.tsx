import { useState, useMemo, useCallback, memo, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import AnswerOption from "@/components/AnswerOption";
import type { Question } from "@/types";

interface QuizPageProps {
  questions: Question[];
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
  onHalfwayComplete?: (partialAnswers: Record<string, number>) => void;
}

const QuizPage = memo(function QuizPage({ questions, onComplete, onBack, onHalfwayComplete }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [skipAnimation, setSkipAnimation] = useState(false);
  const halfwayTriggeredRef = useRef(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  // Guard against empty or invalid questions array
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No questions available.</p>
          <Button onClick={onBack} className="mt-4">Back to Home</Button>
        </div>
      </div>
    );
  }

  // Ensure currentIndex is within bounds
  useEffect(() => {
    const safeIndex = Math.max(0, Math.min(currentIndex, questions.length - 1));
    if (currentIndex !== safeIndex) {
      setCurrentIndex(safeIndex);
    }
  }, [currentIndex, questions.length]);

  const currentQuestion = useMemo(() => {
    const safeIndex = Math.max(0, Math.min(currentIndex, questions.length - 1));
    return questions[safeIndex];
  }, [questions, currentIndex]);
  
  // Guard against undefined currentQuestion
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Question not found.</p>
          <Button onClick={onBack} className="mt-4">Back to Home</Button>
        </div>
      </div>
    );
  }

  const isLastQuestion = useMemo(() => {
    const safeIndex = Math.max(0, Math.min(currentIndex, questions.length - 1));
    return safeIndex === questions.length - 1;
  }, [currentIndex, questions.length]);
  
  const canGoNext = useMemo(() => currentQuestion?.id && answers[currentQuestion.id] !== undefined, [answers, currentQuestion?.id]);
  const canGoPrevious = useMemo(() => currentIndex > 0, [currentIndex]);
  
  // Calculate progress percentage
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progressPercentage = useMemo(() => (answeredCount / questions.length) * 100, [answeredCount, questions.length]);

  // Trigger precomputation when user reaches 50% completion
  useEffect(() => {
    if (
      !halfwayTriggeredRef.current &&
      progressPercentage >= 50 &&
      answeredCount >= Math.ceil(questions.length / 2) &&
      onHalfwayComplete
    ) {
      halfwayTriggeredRef.current = true;
      console.log(`🚀 Triggering precomputation at ${Math.round(progressPercentage)}% (${answeredCount}/${questions.length} answers)`);
      onHalfwayComplete(answers);
    }
  }, [progressPercentage, answeredCount, questions.length, answers, onHalfwayComplete]);

  // Lock container height to prevent vertical movement - use useLayoutEffect for immediate DOM measurement
  useLayoutEffect(() => {
    if (cardContentRef.current && cardContainerRef.current) {
      const height = cardContentRef.current.offsetHeight;
      cardContainerRef.current.style.height = `${height}px`;
    }
  }, [currentQuestion.id]);

  // Simple animation: first card (index 0) appears instantly, all others exit left with fade
  // No animation when going backward - cards appear/disappear instantly
  const isFirstCard = currentIndex === 0;
  const shouldAnimate = !skipAnimation; // Only skip when explicitly navigating backward

  const handleAnswer = useCallback((value: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    
    // Auto-advance to next question after a short delay
    if (isLastQuestion) {
      // Auto-submit on last question
      setTimeout(() => {
        onComplete(updatedAnswers);
      }, 500);
      return;
    }
    // Advance to next question
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  }, [answers, currentQuestion.id, isLastQuestion, onComplete]);

  const handleNext = useCallback(() => {
    if (isLastQuestion && canGoNext) {
      onComplete(answers);
    } else if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion, canGoNext, onComplete, answers]);

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      // Disable animations before changing index
      setSkipAnimation(true);
      // Change index - will trigger re-render with skipAnimation=true
      setCurrentIndex((prev) => prev - 1);
      // Re-enable animations after a brief moment
      setTimeout(() => {
        setSkipAnimation(false);
      }, 100);
    } else {
      onBack();
    }
  }, [canGoPrevious, onBack]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <ProgressBar current={currentIndex + 1} total={questions.length} />

          {/* Card Container */}
          <div ref={cardContainerRef} className="relative" style={{ minHeight: "400px" }}>

            {/* Main card with question content */}
            {shouldAnimate ? (
              <AnimatePresence mode="wait">
                <motion.div
                  ref={cardContentRef}
                  key={currentQuestion.id}
                  layout={false}
                  initial={isFirstCard ? false : { x: 0, opacity: 1 }}
                  animate={{ x: 0, opacity: 1, zIndex: 10 }}
                  exit={{ x: "-100%", opacity: 0, zIndex: 0 }}
                  transition={{
                    x: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    borderRadius: "24px", // Mobile-friendly radius
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.04)",
                    boxShadow: "0px 1px 164px 0px rgba(0, 0, 0, 0.1)",
                    willChange: "transform",
                  }}
                  className="md:rounded-[50px] p-4 md:p-6 lg:p-12 space-y-3 md:space-y-6 lg:space-y-8"
                >
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {currentQuestion.category}
                    </p>
                    <h2 id="question-text" className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight" data-testid="text-question">
                      {currentQuestion.text}
                    </h2>
                  </div>

                  <div 
                    role="radiogroup" 
                    aria-labelledby="question-text"
                    className="space-y-2 md:space-y-3 lg:space-y-4"
                  >
                    {currentQuestion.options.map((option) => (
                      <AnswerOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        isSelected={answers[currentQuestion.id] === option.value}
                        onClick={() => handleAnswer(option.value)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div
                ref={cardContentRef}
                key={currentQuestion.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  borderRadius: "24px", // Mobile-friendly radius
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  boxShadow: "0px 1px 164px 0px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                }}
                className="md:rounded-[50px] p-4 md:p-6 lg:p-12 space-y-3 md:space-y-6 lg:space-y-8"
              >
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {currentQuestion.category}
                  </p>
                  <h2 id="question-text" className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight" data-testid="text-question">
                    {currentQuestion.text}
                  </h2>
                </div>

                <div 
                  role="radiogroup" 
                  aria-labelledby="question-text"
                  className="space-y-2 md:space-y-3 lg:space-y-4"
                >
                  {currentQuestion.options.map((option) => (
                    <AnswerOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      isSelected={answers[currentQuestion.id] === option.value}
                      onClick={() => handleAnswer(option.value)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="gap-2"
              data-testid="button-previous"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentIndex === 0 ? "Back to Home" : "Previous"}
            </Button>

            <div className="text-sm text-muted-foreground">
              {canGoNext ? "✓ Answer saved" : "Select an answer to continue"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuizPage;
