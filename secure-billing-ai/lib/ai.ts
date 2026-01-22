export function assessRisk(amount: number): "low" | "high" {
  if (amount > 20000) return "high";
  return "low";
}

export function suggestPaymentTerms(risk: "low" | "high") {
  return risk === "high" ? "Net 7" : "Net 30";
}
