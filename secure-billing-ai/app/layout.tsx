"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ LOGIN PAGE → NO SIDEBAR / NO TOPBAR
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body style={{ margin: 0 }}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body style={body}>
        {/* SIDEBAR */}
        <aside style={sidebar}>
          <div style={logo}>
            📄 <span>InvoiceAI</span>
          </div>

          <nav style={nav}>
            <Link style={navItem} href="/">📊 Dashboard</Link>
            <Link style={navItem} href="/invoice">➕ Create Invoice</Link>
            <Link style={navItem} href="/invoice/management">📂 Invoice Management</Link>
            <Link style={navItem} href="/analytics">📈 Analytics</Link>
          </nav>

          <div style={sdg}>
            <b>SDG 8</b>
            <p>Decent Work & Economic Growth</p>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main style={main}>
          {/* TOP BAR */}
          <header style={topbar}>
            <span style={subtitle}>AI-powered billing system</span>

            <div style={profile}>
              <div style={avatar}>AD</div>
              <div>
                <b>Admin User</b>
                <div style={email}>admin@company.com</div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div style={content}>{children}</div>
        </main>
      </body>
    </html>
  );
}

/* ---------- styles ---------- */

const body = {
  display: "flex",
  margin: 0,
  fontFamily: "Inter, system-ui, -apple-system",
  background: "#f8fafc",
};

const sidebar = {
  width: 240,
  background: "#ffffff",
  padding: 24,
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column" as const,
  gap: 24,
};

const logo = {
  fontSize: 20,
  fontWeight: 800,
  color: "#2563eb",
};

const nav = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 12,
};

const navItem = {
  textDecoration: "none",
  color: "#0f172a",
  fontWeight: 500,
};

const sdg = {
  marginTop: "auto",
  background: "#ecfeff",
  padding: 12,
  borderRadius: 12,
  fontSize: 12,
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
};

const topbar = {
  height: 64,
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  padding: "0 32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const subtitle = {
  color: "#64748b",
  fontSize: 14,
};

const profile = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const avatar = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "#2563eb",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};

const email = {
  fontSize: 12,
  color: "#64748b",
};

const content = {
  padding: 32,
};
