// Shared type definitions for the UX Skills Assessment Quiz

export interface Question {
  id: string;
  text: string;
  category: string;
  options: { value: number; label: string }[];
}

export type AppState = "landing" | "quiz";

/**
 * Category score shape used by the quiz + results APIs.
 * Kept intentionally permissive because different parts of the app
 * compute scores in slightly different ways (raw vs normalized).
 */
export interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  status?: "strong" | "decent" | "needs-work";
  // Optional fields used by newer results pipelines
  id?: string;
  band?: string;
  rawScore?: number;
  maxPossible?: number;
  questionCount?: number;
}

// Curated resource returned by /api/generate-resources
export interface Resource {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

export interface DeepDiveResource {
  title: string;
  type: string;
  estimated_read_time?: string;
  source?: string;
  url: string;
  tags?: string[];
}

// Returned by /api/generate-deep-dive
export interface DeepDiveTopic {
  name: string;
  pillar: string;
  level: string;
  summary: string;
  practice_points: string[];
  resources: DeepDiveResource[];
}

// Returned by /api/job-search-links
export interface JobLinks {
  job_title: string;
  linkedin_url: string;
  google_url: string;
}

export type ContentDepth = "brief" | "standard" | "deep";

// Returned by /api/generate-layout
export interface LayoutStrategy {
  section_order: string[];
  section_visibility: Record<string, boolean>;
  content_depth?: Record<string, ContentDepth | string>;
  priority_message?: string;
  source?: string;
  ollama_available?: boolean;
  pregenerated_available?: boolean;
}

// Returned by /api/generate-category-insights
export interface CategoryInsight {
  category: string;
  brief: string;
  detailed: string;
  actionable: string[];
}

export interface ImprovementWeek {
  week: number;
  tasks: string[];
}

