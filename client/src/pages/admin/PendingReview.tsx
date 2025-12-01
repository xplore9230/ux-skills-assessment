import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PendingResource = {
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

export default function PendingReviewPage() {
  const [items, setItems] = useState<PendingResource[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    try {
      const res = await fetch(`${PY_API_BASE}/api/admin/pending?limit=100`);
      if (!res.ok) {
        throw new Error(`Pending error: ${res.status}`);
      }
      const json = (await res.json()) as PendingResource[];
      setItems(json);
    } catch (e) {
      console.error(e);
      setError("Unable to load pending items.");
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  async function handleAction(id: string, action: "approve" | "reject") {
    try {
      const res = await fetch(
        `${PY_API_BASE}/api/admin/content/${encodeURIComponent(id)}/${action}`,
        { method: "POST" }
      );
      if (!res.ok) {
        throw new Error(`${action} failed`);
      }
      await reload();
    } catch (e) {
      console.error(e);
      setError(`Unable to ${action} this item right now.`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Pending Review</h1>
          <p className="text-slate-400 mt-1 text-sm">
            These items were auto-classified by AI and marked as{" "}
            <code>pending</code>. Approve or reject them before they become part
            of your curated knowledge bank.
          </p>
          {error && (
            <p className="mt-1 text-xs text-amber-400">
              {error} This only affects the admin view, not end users.
            </p>
          )}
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-0 text-sm text-slate-200 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2 text-left w-[40%]">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Actions</th>
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
                  <td className="px-4 py-2">{item.resource_type}</td>
                  <td className="px-4 py-2 text-xs text-slate-400">
                    {item.source}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      type="button"
                      onClick={() => void handleAction(item.resource_id, "approve")}
                      className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-1 text-xs font-medium text-emerald-50 hover:bg-emerald-400"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleAction(item.resource_id, "reject")}
                      className="inline-flex items-center rounded-md bg-rose-500 px-3 py-1 text-xs font-medium text-rose-50 hover:bg-rose-400"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No pending items right now. New social content will appear
                    here once ingested and classified.
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

