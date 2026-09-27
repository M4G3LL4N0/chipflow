import { z } from "zod";
import { CHIP_TYPE, DEMAND, LEAD_TIME, REGION, SUPPLIER_COUNT, URGENCY } from "./types";

export const allocationSchema = z.object({
  chipType: z.enum(CHIP_TYPE),
  demandLevel: z.enum(DEMAND),
  suppliers: z.enum(SUPPLIER_COUNT),
  region: z.enum(REGION),
  leadTime: z.enum(LEAD_TIME),
  urgency: z.enum(URGENCY),
});
