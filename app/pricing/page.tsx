import { SubpageVisual } from "@/components/SubpageVisual";
export default function PricingPage() {
  const tiers = [
    { name: "Ops Team", price: "$2,000/mo", points: ["Up to 25 allocation scenarios", "Standard risk engine", "Email support"] },
    { name: "Enterprise", price: "$8,500/mo", points: ["Unlimited scenarios", "Supplier portfolio analytics", "Cross-region risk alerts"] },
    { name: "Strategic", price: "Custom", points: ["Dedicated semiconductor advisor", "ERP/procurement integrations", "Executive shortage war-room dashboards"] },
  ];

  return (
    <>
    <SubpageVisual variant="pricing" />
      <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Enterprise pricing</h1>
      <p className="text-slate-300">For semiconductor buyers and manufacturers coordinating supply in volatile markets.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className="panel">
            <h2 className="text-xl font-semibold text-white">{tier.name}</h2>
            <p className="mt-2 text-2xl text-cyan-300">{tier.price}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {tier.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </>
  )
}
