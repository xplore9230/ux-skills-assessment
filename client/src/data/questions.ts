export interface Question {
  id: string;
  text: string;
  category: string;
  options: { value: number; label: string }[];
}

export const questions: Question[] = [
  {
    id: "Q1",
    text: "When you start a new project, how often do you explicitly define the problem statement and success metrics?",
    category: "UX Fundamentals",
    options: [
      { value: 1, label: "Rarely, I mostly start directly with screens" },
      { value: 2, label: "Sometimes, but not always written down" },
      { value: 3, label: "Often, but metrics are vague" },
      { value: 4, label: "Usually, with clear problem + direction" },
      { value: 5, label: "Always, I write a clear problem, constraints, and success metrics" }
    ]
  },
  {
    id: "Q2",
    text: "How confident are you in breaking down a user journey into flows and edge cases?",
    category: "UX Fundamentals",
    options: [
      { value: 1, label: "I struggle with this" },
      { value: 2, label: "I can do simple flows" },
      { value: 3, label: "I can handle typical product flows" },
      { value: 4, label: "I cover most states and edge cases" },
      { value: 5, label: "I systematically cover all states, edge cases, and system rules" }
    ]
  },
  {
    id: "Q3",
    text: "When designing, how often do you consciously apply usability principles (heuristics, Fitts' law, etc.)?",
    category: "UX Fundamentals",
    options: [
      { value: 1, label: "Almost never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very often and intentionally" }
    ]
  },
  {
    id: "Q4",
    text: "How would you rate your skills in layout, spacing, and visual hierarchy?",
    category: "UI Craft & Visual Design",
    options: [
      { value: 1, label: "Weak, my designs often feel cluttered or misaligned" },
      { value: 2, label: "Basic, I can follow existing patterns" },
      { value: 3, label: "Decent, I can make things look 'good enough'" },
      { value: 4, label: "Strong, I can craft polished clean UIs" },
      { value: 5, label: "Very strong, I obsess over details, grids, and spacing" }
    ]
  },
  {
    id: "Q5",
    text: "How often do you use and contribute to a design system (tokens, components, patterns)?",
    category: "UI Craft & Visual Design",
    options: [
      { value: 1, label: "I don't really use design systems" },
      { value: 2, label: "I consume components but don't modify them" },
      { value: 3, label: "I sometimes suggest improvements" },
      { value: 4, label: "I actively extend and maintain components" },
      { value: 5, label: "I help define or govern the design system" }
    ]
  },
  {
    id: "Q6",
    text: "How comfortable are you with designing for different screen sizes and platforms (Android, iOS, Web)?",
    category: "UI Craft & Visual Design",
    options: [
      { value: 1, label: "Mostly design for one screen/platform" },
      { value: 2, label: "I try but struggle to adapt patterns" },
      { value: 3, label: "I can adapt for major platforms" },
      { value: 4, label: "Comfortable across multiple platforms" },
      { value: 5, label: "Very comfortable with platform guidelines and responsive behaviour" }
    ]
  },
  {
    id: "Q7",
    text: "How often do you talk to users or observe them using your product?",
    category: "User Research & Validation",
    options: [
      { value: 1, label: "Almost never" },
      { value: 2, label: "Rarely, maybe once or twice a year" },
      { value: 3, label: "Sometimes, when the project demands it" },
      { value: 4, label: "Regularly for key projects" },
      { value: 5, label: "Very regularly, I push for it proactively" }
    ]
  },
  {
    id: "Q8",
    text: "When you design something, how often is it validated (usability test, A/B test, analytics)?",
    category: "User Research & Validation",
    options: [
      { value: 1, label: "Hardly ever" },
      { value: 2, label: "Rarely, only big features" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often, especially critical flows" },
      { value: 5, label: "Almost always, I push for validation" }
    ]
  },
  {
    id: "Q9",
    text: "How confident are you in turning research insights into clear product decisions?",
    category: "User Research & Validation",
    options: [
      { value: 1, label: "Not confident" },
      { value: 2, label: "I can summarise feedback but struggle to prioritise" },
      { value: 3, label: "I can identify patterns and suggest changes" },
      { value: 4, label: "I can define clear recommendations with rationale" },
      { value: 5, label: "I can frame insights into roadmap-level decisions" }
    ]
  },
  {
    id: "Q10",
    text: "How well do you understand the business model and metrics of the product you work on?",
    category: "Product Thinking & Strategy",
    options: [
      { value: 1, label: "Barely" },
      { value: 2, label: "I know a few high-level metrics" },
      { value: 3, label: "I know main KPIs and track them loosely" },
      { value: 4, label: "I understand core funnels and business impact" },
      { value: 5, label: "I can explain trade-offs between UX, revenue, and tech in detail" }
    ]
  },
  {
    id: "Q11",
    text: "When prioritising design ideas, how often do you consider impact vs. effort?",
    category: "Product Thinking & Strategy",
    options: [
      { value: 1, label: "Hardly ever, I just design what's asked" },
      { value: 2, label: "Sometimes, but not systematically" },
      { value: 3, label: "I think about it but don't always voice it" },
      { value: 4, label: "I actively push for high-impact/low-effort ideas" },
      { value: 5, label: "I help PM/Eng prioritise with clear impact/effort framing" }
    ]
  },
  {
    id: "Q12",
    text: "How often are you involved early (problem-definition stage) vs. late (UI-polish stage)?",
    category: "Product Thinking & Strategy",
    options: [
      { value: 1, label: "Almost always brought in late" },
      { value: 2, label: "Mostly late, rarely early" },
      { value: 3, label: "Mixed" },
      { value: 4, label: "Often early in the process" },
      { value: 5, label: "Usually at the very beginning" }
    ]
  },
  {
    id: "Q13",
    text: "How comfortable are you presenting your work to stakeholders (PMs, engineers, leadership)?",
    category: "Collaboration & Communication",
    options: [
      { value: 1, label: "Very uncomfortable" },
      { value: 2, label: "Somewhat uncomfortable" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "Quite comfortable" },
      { value: 5, label: "Very confident, I enjoy it" }
    ]
  },
  {
    id: "Q14",
    text: "How often do you write documentation (rationale, specs, handoff notes)?",
    category: "Collaboration & Communication",
    options: [
      { value: 1, label: "Almost never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Almost always, with clear and structured docs" }
    ]
  },
  {
    id: "Q15",
    text: "How would you rate your relationship with developers and PMs?",
    category: "Collaboration & Communication",
    options: [
      { value: 1, label: "Often misaligned or tense" },
      { value: 2, label: "Functional but not smooth" },
      { value: 3, label: "Mostly okay, some friction" },
      { value: 4, label: "Generally strong and collaborative" },
      { value: 5, label: "Very strong, I'm seen as a trusted partner" }
    ]
  }
];

export const categoryNames = {
  "UX Fundamentals": "UX Fundamentals",
  "UI Craft & Visual Design": "UI Craft & Visual Design",
  "User Research & Validation": "User Research & Validation",
  "Product Thinking & Strategy": "Product Thinking & Strategy",
  "Collaboration & Communication": "Collaboration & Communication"
};
