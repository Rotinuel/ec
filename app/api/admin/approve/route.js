import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export async function POST(req) {
    const body = await req.formData();
    await connectDB();
    await User.findByIdAndUpdate(body.get("id"), { approved: true });
    return Response.redirect("/admin");
}