import Link from "next/link";
import { TrustStrip } from "@/components/TrustStrip";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";

export default function Home() {
  return (
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>
        <MarketingGraphicsStack />
    <div className="space-y-8">
      <section className="panel space-y-4">
        <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
          Semiconductor allocation and procurement intelligence
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Reduce shortage risk and secure chip allocation before disruptions hit.</h1>
        <p className="max-w-3xl text-slate-300">
          Chipflow helps procurement and operations teams model allocation risk, forecast shortages, identify supplier alternatives, and execute a faster action plan.
        </p>
        <div className="flex gap-3">
          <Link href="/planner" className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-300">Open supply dashboard</Link>
          <Link href="/pricing" className="rounded-lg border border-white/20 px-4 py-2 text-slate-200 hover:bg-white/10">View enterprise pricing</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Chip allocation dashboard", "Run scenario-based allocation risk scoring across supplier and lead-time profiles."],
          ["Supplier alternative engine", "Get diversification suggestions to reduce concentration and fulfillment risk."],
          ["Allocation tracker", "Save and compare procurement runs for planning and executive reviews."],
        ].map(([title, text]) => (
          <article key={title} className="panel">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
