import { NextResponse } from "next/server";
import { supabase } from "@/lib/sibylle/supabase";
import { sendNewsletterWelcome } from "@/lib/sibylle/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });
  }

  // Persist the lead first so nothing is lost, even if the mail step fails.
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email, source: "homepage" }]);

  const alreadySubscribed = error?.code === "23505";

  if (error && !alreadySubscribed) {
    console.error("Newsletter insert failed", error);
    return NextResponse.json(
      { error: "Anmeldung konnte nicht gespeichert werden. Bitte versuche es später erneut." },
      { status: 500 },
    );
  }

  // Send the confirmation email only for genuinely new subscribers (best-effort).
  if (!alreadySubscribed) {
    try {
      await sendNewsletterWelcome(email);
    } catch (mailError) {
      console.error("Newsletter welcome mail failed", mailError);
    }
  }

  return NextResponse.json({ ok: true, alreadySubscribed });
}
