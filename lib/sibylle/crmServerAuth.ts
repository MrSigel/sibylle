import { cookies } from "next/headers";
import { crmSessionCookie, verifyCrmSessionToken } from "@/lib/sibylle/auth";

export async function hasCrmSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(crmSessionCookie)?.value;
  return verifyCrmSessionToken(session);
}
