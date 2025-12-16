import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET(req) {
    try {
        await connectDB();

        const token = req.nextUrl.searchParams.get("token");
        if (!token) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Token expired or invalid" },
                { status: 400 }
            );
        }

        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        console.log("VERIFY ROUTE HIT");
        console.log("TOKEN:", token);


        return NextResponse.redirect('/login?verified=1', process.env.NEXT_PUBLIC_BASE_URL);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
