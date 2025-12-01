/**
 * Score-aware, category-specific descriptions for the Skill Analysis section.
 *
 * This module is shared between the client (fallback generators) and the server
 * (/api/v2/skill-analysis fallback) so copy stays consistent everywhere.
 */

export type ScoreBucketId =
  | "veryLow"   // 0–39
  | "low"       // 40–59
  | "mid"       // 60–79
  | "high"      // 80–89
  | "veryHigh"; // 90–100

// Main UX skill categories used across the app.
export type SkillCategoryName =
  | "UX Fundamentals"
  | "UI Craft & Visual Design"
  | "User Research & Validation"
  | "Product Thinking & Strategy"
  | "Collaboration & Communication";

/**
 * Map a raw 0–100 percentage score into a coarse bucket.
 * Keeps existing Band thresholds intact while giving us finer copy control.
 */
export function getScoreBucket(score: number): ScoreBucketId {
  const numeric = Number.isFinite(score) ? Math.round(score) : 0;
  const clamped = Math.max(0, Math.min(100, numeric));

  if (clamped >= 90) return "veryHigh";
  if (clamped >= 80) return "high";
  if (clamped >= 60) return "mid";
  if (clamped >= 40) return "low";
  return "veryLow";
}

type DescriptionMap = Record<ScoreBucketId, (categoryName: string) => string>;

// Default descriptions used when we don't have category-specific copy.
const defaultDescriptions: DescriptionMap = {
  veryHigh: (category) =>
    `You operate at an advanced level in ${category}. You apply principles consistently, spot edge cases early, and can mentor others on how to do this well.`,
  high: (category) =>
    `You have strong, reliable skills in ${category}. Most of your work in this area holds up under scrutiny; focus now is on refinement and pushing into more complex scenarios.`,
  mid: (category) =>
    `You have a solid working grasp of ${category}, though application can still be uneven. With more deliberate practice on real projects, this area can quickly become a strength.`,
  low: (category) =>
    `You understand some of the basics of ${category}, but your process isn’t yet consistent. Investing in structured practice will make your decisions here feel more confident and repeatable.`,
  veryLow: (category) =>
    `You’re early in your journey with ${category}. Start with core concepts and small, low‑risk exercises so you can build intuition before taking on higher‑stakes work.`,
};

// Category-specific descriptions per score bucket.
const categoryDescriptions: Partial<Record<SkillCategoryName, DescriptionMap>> = {
  "UX Fundamentals": {
    veryHigh: () =>
      "Your UX fundamentals are deeply ingrained. You think in user journeys, information architecture, and heuristics, and you can spot experience issues long before they surface in research.",
    high: () =>
      "Your UX fundamentals are strong and reliable. You plan flows intentionally and use heuristics and IA patterns well—pushing further into accessibility and complex journeys will make this truly elite.",
    mid: () =>
      "You understand core UX concepts like flows, IA, and heuristics, but they don’t always show up consistently in your work. Tightening your process around goals, edge cases, and validation will pay off quickly.",
    low: () =>
      "You recognize UX basics but often lean on intuition instead of a structured process. Focusing on clear user goals, simple task flows, and basic heuristics will make your decisions feel less guessy.",
    veryLow: () =>
      "You’re at the early stages of UX fundamentals. Start with the basics—user goals, common UI patterns, and simple usability principles—then apply them on small, practice projects.",
  },
  "UI Craft & Visual Design": {
    veryHigh: () =>
      "Your visual design craft is polished and intentional. You use layout, color, and typography to guide attention while keeping accessibility and product constraints in mind.",
    high: () =>
      "You consistently produce clean, usable interfaces with solid hierarchy. Refining spacing, rhythm, and micro‑interactions will push your work into a more premium, systematized feel.",
    mid: () =>
      "Your UI work is clear but sometimes feels inconsistent or slightly unpolished. Doubling down on grids, spacing, and type scales will help your screens feel like one cohesive system.",
    low: () =>
      "You can assemble UI screens, but hierarchy, contrast, or consistency often need rework. Studying strong design systems and recreating simple flows will quickly sharpen your eye.",
    veryLow: () =>
      "You’re just getting started with UI craft. Begin with fundamentals like contrast, spacing, and basic typography, then practice by recreating well‑designed interfaces pixel by pixel.",
  },
  "User Research & Validation": {
    veryHigh: () =>
      "You treat research and validation as a core part of your design process, not an afterthought. You choose appropriate methods, run studies with rigor, and turn insights into clear decisions.",
    high: () =>
      "You’re comfortable planning and running research or testing sessions and using the findings. Leveling up how you synthesize insight and tie it to product decisions will make your impact even clearer.",
    mid: () =>
      "You understand the value of research and validation, but you may not run studies as frequently or systematically as you could. Building simple, repeatable habits around interviews and usability tests will strengthen this muscle.",
    low: () =>
      "You sometimes rely on assumptions instead of direct user insight. Starting with small, lightweight sessions—like 3–5 user interviews or quick usability tests—will dramatically improve your design decisions.",
    veryLow: () =>
      "You rarely bring direct user input into your work yet. Learning basic methods like interviews and simple usability tests will help you design for real behavior instead of just hypotheses.",
  },
  "Product Thinking & Strategy": {
    veryHigh: () =>
      "You think like a product partner, not just a screen designer. You connect UX work to business goals, metrics, and sequencing, and you can influence roadmaps with evidence‑backed narratives.",
    high: () =>
      "You’re comfortable framing problems, tying work to outcomes, and considering trade‑offs. Sharpening how you use metrics, experimentation, and prioritization frameworks will push you toward strategic leadership.",
    mid: () =>
      "You understand product language and goals, but don’t always connect every design decision back to impact. Practicing problem framing, success metrics, and simple prioritization will make your recommendations more persuasive.",
    low: () =>
      "You often focus on screens more than outcomes. Starting to ask “what problem are we solving?” and “how will we know this worked?” will move you into stronger product thinking.",
    veryLow: () =>
      "You’re still building comfort with product strategy concepts. Learning the basics of problem framing, value propositions, and simple UX metrics will help you collaborate more effectively with PMs.",
  },
  "Collaboration & Communication": {
    veryHigh: () =>
      "You act as a connector across teams—facilitating critiques, aligning stakeholders, and communicating trade‑offs clearly. Your collaboration style likely increases UX maturity around you.",
    high: () =>
      "You collaborate smoothly with PMs, engineers, and other designers. Strengthening your storytelling and influence skills will help you drive alignment on bigger, more ambiguous problems.",
    mid: () =>
      "You work well with others day‑to‑day, but you may not always lead the conversation. Practicing clearer design narratives and asking for structured feedback will make your voice carry more weight.",
    low: () =>
      "You sometimes struggle to get others on the same page about your work. Building habits around proactive communication, written updates, and structured critique will make collaboration feel less ad‑hoc.",
    veryLow: () =>
      "You’re still finding your footing in cross‑functional collaboration. Starting with simple practices—like sharing early sketches, asking clear questions, and capturing decisions—will make teamwork feel more confident.",
  },
};

/**
 * Get a short, score-aware description for a category.
 * Falls back to generic copy if we don't have a category-specific entry.
 */
export function getScoreAwareDescription(
  categoryName: string,
  score: number,
): string {
  const bucket = getScoreBucket(score);
  const trimmedName = (categoryName || "").trim();

  const categoryKey = trimmedName as SkillCategoryName;
  const map = categoryDescriptions[categoryKey] ?? defaultDescriptions;
  const descriptionForBucket = map[bucket] ?? defaultDescriptions[bucket];

  return descriptionForBucket(trimmedName || "this skill area");
}


