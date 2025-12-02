// server/index-vercel.ts
import fs2 from "node:fs";
import path2 from "node:path";
import express2 from "express";

// server/app.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  deviceAccessMap;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.deviceAccessMap = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Premium device access methods
  async getDeviceAccess(deviceId) {
    return this.deviceAccessMap.get(deviceId);
  }
  async createDeviceAccess(insertDeviceAccess) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const deviceAccess = {
      deviceId: insertDeviceAccess.deviceId,
      attemptCount: insertDeviceAccess.attemptCount ?? 0,
      premiumUnlocked: insertDeviceAccess.premiumUnlocked ?? false,
      createdAt: now,
      updatedAt: now
    };
    this.deviceAccessMap.set(insertDeviceAccess.deviceId, deviceAccess);
    return deviceAccess;
  }
  async updateDeviceAccess(deviceId, updates) {
    const existing = this.deviceAccessMap.get(deviceId);
    if (!existing) {
      return void 0;
    }
    const updated = {
      ...existing,
      ...updates,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.deviceAccessMap.set(deviceId, updated);
    return updated;
  }
};
var storage = new MemStorage();

// server/lib/openai.ts
import OpenAI from "openai";
var _openai = null;
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return _openai;
}
function isOpenAIConfigured() {
  const configured = !!process.env.OPENAI_API_KEY;
  if (!configured) {
    console.log("[OpenAI] API key not configured");
  }
  return configured;
}
var openai = getOpenAIClient();
async function generateText(systemPrompt, userPrompt, model = "gpt-4o-mini") {
  const client = getOpenAIClient();
  if (!client) {
    console.log("[OpenAI] generateText: No client available");
    return { content: "", error: "OpenAI API key is not configured" };
  }
  try {
    console.log("[OpenAI] generateText: Calling API with model:", model);
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    const content = response.choices[0]?.message?.content || "";
    console.log("[OpenAI] generateText: Success, response length:", content.length);
    return { content };
  } catch (error) {
    console.error("[OpenAI] generateText Error:", error);
    return {
      content: "",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function generateJSON(systemPrompt, userPrompt, model = "gpt-4o-mini") {
  const client = getOpenAIClient();
  if (!client) {
    console.log("[OpenAI] generateJSON: No client available");
    return { data: null, error: "OpenAI API key is not configured" };
  }
  try {
    console.log("[OpenAI] generateJSON: Calling API with model:", model);
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500
    });
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }
    console.log("[OpenAI] generateJSON: Success, parsing response...");
    const data = JSON.parse(content);
    console.log("[OpenAI] generateJSON: Parsed successfully");
    return { data };
  } catch (error) {
    console.error("[OpenAI] generateJSON Error:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// client/src/data/knowledge-bank.ts
var knowledgeBank = [
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
    title: "UX vs UI \u2013 What's the Difference?",
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
    title: "10 Usability Heuristics Every Designer Should Know",
    url: "https://uxdesign.cc/10-usability-heuristics-every-designer-should-know",
    type: "article",
    category: "UX Fundamentals",
    level: "explorer",
    duration: "9 min read",
    summary: "UX Collective's approachable breakdown of Nielsen's heuristics with modern interface examples.",
    tags: ["heuristics", "principles", "uxcollective"],
    source: "UX Collective"
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
    title: "You Are Ready to Become a UX Designer",
    url: "https://blog.prototypr.io/you-are-ready-to-become-a-ux-designer-but-dont-know-where-to-start",
    type: "article",
    category: "Collaboration & Communication",
    level: "explorer",
    duration: "7 min read",
    summary: "Motivational essay that demystifies impostor syndrome and outlines practical first steps into UX.",
    tags: ["career", "mindset", "prototypr"],
    source: "Prototypr"
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
    url: "https://medium.com/the-interaction-design-foundation/the-ux-designers-guide-to-typography",
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
    url: "https://uxplanet.org/design-systems-an-overview-243b07534b64",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "practitioner",
    duration: "10 min read",
    summary: "UX Planet explains tokens, governance, and component libraries so designers can partner with engineering.",
    tags: ["design-systems", "tokens", "uxplanet"],
    source: "UX Planet"
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
    title: "Material 3 Expressive: Building on the Failures of Flat Design",
    url: "https://uxdesign.cc/material-3-expressive-building-on-the-failures-of-flat-design-d7a9bb627298",
    type: "article",
    category: "UI Craft & Visual Design",
    level: "practitioner",
    duration: "8 min read",
    summary: "UX Collective analyzes Google's Material 3 evolution and how expressive systems help complex products.",
    tags: ["material", "design-language", "uxcollective"],
    source: "UX Collective"
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
    url: "https://uxplanet.org/tips-on-conducting-guerrilla-usability-testing-941b46d2fce6",
    type: "article",
    category: "User Research & Validation",
    level: "emerging-senior",
    duration: "7 min read",
    summary: "UX Planet walkthrough on recruiting fast, scripting short tasks, and using findings responsibly.",
    tags: ["guerrilla", "testing", "uxplanet"],
    source: "UX Planet"
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
    url: "https://medium.com/@jaf_designer/why-product-thinking-is-the-next-big-thing-in-ux-design-ee7de959f3fe",
    type: "article",
    category: "Product Thinking & Strategy",
    level: "emerging-senior",
    duration: "8 min read",
    summary: "Shows how UX designers can align problem framing and outcomes with product strategy.",
    tags: ["product-thinking", "strategy", "medium"],
    source: "Medium"
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
  // ========================================
  // STRATEGIC LEAD (86-100) — Leadership & Org Influence
  // ========================================
  {
    id: "strategic-001",
    title: "Developer\u2013Designer Relationship",
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
  }
];
function getCategories() {
  return [
    "UX Fundamentals",
    "UI Craft & Visual Design",
    "User Research & Validation",
    "Product Thinking & Strategy",
    "Collaboration & Communication"
  ];
}

// server/lib/stripe.ts
import Stripe from "stripe";
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn("\u26A0\uFE0F  STRIPE_SECRET_KEY not configured. Premium payment features will not work.");
}
var stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: "2025-11-17.clover"
}) : null;
function isStripeConfigured() {
  return stripe !== null;
}
function getStripePriceId() {
  return process.env.STRIPE_PRICE_ID;
}

// server/routes.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
function findPregeneratedDataDir() {
  const possiblePaths = [
    path.resolve(process.cwd(), "api", "pregenerated_data"),
    // Vercel serverless (copied during build)
    path.resolve(process.cwd(), "server_py", "pregenerated_data"),
    // Local dev
    path.resolve(process.cwd(), "..", "server_py", "pregenerated_data"),
    // Alternative Vercel path
    path.join(__dirname, "..", "api", "pregenerated_data"),
    // Compiled location (api folder)
    path.join(__dirname, "..", "server_py", "pregenerated_data"),
    // Compiled location (server_py folder)
    path.join(__dirname, "server_py", "pregenerated_data")
  ];
  for (const dirPath of possiblePaths) {
    if (fs.existsSync(dirPath)) {
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory()) {
        try {
          const files = fs.readdirSync(dirPath);
          if (files.some((f) => f.endsWith(".json"))) {
            console.log(`Found pregenerated data at: ${dirPath}`);
            return dirPath;
          }
        } catch (e) {
          continue;
        }
      }
    }
  }
  console.warn("Pregenerated data directory not found. Tried:", possiblePaths);
  return null;
}
var PREGNERATED_DATA_DIR = findPregeneratedDataDir();
function deriveScoreFromCategories(categories) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }
  const numericScores = categories.map((cat) => {
    const value = typeof cat?.score === "number" ? cat.score : Number(cat?.score ?? Number.NaN);
    return Number.isFinite(value) ? value : null;
  }).filter((value) => value !== null);
  if (numericScores.length === 0) {
    return null;
  }
  const sum = numericScores.reduce((acc, value) => acc + value, 0);
  const avg = sum / numericScores.length;
  return Math.round(avg);
}
function loadPregeneratedForScore(rawScore, categories) {
  if (!PREGNERATED_DATA_DIR) {
    console.warn("Pregenerated data directory not available");
    return null;
  }
  let numericScore = null;
  if (typeof rawScore === "number" && Number.isFinite(rawScore)) {
    numericScore = rawScore;
  } else if (typeof rawScore === "string" && rawScore.trim().length > 0) {
    const parsed = Number(rawScore);
    if (Number.isFinite(parsed)) {
      numericScore = parsed;
    }
  }
  if (numericScore === null) {
    numericScore = deriveScoreFromCategories(categories);
  }
  if (numericScore === null) {
    console.warn("Could not determine score from:", { rawScore, categories });
    return null;
  }
  const clamped = Math.min(100, Math.max(0, Math.round(numericScore)));
  const filePath = path.join(PREGNERATED_DATA_DIR, `score_${clamped}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Pregenerated file not found: ${filePath} (score: ${clamped})`);
    return null;
  }
  try {
    const json = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(json);
    console.log(`Loaded pregenerated data for score ${clamped}`);
    return data;
  } catch (error) {
    console.error("Error reading pregenerated data for score", clamped, error);
    return null;
  }
}
function buildJobTitle(stage) {
  switch (stage) {
    case "Explorer":
      return "Junior Product Designer";
    case "Practitioner":
      return "Product Designer";
    case "Emerging Lead":
      return "Lead Product Designer";
    case "Strategic Lead - Senior":
      return "Design Director";
    case "Strategic Lead - Executive":
      return "VP of Design";
    case "Strategic Lead - C-Suite":
      return "SVP of Design";
    default:
      return "Product Designer";
  }
}
var MOCK_JOBS = [
  {
    title: "Product Designer",
    company: "Airbnb",
    location: "Remote",
    via: "LinkedIn",
    job_url: "https://www.airbnb.com/careers"
  },
  {
    title: "UX Researcher",
    company: "Spotify",
    location: "New York, NY",
    via: "Spotify Careers",
    job_url: "https://www.lifeatspotify.com/"
  },
  {
    title: "Senior Product Designer",
    company: "Linear",
    location: "Remote",
    via: "Linear Careers",
    job_url: "https://linear.app/careers"
  },
  {
    title: "UX Designer",
    company: "Google",
    location: "Mountain View, CA",
    via: "Google Careers",
    job_url: "https://careers.google.com/"
  },
  {
    title: "Product Designer",
    company: "Notion",
    location: "San Francisco, CA",
    via: "Notion Careers",
    job_url: "https://www.notion.so/careers"
  },
  {
    title: "Design Systems Designer",
    company: "Shopify",
    location: "Remote",
    via: "Shopify Careers",
    job_url: "https://www.shopify.com/careers"
  }
];
function getMockJobs(query) {
  const isSenior = query.toLowerCase().includes("senior") || query.toLowerCase().includes("lead");
  return MOCK_JOBS.filter((job) => {
    if (isSenior) return job.title.toLowerCase().includes("senior") || job.title.toLowerCase().includes("lead");
    return !job.title.toLowerCase().includes("senior") && !job.title.toLowerCase().includes("lead");
  });
}
function deriveBand(score) {
  if (score >= 80) return "Strong";
  if (score >= 40) return "Needs Work";
  return "Learn the Basics";
}
function generateMeaningText(stage, totalScore, strongCategories, weakCategories) {
  const strongText = strongCategories?.length > 0 ? `You excel in ${strongCategories.slice(0, 2).join(" and ")}.` : "";
  const weakText = weakCategories?.length > 0 ? `Focus on strengthening ${weakCategories.slice(0, 2).join(" and ")} to advance.` : "";
  const stageMeanings = {
    "Explorer": `As an Explorer with a score of ${totalScore}, you're building your UX foundation. ${strongText} ${weakText} Keep learning and practicing to develop your skills.`,
    "Practitioner": `As a Practitioner scoring ${totalScore}, you have solid fundamentals. ${strongText} ${weakText} Focus on deepening your expertise and taking ownership of projects.`,
    "Emerging Senior": `At ${totalScore} as an Emerging Senior, you're transitioning to strategic impact. ${strongText} ${weakText} Develop your leadership skills and mentor others.`,
    "Strategic Lead": `With a score of ${totalScore} as a Strategic Lead, you're operating at a high level. ${strongText} ${weakText} Focus on organizational influence and driving design culture.`
  };
  return stageMeanings[stage] || stageMeanings["Practitioner"];
}
function generateCategoryInsight(category, stage) {
  const score = typeof category.score === "number" ? category.score : 50;
  const band = deriveBand(score);
  const categoryName = category.name || "Unknown Category";
  const categoryId = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const descriptions = {
    "Strong": `Your ${categoryName} skills are well-developed. You demonstrate strong competency and can handle complex challenges in this area. Continue refining your expertise to mentor others.`,
    "Needs Work": `Your ${categoryName} foundation is solid but has room for growth. Focus on practicing intermediate concepts and applying them in real projects to strengthen this skill area.`,
    "Learn the Basics": `Your ${categoryName} skills need foundational development. Start with core principles and gradually build up through structured learning and hands-on practice.`
  };
  const checklists = {
    "Strong": [
      { id: `${categoryId}-1`, text: `Mentor a junior on ${categoryName} best practices`, priority: "medium" },
      { id: `${categoryId}-2`, text: `Document your ${categoryName} process for the team`, priority: "medium" },
      { id: `${categoryId}-3`, text: `Lead a workshop on advanced ${categoryName} techniques`, priority: "low" },
      { id: `${categoryId}-4`, text: `Explore cutting-edge trends in ${categoryName}`, priority: "low" },
      { id: `${categoryId}-5`, text: `Create a case study showcasing your ${categoryName} expertise`, priority: "medium" }
    ],
    "Needs Work": [
      { id: `${categoryId}-1`, text: `Complete 2 hands-on projects focused on ${categoryName}`, priority: "high" },
      { id: `${categoryId}-2`, text: `Read 3 articles on ${categoryName} best practices`, priority: "medium" },
      { id: `${categoryId}-3`, text: `Seek feedback on your ${categoryName} work from peers`, priority: "high" },
      { id: `${categoryId}-4`, text: `Practice ${categoryName} skills for 30 minutes daily`, priority: "medium" },
      { id: `${categoryId}-5`, text: `Join a community focused on ${categoryName}`, priority: "low" }
    ],
    "Learn the Basics": [
      { id: `${categoryId}-1`, text: `Study fundamental principles of ${categoryName}`, priority: "high" },
      { id: `${categoryId}-2`, text: `Take an introductory course on ${categoryName}`, priority: "high" },
      { id: `${categoryId}-3`, text: `Follow 3 experts in ${categoryName} on social media`, priority: "low" },
      { id: `${categoryId}-4`, text: `Complete beginner exercises in ${categoryName}`, priority: "high" },
      { id: `${categoryId}-5`, text: `Review examples of good ${categoryName} work`, priority: "medium" },
      { id: `${categoryId}-6`, text: `Set a 30-day learning goal for ${categoryName}`, priority: "medium" }
    ]
  };
  return {
    categoryId,
    categoryName,
    score,
    band,
    description: descriptions[band],
    checklist: checklists[band]
  };
}
function generateImprovementPlan(stage, strongCategories = [], weakCategories = []) {
  const normalizedWeak = normalizeCategories(weakCategories);
  const normalizedStrong = normalizeCategories(strongCategories);
  const focusAreas = normalizedWeak.length > 0 ? normalizedWeak : getFallbackFocusCategories(stage);
  const stageLevel = getLevelForStage(stage);
  const stretchLevels = getStretchLevelsForStage(stage);
  const week1Resources = pickResourcesByLevel(
    [stageLevel],
    focusAreas,
    2
  );
  const week2Resources = pickResourcesByLevel(
    [stageLevel, ...stretchLevels],
    focusAreas,
    2,
    week1Resources.map((r) => r.id)
  );
  const week3Resources = pickResourcesByLevel(
    stretchLevels.length > 0 ? stretchLevels : [stageLevel],
    focusAreas,
    2,
    [...week1Resources, ...week2Resources].map((r) => r.id)
  );
  return [
    buildWeekPlan({
      weekNumber: 1,
      theme: "Foundation Fix",
      focusAreas: focusAreas.slice(0, 2),
      resources: week1Resources,
      practiceLabel: "Apply fundamentals",
      practiceDescription: (category) => `Create a quick sketch, wireframe, or heuristic checklist focused on ${category} and capture notes in your journal.`,
      deepWork: [
        {
          title: "Mini project sprint",
          description: "Translate today's readings into a simple redesign or flow walkthrough."
        },
        {
          title: "Portfolio reflection",
          description: "Document one clear before/after improvement you can add to a case study."
        }
      ]
    }),
    buildWeekPlan({
      weekNumber: 2,
      theme: "Depth & Ownership",
      focusAreas,
      resources: week2Resources,
      practiceLabel: "Critique & iterate",
      practiceDescription: (category) => `Run a quick critique of an existing experience in ${category}. Capture 3 insights and 1 experiment you could ship.`,
      deepWork: [
        {
          title: "End-to-end flow audit",
          description: "Audit a real journey and capture opportunities tied to your focus areas."
        },
        {
          title: "Research or testing session",
          description: "Host a short user session or synthesize prior research into actionable chunks."
        }
      ]
    }),
    buildWeekPlan({
      weekNumber: 3,
      theme: "Strategy & Visibility",
      focusAreas,
      resources: week3Resources,
      practiceLabel: "Share and mentor",
      practiceDescription: (category) => `Record a Loom or host a brown-bag to teach one ${category} insight to your team.`,
      deepWork: [
        {
          title: "Strategic narrative",
          description: "Create a 2-slide story or doc that ties your UX work to business goals."
        },
        {
          title: "Knowledge share",
          description: "Package learnings into a blog post, internal doc, or playbook for peers."
        }
      ]
    })
  ];
}
function buildWeekPlan({
  weekNumber,
  theme,
  focusAreas,
  resources,
  practiceLabel,
  practiceDescription,
  deepWork
}) {
  const dailyTasks = [
    ...resources.map((resource, idx) => ({
      id: `w${weekNumber}-res-${idx}`,
      title: `Study: ${resource.title}`,
      description: `${resource.summary} \u2014 ${resource.url}`,
      duration: resource.duration || "45 min",
      category: resource.category,
      type: "daily"
    }))
  ];
  const primaryCategory = focusAreas[0] || "UX Fundamentals";
  while (dailyTasks.length < 3) {
    dailyTasks.push({
      id: `w${weekNumber}-practice-${dailyTasks.length}`,
      title: practiceLabel,
      description: practiceDescription(primaryCategory),
      duration: "45 min",
      category: primaryCategory,
      type: "daily"
    });
  }
  const deepWorkTasks = deepWork.map((task, idx) => ({
    id: `w${weekNumber}-dw${idx + 1}`,
    title: task.title,
    description: task.description,
    duration: idx === 0 ? "120 min" : "90 min",
    type: "deep-work"
  }));
  return {
    weekNumber,
    theme,
    focusAreas,
    dailyTasks,
    deepWorkTasks,
    expectedOutcome: weekNumber === 1 ? "Solid understanding of foundational concepts and initial practice experience." : weekNumber === 2 ? "Clearer craftsmanship, improved documentation habits, and tighter stakeholder alignment." : "Strategic mindset and increased visibility through documented work."
  };
}
console.log("=== KNOWLEDGE BANK LOADED ===");
console.log("Total resources:", knowledgeBank.length);
if (knowledgeBank.length > 0) {
  console.log("First resource ID:", knowledgeBank[0].id);
  console.log("First resource URL:", knowledgeBank[0].url);
}
console.log("==============================");
var CATEGORY_WHITELIST = getCategories();
var STAGE_TO_LEVEL = {
  Explorer: "explorer",
  Practitioner: "practitioner",
  "Emerging Lead": "emerging-senior",
  "Strategic Lead - Senior": "strategic-lead",
  "Strategic Lead - Executive": "strategic-lead",
  "Strategic Lead - C-Suite": "strategic-lead"
};
var STRETCH_LEVELS = {
  Explorer: ["practitioner"],
  Practitioner: ["emerging-senior"],
  "Emerging Lead": ["strategic-lead"],
  "Strategic Lead - Senior": ["strategic-lead"],
  "Strategic Lead - Executive": ["strategic-lead"],
  "Strategic Lead - C-Suite": ["strategic-lead"]
};
var STAGE_FOCUS_CATEGORIES = {
  Explorer: ["UX Fundamentals", "Collaboration & Communication"],
  Practitioner: ["UI Craft & Visual Design", "Collaboration & Communication"],
  "Emerging Lead": ["User Research & Validation", "Product Thinking & Strategy"],
  "Strategic Lead - Senior": ["Collaboration & Communication", "Product Thinking & Strategy"],
  "Strategic Lead - Executive": ["Collaboration & Communication", "Product Thinking & Strategy"],
  "Strategic Lead - C-Suite": ["Collaboration & Communication", "Product Thinking & Strategy"]
};
function getLevelForStage(stage) {
  return STAGE_TO_LEVEL[stage] ?? "explorer";
}
function getStretchLevelsForStage(stage) {
  return STRETCH_LEVELS[stage] ?? ["strategic-lead"];
}
function normalizeCategories(categories) {
  if (!categories || categories.length === 0) {
    return [];
  }
  return categories.filter(
    (cat) => CATEGORY_WHITELIST.includes(cat)
  );
}
function getFallbackFocusCategories(stage) {
  return STAGE_FOCUS_CATEGORIES[stage] ?? ["UX Fundamentals", "User Research & Validation"];
}
function pickResourcesByLevel(levels, categories, limit, excludeIds = []) {
  if (levels.length === 0) {
    return [];
  }
  const exclude = new Set(excludeIds);
  return knowledgeBank.filter((resource) => levels.includes(resource.level)).filter((resource) => categories.length === 0 || categories.includes(resource.category)).filter((resource) => !exclude.has(resource.id)).slice(0, limit);
}
async function registerRoutes(app2) {
  app2.get("/api/job-recommendations", async (req, res) => {
    try {
      const stage = req.query.stage || "Practitioner";
      const jobTitle = buildJobTitle(stage);
      const jobs = getMockJobs(jobTitle);
      res.json({ jobs });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch job recommendations" });
    }
  });
  app2.post("/api/generate-improvement-plan", (req, res) => {
    try {
      const { totalScore, categories } = req.body ?? {};
      const data = loadPregeneratedForScore(totalScore, categories);
      const weeks = data?.improvement_plan?.weeks;
      if (!weeks || !Array.isArray(weeks)) {
        return res.status(404).json({
          error: "No pregenerated improvement plan found for this score"
        });
      }
      return res.json({ weeks });
    } catch (error) {
      console.error("Error serving pregenerated improvement plan:", error);
      return res.status(500).json({ error: "Failed to load improvement plan" });
    }
  });
  function replaceStageReferences(readup, actualStage) {
    if (!readup || !actualStage) return readup;
    const stagePatterns = [
      { pattern: /As an Explorer UX designer/gi, replacement: `As an ${actualStage} UX designer` },
      { pattern: /As a Practitioner UX designer/gi, replacement: `As a ${actualStage} UX designer` },
      { pattern: /As an Emerging Senior UX designer/gi, replacement: `As an ${actualStage} UX designer` },
      { pattern: /As a Strategic Lead UX designer/gi, replacement: `As a ${actualStage} UX designer` },
      { pattern: /As an Explorer UX Designer/gi, replacement: `As an ${actualStage} UX Designer` },
      { pattern: /As a Practitioner UX Designer/gi, replacement: `As a ${actualStage} UX Designer` },
      { pattern: /As an Emerging Senior UX Designer/gi, replacement: `As an ${actualStage} UX Designer` },
      { pattern: /As a Strategic Lead UX Designer/gi, replacement: `As a ${actualStage} UX Designer` },
      { pattern: /As an Explorer/gi, replacement: `As an ${actualStage}` },
      { pattern: /As a Practitioner/gi, replacement: `As a ${actualStage}` },
      { pattern: /As an Emerging Senior/gi, replacement: `As an ${actualStage}` },
      { pattern: /As a Strategic Lead/gi, replacement: `As a ${actualStage}` },
      { pattern: /As a UX practitioner/gi, replacement: `As a ${actualStage} UX designer` },
      { pattern: /As an emerging senior UX designer/gi, replacement: `As an ${actualStage} UX designer` },
      { pattern: /as an Explorer/gi, replacement: `as an ${actualStage}` },
      { pattern: /as a Practitioner/gi, replacement: `as a ${actualStage}` },
      { pattern: /as an Emerging Senior/gi, replacement: `as an ${actualStage}` },
      { pattern: /as a Strategic Lead/gi, replacement: `as a ${actualStage}` }
    ];
    let updatedReadup = readup;
    for (const { pattern, replacement } of stagePatterns) {
      updatedReadup = updatedReadup.replace(pattern, replacement);
    }
    return updatedReadup;
  }
  app2.post("/api/generate-resources", (req, res) => {
    try {
      const { totalScore, categories, stage } = req.body ?? {};
      console.log("generate-resources called with:", { totalScore, categoriesLength: categories?.length, stage });
      const data = loadPregeneratedForScore(totalScore, categories);
      const resourcesBlock = data?.resources;
      if (!data) {
        console.warn("No pregenerated data found for score:", totalScore);
      } else if (!resourcesBlock) {
        console.warn("Pregenerated data found but no resources block");
      } else {
        console.log("Found resources:", resourcesBlock.resources?.length || 0);
      }
      let readupText = resourcesBlock?.readup ?? "";
      if (readupText && stage && typeof stage === "string") {
        readupText = replaceStageReferences(readupText, stage);
      }
      const result = {
        readup: readupText,
        resources: Array.isArray(resourcesBlock?.resources) ? resourcesBlock.resources : []
      };
      return res.json(result);
    } catch (error) {
      console.error("Error serving pregenerated resources:", error);
      return res.status(500).json({ error: "Failed to load resources", details: String(error) });
    }
  });
  app2.post("/api/generate-deep-dive", (req, res) => {
    try {
      const { totalScore, categories } = req.body ?? {};
      const data = loadPregeneratedForScore(totalScore, categories);
      const topics = data?.deep_dive?.topics;
      return res.json({
        topics: Array.isArray(topics) ? topics : []
      });
    } catch (error) {
      console.error("Error serving pregenerated deep dive:", error);
      return res.status(500).json({ error: "Failed to load deep dive topics" });
    }
  });
  app2.post("/api/generate-layout", (req, res) => {
    try {
      const { stage, totalScore, maxScore, categories } = req.body ?? {};
      const data = loadPregeneratedForScore(totalScore, categories);
      const layout = data?.layout;
      if (layout && layout.section_order && layout.section_visibility) {
        return res.json(layout);
      }
      const fallback = {
        section_order: [
          "hero",
          "stage-readup",
          "skill-breakdown",
          "resources",
          "deep-dive",
          "improvement-plan",
          "jobs"
        ],
        section_visibility: {
          hero: true,
          "stage-readup": true,
          "skill-breakdown": true,
          resources: true,
          "deep-dive": true,
          "improvement-plan": true,
          jobs: true
        },
        content_depth: {
          resources: "standard",
          "deep-dive": "standard",
          "improvement-plan": "standard"
        },
        priority_message: stage && typeof stage === "string" ? `Based on your ${stage} level, here's your personalized roadmap.` : "Let's review your UX skills assessment results."
      };
      return res.json(fallback);
    } catch (error) {
      console.error("Error serving pregenerated layout:", error);
      return res.status(500).json({ error: "Failed to load layout strategy" });
    }
  });
  app2.post("/api/generate-category-insights", (req, res) => {
    try {
      const { totalScore, categories } = req.body ?? {};
      const data = loadPregeneratedForScore(totalScore, categories);
      let insights = data?.insights;
      if (!insights || !Array.isArray(insights) || insights.length === 0) {
        if (Array.isArray(categories)) {
          insights = categories.map((cat) => {
            const percentage = typeof cat.score === "number" ? Math.round(cat.score) : 0;
            let detailed;
            let actionable;
            if (percentage >= 90) {
              detailed = `Excellent work! Your ${cat.name} skills are at an advanced level. Continue refining your expertise and consider mentoring others or contributing to design systems.`;
              actionable = [
                `Share your ${cat.name} expertise through mentorship or writing`,
                `Contribute to design systems or industry best practices`,
                `Explore advanced techniques and emerging trends in ${cat.name}`
              ];
            } else if (percentage >= 80) {
              detailed = `Strong performance in ${cat.name}! You have a solid foundation. Focus on refining advanced techniques and expanding your knowledge in specialized areas.`;
              actionable = [
                `Deepen your understanding of advanced ${cat.name} concepts`,
                `Practice applying ${cat.name} principles to complex projects`,
                `Seek feedback from senior designers on your ${cat.name} work`
              ];
            } else if (percentage >= 60) {
              detailed = `Your ${cat.name} skills are developing well. Continue building on your foundation and practice applying these concepts in real projects.`;
              actionable = [
                `Practice ${cat.name} skills through hands-on projects`,
                `Study case studies and examples of strong ${cat.name} work`,
                `Get feedback on your ${cat.name} work from peers or mentors`
              ];
            } else if (percentage >= 40) {
              detailed = `Your performance in ${cat.name} shows room for growth. Focus on building stronger foundations through structured learning and practice.`;
              actionable = [
                `Review core concepts in ${cat.name}`,
                `Complete beginner-friendly ${cat.name} tutorials or courses`,
                `Practice ${cat.name} skills daily with small projects`
              ];
            } else {
              detailed = `Your ${cat.name} skills need significant development. Start with fundamentals and build gradually through consistent practice and learning.`;
              actionable = [
                `Start with beginner ${cat.name} courses or resources`,
                `Practice basic ${cat.name} concepts regularly`,
                `Seek guidance from experienced designers in ${cat.name}`
              ];
            }
            return {
              category: cat.name ?? "Category",
              brief: `You scored ${percentage}% in ${cat.name}.`,
              detailed,
              actionable
            };
          });
        } else {
          insights = [];
        }
      }
      return res.json({ insights });
    } catch (error) {
      console.error("Error serving pregenerated insights:", error);
      return res.status(500).json({ error: "Failed to load category insights" });
    }
  });
  app2.get("/api/job-search-links", (req, res) => {
    try {
      const stage = req.query.stage || "Practitioner";
      const location = req.query.location || "Remote";
      const jobTitle = buildJobTitle(stage);
      const encodedLocation = encodeURIComponent(location);
      const encodedTitle = encodeURIComponent(jobTitle);
      const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}&location=${encodedLocation}`;
      const googleQuery = encodeURIComponent(`${jobTitle} jobs in ${location}`);
      const googleUrl = `https://www.google.com/search?q=${googleQuery}&ibp=htl;jobs`;
      return res.json({
        job_title: jobTitle,
        linkedin_url: linkedinUrl,
        google_url: googleUrl
      });
    } catch (error) {
      console.error("Error generating job search links:", error);
      return res.status(500).json({ error: "Failed to generate job search links" });
    }
  });
  async function fetchRAGContext(stage, categories) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2e3);
      const response = await fetch("http://localhost:8000/api/rag/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          categories: categories.map((c) => ({
            name: c.name,
            score: c.finalScore || c.score,
            maxScore: 100
          })),
          top_k: 5
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.resources)) {
          console.log(`\u2713 RAG Context: Retrieved ${data.resources.length} resources`);
          return data.resources;
        }
      }
    } catch (error) {
      console.warn("RAG Context Retrieval skipped:", error instanceof Error ? error.message : "Unknown error");
    }
    return [];
  }
  async function fetchLearningPaths(categories) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2e3);
      const response = await fetch("http://localhost:8000/api/rag/learning-paths", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) return (await response.json()).paths;
    } catch (e) {
      console.warn("Learning Path RAG skipped");
    }
    return {};
  }
  async function fetchStageCompetencies(stage) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2e3);
      const response = await fetch("http://localhost:8000/api/rag/stage-competencies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) return (await response.json()).competencies;
    } catch (e) {
      console.warn("Stage Comp RAG skipped");
    }
    return [];
  }
  async function fetchSkillRelationships(weak, strong) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2e3);
      const response = await fetch("http://localhost:8000/api/rag/skill-relationships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weak_categories: weak, strong_categories: strong }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) return (await response.json()).relationships;
    } catch (e) {
      console.warn("Skill Rel RAG skipped");
    }
    return [];
  }
  app2.post("/api/v2/meaning", async (req, res) => {
    try {
      const { stage, totalScore, strongCategories, weakCategories } = req.body ?? {};
      if (isOpenAIConfigured()) {
        const categories = [
          ...(strongCategories || []).map((c) => ({ name: c, score: 100, maxScore: 100 })),
          ...(weakCategories || []).map((c) => ({ name: c, score: 50, maxScore: 100 }))
        ];
        const ragResources = await fetchRAGContext(stage, categories);
        let contextString = "";
        if (ragResources.length > 0) {
          contextString = "\n\nRELEVANT LEARNING RESOURCES (Use these to tailor your advice):\n";
          ragResources.forEach((res2, idx) => {
            contextString += `${idx + 1}. ${res2.title} (${res2.category || "General"})
   Summary: ${res2.content_preview?.substring(0, 150) || "N/A"}...
`;
          });
        }
        const systemPrompt = `You are an expert UX career mentor. Write a short, personalized "What This Means For You" summary (max 50 words) for a UX designer. 
      Use an encouraging but professional tone. Focus on their current stage and growth potential.
      ${contextString ? "Incorporate insights from the provided learning resources where relevant." : ""}`;
        const userPrompt = `
      Stage: ${stage}
      Total Score: ${totalScore}/100
      Strongest Areas: ${strongCategories?.join(", ") || "None specific"}
      Areas for Improvement: ${weakCategories?.join(", ") || "General fundamentals"}
      ${contextString}
      `;
        const response = await generateText(systemPrompt, userPrompt);
        if (response.content) {
          return res.json({ meaning: response.content });
        }
      }
      const meaning = generateMeaningText(stage, totalScore, strongCategories, weakCategories);
      return res.json({ meaning });
    } catch (error) {
      console.error("Error generating meaning:", error);
      const { stage, totalScore, strongCategories, weakCategories } = req.body ?? {};
      const meaning = generateMeaningText(stage, totalScore, strongCategories, weakCategories);
      return res.json({ meaning });
    }
  });
  app2.post("/api/v2/skill-analysis", async (req, res) => {
    try {
      const { categories, stage } = req.body ?? {};
      if (!Array.isArray(categories)) {
        return res.status(400).json({ error: "Categories must be an array" });
      }
      if (isOpenAIConfigured()) {
        const ragResources = await fetchRAGContext(stage, categories);
        let contextString = "";
        if (ragResources.length > 0) {
          contextString = "\n\nRECOMMENDED RESOURCES (Reference these in checklists where applicable):\n";
          ragResources.forEach((res2, idx) => {
            contextString += `- ${res2.title}: ${res2.content_preview?.substring(0, 100)}...
`;
          });
        }
        const systemPrompt = `You are a senior UX hiring manager. Analyze the user's skill scores and generate specific insights.
      For each category, provide:
      1. A 2-sentence description of their current capability level.
      2. A checklist of 3-5 specific, actionable tasks to improve.
      ${contextString ? "3. Suggest specific resources from the provided list if they match the category." : ""}
      
      Return valid JSON with an "insights" array.`;
        const userPrompt = `
      Stage: ${stage}
      Categories and Scores:
      ${JSON.stringify(categories.map((c) => ({ name: c.name, score: c.finalScore, band: c.band })))}
      ${contextString}
      `;
        const response = await generateJSON(systemPrompt, userPrompt);
        if (response.data && response.data.insights) {
          const mergedInsights = categories.map((cat) => {
            const aiInsight = response.data?.insights.find((i) => i.categoryName === cat.name);
            const fallback = generateCategoryInsight(cat, stage);
            if (aiInsight) {
              return {
                categoryId: cat.id,
                categoryName: cat.name,
                score: cat.finalScore,
                band: cat.band,
                description: aiInsight.description,
                checklist: aiInsight.checklist.map((text, idx) => ({
                  id: `${cat.id}-${idx}`,
                  text
                }))
              };
            }
            return fallback;
          });
          return res.json({ insights: mergedInsights });
        }
      }
      const insights = categories.map(
        (cat) => generateCategoryInsight(cat, stage)
      );
      return res.json({ insights });
    } catch (error) {
      console.error("Error generating skill analysis:", error);
      const { categories, stage } = req.body ?? {};
      if (Array.isArray(categories)) {
        const insights = categories.map((cat) => generateCategoryInsight(cat, stage));
        return res.json({ insights });
      }
      return res.status(500).json({ error: "Failed to generate skill analysis" });
    }
  });
  app2.post("/api/v2/resources", async (req, res) => {
    try {
      const { stage, weakCategories } = req.body ?? {};
      const normalizedWeakCategories = normalizeCategories(weakCategories);
      const focusCategories = normalizedWeakCategories.length > 0 ? normalizedWeakCategories : getFallbackFocusCategories(stage);
      const level = getLevelForStage(stage);
      console.log("[/api/v2/resources] Request:", { stage, focusCategories, level });
      console.log("[/api/v2/resources] KB size:", knowledgeBank.length);
      let stageResources = knowledgeBank.filter((r) => r.level === level);
      console.log("[/api/v2/resources] Stage resources found:", stageResources.length);
      let candidates = [];
      if (!stageResources || stageResources.length === 0) {
        console.warn("[/api/v2/resources] No stage resources; falling back to entire knowledge bank.");
        stageResources = [...knowledgeBank];
      }
      if (focusCategories.length > 0) {
        const focusMatches = stageResources.filter((r) => focusCategories.includes(r.category));
        candidates.push(...focusMatches);
      }
      const candidateIds = new Set(candidates.map((c) => c.id));
      const others = stageResources.filter((r) => !candidateIds.has(r.id));
      candidates.push(...others);
      candidates = candidates.slice(0, 15);
      console.log("[/api/v2/resources] Candidates:", candidates.map((c) => c.id));
      let selectedResources = [];
      if (isOpenAIConfigured()) {
        try {
          const learningPaths = await fetchLearningPaths(normalizedWeakCategories);
          const stageCompetencies = await fetchStageCompetencies(stage);
          const systemPrompt = `You are a UX learning advisor. Select the 5 BEST beginner resources for this user.
        Explain WHY each one specifically addresses their gaps based on the learning paths and stage expectations.
        Return JSON: { resources: [{ id, reasonSelected }] }
        IMPORTANT: Only use IDs from the provided Candidates list.`;
          const userPrompt = `
        Stage: ${stage}
        Focus Categories: ${focusCategories.join(", ")}
        Candidates: ${JSON.stringify(candidates.map((r) => ({ id: r.id, title: r.title, category: r.category, summary: r.summary })))}
        Learning Context: ${JSON.stringify(learningPaths)}
        Stage Context: ${JSON.stringify(stageCompetencies)}
        `;
          const response = await generateJSON(systemPrompt, userPrompt);
          if (response.data && response.data.resources) {
            selectedResources = response.data.resources.map((sel) => {
              const original = knowledgeBank.find((r) => r.id === sel.id);
              if (original) {
                return { ...original, reasonSelected: sel.reasonSelected };
              }
              return null;
            }).filter(Boolean);
            console.log("[/api/v2/resources] AI selected:", selectedResources.length, "resources");
          } else {
            console.warn("[/api/v2/resources] AI returned no data:", response.error || "Unknown error");
          }
        } catch (aiError) {
          console.warn("[/api/v2/resources] AI failed, using fallback:", aiError);
        }
      }
      if (selectedResources.length === 0) {
        console.log("[/api/v2/resources] Using fallback - selecting from candidates");
        let pool = [...candidates];
        if (!pool || pool.length === 0) {
          console.warn("[/api/v2/resources] Candidates empty; topping up from knowledge bank.");
          pool = [...knowledgeBank];
        }
        const shuffled = pool.sort(() => 0.5 - Math.random());
        selectedResources = shuffled.slice(0, 5).map((r) => ({
          ...r,
          reasonSelected: `Recommended to strengthen your ${r.category} skills.`
        }));
        if (selectedResources.length < 5) {
          const existing = new Set(selectedResources.map((r) => r.id));
          const topUp = knowledgeBank.filter((r) => !existing.has(r.id)).slice(0, 5 - selectedResources.length);
          selectedResources = [...selectedResources, ...topUp].slice(0, 5);
        }
        console.log("[/api/v2/resources] Fallback selected:", selectedResources.map((r) => r.id));
      }
      return res.json({ resources: selectedResources });
    } catch (error) {
      console.error("[/api/v2/resources] Error:", error);
      return res.status(500).json({ error: "Failed to generate resources" });
    }
  });
  app2.post("/api/v2/deep-insights", async (req, res) => {
    try {
      const { stage, strongCategories, weakCategories } = req.body ?? {};
      const stretchLevels = getStretchLevelsForStage(stage);
      const normalizedStrong = normalizeCategories(strongCategories);
      const normalizedWeak = normalizeCategories(weakCategories);
      console.log("[/api/v2/deep-insights] Request:", { stage, stretchLevels, normalizedStrong, normalizedWeak });
      console.log("[/api/v2/deep-insights] KB size:", knowledgeBank.length);
      let candidates = knowledgeBank.filter((r) => stretchLevels.includes(r.level));
      const priorityCategories = [...normalizedStrong, ...normalizedWeak];
      if (priorityCategories.length > 0) {
        const prioritized = candidates.filter((r) => priorityCategories.includes(r.category));
        const remainder = candidates.filter((r) => !priorityCategories.includes(r.category));
        candidates = [...prioritized, ...remainder];
      }
      candidates = candidates.sort(() => 0.5 - Math.random()).slice(0, 25);
      console.log("[/api/v2/deep-insights] Candidates:", candidates.map((c) => c.id));
      let deepInsights = [];
      if (isOpenAIConfigured()) {
        const stageCompetencies = await fetchStageCompetencies(stage);
        const skillRelationships = await fetchSkillRelationships(normalizedWeak, normalizedStrong);
        const systemPrompt = `You are a UX career strategist. Select 6 ADVANCED resources that:
      1. Deepen expertise in strong areas
      2. Are stage-appropriate (e.g., leadership for seniors)
      3. Bridge weak to strong areas strategically
      
      Explain WHY each resource is strategically valuable.
      Return JSON: { insights: [{ id, whyThisForYou }] }`;
        const userPrompt = `
      Stage: ${stage}
      Strong Categories: ${normalizedStrong.join(", ")}
      Weak Categories: ${normalizedWeak.join(", ")}
      Candidates: ${JSON.stringify(candidates.map((r) => ({ id: r.id, title: r.title, category: r.category, level: r.level, summary: r.summary })))}
      Stage Strategy: ${JSON.stringify(stageCompetencies)}
      Skill Bridging: ${JSON.stringify(skillRelationships)}
      `;
        const response = await generateJSON(systemPrompt, userPrompt);
        if (response.data && response.data.insights) {
          deepInsights = response.data.insights.map((sel) => {
            const original = knowledgeBank.find((r) => r.id === sel.id);
            if (original) {
              return { ...original, whyThisForYou: sel.whyThisForYou };
            }
            return null;
          }).filter(Boolean);
        }
      }
      if (deepInsights.length === 0) {
        console.log("[/api/v2/deep-insights] Using fallback - selecting from candidates");
        if (!candidates || candidates.length === 0) {
          console.warn("[/api/v2/deep-insights] No candidates after filtering. Rebuilding from knowledge bank.");
          const stretchLevelsOnly = knowledgeBank.filter((r) => stretchLevels.includes(r.level));
          candidates = (stretchLevelsOnly.length > 0 ? stretchLevelsOnly : knowledgeBank).slice(0, 25);
        }
        const strongOnly = candidates.filter((r) => normalizedStrong.includes(r.category));
        const otherCandidates = candidates.filter((r) => !normalizedStrong.includes(r.category));
        let selection = [
          ...strongOnly.slice(0, 3),
          ...otherCandidates
        ];
        if (selection.length < 6) {
          const existing = new Set(selection.map((r) => r.id));
          const topUpPool = knowledgeBank.filter((r) => !existing.has(r.id));
          selection = [...selection, ...topUpPool].slice(0, 6);
        } else {
          selection = selection.slice(0, 6);
        }
        deepInsights = selection.map((r) => ({
          ...r,
          whyThisForYou: `Selected to help you advance your expertise in ${r.category}.`
        }));
        console.log("[/api/v2/deep-insights] Fallback selected count:", deepInsights.length);
        console.log("[/api/v2/deep-insights] Fallback selected IDs:", deepInsights.map((i) => i.id));
      }
      return res.json({ insights: deepInsights });
    } catch (error) {
      console.error("[/api/v2/deep-insights] Error:", error);
      return res.status(500).json({ error: "Failed to generate deep insights" });
    }
  });
  app2.post("/api/v2/improvement-plan", async (req, res) => {
    try {
      const { stage, strongCategories, weakCategories } = req.body ?? {};
      if (isOpenAIConfigured()) {
        const categories = [
          ...(strongCategories || []).map((c) => ({ name: c, score: 100, maxScore: 100 })),
          ...(weakCategories || []).map((c) => ({ name: c, score: 50, maxScore: 100 }))
        ];
        const ragResources = await fetchRAGContext(stage, categories);
        let contextString = "";
        if (ragResources.length > 0) {
          contextString = "\n\nKNOWLEDGE BASE RESOURCES (Build tasks around these):\n";
          ragResources.forEach((res2, idx) => {
            contextString += `${idx + 1}. ${res2.title} (${res2.category})
   Link: ${res2.url}
`;
          });
        }
        const systemPrompt = `You are a UX career coach. Create a 3-week improvement plan.
      Structure:
      - Week 1: Foundational improvements
      - Week 2: Deepening skills
      - Week 3: Strategic application
      
      For each week provide:
      - Theme
      - Focus areas (from their weak categories)
      - 3 Daily tasks (short, < 1hr)
      - 2 Deep work sessions (long, > 1.5hr)
      - Expected outcome
      
      ${contextString ? "IMPORTANT: Explicitly recommend reading/watching the provided Knowledge Base Resources in the daily tasks." : ""}
      
      Return strictly valid JSON.`;
        const userPrompt = `
      Stage: ${stage}
      Weakest Categories (Focus on these): ${weakCategories?.join(", ")}
      Strongest Categories (Leverage these): ${strongCategories?.join(", ")}
      ${contextString}
      `;
        const response = await generateJSON(systemPrompt, userPrompt);
        if (response.data && response.data.weeks) {
          const weeks2 = response.data.weeks.map((week, wIdx) => ({
            ...week,
            dailyTasks: week.dailyTasks.map((t, tIdx) => ({ ...t, id: `w${wIdx}-d${tIdx}`, type: "daily" })),
            deepWorkTasks: week.deepWorkTasks.map((t, tIdx) => ({ ...t, id: `w${wIdx}-dw${tIdx}`, type: "deep-work" }))
          }));
          return res.json({ weeks: weeks2 });
        }
      }
      const weeks = generateImprovementPlan(stage, strongCategories, weakCategories);
      return res.json({ weeks });
    } catch (error) {
      console.error("Error generating improvement plan:", error);
      const { stage, strongCategories, weakCategories } = req.body ?? {};
      const weeks = generateImprovementPlan(stage, strongCategories, weakCategories);
      return res.json({ weeks });
    }
  });
  app2.get("/api/premium/access/status", async (req, res) => {
    try {
      const deviceId = req.query.deviceId;
      if (!deviceId) {
        return res.status(400).json({ error: "deviceId is required" });
      }
      let deviceAccess = await storage.getDeviceAccess(deviceId);
      if (!deviceAccess) {
        deviceAccess = await storage.createDeviceAccess({
          deviceId,
          attemptCount: 0,
          premiumUnlocked: false
        });
      }
      return res.json({
        attemptCount: deviceAccess.attemptCount,
        premiumUnlocked: deviceAccess.premiumUnlocked
      });
    } catch (error) {
      console.error("Error fetching device access status:", error);
      return res.status(500).json({ error: "Failed to fetch access status" });
    }
  });
  app2.post("/api/premium/access/increment", async (req, res) => {
    try {
      const { deviceId } = req.body;
      if (!deviceId) {
        return res.status(400).json({ error: "deviceId is required" });
      }
      let deviceAccess = await storage.getDeviceAccess(deviceId);
      if (!deviceAccess) {
        deviceAccess = await storage.createDeviceAccess({
          deviceId,
          attemptCount: 0,
          premiumUnlocked: false
        });
      }
      if (!deviceAccess.premiumUnlocked) {
        deviceAccess = await storage.updateDeviceAccess(deviceId, {
          attemptCount: deviceAccess.attemptCount + 1
        });
      }
      return res.json({
        attemptCount: deviceAccess?.attemptCount ?? 0,
        premiumUnlocked: deviceAccess?.premiumUnlocked ?? false
      });
    } catch (error) {
      console.error("Error incrementing attempt count:", error);
      return res.status(500).json({ error: "Failed to increment attempt count" });
    }
  });
  app2.post("/api/premium/access/set-premium", async (req, res) => {
    try {
      const { deviceId, premiumUnlocked } = req.body;
      if (!deviceId) {
        return res.status(400).json({ error: "deviceId is required" });
      }
      let deviceAccess = await storage.getDeviceAccess(deviceId);
      if (!deviceAccess) {
        deviceAccess = await storage.createDeviceAccess({
          deviceId,
          attemptCount: 0,
          premiumUnlocked: premiumUnlocked ?? true
        });
      } else {
        deviceAccess = await storage.updateDeviceAccess(deviceId, {
          premiumUnlocked: premiumUnlocked ?? true
        });
      }
      return res.json({
        attemptCount: deviceAccess?.attemptCount ?? 0,
        premiumUnlocked: deviceAccess?.premiumUnlocked ?? false
      });
    } catch (error) {
      console.error("Error setting premium status:", error);
      return res.status(500).json({ error: "Failed to set premium status" });
    }
  });
  app2.post("/api/premium/payments/create-checkout-session", async (req, res) => {
    try {
      if (!isStripeConfigured()) {
        return res.status(503).json({
          error: "Payment system not configured. Please contact support."
        });
      }
      const { deviceId, redirectTo } = req.body;
      if (!deviceId) {
        return res.status(400).json({ error: "deviceId is required" });
      }
      const priceId = getStripePriceId();
      if (!priceId) {
        return res.status(503).json({
          error: "Payment pricing not configured. Please contact support."
        });
      }
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
      const host = req.headers.host || "localhost:3001";
      const baseUrl = `${protocol}://${host}`;
      const successUrl = `${baseUrl}/premium/payment-success?session_id={CHECKOUT_SESSION_ID}&deviceId=${encodeURIComponent(deviceId)}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`;
      const cancelUrl = `${baseUrl}/premium/quiz`;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          deviceId
        }
      });
      return res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return res.status(500).json({
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/premium/payments/confirm", async (req, res) => {
    try {
      if (!isStripeConfigured()) {
        return res.status(503).json({
          error: "Payment system not configured"
        });
      }
      const sessionId = req.query.session_id;
      const deviceId = req.query.deviceId;
      if (!sessionId || !deviceId) {
        return res.status(400).json({
          error: "session_id and deviceId are required"
        });
      }
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return res.status(400).json({
          error: "Payment not completed",
          paymentStatus: session.payment_status
        });
      }
      if (session.metadata?.deviceId !== deviceId) {
        return res.status(400).json({
          error: "Device ID mismatch"
        });
      }
      let deviceAccess = await storage.getDeviceAccess(deviceId);
      if (!deviceAccess) {
        deviceAccess = await storage.createDeviceAccess({
          deviceId,
          attemptCount: 0,
          premiumUnlocked: true
        });
      } else {
        deviceAccess = await storage.updateDeviceAccess(deviceId, {
          premiumUnlocked: true
        });
      }
      return res.json({
        success: true,
        premiumUnlocked: true,
        attemptCount: deviceAccess?.attemptCount ?? 0
      });
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({
        error: "Failed to confirm payment",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/app.ts
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express();
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});

// server/index-vercel.ts
var distPath = path2.resolve(process.cwd(), "dist/public");
var routesInitialized = false;
var initPromise = null;
function ensureRoutesInitialized() {
  if (routesInitialized) {
    return Promise.resolve();
  }
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await registerRoutes(app);
        routesInitialized = true;
        console.log("Routes initialized successfully");
      } catch (err) {
        console.error("Failed to initialize routes:", err);
        throw err;
      }
    })();
  }
  return initPromise;
}
ensureRoutesInitialized().catch((err) => {
  console.error("Initial route initialization failed:", err);
});
if (fs2.existsSync(distPath)) {
  app.use(express2.static(distPath, {
    index: false,
    // Don't auto-serve index.html
    fallthrough: true
    // Continue to next middleware if file not found
  }));
}
app.use("*", async (_req, res) => {
  if (_req.path.startsWith("/api/")) {
    try {
      await ensureRoutesInitialized();
    } catch (err) {
      console.error("Routes not initialized:", err);
      return res.status(500).send("Internal server error");
    }
    return;
  }
  try {
    await ensureRoutesInitialized();
  } catch (err) {
    console.error("Routes initialization error:", err);
    return res.status(500).send("Internal server error");
  }
  try {
    const indexPath = path2.resolve(distPath, "index.html");
    if (fs2.existsSync(indexPath)) {
      res.setHeader("Content-Type", "text/html");
      res.sendFile(indexPath);
    } else {
      console.error("index.html not found at:", indexPath);
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error serving file:", error);
    res.status(500).send("Internal server error");
  }
});
var index_vercel_default = app;
export {
  index_vercel_default as default
};
