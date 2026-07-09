import { NextResponse } from "next/server";
import { hasCrmSession } from "@/lib/sibylle/crmServerAuth";
import { supabase } from "@/lib/sibylle/supabase";
import { sendNewsletterCampaign } from "@/lib/sibylle/mail";
import { campaignEmail } from "@/lib/sibylle/emailTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await hasCrmSession())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    subject?: string;
    message?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  } | null;

  const subject = body?.subject?.trim() || "";
  const message = body?.message?.trim() || "";
  const ctaLabel = body?.ctaLabel?.trim() || undefined;
  const ctaUrl = body?.ctaUrl?.trim() || undefined;

  if (!subject || !message) {
    return NextResponse.json({ error: "Betreff und Nachricht sind erforderlich." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email")
    .eq("status", "active");

  if (error) {
    console.error("Newsletter recipients query failed", error);
    return NextResponse.json({ error: "Empfänger konnten nicht geladen werden." }, { status: 500 });
  }

  const recipients = (data || []).map((row) => row.email).filter(Boolean);
  if (recipients.length === 0) {
    return NextResponse.json({ error: "Es sind keine Newsletter-Empfänger vorhanden." }, { status: 400 });
  }

  try {
    const html = campaignEmail({ heading: subject, message, ctaLabel, ctaUrl });
    const result = await sendNewsletterCampaign({ recipients, subject, html, text: message });
    return NextResponse.json({ ok: true, count: result.count });
  } catch (sendError) {
    const messageText = sendError instanceof Error ? sendError.message : "Versand fehlgeschlagen.";
    return NextResponse.json({ error: messageText }, { status: 500 });
  }
}
