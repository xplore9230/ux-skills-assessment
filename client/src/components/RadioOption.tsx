import { motion } from "framer-motion";

interface RadioOptionProps {
  value: number;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function RadioOption({
  value,
  label,
  isSelected,
  onClick,
}: RadioOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="flex gap-4 items-center w-full text-left hover-elevate transition-all p-3 rounded-lg"
      data-testid={`option-${value}`}
    >
      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
        isSelected
          ? "border-primary bg-primary"
          : "border-muted-foreground hover:border-foreground"
      }`}>
        {isSelected && (
          <div className="w-2 h-2 bg-background rounded-full" />
        )}
      </div>
      <span className="flex-1 text-sm md:text-base leading-relaxed">{label}</span>
    </motion.button>
  );
}
