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
      className="flex gap-3 md:gap-4 items-start w-full"
    >
      <span className={`flex-shrink-0 font-semibold font-mono pt-3 md:pt-4 text-sm md:text-base ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
        {value}
      </span>
      
      <Button
        variant={isSelected ? "default" : "outline"}
        className={`flex-1 h-auto py-3 md:py-4 px-4 md:px-6 rounded-full text-left justify-start transition-all ${
          isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-card border-card-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
        }`}
        onClick={onClick}
        data-testid={`option-${value}`}
      >
        <span className="text-sm md:text-base leading-relaxed">{label}</span>
      </Button>
    </motion.div>
  );
}
