import WeekCard from '../WeekCard';

export default function WeekCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
      <WeekCard
        week={1}
        tasks={[
          "Learn UX basics: heuristics, flows, wireframes",
          "Study 3 case studies from top designers",
          "Practice sketching user flows"
        ]}
      />
      <WeekCard
        week={2}
        tasks={[
          "Pick one app and redesign a key flow",
          "Create detailed wireframes",
          "Get feedback from peers"
        ]}
        delay={0.1}
      />
    </div>
  );
}
