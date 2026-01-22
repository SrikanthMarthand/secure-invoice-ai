import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const totalAmount = store.invoices.reduce((s, i) => s + i.amount, 0);
  const overdue = store.invoices.filter(i => i.status === "overdue").length;
  const highRisk = store.invoices.filter(i => i.risk === "high").length;

  return NextResponse.json({
    totalInvoices: store.invoices.length,
    totalAmount,
    overdue,
    highRisk,
  });
}
