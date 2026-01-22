"use client";
import { useEffect, useState } from "react";

export default function InvoiceManagement() {
  const [invoices, setInvoices] =
    useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      setInvoices(
        JSON.parse(
          localStorage.getItem("invoices") ||
            "[]"
        )
      );
    };
    load();
    const id = setInterval(load, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>
        Invoice Management
      </h1>
      <p style={subtitle}>
        Real-time invoice tracking
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.client}</td>
                <td>₹ {i.amount}</td>
                <td>{i.status}</td>
                <td
                  style={{
                    fontWeight: 700,
                    color:
                      i.risk === "High"
                        ? "#dc2626"
                        : "#16a34a",
                  }}
                >
                  {i.risk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <div style={empty}>
            No invoices created yet
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const container = { padding: 32 };
const title = {
  fontSize: 28,
  fontWeight: 800,
};
const subtitle = {
  color: "#64748b",
  marginBottom: 20,
};
const tableWrap = {
  background: "#fff",
  borderRadius: 18,
  padding: 20,
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.08)",
};
const table = {
  width: "100%",
  borderCollapse: "collapse",
};
const empty = {
  padding: 20,
  textAlign: "center" as const,
  color: "#64748b",
};
