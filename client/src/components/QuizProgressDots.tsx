interface QuizProgressDotsProps {
  current: number;
  total: number;
}

export default function QuizProgressDots({
  current,
  total,
}: QuizProgressDotsProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all ${
            index < current
              ? "bg-primary w-4"
              : index === current
              ? "bg-primary w-4"
              : "bg-muted w-2"
          }`}
        />
      ))}
    </div>
  );
}
