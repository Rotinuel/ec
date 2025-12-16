import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    const { amount } = await req.json();
    const token = cookies().get("token").value;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    const newBalance = user.loanBalance - amount;
    await Transaction.create({ userId: id, amount, type: "repayment", balanceAfter: newBalance });

    await connectDB();

    await User.findByIdAndUpdate(id, { $inc: { loanBalance: -amount } });
    await Transaction.create({ userId: id, amount, type: "repayment" });

    return Response.json({ success: true });
}