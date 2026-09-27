"use client";

import { useEffect, useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

type RunResponse = {
  run: {
    id: string;
    createdAt: string;
    inputs: Record<string, string>;
    result: {
      allocationRisk: number;
      shortageForecast: string;
      supplierAlternatives: string[];
      procurementActionPlan: string[];
      allocationTracker: string[];
      executiveSummary: string;
    };
  };
};

export default function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<RunResponse["run"] | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const res = await fetch(`/api/allocation/${id}`);
      const data = (await res.json()) as RunResponse;
      setRun(data.run);
    }
    void load();
  }, [params]);

  if (!run) return <p className="text-slate-300">Loading run...</p>;

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-5">
      <section className="panel space-y-2">
        <p className="text-sm text-slate-400">{new Date(run.createdAt).toLocaleString()}</p>
        <h1 className="text-2xl font-semibold text-white">Allocation risk score: {run.result.allocationRisk}/100</h1>
        <p className="text-slate-300">{run.result.executiveSummary}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel">
          <h2 className="font-semibold text-white">Supplier alternatives</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.supplierAlternatives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article className="panel">
          <h2 className="font-semibold text-white">Procurement action plan</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.procurementActionPlan.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>

      <article className="panel">
        <h2 className="font-semibold text-white">Shortage forecast</h2>
        <p className="mt-2 text-slate-300">{run.result.shortageForecast}</p>
      </article>

      <article className="panel">
        <h2 className="font-semibold text-white">Allocation tracker metrics</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {run.result.allocationTracker.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>
    </div>
  </>
  )
}
