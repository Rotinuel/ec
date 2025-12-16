"use client";
import { useState } from "react";

export default function RepayLoan() {
  const [amount, setAmount] = useState("");

  const repay = async () => {
    await fetch("/api/loan/repay", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount) })
    });
    location.reload();
  };

  return (
    <div className="mt-6">
      <input
        className="border p-2 mr-2"
        placeholder="Enter amount"
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={repay} className="bg-black text-white px-4 py-2">
        Reduce Loan
      </button>
    </div>
  );
}