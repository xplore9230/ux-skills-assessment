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

  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration * 0.8, ease: "easeOut" }}
        className="tabular-nums"
      >
        <p className="text-8xl font-bold font-mono leading-none">
          {String(displayScore).padStart(2, "0")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl text-muted-foreground font-mono"
      >
        <p>/ {maxScore}</p>
      </motion.div>
    </div>
  );
}
