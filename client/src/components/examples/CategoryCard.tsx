import CategoryCard from '../CategoryCard';

export default function CategoryCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
      <CategoryCard
        name="UX Fundamentals"
        score={11}
        maxScore={15}
        status="strong"
      />
      <CategoryCard
        name="UI Craft"
        score={9}
        maxScore={15}
        status="decent"
      />
      <CategoryCard
        name="Research"
        score={7}
        maxScore={15}
        status="needs-work"
      />
    </div>
  );
}
