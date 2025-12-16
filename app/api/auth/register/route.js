import { connectDB } from "@/lib/config/db";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 5,
    key: `register_${ip}`,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }
  try {
    await connectDB();
    const body = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      ...body,
      password: hashedPassword,
      loanBalance: Number(body.loanAmount),
      verificationToken: token,
      verificationTokenExpires: Date.now() + 1000 * 60 * 15  // 15 mins
    });

    // Send verification email (placeholder)
    await sendVerificationEmail(user.email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}