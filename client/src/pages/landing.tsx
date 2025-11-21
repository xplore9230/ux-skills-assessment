import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import illustrationImage from "@assets/Gemini_Generated_Image_x6n1ydx6n1ydx6n1_1763725243475.jpeg";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center py-6">
        <div className="grid lg:grid-cols-2 gap-6 items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img 
              src={illustrationImage} 
              alt="UX design assessment illustration" 
              className="w-full max-w-sm"
              data-testid="landing-illustration"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" data-testid="text-hero-title">
                Find Your UX Career Stage
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Discover where you stand and what to focus on next in your UX career.
              </p>
            </div>
            
            <Button
              size="lg"
              className="text-base px-6 py-5 rounded-lg group w-full"
              onClick={onStart}
              data-testid="button-start-quiz"
            >
              Take the UX Quiz
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="space-y-2 text-xs md:text-sm">
              <p className="text-muted-foreground font-semibold">What you'll discover:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground flex-shrink-0">✓</span>
                  <span>Career stage: Explorer to Strategic Lead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground flex-shrink-0">✓</span>
                  <span>5 key skill area breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground flex-shrink-0">✓</span>
                  <span>Personalized 4-week plan</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
