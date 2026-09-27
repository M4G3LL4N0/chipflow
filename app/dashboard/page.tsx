"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useState } from "react";

type RunRow = { id: string; createdAt: string; result: { allocationRisk?: number; executiveSummary?: string } };

export default function DashboardPage() {
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/allocation");
        const data = await res.json();
        setRuns(data.runs ?? []);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Chip allocation tracker</h1>
        <Link href="/planner" className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950">New scenario</Link>
      </div>

      <div className="grid gap-4">
        {loading ? <p className="text-slate-300">Loading runs...</p> : null}
        {!loading && runs.length === 0 ? <p className="text-slate-300">No runs yet. Create your first supply scenario.</p> : null}
        {runs.map((run) => (
          <Link key={run.id} href={`/dashboard/runs/${run.id}`} className="panel block hover:border-cyan-300/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{new Date(run.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-slate-200">{run.result?.executiveSummary ?? "Allocation run"}</p>
              </div>
              <p className="text-lg font-semibold text-cyan-300">{run.result?.allocationRisk ?? "-"}/100</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
  )
}
