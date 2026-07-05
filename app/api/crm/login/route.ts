import { NextResponse } from "next/server";
import { createCrmSessionToken, crmSessionCookie } from "@/lib/sibylle/auth";

export async function POST(request: Request) {
  const adminEmail = process.env.CRM_ADMIN_EMAIL?.trim();
  const adminPassword = process.env.CRM_ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "CRM-Zugangsdaten sind serverseitig nicht konfiguriert." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;

  const submittedEmail = body?.email?.trim() || "";
  const submittedPassword = body?.password?.trim() || "";

  if (submittedEmail !== adminEmail || submittedPassword !== adminPassword) {
    return NextResponse.json({ error: "Ungültige E-Mail oder Passwort." }, { status: 401 });
  }

  const token = await createCrmSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "CRM-Sitzung konnte nicht signiert werden." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(crmSessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
