import { contactFormSchema } from "@/lib/schemas/form";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY!);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, message } = parsed.data;

    const html = `
      <table style="font-family:sans-serif;font-size:15px;color:#1a1a1a;border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:24px 0 8px"><strong>New contact form submission</strong></td></tr>
        <tr><td style="padding:8px 0"><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
        <tr><td style="padding:8px 0"><strong>Email:</strong> ${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px 0"><strong>Phone:</strong> ${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:16px 0 8px;border-top:1px solid #e5e7eb"><strong>Message:</strong></td></tr>
        <tr><td style="padding:0 0 24px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
      </table>
    `;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New contact form submission from ${firstName} ${lastName}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to send message" },
      { status: 500 }
    );
  }
}
