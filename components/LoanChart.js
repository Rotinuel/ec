"use client";
import { Line } from "react-chartjs-2";

export default function LoanChart({ history }) {
  const data = {
    labels: history.map(t => new Date(t.createdAt).toLocaleDateString()),
    datasets: [{
      label: "Loan Balance",
      data: history.map(t => t.balanceAfter),
      tension: 0.4
    }]
  };

  return <Line data={data} />;
}