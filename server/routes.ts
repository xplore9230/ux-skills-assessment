import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // AI-generated improvement plan endpoint
  app.post("/api/generate-improvement-plan", async (req, res) => {
    try {
      const { stage, totalScore, maxScore, categories } = req.body;

      const categoryDetails = categories
        .map((c: any) => `${c.name}: ${c.score}/${c.maxScore}`)
        .join("\n");

      const prompt = `You are a UX career coach. Based on this assessment result, generate a personalized 4-week improvement plan.

Career Stage: ${stage}
Total Score: ${totalScore}/${maxScore}

Skill Breakdown:
${categoryDetails}

Create a concise, actionable 4-week plan. For each week, provide 3 specific, practical tasks that build on previous weeks. Focus on the weakest areas. Format as JSON:
{
  "weeks": [
    {"week": 1, "tasks": ["task1", "task2", "task3"]},
    {"week": 2, "tasks": ["task1", "task2", "task3"]},
    {"week": 3, "tasks": ["task1", "task2", "task3"]},
    {"week": 4, "tasks": ["task1", "task2", "task3"]}
  ]
}`;

      const message = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = message.choices[0].message.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const plan = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      res.json(plan || { weeks: [] });
    } catch (error) {
      console.error("Error generating plan:", error);
      res.status(500).json({ error: "Failed to generate plan" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
