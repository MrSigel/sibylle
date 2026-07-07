import { NextResponse } from "next/server";
import { hasCrmSession } from "@/lib/sibylle/crmServerAuth";
import { sendCrmMail } from "@/lib/sibylle/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await hasCrmSession())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    text?: string;
  } | null;

  const to = body?.to?.trim() || "";
  const subject = body?.subject?.trim() || "";
  const text = body?.text?.trim() || "";

  if (!to || !subject || !text) {
    return NextResponse.json(
      { error: "Empfänger, Betreff und Nachricht sind erforderlich." },
      { status: 400 },
    );
  }

  try {
    const result = await sendCrmMail({
      to,
      cc: body?.cc?.trim(),
      bcc: body?.bcc?.trim(),
      subject,
      text,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "E-Mail konnte nicht versendet werden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
