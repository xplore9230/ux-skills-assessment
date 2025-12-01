import React, { useEffect, useState } from "react";

type AdminStats = {
  total_chunks: number;
  unique_resources: number;
  categories?: Record<string, number>;
  difficulties?: Record<string, number>;
  sources?: Record<string, number>;
};

const PY_API_BASE =
  (import.meta as any).env.VITE_PY_API_BASE || "http://localhost:8000";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [statsRes, pendingRes] = await Promise.all([
          fetch(`${PY_API_BASE}/api/admin/stats`),
          fetch(`${PY_API_BASE}/api/admin/pending?limit=200`),
        ]);

        if (!statsRes.ok) {
          throw new Error(`Admin stats error: ${statsRes.status}`);
        }

        const statsJson: AdminStats = await statsRes.json();
        const pendingJson: unknown = await pendingRes.json();

        if (!cancelled) {
          setStats(statsJson);
          setPendingCount(
            Array.isArray(pendingJson) ? (pendingJson as unknown[]).length : 0
          );
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Unable to load admin stats yet.");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalResources =
    stats?.unique_resources !== undefined ? stats.unique_resources : "—";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Knowledge Bank Admin
          </h1>
          <p className="text-slate-400 mt-2">
            Review and manage all learning resources powering the AI + RAG
            results experience.
          </p>
          {error && (
            <p className="mt-2 text-xs text-amber-400">
              {error} (this does not affect the user results page).
            </p>
          )}
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium text-slate-400">
              Total Resources
            </h2>
            <p className="mt-2 text-2xl font-semibold">{totalResources}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium text-slate-400">
              Pending Reviews
            </h2>
            <p className="mt-2 text-2xl font-semibold">
              {pendingCount ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium text-slate-400">
              Knowledge Base Chunks
            </h2>
            <p className="mt-2 text-2xl font-semibold">
              {stats?.total_chunks ?? "—"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

