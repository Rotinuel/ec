import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email, token) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f3f4f6; padding:24px;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(15,23,42,0.1);">
      <div style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:20px 24px;color:#ffffff;">
        <h1 style="margin:0;font-size:20px;font-weight:600;">Evercrest</h1>
        <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">Verify your email address</p>
      </div>
      <div style="padding:24px 24px 8px;color:#111827;font-size:14px;line-height:1.6;">
        <p>Hi,</p>
        <p>Thanks for creating an account with Evercrest. Please confirm that this is your email address by clicking the button below:</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${verifyUrl}"
             style="display:inline-block;padding:10px 22px;background:#4f46e5;color:#ffffff;border-radius:999px;font-size:14px;font-weight:500;text-decoration:none;">
            Verify email
          </a>
        </div>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p style="word-break:break-all;color:#4f46e5;">${verifyUrl}</p>
        <p style="font-size:12px;color:#6b7280;margin-top:16px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>
      <div style="padding:12px 24px 16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center;">
        © ${new Date().getFullYear()} Evercrest. All rights reserved.
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Evercrest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Evercrest account",
    html,
  });
}
