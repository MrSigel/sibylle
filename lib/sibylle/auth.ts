export const crmSessionCookie = "crm_session";

const encoder = new TextEncoder();

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getSigningSecret() {
  return process.env.CRM_SESSION_SECRET || process.env.CRM_ADMIN_PASSWORD || "";
}

async function sign(value: string) {
  const secret = getSigningSecret();
  if (!secret) return "";

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return bytesToHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createCrmSessionToken(maxAgeSeconds = 60 * 60 * 8) {
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = `v1.${expiresAt}`;
  const signature = await sign(payload);

  if (!signature) return "";
  return `${payload}.${signature}`;
}

export async function verifyCrmSessionToken(token?: string) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = `${parts[0]}.${parts[1]}`;
  const expectedSignature = await sign(payload);
  return Boolean(expectedSignature) && expectedSignature === parts[2];
}
