"use client";

import { useState } from "react";

export default function Transactions({ transactions }) {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");

    const perPage = 5;

    const filtered = transactions.filter(t =>
        filter === "all" ? true : t.type === filter
    );

    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const totalPages = Math.ceil(filtered.length / perPage);

    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">💳 Transactions</h2>

            {/* Filter */}
            <select
                className="border p-2 rounded mb-4"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">All</option>
                <option value="borrow">Borrowings</option>
                <option value="repayment">Repayments</option>
            </select>

            {/* List */}
            {paginated.length === 0 ? (
                <p className="text-gray-500 italic">No transactions found.</p>
            ) : (
                <div className="divide-y divide-gray-200">
                    {paginated.map((t) => (
                        <div key={t._id} className="flex justify-between py-3 text-gray-700">
                            <span className="capitalize font-medium">{t.type}</span>
                            <span className={t.type === "repayment" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                ₱ {t.amount}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span>Page {page} of {totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
