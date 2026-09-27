import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { runAllocation } from "@/lib/engine";
import { prisma } from "@/lib/prisma";
import { allocationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = allocationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const result = runAllocation(parsed.data);
    const row = await prisma.allocationRun.create({
      data: {
        inputs: parsed.data as unknown as Prisma.InputJsonValue,
        result: result as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ id: row.id, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create allocation run" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await prisma.allocationRun.findMany({ orderBy: { createdAt: "desc" }, take: 40 });
  return NextResponse.json({ runs: rows });
}
