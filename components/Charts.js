"use client";

import { Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

export default function Charts({ transactions, loanBalance }) {
    const labels = transactions.map(t =>
        new Date(t.createdAt).toLocaleDateString("en-PH")
    );

    const loanTrend = transactions.map(t => t.balanceAfter || loanBalance);

    const repaymentTotal = transactions
        .filter(t => t.type === "repayment")
        .reduce((sum, t) => sum + t.amount, 0);

    const borrowTotal = transactions
        .filter(t => t.type === "borrow")
        .reduce((sum, t) => sum + t.amount, 0);

    // Loan Projection (next 6 months)
    const projectionLabels = ["1 mo", "2 mo", "3 mo", "4 mo", "5 mo", "6 mo"];
    const projectionData = projectionLabels.map((_, i) =>
        loanBalance * Math.pow(1.05, i + 1)
    );

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Loan Trend */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">📈 Loan Balance Trend</h2>
                <Line
                    data={{
                        labels,
                        datasets: [
                            {
                                label: "Loan Balance",
                                data: loanTrend,
                                borderColor: "#4F46E5",
                                backgroundColor: "rgba(79,70,229,0.2)",
                                tension: 0.4,
                                fill: true,
                            },
                        ],
                    }}
                />
            </div>

            {/* Transaction Breakdown */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">📊 Transaction Breakdown</h2>
                <Pie
                    data={{
                        labels: ["Repayments", "Borrowings"],
                        datasets: [
                            {
                                data: [repaymentTotal, borrowTotal],
                                backgroundColor: ["#22C55E", "#EF4444"],
                                hoverOffset: 8,
                            },
                        ],
                    }}
                />
            </div>

            {/* Loan Projection */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">📉 Loan Projection (6 months)</h2>
                <Line
                    data={{
                        labels: projectionLabels,
                        datasets: [
                            {
                                label: "Projected Balance",
                                data: projectionData,
                                borderColor: "#DC2626",
                                backgroundColor: "rgba(220,38,38,0.2)",
                                tension: 0.4,
                                fill: true,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
}
