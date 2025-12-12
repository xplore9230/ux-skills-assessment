import type {
  CategoryInsight,
  DeepDiveTopic,
  JobLinks,
  LayoutStrategy,
  Resource,
} from "@/types";

/**
 * Shape for cached/precomputed results that can be injected into the results page
 * to avoid duplicated API calls.
 *
 * This module is currently a lightweight type/stub so importing code compiles
 * even if background computation is not enabled.
 */
export interface PrecomputedResults {
  stageReadup?: string;
  resources?: Resource[];
  deepDiveTopics?: DeepDiveTopic[];
  jobLinks?: JobLinks;
  layoutStrategy?: LayoutStrategy;
  categoryInsights?: CategoryInsight[];
}

// Optional future hook; currently unused by the app.
export function useBackgroundComputation(): PrecomputedResults | null {
  return null;
}

