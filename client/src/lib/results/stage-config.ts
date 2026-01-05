/**
 * Stage Configuration - Static Content
 * 
 * Static titles, descriptions, and role mappings for each career stage.
 * This content does not require AI generation.
 */

import type { Stage, TitleData, NextRoleData, AIInsightTeaserData } from "./types";

// ========================================
// STAGE TITLE CONFIGURATION
// ========================================

/**
 * Static title and description for each stage
 * Used in Section 2A: Title Block
 */
export const STAGE_TITLES: Record<Stage, TitleData> = {
  "Explorer": {
    title: "Explorer – Building Your Foundation",
    shortDescription: "You're at the beginning of your UX journey. Focus on mastering core principles, developing your visual eye, and getting hands-on experience with real projects.",
  },
  "Practitioner": {
    title: "Practitioner – Developing Your Craft",
    shortDescription: "You have solid fundamentals and growing expertise. Now focus on deepening specializations, improving research skills, and taking ownership of end-to-end design work.",
  },
  "Emerging Lead": {
    title: "Emerging Lead – Transitioning to Leadership",
    shortDescription: "With a score above 80, you're transitioning to leadership impact. Strengthen your strategic thinking, mentor others, and learn to influence product decisions beyond just design.",
  },
  "Strategic Lead - Senior": {
    title: "Strategic Lead – Senior Leadership",
    shortDescription: "You're operating at a senior leadership level. Focus on design direction, team influence, and driving design excellence across products.",
  },
  "Strategic Lead - Executive": {
    title: "Strategic Lead – Executive Leadership",
    shortDescription: "You're operating at an executive level. Focus on organizational design strategy, cross-functional influence, and building design culture at scale.",
  },
  "Strategic Lead - C-Suite": {
    title: "Strategic Lead – C-Suite",
    shortDescription: "You're operating at the highest level. Focus on design vision, organizational transformation, and driving design as a strategic business function.",
  },
};

// ========================================
// ROLE CONFIGURATION
// ========================================

/**
 * Suggested job title for each stage
 * Used in Section 7: Next Role
 */
export const STAGE_ROLES: Record<Stage, string> = {
  "Explorer": "Junior Product Designer",
  "Practitioner": "Senior Product Designer",  // Now covers 41-80, includes senior level
  "Emerging Lead": "Staff Product Designer",  // 81-84, transitioning to leadership
  "Strategic Lead - Senior": "Design Director / AVP of Design",
  "Strategic Lead - Executive": "VP of Design",
  "Strategic Lead - C-Suite": "SVP of Design / Chief Design Officer",
};

/**
 * Alternative role titles for variety
 */
export const ALTERNATIVE_ROLES: Record<Stage, string[]> = {
  "Explorer": [
    "Associate UX Designer",
    "Junior UX Designer",
    "UX Design Intern",
    "Product Design Associate",
  ],
  "Practitioner": [
    "UX Designer",
    "Product Designer",
    "Senior UX Designer", 
    "Senior Product Designer",
    "Product Designer II",
  ],
  "Emerging Lead": [
    "Staff Product Designer",
    "Principal Product Designer",
    "Design Lead",
    "Senior UX Designer",
  ],
  "Strategic Lead - Senior": [
    "Principal Product Designer",
    "Design Director",
    "Head of Design",
    "AVP of Design",
    "Senior Design Director",
  ],
  "Strategic Lead - Executive": [
    "VP of Product Design",
    "VP of UX",
    "Senior VP of Design",
    "Head of Design",
  ],
  "Strategic Lead - C-Suite": [
    "Chief Design Officer (CDO)",
    "Head of Design",
    "Design VP",
    "SVP of Design",
  ],
};

// ========================================
// JOB SEARCH URL GENERATION
// ========================================

/**
 * Generate job search URLs for a given stage and location
 */
export function generateJobSearchUrls(
  stage: Stage,
  location: string = "Remote"
): NextRoleData {
  const suggestedTitle = STAGE_ROLES[stage];
  const encodedTitle = encodeURIComponent(suggestedTitle);
  const encodedLocation = encodeURIComponent(location);
  
  // Google Jobs search URL
  const googleQuery = encodeURIComponent(`${suggestedTitle} jobs in ${location}`);
  const googleJobsUrl = `https://www.google.com/search?q=${googleQuery}&ibp=htl;jobs`;
  
  // LinkedIn Jobs search URL
  const linkedInUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=${encodedLocation}`;
  
  return {
    suggestedTitle,
    googleJobsUrl,
    linkedInUrl,
  };
}

// ========================================
// AI INSIGHT TEASER CONFIGURATION
// ========================================

/**
 * Static configuration for the AI Insight teaser section
 * Used in Section 8
 */
export const AI_INSIGHT_TEASER: AIInsightTeaserData = {
  enabled: false,
  label: "AI Career Insight – Launching Soon",
};

/**
 * Teaser description for the coming soon feature
 */
export const AI_INSIGHT_DESCRIPTION = 
  "We're working on a deeper AI-driven career intelligence layer. " +
  "Get personalized salary insights, growth trajectories, market demand analysis, " +
  "and custom roadmaps tailored to your unique skill profile.";

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get the title data for a given stage
 */
export function getTitleForStage(stage: Stage): TitleData {
  return STAGE_TITLES[stage];
}

/**
 * Get the suggested role for a given stage
 */
export function getRoleForStage(stage: Stage): string {
  return STAGE_ROLES[stage];
}

/**
 * Get next role data with search URLs
 */
export function getNextRoleData(stage: Stage, location?: string): NextRoleData {
  return generateJobSearchUrls(stage, location);
}

/**
 * Get AI insight teaser data
 */
export function getAIInsightTeaserData(): AIInsightTeaserData {
  return AI_INSIGHT_TEASER;
}

/**
 * Get a random alternative role title for a stage
 */
export function getAlternativeRole(stage: Stage): string {
  const alternatives = ALTERNATIVE_ROLES[stage];
  const randomIndex = Math.floor(Math.random() * alternatives.length);
  return alternatives[randomIndex];
}

// ========================================
// STAGE METADATA
// ========================================

/**
 * Additional metadata about each stage
 */
export const STAGE_METADATA: Record<Stage, {
  level: number;
  yearsExperience: string;
  keyFocus: string[];
}> = {
  "Explorer": {
    level: 1,
    yearsExperience: "0-2 years",
    keyFocus: [
      "Learning fundamentals",
      "Building portfolio",
      "Getting hands-on experience",
    ],
  },
  "Practitioner": {
    level: 2,
    yearsExperience: "2-4 years",
    keyFocus: [
      "Deepening expertise",
      "Taking ownership",
      "Improving research skills",
    ],
  },
  "Emerging Lead": {
    level: 3,
    yearsExperience: "4-7 years",
    keyFocus: [
      "Strategic thinking",
      "Mentoring others",
      "Influencing product decisions",
    ],
  },
  "Strategic Lead - Senior": {
    level: 4,
    yearsExperience: "7-10 years",
    keyFocus: [
      "Design direction",
      "Team leadership",
      "Driving design excellence",
    ],
  },
  "Strategic Lead - Executive": {
    level: 5,
    yearsExperience: "10-15 years",
    keyFocus: [
      "Organizational strategy",
      "Cross-functional influence",
      "Building design culture",
    ],
  },
  "Strategic Lead - C-Suite": {
    level: 6,
    yearsExperience: "15+ years",
    keyFocus: [
      "Design vision",
      "Organizational transformation",
      "Strategic business function",
    ],
  },
};

/**
 * Get the next stage in progression
 */
export function getNextStage(currentStage: Stage): Stage | null {
  const progression: Stage[] = [
    "Explorer",
    "Practitioner",
    "Emerging Lead",
    "Strategic Lead - Senior",
    "Strategic Lead - Executive",
    "Strategic Lead - C-Suite",
  ];
  
  const currentIndex = progression.indexOf(currentStage);
  if (currentIndex === -1 || currentIndex === progression.length - 1) {
    return null;
  }
  
  return progression[currentIndex + 1];
}

/**
 * Get previous stage in progression
 */
export function getPreviousStage(currentStage: Stage): Stage | null {
  const progression: Stage[] = [
    "Explorer",
    "Practitioner",
    "Emerging Lead",
    "Strategic Lead - Senior",
    "Strategic Lead - Executive",
    "Strategic Lead - C-Suite",
  ];
  
  const currentIndex = progression.indexOf(currentStage);
  if (currentIndex <= 0) {
    return null;
  }
  
  return progression[currentIndex - 1];
}


