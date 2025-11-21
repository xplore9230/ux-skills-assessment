import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScoreOdometerProps {
  score: number;
  maxScore: number;
  duration?: number;
}

export default function ScoreOdometer({
  score,
  maxScore,
  duration = 2.5,
}: ScoreOdometerProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = score / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [score, duration]);

  const tens = Math.floor(displayScore / 10);
  const ones = displayScore % 10;

  return (
    <div className="flex items-center justify-center gap-1">
      <div className="flex gap-0 overflow-hidden">
        {/* Tens digit - moves upward */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: duration, 
            ease: "easeOut",
            delay: 0.1
          }}
          className="flex flex-col items-center justify-center"
        >
          <p className="text-8xl font-bold font-mono leading-none">
            {tens}
          </p>
        </motion.div>

        {/* Ones digit - moves downward */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: duration, 
            ease: "easeOut",
            delay: 0.1
          }}
          className="flex flex-col items-center justify-center"
        >
          <p className="text-8xl font-bold font-mono leading-none">
            {ones}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-sm text-muted-foreground font-mono"
      >
        <p>/ {maxScore}</p>
      </motion.div>
    </div>
  );
}
