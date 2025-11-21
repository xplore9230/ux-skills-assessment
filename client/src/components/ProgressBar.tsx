import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground" data-testid="text-progress">
        Question {current} of {total}
      </p>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          data-testid="progress-bar-fill"
        />
      </div>
    </div>
  );
}
