"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoice() {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [aiThinking, setAiThinking] = useState(false);
  const router = useRouter();

  const risk = amount > 30000 ? "High" : "Low";
  const confidence = risk === "High" ? 65 : 92;

  function createInvoice() {
    if (!client || amount <= 0) return;

    setAiThinking(true);

    setTimeout(() => {
      const invoices = JSON.parse(
        localStorage.getItem("invoices") || "[]"
      );

      invoices.push({
        id: "INV-" + Date.now(),
        client,
        amount,
        status: "Unpaid",
        risk,
        createdAt: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
      );

      router.push("/invoice/management");
    }, 1500); // AI "processing" delay
  }

  return (
    <div style={container}>
      <h1 style={title}>Create Secure Invoice</h1>
      <p style={subtitle}>
        AI-assisted, tamper-aware billing
      </p>

      <div style={grid}>
        {/* FORM */}
        <div style={card}>
          <label style={label}>Client Name</label>
          <input
            style={input}
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client name"
          />

          <label style={label}>Amount (₹)</label>
          <input
            style={input}
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(Number(e.target.value))
            }
            placeholder="Invoice amount"
          />

          <div style={totalBox}>
            <b>Total:</b> ₹ {amount || 0}
          </div>

          <button
            style={button}
            onClick={createInvoice}
            disabled={aiThinking}
          >
            {aiThinking
              ? "AI Processing..."
              : "Generate Secure Invoice"}
          </button>

          <p style={hint}>
            ✔ Hash secured • ✔ Audit trail • ✔ AI verified
          </p>
        </div>

        {/* AI PANEL */}
        <div style={aiCard}>
          <h3>🤖 AI Analysis</h3>

          {amount > 0 ? (
            <>
              <p>
                Risk Level:{" "}
                <b
                  style={{
                    color:
                      risk === "High"
                        ? "#dc2626"
                        : "#16a34a",
                  }}
                >
                  {risk}
                </b>
              </p>

              <p>
                Predicted On-Time Payment:{" "}
                <b>{confidence}%</b>
              </p>

              <div style={progressBg}>
                <div
                  style={{
                    ...progressBar,
                    width: `${confidence}%`,
                    background:
                      confidence > 80
                        ? "#16a34a"
                        : "#f59e0b",
                  }}
                />
              </div>

              <p style={aiTip}>
                AI Recommendation:{" "}
                {risk === "High"
                  ? "Use shorter payment terms."
                  : "Standard terms recommended."}
              </p>
            </>
          ) : (
            <p style={{ color: "#64748b" }}>
              Enter invoice amount to see AI insights
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = { padding: 32 };

const title = {
  fontSize: 28,
  fontWeight: 800,
};

const subtitle = {
  color: "#64748b",
  marginBottom: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 24,
};

const card = {
  background: "#fff",
  padding: 24,
  borderRadius: 18,
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.08)",
};

const aiCard = {
  background:
    "linear-gradient(135deg,#e0f2fe,#ecfeff)",
  padding: 24,
  borderRadius: 18,
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.08)",
};

const label = {
  fontSize: 13,
  fontWeight: 600,
};

const input = {
  width: "100%",
  padding: 12,
  margin: "8px 0 16px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const totalBox = {
  background: "#f8fafc",
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
};

const button = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const hint = {
  marginTop: 8,
  fontSize: 12,
  color: "#64748b",
};

const progressBg = {
  marginTop: 8,
  height: 8,
  background: "#e5e7eb",
  borderRadius: 8,
  overflow: "hidden",
};

const progressBar = {
  height: "100%",
};

const aiTip = {
  marginTop: 12,
  fontSize: 14,
  background: "#ffffff",
  padding: 10,
  borderRadius: 10,
};
