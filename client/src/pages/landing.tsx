import { memo } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Sparkle, ShareNetwork, ChartBar, Briefcase, Brain } from "@phosphor-icons/react";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = memo(function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-7 pb-14 md:pt-6 md:pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="flex justify-center mb-5 md:mb-4"
        >
          {/* ORB Animation */}
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            <div className="relative w-[250px] h-[250px] md:w-[500px] md:h-[500px] lg:w-[320px] lg:h-[320px] flex items-center justify-center">
              {/* Rotating Orb */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.04, 1, 1.04, 1]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.4 },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2
                  }
                }}
              >
                <img 
                  src="/orb.webp" 
                  alt="" 
                  className="w-full h-full object-contain opacity-100"
                  style={{ animation: "spin-slow 30s linear infinite" }}
                />
              </motion.div>
              
              {/* White transparency gradient in center */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-radial-gradient from-background via-transparent to-transparent w-full h-full scale-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              
              {/* Brain Icon at center */}
              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: [0, -2, 0, 2, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.6 },
                    scale: { duration: 0.6, delay: 0.6, ease: "easeOut" },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2
                    }
                  }}
                >
                  <Brain 
                    weight="fill" 
                    className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] opacity-100 blur-lg"
                    style={{ color: '#A5A4F4' }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto space-y-3 md:space-y-3"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-3 md:space-y-3 text-center"
          >
            {/* Powered by Ollama Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 mb-2 md:mb-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm">
                <Brain weight="duotone" className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">AI + RAG enhanced recommendations</span>
              </div>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight" data-testid="text-hero-title">
              <>Find Your <motion.span 
                className="font-playfair font-black italic relative inline-block"
              >
                {"UX Career".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{
                      filter: "blur(8px)"
                    }}
                    animate={{
                      filter: "blur(0px)"
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1.5 + index * 0.05,
                      ease: "easeInOut"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span> Stage</>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-normal md:leading-relaxed">
              Take a comprehensive skills assessment to see where you stand and what to focus on next in your UX career, with the help of AI and RAG.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center pt-2 md:pt-3"
          >
            <Button
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => onStart()}
              data-testid="button-start-quiz"
            >
              Take the UX Quiz
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-8 md:pt-12 max-w-4xl mx-auto"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 md:mb-6"
            >
              What You'll Learn
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: Sparkle,
                    title: "AI Feedback",
                    description: "Personalized AI feedback on your UX skills and performance",
                    delay: 2.5,
                  },
                  {
                    icon: ShareNetwork,
                    title: "Learning Graph",
                    description: "Curated learning graph with tailored resources and recommendations",
                    delay: 2.6,
                  },
                  {
                    icon: ChartBar,
                    title: "Score Assessment",
                    description: "AI-powered score level assessment across key skill areas",
                    delay: 2.7,
                  },
                  {
                    icon: Briefcase,
                    title: "Job Opportunities",
                    description: "Job opportunity insights matched to your skill level",
                    delay: 2.8,
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: feature.delay }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center pt-1">
                        <Icon weight="duotone" className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-normal">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

export default LandingPage;
