export const CHIP_TYPE = ["GPU", "AI accelerator", "MCU", "Automotive SoC", "Power management IC"] as const;
export const DEMAND = ["Pilot batch", "Quarterly ramp", "Annual program", "Strategic volume"] as const;
export const SUPPLIER_COUNT = ["1 supplier", "2-3 suppliers", "4-6 suppliers", "7+ suppliers"] as const;
export const REGION = ["North America", "Europe", "East Asia", "Southeast Asia", "Global"] as const;
export const LEAD_TIME = ["<8 weeks", "8-16 weeks", "16-26 weeks", ">26 weeks"] as const;
export const URGENCY = ["Low", "Medium", "High", "Critical"] as const;

export type AllocationInput = {
  chipType: (typeof CHIP_TYPE)[number];
  demandLevel: (typeof DEMAND)[number];
  suppliers: (typeof SUPPLIER_COUNT)[number];
  region: (typeof REGION)[number];
  leadTime: (typeof LEAD_TIME)[number];
  urgency: (typeof URGENCY)[number];
};

export type AllocationResult = {
  allocationRisk: number;
  shortageForecast: string;
  supplierAlternatives: string[];
  procurementActionPlan: string[];
  allocationTracker: string[];
  executiveSummary: string;
  modelVersion: string;
};
