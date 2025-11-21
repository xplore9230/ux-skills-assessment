import ResultsPage from '../results';

const mockResults = {
  stage: "Emerging Senior",
  totalScore: 52,
  maxScore: 75,
  summary: "You're close to or already functioning at a senior level. You can drive flows end-to-end and work well with PM/eng. Next step is sharpening strategy, systems thinking, and mentoring.",
  categories: [
    { name: "UX Fundamentals", score: 11, maxScore: 15, status: "strong" as const },
    { name: "UI Craft & Visual Design", score: 9, maxScore: 15, status: "decent" as const },
    { name: "User Research & Validation", score: 7, maxScore: 15, status: "needs-work" as const },
    { name: "Product Thinking & Strategy", score: 14, maxScore: 15, status: "strong" as const },
    { name: "Collaboration & Communication", score: 11, maxScore: 15, status: "strong" as const }
  ],
  improvementPlan: [
    {
      week: 1,
      tasks: [
        "Pick a core funnel and map it completely",
        "Identify drop-off points in the journey",
        "Research best practices for funnel optimization"
      ]
    },
    {
      week: 2,
      tasks: [
        "Propose 2-3 experiments for improvements",
        "Create detailed test plans",
        "Present findings to stakeholders"
      ]
    },
    {
      week: 3,
      tasks: [
        "Run a small usability study",
        "Document insights and patterns",
        "Share findings with the team"
      ]
    },
    {
      week: 4,
      tasks: [
        "Write design principles documentation",
        "Review and refine based on feedback",
        "Present to wider organization"
      ]
    }
  ]
};

export default function ResultsPageExample() {
  return <ResultsPage {...mockResults} onRestart={() => console.log('Restart quiz')} />;
}
