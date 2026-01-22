"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoice() {
  const router = useRouter();

  const [form, setForm] = useState({
    client: "",
    email: "",
    description: "",
    amount: 0,
    tax: 18,
    discount: 0,
    invoiceDate: "",
    dueDate: "",
    paymentMethod: "UPI",
    notes: "",
  });

  const generateInvoice = () => {
    if (!form.client || !form.amount) {
      alert("Client name and amount required");
      return;
    }

    // ===== ML-INSPIRED RISK SCORING =====
    const amountScore =
      form.amount > 20000 ? 40 :
      form.amount > 10000 ? 25 : 10;

    const frequencyScore = 10;
    const riskScore = amountScore + frequencyScore;

    let risk = "Low";
    if (riskScore >= 50) risk = "High";
    else if (riskScore >= 30) risk = "Medium";

    const confidence = Math.max(60, 100 - riskScore);

    // ===== TOTAL CALCULATION =====
    const subtotal = Number(form.amount);
    const taxAmount = (subtotal * Number(form.tax)) / 100;
    const total = subtotal + taxAmount - Number(form.discount);

    // ===== INVOICE OBJECT =====
    const invoice = {
      id: "INV-" + Date.now(),
      client: form.client,
      email: form.email,
      description: form.description,
      subtotal,
      tax: form.tax,
      discount: form.discount,
      amount: total,
      invoiceDate: form.invoiceDate,
      dueDate: form.dueDate,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
      risk,
      riskScore,
      confidence,
      status: "Unpaid",
      createdAt: new Date().toISOString(),
    };

    const invoices = JSON.parse(
      localStorage.getItem("invoices") || "[]"
    );
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    alert("Invoice created successfully ✔");
    router.push("/invoice/management");
  };

  return (
    <div style={container}>
      <h1 style={title}>Create Invoice</h1>
      <p style={subtitle}>
        Real-world billing with intelligent risk scoring
      </p>

      <div style={formGrid}>
        <input placeholder="Client Name"
          onChange={(e) => setForm({ ...form, client: e.target.value })} />

        <input placeholder="Client Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input placeholder="Service / Product Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <input type="number" placeholder="Amount (₹)"
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />

        <input type="number" placeholder="Tax (%)"
          value={form.tax}
          onChange={(e) => setForm({ ...form, tax: Number(e.target.value) })} />

        <input type="number" placeholder="Discount (₹)"
          onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} />

        <input type="date"
          onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })} />

        <input type="date"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

        <select
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        >
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Credit Card</option>
        </select>

        <textarea placeholder="Notes / Payment Terms"
          onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>

      <button style={btn} onClick={generateInvoice}>
        Generate Secure Invoice
      </button>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = { maxWidth: 900, margin: "auto" };
const title = { fontSize: 32, fontWeight: 800 };
const subtitle = { color: "#64748b", marginBottom: 24 };

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 14,
};

const btn = {
  marginTop: 24,
  padding: 14,
  width: "100%",
  background: "#2563eb",
  color: "#fff",
  borderRadius: 12,
  border: "none",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};
