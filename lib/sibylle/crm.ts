export const customerStatuses = ["Interessent", "Aktiv", "Inaktiv"] as const;
export const invoiceStatuses = ["Offen", "Bezahlt", "Überfällig", "Storniert"] as const;
export const projectColumns = ["Anfrage", "In Planung", "In Umsetzung", "Abgeschlossen"] as const;
export const projectPriorities = ["Niedrig", "Normal", "Hoch"] as const;
export const appointmentTypes = ["Zoom", "Vor Ort", "Telefon", "Fokus"] as const;
export const appointmentStatuses = ["Geplant", "Bestätigt", "Abgeschlossen", "Abgesagt"] as const;
export const documentCategories = ["Verträge", "Rechnungen", "Klienten-Notizen", "DSGVO", "Vorlagen", "Allgemein"] as const;

export type CustomerStatus = (typeof customerStatuses)[number];
export type InvoiceStatus = (typeof invoiceStatuses)[number];
export type ProjectColumn = (typeof projectColumns)[number];
export type ProjectPriority = (typeof projectPriorities)[number];
export type AppointmentType = (typeof appointmentTypes)[number];
export type AppointmentStatus = (typeof appointmentStatuses)[number];
export type DocumentCategory = (typeof documentCategories)[number];

export function formatCurrency(value: number | string | null | undefined) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(Number(value || 0));
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("de-DE");
}

export function formatDateTimeLocal(value: Date) {
  const offset = value.getTimezoneOffset();
  return new Date(value.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export function customerNameFromRelation(relation: any) {
  if (Array.isArray(relation)) return relation[0]?.name || "Ohne Kundenzuordnung";
  return relation?.name || "Ohne Kundenzuordnung";
}

export function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(";"),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
        .join(";")
    ),
  ].join("\n");

  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
