import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import illustrationImage from "@assets/Gemini_Generated_Image_x6n1ydx6n1ydx6n1_1763725243475.jpeg";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <img 
            src={illustrationImage} 
            alt="UX design assessment illustration" 
            className="w-full max-w-2xl"
            data-testid="landing-illustration"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
              Find Your UX Career Stage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Take a comprehensive skills assessment to discover where you stand and what to focus on next in your UX career journey.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-xl group"
              onClick={onStart}
              data-testid="button-start-quiz"
            >
              Take the UX Quiz
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="pt-8 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">What you'll discover:</p>
            <ul className="space-y-2 text-muted-foreground max-w-xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-foreground">✓</span>
                <span>Your current career stage from Explorer to Strategic Lead</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground">✓</span>
                <span>Detailed breakdown across 5 key skill areas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground">✓</span>
                <span>Personalized 4-week improvement plan</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
