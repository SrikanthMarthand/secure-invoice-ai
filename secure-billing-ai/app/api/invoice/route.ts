import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { assessRisk } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json();
  const amount = Number(body.amount);

  const risk = assessRisk(amount);

  const invoice = {
    id: `INV-${Date.now()}`,
    client: body.client || "New Client",
    amount,
    status: "unpaid",
    risk,
    createdAt: new Date().toISOString(),
  };

  store.invoices.unshift(invoice);

  return NextResponse.json(invoice);
}
