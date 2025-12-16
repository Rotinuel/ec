import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import { redirect } from "next/navigation";

import LoanSummary from "@/components/LoanSummary";
import PaymentBreakdown from "@/components/PaymentBreakdown";
import Transactions from "@/components/Transactions";
import Charts from "@/components/Charts";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    const { id } = decoded;

    await connectDB();
    const user = await User.findById(id);
    const transactions = await Transaction.find({ userId: id }).sort({ createdAt: -1 });

    return (
        <div className="p-10 space-y-10 bg-gray-50 min-h-screen">
            <LoanSummary user={user} />
            <PaymentBreakdown user={user} />
            <Transactions transactions={transactions} />
            <Charts transactions={transactions} loanBalance={user.loanBalance} />
        </div>
    );
}
