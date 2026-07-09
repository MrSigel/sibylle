// Branded, email-client-safe HTML templates (table layout, inline styles).
// Colors mirror the site's Tailwind palette.

const COLORS = {
  cream: "#f8f3ea",
  warmBlack: "#1f211a",
  deepGold: "#846733",
  gold: "#a68a4c",
  softGold: "#c7a974",
  sand: "#e6d5b8",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Turns a plain-text message (as typed in the CRM) into safe HTML paragraphs.
export function textToParagraphs(text: string): string {
  return String(text || "")
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 18px;">${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export type BrandedEmailOptions = {
  preheader?: string;
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
  footerNote?: string;
};

export function brandedEmail(opts: BrandedEmailOptions): string {
  const { preheader, eyebrow, heading, bodyHtml, ctaLabel, ctaUrl, footerNote } = opts;

  const cta =
    ctaLabel && ctaUrl
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px auto 0;">
           <tr><td style="border-radius:999px;background:${COLORS.deepGold};">
             <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:15px 34px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:${COLORS.cream};text-decoration:none;letter-spacing:.02em;">${escapeHtml(ctaLabel)}</a>
           </td></tr>
         </table>`
      : "";

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.cream};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader || heading)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Brand header -->
          <tr>
            <td align="center" style="padding:8px 0 26px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:.04em;color:${COLORS.deepGold};">Sibylle&nbsp;Bergold</div>
              <div style="width:46px;height:2px;background:${COLORS.softGold};margin:12px auto 0;"></div>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border:1px solid ${COLORS.sand};border-radius:22px;padding:40px 36px;">
              ${eyebrow ? `<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:.22em;text-transform:uppercase;color:${COLORS.softGold};">${escapeHtml(eyebrow)}</p>` : ""}
              <h1 style="margin:0 0 22px;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.25;color:${COLORS.warmBlack};font-weight:normal;">${escapeHtml(heading)}</h1>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#4a4638;">
                ${bodyHtml}
              </div>
              ${cta ? `<div style="margin-top:30px;text-align:center;">${cta}</div>` : ""}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:26px 20px 8px;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.deepGold};">
                ${escapeHtml(footerNote || "Systemische Aufstellung & Coaching")}
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#a49a86;">
                Du erhältst diese E-Mail, weil du dich für den Newsletter von Sibylle Bergold angemeldet hast.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newsletterWelcomeEmail(): { subject: string; html: string; text: string } {
  const subject = "Willkommen – schön, dass du dabei bist";
  const html = brandedEmail({
    preheader: "Danke für deine Anmeldung zum Newsletter von Sibylle Bergold.",
    eyebrow: "Newsletter",
    heading: "Schön, dass du dabei bist.",
    bodyHtml: `
      <p style="margin:0 0 18px;">herzlich willkommen und danke für dein Vertrauen.</p>
      <p style="margin:0 0 18px;">Ab jetzt erhältst du von Zeit zu Zeit ruhige Impulse rund um systemische Aufstellung und Selbsterfahrung – und erfährst als Erste:r, sobald die <strong>Academy</strong> und neue Angebote verfügbar sind.</p>
      <p style="margin:0;">Bis dahin: Nimm dir einen Moment für dich.<br>Herzlich,<br><strong>Sibylle</strong></p>
    `,
    footerNote: "Sibylle Bergold · Systemische Aufstellung & Coaching",
  });
  const text = [
    "Schön, dass du dabei bist.",
    "",
    "Herzlich willkommen und danke für dein Vertrauen.",
    "",
    "Ab jetzt erhältst du von Zeit zu Zeit ruhige Impulse rund um systemische Aufstellung und Selbsterfahrung – und erfährst als Erste:r, sobald die Academy und neue Angebote verfügbar sind.",
    "",
    "Bis dahin: Nimm dir einen Moment für dich.",
    "Herzlich, Sibylle",
  ].join("\n");
  return { subject, html, text };
}

export function campaignEmail(input: { heading: string; message: string; ctaLabel?: string; ctaUrl?: string }): string {
  return brandedEmail({
    preheader: input.heading,
    eyebrow: "Newsletter",
    heading: input.heading,
    bodyHtml: textToParagraphs(input.message),
    ctaLabel: input.ctaLabel,
    ctaUrl: input.ctaUrl,
    footerNote: "Sibylle Bergold · Systemische Aufstellung & Coaching",
  });
}
