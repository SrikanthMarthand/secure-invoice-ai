export default function Security() {
  return (
    <div className="max-w-3xl space-y-6">

      <h1 className="text-3xl font-bold">
        Security & Access Control
      </h1>
      <p className="text-gray-500">
        Enterprise-grade protection for billing data
      </p>

      <div className="card">
        <h2 className="font-semibold">Security Status</h2>
        <ul className="text-sm mt-2 space-y-1">
          <li>✔ Data Encryption Enabled</li>
          <li>✔ Secure Invoice Hashing</li>
          <li>✔ Role-Based Access Control</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="font-semibold">User Roles</h2>
        <p className="text-sm mt-2">
          Admin • Accountant • Client
        </p>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h2 className="font-semibold text-blue-700">
          Activity Log
        </h2>
        <p className="text-sm mt-2">
          Invoice INV-101 created • Invoice INV-102 verified • Payment received
        </p>
      </div>

    </div>
  );
}
