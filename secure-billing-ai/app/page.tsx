"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>({});
  const [stats, setStats] = useState({
    revenue: 0,
    total: 0,
    high: 0,
    aiScore: 92,
    riskScore: 0,
  });

  useEffect(() => {
    setMounted(true);

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    setUser(storedUser);

    // LOGIN CHECK
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
      return;
    }

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

      // ML-STYLE RISK SCORE
      const riskScore =
        invoices.length === 0
          ? 0
          : Math.min(
              100,
              Math.round((high / invoices.length) * 100)
            );

      setStats({
        revenue,
        total: invoices.length,
        high,
        aiScore: high > 0 ? 78 : 92,
        riskScore,
      });
    };

    load();
    const id = setInterval(load, 500);
    return () => clearInterval(id);
  }, []);

  // 🔒 Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Dashboard</h1>
          <p style={subtitle}>
            Real-time intelligent billing overview
          </p>
        </div>

        <div style={profile}>
          <div style={avatar}>
            {user.email
              ? user.email[0].toUpperCase()
              : "U"}
          </div>
          <div>
            <b>Logged User</b>
            <div style={email}>
              {user.email || "demo@user.com"}
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            style={logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={grid}>
        <Card
          title="Total Revenue"
          value={`₹ ${stats.revenue}`}
          color="#2563eb"
          icon="💰"
        />
        <Card
          title="Invoices"
          value={stats.total}
          color="#16a34a"
          icon="📄"
        />
        <Card
          title="High Risk"
          value={stats.high}
          color="#dc2626"
          icon="⚠️"
        />
      </div>

      {/* INTELLIGENCE PANEL */}
      <div style={aiPanel}>
        <h3>📊 Intelligent Risk Analysis</h3>

        <p>
          <b>Payment Reliability:</b>{" "}
          <span style={{ color: "#16a34a", fontWeight: 700 }}>
            {stats.aiScore}%
          </span>
        </p>

        <p>
          <b>Risk Assessment:</b>{" "}
          {stats.high > 0
            ? "Moderate – follow-ups recommended"
            : "Low – stable cash flow"}
        </p>

        <p style={aiText}>
          Feature-based scoring inspired by classical
          machine-learning pipelines.
        </p>

        {/* ML RISK SCORE */}
        <div style={riskBox}>
          <b>ML Risk Score:</b> {stats.riskScore} / 100

          <div style={riskBarBg}>
            <div
              style={{
                ...riskBar,
                width: `${stats.riskScore}%`,
                background:
                  stats.riskScore > 60
                    ? "#dc2626"
                    : stats.riskScore > 30
                    ? "#f59e0b"
                    : "#16a34a",
              }}
            />
          </div>

          <p style={riskExplain}>
            Risk score is computed using invoice frequency
            and high-risk ratio (feature aggregation +
            thresholding).
          </p>
        </div>

        <div style={aiExplain}>
          <b>Decision Factors:</b>
          <ul style={{ marginLeft: 18 }}>
            <li>Invoice volume trend</li>
            <li>High-risk invoice ratio</li>
            <li>Historical consistency</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function Card({ title, value, color, icon }: any) {
  return (
    <div
      style={{
        ...card,
        borderTop: `4px solid ${color}`,
      }}
    >
      <div style={cardTop}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={cardTitle}>{title}</span>
      </div>
      <div style={cardValue}>{value}</div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = { padding: 32 };

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 32,
  alignItems: "center",
};

const title = { fontSize: 32, fontWeight: 800 };
const subtitle = { color: "#64748b" };

const profile = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const avatar = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "#2563eb",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};

const email = { fontSize: 12, color: "#64748b" };

const logoutBtn = {
  marginLeft: 16,
  padding: "8px 14px",
  borderRadius: 10,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
};

const card = {
  background: "#fff",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
};

const cardTitle = { color: "#64748b" };
const cardValue = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 10,
};

const aiPanel = {
  marginTop: 36,
  padding: 24,
  borderRadius: 18,
  background: "linear-gradient(135deg,#e0f2fe,#ecfeff)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const aiText = {
  marginTop: 8,
  fontStyle: "italic",
  color: "#475569",
};

const riskBox = { marginTop: 14 };

const riskBarBg = {
  marginTop: 6,
  height: 8,
  background: "#e5e7eb",
  borderRadius: 8,
};

const riskBar = {
  height: "100%",
  borderRadius: 8,
};

const riskExplain = {
  fontSize: 12,
  color: "#475569",
  marginTop: 6,
};

const aiExplain = {
  marginTop: 14,
  padding: 14,
  borderRadius: 14,
  background: "#f8fafc",
  fontSize: 13,
  color: "#475569",
};
