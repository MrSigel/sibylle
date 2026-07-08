import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/sibylle/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  kind?: "booking" | "selbsttest";
  fields?: { label?: unknown; value?: unknown }[];
  replyTo?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Payload | null;
  const kind = body?.kind === "booking" || body?.kind === "selbsttest" ? body.kind : null;

  const fields = (Array.isArray(body?.fields) ? body!.fields : [])
    .filter((field) => typeof field?.label === "string" && typeof field?.value === "string")
    .slice(0, 12)
    .map((field) => ({
      label: String(field.label).slice(0, 60),
      value: String(field.value).slice(0, 1000),
    }));

  if (!kind || fields.length === 0) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const subject =
    kind === "booking"
      ? "🗓️ Neue Terminanfrage – Website"
      : "📝 Neuer Selbsttest-Lead – Website";
  const replyTo = typeof body?.replyTo === "string" ? body.replyTo.slice(0, 200) : undefined;

  try {
    await sendLeadNotification({ kind, subject, fields, replyTo });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead notification failed", error);
    return NextResponse.json({ error: "Benachrichtigung fehlgeschlagen." }, { status: 500 });
  }
}
