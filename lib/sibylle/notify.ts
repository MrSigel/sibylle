"use client";

type LeadField = { label: string; value: string };

/**
 * Fires an internal e-mail alert to the business inbox for a new public lead.
 * Best-effort and non-blocking: the lead is already saved in Supabase, so a
 * failed notification must never break the visitor's success flow.
 */
export async function notifyLead(
  kind: "booking" | "selbsttest",
  fields: LeadField[],
  replyTo?: string,
) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, fields, replyTo }),
      keepalive: true,
    });
  } catch {
    // ignore – the lead is persisted regardless
  }
}
