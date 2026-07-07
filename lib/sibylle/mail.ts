import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import nodemailer from "nodemailer";

export type CrmMailbox = "inbox" | "sent";

export type CrmMailMessage = {
  uid: number;
  mailbox: CrmMailbox;
  subject: string;
  from: string;
  to: string;
  date: string | null;
  seen: boolean;
  text: string;
  html: string;
  messageId: string | null;
};

export type SendMailInput = {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text: string;
};

function boolFromEnv(value: string | undefined, fallback: boolean) {
  if (!value) return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function numberFromEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Die Umgebungsvariable ${name} fehlt.`);
  }
  return value;
}

export function getMailConfig() {
  return {
    fromName: process.env.MAIL_FROM_NAME?.trim() || "Sibylle Bergold",
    fromAddress: process.env.MAIL_FROM_ADDRESS?.trim() || process.env.SMTP_USER?.trim() || "",
  };
}

function getSmtpConfig() {
  return {
    host: requireEnv("SMTP_HOST"),
    port: numberFromEnv(process.env.SMTP_PORT, 587),
    secure: boolFromEnv(process.env.SMTP_SECURE, false),
    user: requireEnv("SMTP_USER"),
    password: requireEnv("SMTP_PASSWORD"),
  };
}

function getImapConfig() {
  return {
    host: requireEnv("IMAP_HOST"),
    port: numberFromEnv(process.env.IMAP_PORT, 993),
    secure: boolFromEnv(process.env.IMAP_SECURE, true),
    user: requireEnv("IMAP_USER"),
    password: requireEnv("IMAP_PASSWORD"),
    inboxMailbox: process.env.IMAP_INBOX_MAILBOX?.trim() || "INBOX",
    sentMailbox: process.env.IMAP_SENT_MAILBOX?.trim() || "Sent",
  };
}

function createImapClient() {
  const config = getImapConfig();
  return new ImapFlow({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
    logger: false,
  });
}

function addressListToString(addresses: any) {
  if (!addresses) return "";
  const list = Array.isArray(addresses) ? addresses : [addresses];
  return list
    .flatMap((entry) => entry?.value || entry || [])
    .map((entry: any) => entry?.name ? `${entry.name} <${entry.address}>` : entry?.address)
    .filter(Boolean)
    .join(", ");
}

function mailboxName(type: CrmMailbox) {
  const config = getImapConfig();
  return type === "sent" ? config.sentMailbox : config.inboxMailbox;
}

function dateToIso(value: Date | string | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function listMailMessages(mailbox: CrmMailbox, limit = 25): Promise<CrmMailMessage[]> {
  const client = createImapClient();
  await client.connect();

  try {
    const lock = await client.getMailboxLock(mailboxName(mailbox));
    try {
      const exists = client.mailbox ? client.mailbox.exists || 0 : 0;
      if (!exists) return [];

      const safeLimit = Math.min(Math.max(limit, 1), 50);
      const start = Math.max(exists - safeLimit + 1, 1);
      const range = `${start}:*`;
      const messages: CrmMailMessage[] = [];

      for await (const message of client.fetch(range, {
        uid: true,
        flags: true,
        internalDate: true,
        source: true,
      })) {
        if (!message.source) continue;
        const parsed = await simpleParser(message.source);
        messages.push({
          uid: message.uid,
          mailbox,
          subject: parsed.subject || "(ohne Betreff)",
          from: addressListToString(parsed.from),
          to: addressListToString(parsed.to),
          date: dateToIso(parsed.date || message.internalDate || null),
          seen: Boolean(message.flags?.has("\\Seen")),
          text: parsed.text?.trim() || "",
          html: parsed.html || "",
          messageId: parsed.messageId || null,
        });
      }

      return messages.sort((a, b) => {
        const left = a.date ? new Date(a.date).getTime() : 0;
        const right = b.date ? new Date(b.date).getTime() : 0;
        return right - left;
      });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function sendCrmMail(input: SendMailInput) {
  const config = getMailConfig();
  const smtp = getSmtpConfig();
  const fromAddress = config.fromAddress || smtp.user;
  const mail = {
    from: `"${config.fromName}" <${fromAddress}>`,
    to: input.to,
    cc: input.cc || undefined,
    bcc: input.bcc || undefined,
    subject: input.subject,
    text: input.text,
  };

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
  });

  const sent = await transporter.sendMail(mail);
  await appendSentMessage(mail).catch(() => undefined);
  return { messageId: sent.messageId };
}

async function appendSentMessage(mail: Record<string, unknown>) {
  const rawTransporter = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "unix",
  });
  const raw = await rawTransporter.sendMail(mail);
  const message = raw.message;
  if (!Buffer.isBuffer(message)) return;

  const client = createImapClient();
  await client.connect();
  try {
    await client.append(mailboxName("sent"), message, ["\\Seen"]);
  } finally {
    await client.logout().catch(() => undefined);
  }
}
