import { NextResponse } from "next/server";
import { hasCrmSession } from "@/lib/sibylle/crmServerAuth";
import { listMailMessages, type CrmMailbox } from "@/lib/sibylle/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await hasCrmSession())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const url = new URL(request.url);
  const mailboxParam = url.searchParams.get("mailbox");
  const mailbox: CrmMailbox = mailboxParam === "sent" ? "sent" : "inbox";
  const limit = Number(url.searchParams.get("limit") || 25);

  try {
    const messages = await listMailMessages(mailbox, limit);
    return NextResponse.json({ messages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "E-Mails konnten nicht geladen werden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
