import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type ResourceDetail = {
  resource_id?: string;
  metadata: {
    title?: string;
    url?: string;
    category?: string;
    difficulty?: string;
    resource_type?: string;
    source?: string;
    status?: string;
  };
  content: string;
};

const PY_API_BASE =
  (import.meta as any).env.VITE_PY_API_BASE || "http://localhost:8000";

export default function ContentDetailPage() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [detail, setDetail] = useState<ResourceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idParam = id;
    if (!idParam) return;
    const encodedId = encodeURIComponent(idParam);

    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `${PY_API_BASE}/api/admin/content/${encodedId}`
        );
        if (!res.ok) {
          throw new Error(`Detail error: ${res.status}`);
        }
        const json = (await res.json()) as ResourceDetail;
        if (!cancelled) {
          setDetail(json);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Unable to load resource details.");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const meta = detail?.metadata ?? {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Resource Detail</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Inspect the raw content and metadata that flow into the AI + RAG
            pipeline.
          </p>
          {error && (
            <p className="mt-1 text-xs text-amber-400">
              {error} The user-facing results page is unaffected.
            </p>
          )}
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300 space-y-2">
          <p>
            <span className="font-medium text-slate-200">Resource ID:</span>{" "}
            {id ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-200">Title:</span>{" "}
            {meta.title ?? "(Untitled)"}
          </p>
          <p>
            <span className="font-medium text-slate-200">URL:</span>{" "}
            {meta.url ? (
              <a
                href={meta.url}
                target="_blank"
                rel="noreferrer"
                className="text-sky-300 hover:underline"
              >
                {meta.url}
              </a>
            ) : (
              "—"
            )}
          </p>
          <p>
            <span className="font-medium text-slate-200">Category:</span>{" "}
            {meta.category ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-200">Difficulty:</span>{" "}
            {meta.difficulty ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-200">Type:</span>{" "}
            {meta.resource_type ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-200">Source:</span>{" "}
            {meta.source ?? "—"}
          </p>
          <p>
            <span className="font-medium text-slate-200">Status:</span>{" "}
            {meta.status ?? "approved"}
          </p>
        </div>

        {detail?.content && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-200">
            <h2 className="text-sm font-medium text-slate-100 mb-2">
              Content Preview
            </h2>
            <pre className="whitespace-pre-wrap max-h-[420px] overflow-auto">
              {detail.content}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}

