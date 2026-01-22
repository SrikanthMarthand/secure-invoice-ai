export default function CheckInvoice() {
  return (
    <div className="max-w-xl space-y-6">

      <h1 className="text-2xl font-bold">
        Verify Invoice Security
      </h1>

      <div className="card space-y-4">
        <input className="input" placeholder="Invoice ID (e.g. INV-101)" />

        <button className="btn-primary">
          Verify Invoice
        </button>
      </div>

      {/* RESULT */}
      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-semibold text-blue-700">
          Verification Result
        </h3>
        <p className="text-sm mt-2">
          ✔ Invoice is valid and untampered  
        </p>
        <p className="text-sm">
          ✔ Secure hash verified  
        </p>
        <p className="text-sm">
          ✔ AI Risk Score: Low
        </p>
      </div>

    </div>
  );
}
