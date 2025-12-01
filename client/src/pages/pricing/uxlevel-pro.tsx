import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UXLevelProPricing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Turn your UX assessment into a real growth system
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            UXLevel Pro helps you understand why you’re stuck, what to fix first, and how to move towards senior and lead roles with a clear plan.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/results">
              <Button className="rounded-full">Unlock UXLevel Pro</Button>
            </Link>
            <Link to="/results" className="text-sm text-muted-foreground underline">
              Keep exploring the free version
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Built for IC and senior designers who want clarity, not fluff.
          </p>
        </section>

        {/* What you get */}
        <section className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Personal UX career diagnosis",
              body:
                "Share what’s frustrating you at work and get a clear breakdown of what’s really holding you back — skills, signalling, or environment — and where to focus for the next 60 days.",
            },
            {
              title: "Extended 3-week action plan",
              body:
                "Go beyond a generic checklist. Get a structured 3-week plan that matches your current stage, weaknesses, and goals, with clear tasks you can actually finish.",
            },
            {
              title: "Full improvement ladders",
              body:
                "For every weak skill, unlock a step-by-step ladder from baseline to advanced. No more random spirals or guessing what to work on next.",
            },
            {
              title: "Curated resources matched to your gaps",
              body:
                "Unlock the full set of articles, videos, and tools picked for your exact skill profile — with guidance on what to do first and how each resource fits into your journey.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border/30 bg-card p-6">
              <h3 className="font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </section>

        {/* Free vs Pro (simple table) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Free vs Pro — what actually changes?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2 pr-4">Feature</th>
                  <th className="py-2 pr-4">Free</th>
                  <th className="py-2">Pro</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {[
                  ["Overall Score & Stage", "✅", "✅"],
                  ["Skill Breakdown", "5 categories with scores", "Scores + detailed ladders"],
                  ["To‑Do Actions", "1 key action per weak skill", "Full 5–7 step ladders"],
                  ["Weekly Plan", "Week 1", "Full 3‑week roadmap"],
                  ["Curated Resources", "2 resources", "Full library + priority order"],
                  ["Deep Insights", "2 insights", "Advanced topics"],
                  ["Frustration Diagnosis", "–", "Full personalised diagnosis"],
                ].map(([f, free, pro]) => (
                  <tr key={f} className="border-t border-border/30">
                    <td className="py-2 pr-4 font-medium">{f}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{free}</td>
                    <td className="py-2">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Simple one-time pricing</h2>
          <div className="text-3xl font-bold">UXLevel Pro – ₹999</div>
          <div className="text-sm text-muted-foreground">
            One-time payment. Lifetime access to your premium results.
          </div>
          <div className="text-xs text-muted-foreground">
            Less than a single course you won’t finish. Designed to pay back in your next appraisal or role change.
          </div>
          <div className="mt-3">
            <Link to="/results">
              <Button className="rounded-full">Get UXLevel Pro</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}


