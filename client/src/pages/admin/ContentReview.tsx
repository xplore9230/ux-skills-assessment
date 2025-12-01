import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type AdminResource = {
  resource_id: string;
  title: string;
  url: string;
  category: string;
  difficulty: string;
  resource_type: string;
  source: string;
  status?: string;
};

const PY_API_BASE =
  (import.meta as any).env.VITE_PY_API_BASE || "http://localhost:8000";

export default function ContentReviewPage() {
  const [items, setItems] = useState<AdminResource[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${PY_API_BASE}/api/admin/content?limit=100`);
        if (!res.ok) {
          throw new Error(`Admin content error: ${res.status}`);
        }
        const json = (await res.json()) as AdminResource[];
        if (!cancelled) {
          setItems(json);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Unable to load content list.");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">All Knowledge Bank Content</h1>
            <p className="text-slate-400 mt-1 text-sm">
              Browse everything currently in the AI + RAG knowledge bank.
            </p>
            {error && (
              <p className="mt-1 text-xs text-amber-400">
                {error} The user-facing results page is unaffected.
              </p>
            )}
          </div>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-0 text-sm text-slate-200 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2 text-left w-[40%]">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Difficulty</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.resource_id}
                  className="border-b border-slate-800 hover:bg-slate-900/70"
                >
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/content/detail?id=${encodeURIComponent(
                        item.resource_id
                      )}`}
                      className="text-sky-300 hover:underline"
                    >
                      {item.title || "(Untitled)"}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2 capitalize">{item.difficulty}</td>
                  <td className="px-4 py-2">{item.resource_type}</td>
                  <td className="px-4 py-2 text-xs text-slate-400">
                    {item.source}
                  </td>
                  <td className="px-4 py-2 text-xs">
                    {item.status ?? "approved"}
                  </td>
                </tr>
              ))}
              {items.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No resources found yet. Run ingestion to populate the
                    knowledge bank.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

