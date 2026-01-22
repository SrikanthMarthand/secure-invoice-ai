"use client";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [data, setData] = useState({
    revenue: 0,
    total: 0,
    high: 0,
    confidence: 0,
  });

  useEffect(() => {
    const load = () => {
      const invoices = JSON.parse(
        localStorage.getItem("invoices") || "[]"
      );

      const revenue = invoices.reduce(
        (s: number, i: any) => s + i.amount,
        0
      );
      const high = invoices.filter(
        (i: any) => i.risk === "High"
      ).length;

      const confidence =
        invoices.length === 0
          ? 0
          : Math.max(60, 100 - high * 15);

      setData({
        revenue,
        total: invoices.length,
        high,
        confidence,
      });
    };

    load();
    const id = setInterval(load, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Analytics & Insights</h1>
          <p style={subtitle}>
            AI-driven business intelligence
          </p>
        </div>
        <div style={badge}>AI ACTIVE</div>
      </div>

      {/* KPI GRID */}
      <div style={grid}>
        <Stat label="Total Revenue" value={`₹ ${data.revenue}`} />
        <Stat label="Invoices" value={data.total} />
        <Stat label="High Risk" value={data.high} />
      </div>

      {/* AI FORECAST */}
      <div style={aiCard}>
        <h3>📈 AI Cash-Flow Forecast</h3>

        <p style={{ marginBottom: 12 }}>
          Predicted Payment Confidence
        </p>

        <div style={confidenceRow}>
          <span>Confidence Score</span>
          <b>{data.confidence}%</b>
        </div>

        <div style={progressBg}>
          <div
            style={{
              ...progressBar,
              width: `${data.confidence}%`,
              background:
                data.confidence > 80
                  ? "#16a34a"
                  : "#f59e0b",
            }}
          />
        </div>

        <div style={forecastBox}>
          <b>AI Forecast:</b>{" "}
          {data.confidence > 80
            ? "Healthy cash flow expected in next 30 days."
            : "Potential delays detected. Monitor high-risk invoices."}
        </div>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div style={recommendationBox}>
        <h3>🤖 AI Recommendations</h3>
        <ul>
          {data.high > 0 ? (
            <>
              <li>Send reminders for high-risk invoices</li>
              <li>Use shorter payment terms</li>
              <li>Prioritize follow-ups</li>
            </>
          ) : (
            <>
              <li>Maintain current billing cycle</li>
              <li>No immediate risk detected</li>
              <li>Focus on growth opportunities</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function Stat({ label, value }: any) {
  return (
    <div style={statCard}>
      <p style={{ color: "#64748b" }}>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = { padding: 32 };

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
};

const title = {
  fontSize: 28,
  fontWeight: 800,
};

const subtitle = {
  color: "#64748b",
};

const badge = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 24,
  marginBottom: 32,
};

const statCard = {
  background: "#ffffff",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const aiCard = {
  background:
    "linear-gradient(135deg,#e0f2fe,#ecfeff)",
  padding: 24,
  borderRadius: 18,
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.08)",
};

const confidenceRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
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

const forecastBox = {
  marginTop: 16,
  background: "#ffffff",
  padding: 12,
  borderRadius: 12,
  fontSize: 14,
};

const recommendationBox = {
  marginTop: 32,
  background: "#ffffff",
  padding: 24,
  borderRadius: 18,
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.08)",
};
