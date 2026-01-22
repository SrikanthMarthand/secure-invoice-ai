"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  async function loadStats() {
    const res = await fetch("/api/stats");
    setStats(await res.json());
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <p>Total Revenue</p>
          <h2 className="text-xl font-bold">₹{stats.totalRevenue}</h2>
        </div>
        <div className="card">
          <p>Pending Invoices</p>
          <h2 className="text-xl font-bold">{stats.pending}</h2>
        </div>
        <div className="card">
          <p>Overdue</p>
          <h2 className="text-xl font-bold">{stats.overdue}</h2>
        </div>
        <div className="card">
          <p>Fraud Alerts</p>
          <h2 className="text-xl font-bold">{stats.fraudAlerts}</h2>
        </div>
      </div>
    </div>
  );
}
