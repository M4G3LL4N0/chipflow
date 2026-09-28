import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chipflow — semiconductor allocation and shortage planning",
  description:
    "Chipflow is a planner for semiconductor buyers: allocation risk, shortage forecasts, supplier alternatives, and a saved run tracker. Demo software, not a live fab feed.",
};

export default function Home() {
  return (
    <div className="chipflow-home -mx-6 -mt-10 min-h-screen bg-[#06141a] px-0 text-[#d7f6ff]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="font-mono text-sm tracking-[0.28em] uppercase">
          Chipflow
        </Link>
        <a
          href="mailto:?subject=Chipflow%20allocation%20walkthrough&body=I%20want%20a%20walkthrough%20of%20the%20semiconductor%20allocation%20planner."
          className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Request a walkthrough
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <section className="grid gap-10 pt-8 lg:grid-cols-2 lg:pt-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
              Semiconductor allocation
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Score allocation risk before the shortage becomes a line-down event.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-cyan-100/70">
              Chipflow is a planner for procurement and operations teams. You
              set chip type, demand, supplier count, region, lead time, and
              urgency. It returns a risk score, shortage forecast, alternatives,
              and an action plan — then stores the run so you can compare later.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/planner"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950"
              >
                Open the allocation planner
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-cyan-300/30 px-5 text-sm"
              >
                View pricing
              </Link>
            </div>
          </div>

          <aside
            aria-label="Planner inputs"
            className="rounded-2xl border border-cyan-300/20 bg-[#0a1f28] p-5 font-mono text-sm"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
              Planner inputs — demo
            </p>
            <dl className="mt-4 space-y-2">
              {[
                ["Chip type", "GPU · AI accelerator · MCU · Auto SoC · PMIC"],
                ["Demand", "Pilot · quarterly ramp · annual · strategic"],
                ["Suppliers", "1 · 2–3 · 4–6 · 7+"],
                ["Region", "NA · EU · East Asia · SE Asia · Global"],
                ["Lead time", "<8w · 8–16w · 16–26w · >26w"],
                ["Urgency", "Low · medium · high · critical"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-cyan-300/10 pb-2">
                  <dt className="text-cyan-300">{k}</dt>
                  <dd className="text-cyan-100/70">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section
          aria-label="Example planner output"
          className="mt-10 rounded-2xl border border-cyan-300/20 bg-[#0a1f28] p-5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/70">
            Example run output — labeled demo, not a live fab feed
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-xl border border-amber-300/25 bg-amber-300/5 p-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber-200">
                Risk band
              </h2>
              <p className="mt-2 text-lg font-semibold">High concentration</p>
              <p className="mt-1 text-sm text-cyan-100/65">
                Single-source + long lead + critical urgency.
              </p>
            </article>
            <article className="rounded-xl border border-cyan-300/20 p-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">
                Shortage forecast
              </h2>
              <p className="mt-2 text-lg font-semibold">Watch next window</p>
              <p className="mt-1 text-sm text-cyan-100/65">
                Scenario language only — no invented unit counts.
              </p>
            </article>
            <article className="rounded-xl border border-cyan-300/20 p-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">
                Alternatives
              </h2>
              <p className="mt-2 text-lg font-semibold">Add a second source</p>
              <p className="mt-1 text-sm text-cyan-100/65">
                Diversify region or package family before the line is down.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["Allocation dashboard", "Scenario scoring across supplier and lead-time profiles."],
            ["Supplier alternatives", "Diversification suggestions when concentration is the risk."],
            ["Run tracker", "Save and compare procurement runs for the next review."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-cyan-300/15 p-5">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-cyan-100/65">{body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-cyan-300/10 px-4 py-8 text-center font-mono text-xs text-cyan-100/40">
        Chipflow · allocation planner demo · not a live foundry or broker feed
      </footer>
    </div>
  );
}
