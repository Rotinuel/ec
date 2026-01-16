"use client";

export default function NoPaymentModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-scaleIn">
                <h2 className="text-lg font-bold text-slate-800 text-center">
                    No payment yet
                </h2>

                <p className="text-sm text-slate-500 text-center mt-2">
                    Payment functionality will be available soon.
                </p>

                <button
                    onClick={onClose}
                    className="mt-6 w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
