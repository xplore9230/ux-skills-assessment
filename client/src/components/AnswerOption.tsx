import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AnswerOptionProps {
  value: number;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function AnswerOption({
  value,
  label,
  isSelected,
  onClick,
}: AnswerOptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant={isSelected ? "default" : "outline"}
        className={`w-full h-auto py-2 px-3 md:py-3 md:px-4 lg:py-4 lg:px-6 rounded-full text-left justify-start transition-all overflow-hidden ${
          isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-card border-card-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
        }`}
        onClick={onClick}
        data-testid={`option-${value}`}
      >
        <span className="flex items-start gap-1 md:gap-2 lg:gap-4 w-full min-w-0">
          <span className={`flex-shrink-0 text-xs md:text-sm font-semibold font-mono ${isSelected ? "" : "text-muted-foreground"}`}>
            {value}
          </span>
          <span className="flex-1 text-xs md:text-sm lg:text-base leading-relaxed min-w-0 break-words">{label}</span>
        </span>
      </Button>
    </motion.div>
  );
}
