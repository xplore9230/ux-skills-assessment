import { useState } from "react";
import type { CategoryScore } from "@/lib/results/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePremiumAccess } from "@/context/PremiumAccessContext";

export type Stage = "Explorer" | "Practitioner" | "Emerging Senior" | "Strategic Lead";

export interface FrustrationDiagnosisRequest {
  score: number;
  stage: Stage;
  categories: CategoryScore[];
  frustrationText: string;
  goalText?: string;
  tags: string[];
}

export interface FrustrationDiagnosisResponse {
  oneLineSummary: string;
  doingWell: string[];
  rootCauses: { label: string; description: string }[];
  blindSpots: string[];
  leverageMove: { title: string; whyItMatters: string };
  recommendedFocusAreas: string[];
}

function mockDiagnose(_req: FrustrationDiagnosisRequest): FrustrationDiagnosisResponse {
  return {
    oneLineSummary:
      "You’re operating solidly at your current stage, but your biggest blocker is signalling clear ownership and impact.",
    doingWell: [
      "Strong craft foundation and care for outcomes",
      "Thinking beyond screens in flows and user journeys",
      "Attention to research and product context",
    ],
    rootCauses: [
      { label: "Skill Gap", description: "Product thinking depth isn’t consistently visible in decisions." },
      { label: "Signal Gap", description: "Storytelling doesn’t highlight tradeoffs, scope, and impact clearly." },
      { label: "Environment Gap", description: "You’re not always being handed senior problems — you may need to shape scope." },
    ],
    blindSpots: [
      "Stakeholders care more about clarity of decisions than UI polish.",
      "You may be doing strategic work that you don’t document or frame.",
      "Communication cadence is a lever for being seen as senior.",
    ],
    leverageMove: {
      title: "Treat every project as a story about problem, tradeoffs, and impact.",
      whyItMatters:
        "This is what managers and PMs listen for when deciding who’s senior versus solid mid-level.",
    },
    recommendedFocusAreas: ["Product Thinking", "Communication"],
  };
}

export function FrustrationDiagnosisSection({
  score,
  stage,
  categories,
}: {
  score: number;
  stage: Stage;
  categories: CategoryScore[];
}) {
  const { isPremium, openPaywall } = usePremiumAccess();
  const [frustrationText, setFrustrationText] = useState("");
  const [goalText, setGoalText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [result, setResult] = useState<FrustrationDiagnosisResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const chipOptions = [
    "I feel stuck at my current level",
    "I don’t get enough ownership",
    "I want better projects",
    "I’m not confident in my skills",
    "I want to move into leadership",
  ];

  const toggleTag = (t: string) =>
    setTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));

  const handleSubmit = async () => {
    if (!isPremium) {
      openPaywall("diagnosis");
      return;
    }
    setSubmitting(true);
    const req: FrustrationDiagnosisRequest = {
      score,
      stage: stage as Stage,
      categories,
      frustrationText,
      goalText,
      tags,
    };
    // Mock for now
    await new Promise(r => setTimeout(r, 600));
    setResult(mockDiagnose(req));
    setSubmitting(false);
  };

  return (
    <div id="diagnosis-anchor" className="rounded-xl border border-border/30 bg-card p-6">
      {!result ? (
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Feeling stuck or undervalued?</h2>
          <p className="text-sm text-muted-foreground">
            Your score shows where you stand. But the real story is how it feels at work. Tell me what’s actually
            bothering you, and I’ll break down why it’s happening and what to do next.
          </p>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {chipOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  tags.includes(opt)
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-foreground/80 hover:bg-muted/30"
                }`}
                onClick={() => toggleTag(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="mt-4 grid gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">What’s the biggest thing bothering you in your UX career right now?</label>
              <textarea
                value={frustrationText}
                onChange={(e) => setFrustrationText(e.target.value)}
                rows={4}
                placeholder="“I feel stuck at mid-level and don’t get senior-level problems…”"
                className="w-full rounded-lg border border-border bg-background p-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">What are you trying to move towards? (optional)</label>
              <textarea
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                rows={3}
                placeholder="“Senior IC”, “Lead designer”, “More strategy work”, “Better projects”"
                className="w-full rounded-lg border border-border bg-background p-3 text-sm"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4">
            <Button onClick={handleSubmit} disabled={submitting} className="rounded-full">
              {isPremium ? (submitting ? "Analysing..." : "Analyse my frustration") : "Analyse my frustration (Premium)"}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Get a personalised breakdown of why you’re stuck and how to move up.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Your UX Career Diagnosis</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your score, skill profile, and what you shared, here’s what’s really going on — and where to focus next.
          </p>

          {/* Summary Snapshot */}
          <div className="rounded-lg border border-border/50 p-4 mb-4">
            <p className="text-sm text-foreground">{result.oneLineSummary}</p>
          </div>

          {/* Doing well */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">What you’re already doing right</h4>
            <ul className="list-disc pl-5 text-sm text-foreground/90 space-y-1">
              {result.doingWell.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          {/* Root causes */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Why this is happening</h4>
            <ul className="space-y-2">
              {result.rootCauses.map((rc, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{rc.label}:</span> {rc.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Blind spots */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">What you might be underestimating</h4>
            <ul className="list-disc pl-5 text-sm text-foreground/90 space-y-1">
              {result.blindSpots.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          {/* 60-day leverage focus */}
          <div className="mb-4 rounded-lg border border-border/50 p-4">
            <h4 className="text-sm font-semibold mb-1">If you fix one thing in the next 60 days, fix this</h4>
            <p className="text-sm font-medium">{result.leverageMove.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{result.leverageMove.whyItMatters}</p>
            <div className="mt-3">
              <a href="#improvement-plan" className="text-xs font-semibold underline">
                See my 3-week starting plan
              </a>
            </div>
          </div>

          {/* Ties to sections */}
          <div className="text-xs text-muted-foreground">
            <a href="#skill-analysis" className="underline mr-2">Which skills this diagnosis is based on</a>
            <a href="#resources" className="underline mr-2">Resources mapped to this focus</a>
            <a href="#deep-insights" className="underline">Systems & leadership topics for this path</a>
          </div>
        </div>
      )}
    </div>
  );
}


