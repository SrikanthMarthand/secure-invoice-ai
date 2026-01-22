"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const router = useRouter();

  const login = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role,
        loggedIn: true,
      })
    );

    router.push("/");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Secure Login</h1>
        <p style={subtitle}>AI Billing System</p>

        <input
          style={input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          style={input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Admin</option>
          <option>Accountant</option>
          <option>Client</option>
        </select>

        <button style={btn} onClick={login}>
          Login
        </button>

        <p style={hint}>
          Demo authentication • No password required
        </p>
      </div>
    </div>
  );
}

/* STYLES */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#e0f2fe,#ecfeff)",
};

const card = {
  background: "#fff",
  padding: 32,
  borderRadius: 18,
  width: 360,
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

const title = {
  fontSize: 28,
  fontWeight: 800,
};

const subtitle = {
  color: "#64748b",
  marginBottom: 24,
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#2563eb",
  color: "#fff",
  borderRadius: 12,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const hint = {
  marginTop: 12,
  fontSize: 12,
  color: "#64748b",
};
