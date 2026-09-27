import type { AllocationInput, AllocationResult } from "./types";

const MODEL_VERSION = "chipflow-sim-1.0.0";

export function runAllocation(input: AllocationInput): AllocationResult {
  const demandW = input.demandLevel === "Pilot batch" ? 6 : input.demandLevel === "Quarterly ramp" ? 12 : input.demandLevel === "Annual program" ? 17 : 23;
  const supplierW = input.suppliers === "1 supplier" ? 24 : input.suppliers === "2-3 suppliers" ? 16 : input.suppliers === "4-6 suppliers" ? 9 : 4;
  const leadW = input.leadTime === "<8 weeks" ? 4 : input.leadTime === "8-16 weeks" ? 11 : input.leadTime === "16-26 weeks" ? 18 : 26;
  const urgencyW = input.urgency === "Low" ? 4 : input.urgency === "Medium" ? 10 : input.urgency === "High" ? 17 : 25;

  const allocationRisk = Math.max(20, Math.min(98, Math.round(24 + demandW + supplierW + leadW * 0.8 + urgencyW * 0.9)));

  const shortageForecast = allocationRisk >= 80
    ? "High shortage probability in the next procurement cycle without immediate diversification."
    : allocationRisk >= 60
      ? "Moderate shortage risk; constrained fulfillment likely for peak windows."
      : "Supply posture is stable with manageable downside risk under current demand assumptions.";

  const supplierAlternatives = [
    `Qualify at least one backup fab partner in ${input.region}.`,
    "Pre-negotiate allocation flexibility with two regional distributors.",
    "Introduce second-source compatible SKU options for critical workloads.",
    "Reserve a contingency lane with brokered inventory limits.",
  ];

  const procurementActionPlan = [
    "Lock 12-week rolling forecast and share monthly commits with suppliers.",
    "Set urgency-based approval thresholds for expedited allocation swaps.",
    "Trigger risk alerts when lead-time bands degrade by one tier.",
    "Run biweekly shortage simulation across top 3 revenue-critical SKUs.",
  ];

  const allocationTracker = [
    "Committed units vs demand",
    "Supplier concentration ratio",
    "Lead-time trend by region",
    "Expedite cost per allocated unit",
  ];

  const executiveSummary = `Chipflow estimates allocation risk at ${allocationRisk}/100 for ${input.chipType} with ${input.suppliers} in ${input.region} under ${input.demandLevel} demand and ${input.leadTime} lead time.`;

  return {
    allocationRisk,
    shortageForecast,
    supplierAlternatives,
    procurementActionPlan,
    allocationTracker,
    executiveSummary,
    modelVersion: MODEL_VERSION,
  };
}
