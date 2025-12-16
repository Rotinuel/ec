"use client";

export default function RepaymentCalendar({ date }) {
  return (
    <div className="border p-4 mt-6">
      <h3 className="font-semibold">Next Repayment Date</h3>
      <p className="text-lg">{new Date(date).toDateString()}</p>
    </div>
  );
}