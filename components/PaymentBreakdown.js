import RepayLoan from "@/components/RepayLoan";

export default function PaymentBreakdown({ user }) {
    const INTEREST_RATE = 0.05;
    const interest = user.loanBalance * INTEREST_RATE;
    const totalDue = user.loanBalance + interest;

    return (
        <div className="bg-purple-600 text-white shadow-lg rounded-xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold">💰 Payment Breakdown</h2>
            <p>Interest: ₱{interest.toFixed(2)}</p>
            <p>Total Due: ₱{totalDue.toFixed(2)}</p>
            <RepayLoan userId={user._id} totalDue={totalDue} />
        </div>
    );
}
