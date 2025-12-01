/**
 * Knowledge Bank - Curated UX Learning Resources
 * 
 * ============================================================================
 * IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all learning resources.
 * ============================================================================
 * 
 * All resources displayed in:
 * - Curated Resources section
 * - Deep Insights section
 * - Improvement Plan resource links
 * 
 * MUST come from this file. Do NOT create placeholder generators elsewhere.
 * 
 * Each resource must have:
 * - Unique ID (e.g., "explorer-001")
 * - Real, working URL to actual content
 * - Accurate title, summary, and metadata
 * 
 * Organization:
 * - Category: UX Fundamentals, UI Craft & Visual Design, User Research & Validation,
 *             Product Thinking & Strategy, Collaboration & Communication
 * - Level: explorer, practitioner, emerging-senior, strategic-lead
 * - Type: article, video, podcast
 * 
 * To add new resources: Add entries to the knowledgeBank array below.
 * To remove resources: Delete entries from the array.
 * 
 * DO NOT create fake/placeholder data in server/routes.ts or anywhere else.
 * ============================================================================
 */

export type ResourceType = "article" | "video" | "podcast";

export type ResourceLevel =
  | "explorer"
  | "practitioner"
  | "emerging-senior"
  | "strategic-lead";

export type Category =
  | "UX Fundamentals"
  | "UI Craft & Visual Design"
  | "User Research & Validation"
  | "Product Thinking & Strategy"
  | "Collaboration & Communication";

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  category: Category;
  level: ResourceLevel;
  duration?: string; // "5 min read", "12 min video", "45 min podcast"
  summary: string; // 2-3 sentences
  tags: string[];
  author?: string;
  source?: string; // "NN/g", "Smashing Magazine", etc.
}

export const knowledgeBank: Resource[] = [
  // ========================================
  // EXPLORER (0-40) — Foundations & Mindset
  // ========================================
  {
    id: "explorer-001",
    title: "Definition of User Experience (NN/g)",
    url: "https://www.nngroup.com/articles/definition-user-experience/",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "5 min read",
    summary: "Nielsen Norman Group's definitive explanation of what user experience means, covering users, system, and context.",
    tags: ["definition", "basics", "nng", "ux"],
    source: "NN/g"
  },
  {
    id: "explorer-002",
    title: "What is UX Design? (IxDF 2025)",
    url: "https://www.interaction-design.org/literature/topics/ux-design",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "10 min read",
    summary: "Interaction Design Foundation's evergreen primer that explains UX roles, history, and why customer-centricity matters.",
    tags: ["introduction", "ixdf", "career", "basics"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-003",
    title: "What Is UX? User Experience Basics (Baymard)",
    url: "https://baymard.com/learn/what-is-ux",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "7 min read",
    summary: "Baymard Institute breaks down UX terminology, the relationship to CRO, and how usability testing fits in.",
    tags: ["baymard", "basics", "usability"],
    source: "Baymard"
  },
  {
    id: "explorer-004",
    title: "UX vs UI – What's the Difference?",
    url: "https://www.interaction-design.org/literature/article/ux-vs-ui-what-s-the-difference",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "8 min read",
    summary: "Clarifies the responsibilities of UX versus UI design so beginners understand how the roles overlap and diverge.",
    tags: ["ux", "ui", "roles", "beginners"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-005",
    title: "A Comprehensive Guide to UX Design (Smashing)",
    url: "https://www.smashingmagazine.com/2018/02/comprehensive-guide-user-experience-design/",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "15 min read",
    summary: "Smashing Magazine's handbook that walks through research, flows, IA, and testing for first-time UX designers.",
    tags: ["ux", "guide", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "explorer-006",
    title: "Usability 101: Introduction to Usability",
    url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "6 min read",
    summary: "Explains why usability matters, how to measure it, and the core components of user-centered design.",
    tags: ["usability", "beginners", "nng"],
    source: "NN/g"
  },
  {
    id: "explorer-007",
    title: "10 Usability Heuristics for User Interface Design",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "9 min read",
    summary: "Nielsen Norman Group's definitive guide to the 10 usability heuristics with explanations and examples.",
    tags: ["heuristics", "principles", "nng"],
    source: "NN/g"
  },
  {
    id: "explorer-008",
    title: "UX Design: How to Get Started (Workshopper)",
    url: "https://www.workshopper.com/post/ux-design-how-to-get-started-a-full-guide",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "12 min read",
    summary: "Step-by-step plan covering mindset shifts, study habits, and portfolio tips for brand-new designers.",
    tags: ["career", "beginners", "workflow"],
    source: "Workshopper"
  },
  {
    id: "explorer-009",
    title: "How to Get Started in UX Design",
    url: "https://www.interaction-design.org/literature/topics/ux-design",
    type: "article",
    category: "Collaboration & Communication",
    level: "explorer",
    duration: "7 min read",
    summary: "IxDF guide that demystifies getting started in UX design and outlines practical first steps for beginners.",
    tags: ["career", "mindset", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-010",
    title: "Ten Tips for Aspiring Designers (Part 1)",
    url: "https://www.smashingmagazine.com/2022/01/ten-tips-aspiring-designer-beginners-part1/",
    type: "article",
    category: "Collaboration & Communication",
    level: "explorer",
    duration: "10 min read",
    summary: "Smashing Magazine shares actionable advice on feedback, mentorship, and practicing core craft early.",
    tags: ["career", "tips", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "explorer-011",
    title: "Free UX Design Course",
    url: "https://www.uxdesigninstitute.com/courses/free-ux-design-course",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "Self-paced",
    summary: "UX Design Institute's free video course that covers research, wireframes, and testing with downloadable exercises.",
    tags: ["course", "video", "uxdesigninstitute"],
    source: "UX Design Institute"
  },
  {
    id: "explorer-012",
    title: "3 Underrated Fundamentals of UX",
    url: "https://www.appcues.com/blog/ux-fundamentals",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "6 min read",
    summary: "Appcues highlights journey mapping, expectation setting, and friction reduction as often-missed basics.",
    tags: ["fundamentals", "appcues", "basics"],
    source: "Appcues"
  },
  {
    id: "explorer-013",
    title: "What Is UX Design & Why It's Important",
    url: "https://www.youtube.com/watch?v=nWtLbeq0M-o",
    type: "video",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "9 min video",
    summary: "YouTube explainer that frames UX value for stakeholders and shows real-world examples of good and bad flows.",
    tags: ["video", "ux", "basics"],
    source: "YouTube"
  },
  {
    id: "explorer-014",
    title: "Affordances and Signifiers in UX Design",
    url: "https://www.interaction-design.org/literature/article/affordances",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "15 min read",
    summary: "IxDF explains Don Norman's concepts of affordances and signifiers, foundational principles for user-centered design.",
    tags: ["norman", "affordances", "principles", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-015",
    title: "Information Architecture Basics",
    url: "https://www.usability.gov/what-and-why/information-architecture.html",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "8 min read",
    summary: "Usability.gov explains how to organize content so users can find information and complete tasks efficiently.",
    tags: ["ia", "information-architecture", "usability"],
    source: "Usability.gov"
  },
  {
    id: "explorer-016",
    title: "Wireframing: A Beginner's Guide",
    url: "https://www.interaction-design.org/literature/topics/wireframing",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "10 min read",
    summary: "IxDF's step-by-step guide to creating wireframes, from low-fidelity sketches to interactive prototypes.",
    tags: ["wireframes", "prototyping", "basics", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-017",
    title: "User Journey Mapping: A Complete Guide",
    url: "https://www.interaction-design.org/literature/topics/user-journey-maps",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "12 min read",
    summary: "IxDF walks through creating journey maps to visualize user experiences and identify pain points.",
    tags: ["journey-mapping", "user-flows", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-018",
    title: "Accessibility for Everyone",
    url: "https://www.a11yproject.com/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "explorer",
    duration: "Self-paced",
    summary: "A11y Project's comprehensive resource covering WCAG guidelines, ARIA, and inclusive design practices.",
    tags: ["accessibility", "a11y", "inclusive-design"],
    source: "A11y Project"
  },
  {
    id: "explorer-019",
    title: "Design Thinking: A Non-Linear Process",
    url: "https://www.interaction-design.org/literature/topics/design-thinking",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "11 min read",
    summary: "IxDF explains the five stages of design thinking: empathize, define, ideate, prototype, and test.",
    tags: ["design-thinking", "process", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "explorer-020",
    title: "The UX Design Process: A Step-by-Step Guide",
    url: "https://careerfoundry.com/en/blog/ux-design/the-ux-design-process-an-actionable-guide-to-your-first-job-in-ux/",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "14 min read",
    summary: "CareerFoundry breaks down the UX process from research to testing, with practical examples for beginners.",
    tags: ["process", "workflow", "careerfoundry"],
    source: "CareerFoundry"
  },

  // ========================================
  // PRACTITIONER (41-65) — UI Craft & Systems
  // ========================================
  {
    id: "practitioner-001",
    title: "A Comprehensive Guide to UI Design",
    url: "https://www.smashingmagazine.com/2018/02/comprehensive-guide-ui-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "18 min read",
    summary: "Smashing Magazine dives into layout, color, and prototyping techniques for designers shipping production work.",
    tags: ["ui", "smashing", "patterns"],
    source: "Smashing Magazine"
  },
  {
    id: "practitioner-002",
    title: "5 Principles of Visual Design in UX",
    url: "https://www.nngroup.com/articles/principles-visual-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "7 min read",
    summary: "NN/g outlines hierarchy, balance, contrast, gestalt, and consistency with examples from modern products.",
    tags: ["visual-design", "principles", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-003",
    title: "Using Color to Enhance Your Design",
    url: "https://www.nngroup.com/articles/color-enhance-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "8 min read",
    summary: "Explains how to apply color intentionally for call-to-action clarity, state changes, and accessibility.",
    tags: ["color", "visual", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-004",
    title: "The UX Designer's Guide to Typography",
    url: "https://www.interaction-design.org/literature/topics/typography",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "9 min read",
    summary: "IxDF covers font pairing, readability, and responsive type scales for product teams.",
    tags: ["typography", "ixdf", "ui"],
    source: "Interaction Design Foundation"
  },
  {
    id: "practitioner-005",
    title: "5 Visual Treatments that Improve Accessibility",
    url: "https://www.nngroup.com/articles/visual-treatments-accessibility/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "6 min read",
    summary: "Shows how contrast, outlines, focus states, and motion cues can remove visual barriers for users.",
    tags: ["accessibility", "ui", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-006",
    title: "Design Systems: An Overview",
    url: "https://www.interaction-design.org/literature/topics/design-systems",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "practitioner",
    duration: "10 min read",
    summary: "IxDF explains tokens, governance, and component libraries so designers can partner with engineering.",
    tags: ["design-systems", "tokens", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "practitioner-007",
    title: "Testing Visual Design",
    url: "https://www.nngroup.com/articles/testing-visual-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "7 min read",
    summary: "Guidance on preference tests, desirability studies, and which metrics reveal visual quality.",
    tags: ["testing", "visual", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-008",
    title: "Flat Design: Problems & Flat 2.0",
    url: "https://www.nngroup.com/articles/flat-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "9 min read",
    summary: "NN/g dissects why overly minimal interfaces hurt usability and how Flat 2.0 reintroduces helpful cues.",
    tags: ["flat-design", "visual", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-009",
    title: "Material Design 3: Expressive Design System",
    url: "https://m3.material.io/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "8 min read",
    summary: "Google's Material Design 3 documentation shows how expressive design systems help complex products with dynamic color and motion.",
    tags: ["material", "design-language", "google"],
    source: "Google Material Design"
  },
  {
    id: "practitioner-010",
    title: "Responsive Web Design: Best Practices",
    url: "https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "16 min read",
    summary: "Smashing Magazine's foundational guide to building responsive designs that work across devices.",
    tags: ["responsive", "web-design", "components", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "practitioner-011",
    title: "Microinteractions: Designing with Details",
    url: "https://www.nngroup.com/articles/microinteractions/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "7 min read",
    summary: "NN/g explains how small animations and feedback moments improve perceived quality and usability.",
    tags: ["microinteractions", "animation", "feedback", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-012",
    title: "Design Tokens: The Building Blocks of Design Systems",
    url: "https://www.smashingmagazine.com/2019/11/design-tokens-components/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "13 min read",
    summary: "Comprehensive guide to creating and managing design tokens for consistent, scalable design systems.",
    tags: ["design-tokens", "design-systems", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "practitioner-013",
    title: "Grid Systems in UI Design",
    url: "https://www.interaction-design.org/literature/article/grid-systems-in-ui-design",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "9 min read",
    summary: "IxDF covers 8pt grids, baseline grids, and how to structure layouts for visual harmony and consistency.",
    tags: ["grids", "layout", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "practitioner-014",
    title: "Dark Mode UI Design: Best Practices",
    url: "https://www.nngroup.com/articles/dark-mode/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "8 min read",
    summary: "NN/g research on dark mode usability, contrast requirements, and when to offer light/dark options.",
    tags: ["dark-mode", "color", "accessibility", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-015",
    title: "Form Design Best Practices",
    url: "https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "11 min read",
    summary: "Smashing Magazine's guide to reducing form friction with smart layouts, validation, and error handling.",
    tags: ["forms", "ui", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "practitioner-016",
    title: "Empty States: Turning Nothing into Something",
    url: "https://www.nngroup.com/articles/empty-state-design/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "6 min read",
    summary: "How to design helpful empty states that guide users and reduce confusion when content is missing.",
    tags: ["empty-states", "ui", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-017",
    title: "Error Messages: Guidelines and Best Practices",
    url: "https://www.nngroup.com/articles/error-message-guidelines/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "7 min read",
    summary: "NN/g research on writing clear, actionable error messages that help users recover from mistakes.",
    tags: ["error-handling", "copywriting", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-018",
    title: "Loading States and Skeleton Screens",
    url: "https://www.nngroup.com/articles/skeleton-screens/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "8 min read",
    summary: "NN/g explains how skeleton screens and progress indicators improve perceived performance and reduce perceived wait time.",
    tags: ["loading", "performance", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-019",
    title: "Navigation Patterns for Mobile Apps",
    url: "https://www.nngroup.com/articles/mobile-navigation-patterns/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "9 min read",
    summary: "NN/g research on hamburger menus, tab bars, and navigation patterns that work best on mobile.",
    tags: ["navigation", "mobile", "patterns", "nng"],
    source: "NN/g"
  },
  {
    id: "practitioner-020",
    title: "Designing for Touch: Target Sizes and Spacing",
    url: "https://www.nngroup.com/articles/touch-target-size/",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "6 min read",
    summary: "NN/g guidelines on minimum touch target sizes and spacing to prevent accidental taps on mobile.",
    tags: ["touch", "mobile", "accessibility", "nng"],
    source: "NN/g"
  },

  // ========================================
  // EMERGING SENIOR (66-85) — Research & Product Strategy
  // ========================================
  {
    id: "emerging-001",
    title: "When to Use Which UX Research Methods",
    url: "https://www.nngroup.com/articles/which-ux-research-methods/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "12 min read",
    summary: "Matrix from NN/g that maps generative vs evaluative methods to project constraints.",
    tags: ["research", "methods", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-002",
    title: "User Interviews 101",
    url: "https://www.nngroup.com/articles/user-interviews/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "How to plan, recruit, script, and synthesize user interviews with fewer biases.",
    tags: ["interviews", "qualitative", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-003",
    title: "How Many Users Should You Interview?",
    url: "https://blog.ferpection.com/en/how-many-users-should-we-interview",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "6 min read",
    summary: "Ferpection shares sample-size guidance and how to iterate research rounds efficiently.",
    tags: ["sample-size", "research", "qual"],
    source: "Ferpection"
  },
  {
    id: "emerging-004",
    title: "Usability Testing 101",
    url: "https://www.nngroup.com/articles/usability-testing-101/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "Explains planning, facilitation, note-taking, and reporting steps for lab or remote usability tests.",
    tags: ["usability", "testing", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-005",
    title: "What is A/B Testing?",
    url: "https://www.interaction-design.org/literature/topics/a-b-testing",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "IxDF overview of experimentation workflows, metrics, and when to use multivariate tests.",
    tags: ["experimentation", "ab-testing", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "emerging-006",
    title: "Writing Good Survey Questions",
    url: "https://www.nngroup.com/articles/survey-best-practices/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "7 min read",
    summary: "Best practices on bias-free wording, Likert design, and screening logic for UX surveys.",
    tags: ["surveys", "quant", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-007",
    title: "Running Surveys in the Design Cycle",
    url: "https://www.nngroup.com/articles/surveys-design-cycle/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "6 min read",
    summary: "How to place surveys at discovery, validation, or post-launch phases for stronger evidence.",
    tags: ["surveys", "process", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-008",
    title: "Tips on Conducting Guerrilla Usability Testing",
    url: "https://www.nngroup.com/articles/guerrilla-usability-testing/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "7 min read",
    summary: "NN/g walkthrough on recruiting fast, scripting short tasks, and using findings responsibly in guerrilla testing.",
    tags: ["guerrilla", "testing", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-009",
    title: "Personas Make Users Memorable",
    url: "https://www.nngroup.com/articles/persona/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "Explains persona attributes, storytelling, and pitfalls so teams keep user mental models aligned.",
    tags: ["personas", "story", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-010",
    title: "Card Sorting: How to Organize Information",
    url: "https://www.interaction-design.org/literature/topics/card-sorting",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "9 min read",
    summary: "Covers open vs closed sorts, recruiting, and when to pair with tree testing.",
    tags: ["ia", "cardsorting", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "emerging-011",
    title: "First Click Testing",
    url: "https://blog.uxtweak.com/first-click-testing/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "6 min read",
    summary: "UXtweak explains setup, metrics, and how to interpret first-click success.",
    tags: ["testing", "navigation", "uxtweak"],
    source: "UXtweak"
  },
  {
    id: "emerging-012",
    title: "Why Product Thinking Is the Next Big Thing in UX",
    url: "https://www.interaction-design.org/literature/topics/product-thinking",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "IxDF explains how UX designers can align problem framing and outcomes with product strategy.",
    tags: ["product-thinking", "strategy", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "emerging-013",
    title: "UX Strategy: Definition & Components",
    url: "https://www.nngroup.com/articles/ux-strategy/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "Breaks down vision, KPIs, prioritization, and sequencing for UX leaders.",
    tags: ["ux-strategy", "roadmap", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-014",
    title: "Product & UX Study Guide",
    url: "https://www.nngroup.com/articles/product-and-ux-study-guide/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "12 min read",
    summary: "Reading roadmap from NN/g that links business, analytics, and UX craft topics.",
    tags: ["study-guide", "product", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-015",
    title: "The Fusion Phenomenon: Product Strategy vs UX Strategy",
    url: "https://www.mindtheproduct.com/the-fusion-phenomenon-product-strategy-vs-ux-strategy/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "Mind the Product clarifies responsibilities between product managers and UX strategists.",
    tags: ["strategy", "mindtheproduct", "collaboration"],
    source: "Mind the Product"
  },
  {
    id: "emerging-016",
    title: "Building a Practical UX Strategy Framework",
    url: "https://www.smashingmagazine.com/2025/05/building-practical-ux-strategy-framework/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "14 min read",
    summary: "2025 Smashing Magazine piece detailing templates for mission, KPIs, and governance.",
    tags: ["ux-strategy", "framework", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "emerging-017",
    title: "UX KPIs",
    url: "https://www.interaction-design.org/literature/topics/kpi",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "7 min read",
    summary: "Defines leading and lagging indicators designers can attach to product objectives.",
    tags: ["kpi", "metrics", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "emerging-018",
    title: "Best UX Metrics & KPIs (2025)",
    url: "https://qualaroo.com/blog/measure-user-experience/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "9 min read",
    summary: "Qualaroo compiles CSAT, SUS, CES, and behavioral metrics with sample dashboards.",
    tags: ["metrics", "qualaroo", "measurement"],
    source: "Qualaroo"
  },
  {
    id: "emerging-019",
    title: "Measuring UX and ROI",
    url: "https://rgp.com/2024/06/06/measuring-ux-and-roi/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "RGP explains how to link UX initiatives to revenue, retention, and efficiency gains.",
    tags: ["roi", "business", "rgp"],
    source: "RGP"
  },
  {
    id: "emerging-020",
    title: "Contextual Inquiry: A Primer",
    url: "https://www.nngroup.com/articles/contextual-inquiry/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "9 min read",
    summary: "NN/g explains how to observe users in their natural environment to uncover unarticulated needs.",
    tags: ["contextual-inquiry", "ethnography", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-021",
    title: "Diary Studies: Understanding Long-Term User Behavior",
    url: "https://www.nngroup.com/articles/diary-studies/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "How to design diary studies that capture user experiences over days or weeks for longitudinal insights.",
    tags: ["diary-studies", "longitudinal", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-022",
    title: "Tree Testing: A Complete Guide",
    url: "https://www.nngroup.com/articles/tree-testing/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "NN/g guide to tree testing for evaluating information architecture without visual design influence.",
    tags: ["tree-testing", "ia", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-023",
    title: "Quantitative vs Qualitative UX Research",
    url: "https://www.nngroup.com/articles/quantitative-user-research-methods/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "7 min read",
    summary: "NN/g clarifies when to use quantitative methods (analytics, A/B tests) vs qualitative (interviews, usability tests).",
    tags: ["quantitative", "qualitative", "methods", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-024",
    title: "Remote Usability Testing: Best Practices",
    url: "https://www.nngroup.com/articles/remote-usability-testing-101/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "Guidance on planning, moderating, and analyzing remote usability tests for distributed teams.",
    tags: ["remote-testing", "usability", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-025",
    title: "Jobs-to-be-Done Framework",
    url: "https://www.interaction-design.org/literature/topics/jobs-to-be-done",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "10 min read",
    summary: "IxDF explains how to frame product strategy around the functional, emotional, and social jobs users hire products to do.",
    tags: ["jtbd", "product-strategy", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "emerging-026",
    title: "Prioritization Frameworks for UX Teams",
    url: "https://www.nngroup.com/articles/prioritization-techniques/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "9 min read",
    summary: "NN/g compares RICE, MoSCoW, and value vs effort matrices for prioritizing UX initiatives.",
    tags: ["prioritization", "frameworks", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-027",
    title: "Design Ops: Scaling Design Teams",
    url: "https://www.smashingmagazine.com/2018/01/design-ops-handbook/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "14 min read",
    summary: "Smashing Magazine's guide to design operations: tooling, workflows, and governance for growing teams.",
    tags: ["design-ops", "scaling", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "emerging-028",
    title: "Building a UX Research Repository",
    url: "https://www.nngroup.com/articles/research-repositories/",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "11 min read",
    summary: "How to structure and maintain a research repository so insights are discoverable and actionable across teams.",
    tags: ["research-repository", "knowledge-management", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-029",
    title: "Competitive Analysis: A Step-by-Step Guide",
    url: "https://www.nngroup.com/articles/competitive-analysis/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "NN/g framework for analyzing competitor UX patterns to identify opportunities and avoid common pitfalls.",
    tags: ["competitive-analysis", "strategy", "nng"],
    source: "NN/g"
  },
  {
    id: "emerging-030",
    title: "Design Sprints: A Complete Guide",
    url: "https://www.interaction-design.org/literature/topics/design-sprints",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "12 min read",
    summary: "IxDF explains Google Ventures' 5-day design sprint process for rapid prototyping and validation.",
    tags: ["design-sprints", "prototyping", "ixdf"],
    source: "Interaction Design Foundation"
  },

  // ========================================
  // STRATEGIC LEAD (86-100) — Leadership & Org Influence
  // ========================================
  {
    id: "strategic-001",
    title: "Developer–Designer Relationship",
    url: "https://www.nngroup.com/articles/developer-designer-relationship/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "8 min read",
    summary: "NN/g guidance on building trust, shared vocabulary, and smoother handoffs with engineering.",
    tags: ["collaboration", "engineering", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-002",
    title: "Why Product Managers Need to Know UX",
    url: "https://www.uxdesigninstitute.com/blog/product-manager-ux/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "7 min read",
    summary: "Outlines how PMs and UX leaders share outcomes, experimentation, and empathy work.",
    tags: ["product", "pm", "collaboration"],
    source: "UX Design Institute"
  },
  {
    id: "strategic-003",
    title: "Communication Practices for Increasing UX Maturity",
    url: "https://www.nngroup.com/articles/communication-practices/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "10 min read",
    summary: "Shows how storytelling, demos, and office hours accelerate UX maturity inside enterprises.",
    tags: ["ux-maturity", "communication", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-004",
    title: "Evangelizing UX Across an Entire Organization",
    url: "https://www.uxmatters.com/mt/archives/2009/03/evangelizing-ux-across-an-entire-organization.php",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "9 min read",
    summary: "UX Matters article on stakeholder roadshows, toolkits, and governance committees.",
    tags: ["evangelism", "stakeholders", "uxmatters"],
    source: "UX Matters"
  },
  {
    id: "strategic-005",
    title: "Design Critiques: Building a Positive Culture",
    url: "https://www.nngroup.com/articles/design-critiques/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "8 min read",
    summary: "Framework for facilitating critiques so teams share intent, context, and actionable feedback.",
    tags: ["critiques", "culture", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-006",
    title: "Using Video Evidence for Stakeholders",
    url: "https://www.nngroup.com/videos/video-evidence/",
    type: "video",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "5 min video",
    summary: "NN/g video on how short highlight reels change executive perceptions faster than slide decks.",
    tags: ["video", "stakeholders", "evidence"],
    source: "NN/g"
  },
  {
    id: "strategic-007",
    title: "Facilitating UX Workshops with Stakeholders",
    url: "https://www.nngroup.com/videos/ux-workshops-stakeholders/",
    type: "video",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "6 min video",
    summary: "Tips for planning agendas, activities, and follow-ups that keep workshops outcomes-focused.",
    tags: ["workshops", "facilitation", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-008",
    title: "UX Stakeholder Engagement 101",
    url: "https://www.nngroup.com/videos/ux-stakeholder-engagement-101/",
    type: "video",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "4 min video",
    summary: "Explains how to map influence, run previews, and use storytelling to keep leaders aligned.",
    tags: ["stakeholders", "leadership", "video"],
    source: "NN/g"
  },
  {
    id: "strategic-009",
    title: "Building a UX Team: Hiring and Structure",
    url: "https://www.nngroup.com/articles/ux-team-structure/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "10 min read",
    summary: "NN/g guidance on structuring UX teams, defining roles, and hiring for different organizational needs.",
    tags: ["team-structure", "hiring", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-010",
    title: "UX Maturity Models: Assessing Your Organization",
    url: "https://www.nngroup.com/articles/ux-maturity-model/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "12 min read",
    summary: "NN/g's 6-stage UX maturity model helps leaders assess current state and plan organizational transformation.",
    tags: ["ux-maturity", "leadership", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-011",
    title: "Design Leadership: From Craft to Strategy",
    url: "https://www.smashingmagazine.com/2021/08/design-leadership-guide/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "15 min read",
    summary: "Smashing Magazine's guide to transitioning from individual contributor to design leader, covering vision, influence, and team development.",
    tags: ["leadership", "career", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "strategic-012",
    title: "Measuring Design Impact at Scale",
    url: "https://www.nngroup.com/articles/measuring-design-impact/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "11 min read",
    summary: "NN/g framework for connecting design work to business outcomes and demonstrating ROI to executives.",
    tags: ["metrics", "roi", "leadership", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-013",
    title: "Design Systems: Governance and Evolution",
    url: "https://www.smashingmagazine.com/2022/01/design-systems-governance/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "13 min read",
    summary: "How to establish governance models, contribution workflows, and evolution strategies for design systems.",
    tags: ["design-systems", "governance", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "strategic-014",
    title: "Cross-Functional Collaboration: UX and Engineering",
    url: "https://www.nngroup.com/articles/cross-functional-collaboration/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "9 min read",
    summary: "NN/g strategies for building strong partnerships between UX and engineering teams, from handoffs to shared rituals.",
    tags: ["collaboration", "engineering", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-015",
    title: "Presenting UX Work to Executives",
    url: "https://www.nngroup.com/articles/presenting-ux-work-executives/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "8 min read",
    summary: "How to frame UX findings and recommendations in business terms that resonate with C-level stakeholders.",
    tags: ["presentations", "executives", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-016",
    title: "Design Culture: Building a User-Centered Organization",
    url: "https://www.smashingmagazine.com/2020/01/design-culture-building-user-centered-organization/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "14 min read",
    summary: "Smashing Magazine explores how to embed design thinking and user empathy throughout an entire organization.",
    tags: ["design-culture", "organizational-change", "smashing"],
    source: "Smashing Magazine"
  },
  {
    id: "strategic-017",
    title: "UX Budget Planning: A Strategic Guide",
    url: "https://www.nngroup.com/articles/ux-budget-planning/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "10 min read",
    summary: "NN/g guidance on allocating UX budgets across research, design, tools, and team growth for maximum impact.",
    tags: ["budget", "planning", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-018",
    title: "The Future of UX: Trends and Predictions",
    url: "https://www.interaction-design.org/literature/topics/ux-trends",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "11 min read",
    summary: "IxDF explores emerging trends in UX, from AI-assisted design to voice interfaces and ethical considerations.",
    tags: ["trends", "future", "ixdf"],
    source: "Interaction Design Foundation"
  },
  {
    id: "strategic-019",
    title: "Design Ethics: Building Responsible Products",
    url: "https://www.nngroup.com/articles/design-ethics/",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "strategic-lead",
    duration: "9 min read",
    summary: "NN/g discusses ethical considerations in UX design, from dark patterns to privacy and accessibility.",
    tags: ["ethics", "responsible-design", "nng"],
    source: "NN/g"
  },
  {
    id: "strategic-020",
    title: "Scaling Design: Lessons from Top Companies",
    url: "https://www.smashingmagazine.com/2021/11/scaling-design-teams-lessons-learned/",
    type: "article",
    category: "Collaboration & Communication",
    level: "strategic-lead",
    duration: "16 min read",
    summary: "Case studies from companies like Airbnb, Spotify, and IBM on scaling design teams and maintaining quality at scale.",
    tags: ["scaling", "case-studies", "smashing"],
    source: "Smashing Magazine"
  }
];

export function getCategories(): Category[] {
  return [
    "UX Fundamentals",
    "UI Craft & Visual Design",
    "User Research & Validation",
    "Product Thinking & Strategy",
    "Collaboration & Communication"
  ];
}

export function getResourceTypes(): ResourceType[] {
  return ["article", "video", "podcast"];
}

export function getLevels(): ResourceLevel[] {
  return ["explorer", "practitioner", "emerging-senior", "strategic-lead"];
}
