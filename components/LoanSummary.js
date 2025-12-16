export default function LoanSummary({ user }) {
    const INTEREST_RATE = 0.05;

    const nextRepaymentDate = user.repaymentDate
        ? new Date(user.repaymentDate).toDateString()
        : "Not set";

    return (
        <div className="bg-indigo-600 text-white shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold">📊 Loan Summary</h2>
            <p>Loan Balance: ₱{user.loanBalance}</p>
            <p>Next Repayment Date: {nextRepaymentDate}</p>
            <p>Interest Rate: {(INTEREST_RATE * 100).toFixed(1)}%</p>
        </div>
    );
}
