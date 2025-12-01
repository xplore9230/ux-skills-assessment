/**
 * Results Page Layout
 * 
 * Renders all 8 sections of the results page.
 * Uses existing UI patterns from the codebase.
 */

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { House } from "@phosphor-icons/react";
import type { 
  QuizResults,
  ScoreHeroData,
  TitleData,
  MeaningData,
  SkillAnalysisData,
  CuratedResourcesData,
  DeepInsightsData,
  ImprovementPlanData,
  TopPodcastsData,
  NextRoleData,
  LoadingState,
} from "@/lib/results/types";

// Import section components
import ScoreHero from "./sections/ScoreHero";
import TitleBlock from "./sections/TitleBlock";
import MeaningBlock from "./sections/MeaningBlock";
import SkillAnalysis from "./sections/SkillAnalysis";
import CuratedResources from "./sections/CuratedResources";
import DeepInsights from "./sections/DeepInsights";
import ImprovementPlan from "./sections/ImprovementPlan";
import TopPodcasts from "./sections/TopPodcasts";
import NextRole from "./sections/NextRole";
import { usePremiumAccess } from "@/context/PremiumAccessContext";
import { FrustrationDiagnosisSection } from "./sections/FrustrationDiagnosis";

/**
 * Results page props
 */
interface ResultsPageProps {
  // Core results
  quizResults: QuizResults;
  
  // Section 1
  scoreHero: ScoreHeroData;
  
  // Section 2A
  title: TitleData;
  
  // Section 2B
  meaning: MeaningData | null;
  meaningStatus: LoadingState;
  
  // Section 3
  skillAnalysis: SkillAnalysisData | null;
  skillAnalysisStatus: LoadingState;
  
  // Section 4
  resources: CuratedResourcesData | null;
  resourcesStatus: LoadingState;
  
  // Section 5
  deepInsights: DeepInsightsData | null;
  deepInsightsStatus: LoadingState;
  
  // Section 6
  improvementPlan: ImprovementPlanData | null;
  improvementPlanStatus: LoadingState;
  
  // Section 6B
  topPodcasts: TopPodcastsData;
  
  // Section 7
  nextRole: NextRoleData;
  
}

/**
 * Animation variants for staggered reveal
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Results page component
 */
export default function ResultsPage({
  quizResults,
  scoreHero,
  title,
  meaning,
  meaningStatus,
  skillAnalysis,
  skillAnalysisStatus,
  resources,
  resourcesStatus,
  deepInsights,
  deepInsightsStatus,
  improvementPlan,
  improvementPlanStatus,
  topPodcasts,
  nextRole,
}: ResultsPageProps) {
  const navigate = useNavigate();
  const { isPremium, openPaywall } = usePremiumAccess();
  
  const handleGoHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Background Spheres */}
      {/* First Sphere - Larger, positioned at top */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-[-133px] w-full max-w-[1440px] h-[200px] md:h-[396px] pointer-events-none"
        style={{
          borderRadius: '50%',
          background: 'rgba(203, 222, 255, 0.60)',
          filter: 'blur(87px)',
          aspectRatio: '1440/396',
        }}
      />
      
      {/* Second Sphere - Smaller, centered, positioned above first */}
      <div 
        className="absolute left-1/2 top-[-195px] -translate-x-1/2 w-[90%] max-w-[1254px] h-[180px] md:h-[433px] pointer-events-none"
        style={{
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.90)',
          filter: 'blur(107px)',
          aspectRatio: '1254/433',
        }}
      />
      
      {/* Home FAB Button */}
      <motion.button
        onClick={handleGoHome}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:bg-foreground/90 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go to home page"
        title="Go to home"
      >
        <House size={24} weight="duotone" />
      </motion.button>
      {/* Main content container */}
      <motion.div
        className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Score Hero */}
        <motion.section variants={sectionVariants} className="mb-8 md:mb-12">
          <ScoreHero data={scoreHero} />
        </motion.section>
        
        {/* Section 2A: Title Block */}
        <motion.section variants={sectionVariants} className="mb-6 md:mb-8">
          <TitleBlock data={title} />
        </motion.section>
        
        {/* Section 2B: Meaning Block (AI) */}
        <motion.section variants={sectionVariants} className="mb-12 md:mb-16">
          <MeaningBlock data={meaning} status={meaningStatus} />
        </motion.section>
        
        {/* Section 3: Skill Analysis */}
        <motion.section id="skill-analysis" variants={sectionVariants} className="mb-12 md:mb-16">
          <SkillAnalysis 
            data={skillAnalysis} 
            status={skillAnalysisStatus}
            categories={quizResults.categories}
          />
        </motion.section>
        
        {/* Frustration Diagnosis Input/Result (visible for premium) */}
        {isPremium && (
          <motion.section variants={sectionVariants} className="mb-12 md:mb-16">
            <FrustrationDiagnosisSection
              score={quizResults.totalScore}
              stage={quizResults.stage as any}
              categories={quizResults.categories}
            />
          </motion.section>
        )}
        
        {/* Section 4: 3-Week Improvement Plan */}
        <motion.section id="improvement-plan" variants={sectionVariants} className="mb-12 md:mb-16">
          <ImprovementPlan data={improvementPlan} status={improvementPlanStatus} />
        </motion.section>
        
        {/* Section 5: Curated Resources */}
        <motion.section id="resources" variants={sectionVariants} className="mb-12 md:mb-16">
          <CuratedResources data={resources} status={resourcesStatus} />
        </motion.section>
        
        {/* Section 6: Deep Insights */}
        <motion.section id="deep-insights" variants={sectionVariants} className="mb-12 md:mb-16">
          <DeepInsights data={deepInsights} status={deepInsightsStatus} />
        </motion.section>
        
        {/* Section 7: Top Podcasts */}
        <motion.section variants={sectionVariants} className="mb-12 md:mb-16">
          <TopPodcasts data={topPodcasts} />
        </motion.section>
        
        {/* Section 8: Next Role */}
        <motion.section variants={sectionVariants} className="mb-12 md:mb-16">
          <NextRole data={nextRole} />
        </motion.section>
        
      </motion.div>
    </div>
  );
}


