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
      className="flex gap-2 md:gap-3 lg:gap-4 items-start w-full"
    >
      <span className={`flex-shrink-0 font-semibold font-mono pt-2.5 md:pt-3 lg:pt-4 text-xs md:text-sm lg:text-base min-w-fit ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
        {value}
      </span>
      
      <Button
        variant={isSelected ? "default" : "outline"}
        className={`flex-1 h-auto py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 rounded-full text-left justify-start transition-all overflow-visible ${
          isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-card border-card-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
        }`}
        onClick={onClick}
        data-testid={`option-${value}`}
      >
        <span className="text-xs md:text-sm lg:text-base leading-snug md:leading-relaxed break-words whitespace-normal">{label}</span>
      </Button>
    </motion.div>
  );
}
