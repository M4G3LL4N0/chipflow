"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useRouter } from "next/navigation";
import { runAllocation } from "@/lib/engine";
import { CHIP_TYPE, DEMAND, LEAD_TIME, REGION, SUPPLIER_COUNT, URGENCY, type AllocationInput, type AllocationResult } from "@/lib/types";

const initial: AllocationInput = {
  chipType: CHIP_TYPE[0],
  demandLevel: DEMAND[1],
  suppliers: SUPPLIER_COUNT[1],
  region: REGION[4],
  leadTime: LEAD_TIME[1],
  urgency: URGENCY[1],
};

export default function PlannerPage() {
  const router = useRouter();
  const [form, setForm] = useState<AllocationInput>(initial);
  const [result, setResult] = useState<AllocationResult | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fields: Array<{ key: keyof AllocationInput; label: string; options: readonly string[] }> = [
    { key: "chipType", label: "Chip type", options: CHIP_TYPE },
    { key: "demandLevel", label: "Demand", options: DEMAND },
    { key: "suppliers", label: "Suppliers", options: SUPPLIER_COUNT },
    { key: "region", label: "Region", options: REGION },
    { key: "leadTime", label: "Lead time", options: LEAD_TIME },
    { key: "urgency", label: "Urgency", options: URGENCY },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const sketch = runAllocation(form);
      setResult(sketch);
      setRunId(null);
      const res = await fetch("/api/allocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return;
      setResult(data.result ?? sketch);
      setRunId(data.id ?? null);
    } catch {
      // The sketch above still stands when the save API is unavailable.
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <SubpageVisual variant="default" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="panel space-y-4">
        <h1 className="text-2xl font-semibold text-white">Semiconductor supply dashboard</h1>
        <p className="text-sm text-slate-300">Model allocation and shortage risk across chip categories, suppliers, and urgency tiers.</p>

        {fields.map(({ key, label, options }) => (
          <label key={key} className="block space-y-1 text-sm">
            <span className="text-slate-200">{label}</span>
            <select
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value as AllocationInput[typeof key] }))}
              className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-slate-100"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        ))}

        <button disabled={loading} className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 disabled:opacity-60">
          {loading ? "Generating..." : "Generate allocation plan"}
        </button>
      </form>

      <aside className="panel space-y-4">
        <h2 className="text-xl font-semibold text-white">Allocation output</h2>
        {!result ? (
          <p className="text-sm text-slate-300">Run the dashboard to view risk score, shortage forecast, alternatives, and action plan.</p>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{runId ? "Saved plan" : "Draft plan"}</p>
            <p className="text-3xl font-semibold text-cyan-300">Risk {result.allocationRisk}/100</p>
            <p className="text-sm text-slate-300">{result.executiveSummary}</p>
            <p className="rounded-lg border border-white/15 bg-slate-900/60 p-3 text-sm text-slate-200">{result.shortageForecast}</p>
            <div>
              <h3 className="font-medium text-white">Supplier alternatives</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {result.supplierAlternatives.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            {runId ? (
              <button onClick={() => router.push(`/dashboard/runs/${runId}`)} className="rounded-lg border border-cyan-300/40 px-4 py-2 text-cyan-200 hover:bg-cyan-400/10">
                Open run detail
              </button>
            ) : null}
          </>
        )}
      </aside>
    </div>
  </>
  )
}
