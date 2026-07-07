import { supabase } from "@/lib/sibylle/supabase";

export type BusinessSettings = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  bankName: string;
  iban: string;
  bic: string;
  invoicePrefix: string;
  footerText: string;
};

const SETTINGS_ID = "default";
const LEGACY_STORAGE_KEY = "crm_business_settings";

export const defaultBusinessSettings: BusinessSettings = {
  businessName: "Sibylle Bergold",
  ownerName: "Sibylle Bergold",
  email: "kontakt@sibylle-bergold.com",
  phone: "+49 178 5511230",
  address: "Bitte vollständige Geschäftsanschrift in den Einstellungen hinterlegen",
  taxId: "Bitte USt-IdNr. oder Steuernummer hinterlegen",
  bankName: "Bitte Bank in den Einstellungen hinterlegen",
  iban: "Bitte IBAN hinterlegen",
  bic: "Bitte BIC hinterlegen",
  invoicePrefix: `RE-${new Date().getFullYear()}-`,
  footerText:
    "Vielen Dank für Ihr Vertrauen in meine systemische Begleitung. Die Begleitung ist Coaching und Selbsterfahrung und enthält keine Heilversprechen.",
};

export function normalizeSettings(settings: Partial<BusinessSettings> | null | undefined): BusinessSettings {
  return { ...defaultBusinessSettings, ...(settings || {}) };
}

function readLocalCache(): BusinessSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    return raw ? normalizeSettings(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeLocalCache(settings: BusinessSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

/**
 * Loads the business settings from Supabase (single row `crm_settings.id = 'default'`).
 * Falls back to the local cache (and finally the defaults) so the invoice PDF still
 * renders something sensible if the backend is briefly unavailable.
 */
export async function loadBusinessSettings(): Promise<BusinessSettings> {
  try {
    const { data, error } = await supabase
      .from("crm_settings")
      .select("data")
      .eq("id", SETTINGS_ID)
      .maybeSingle();

    if (error) throw error;
    if (data?.data) {
      const merged = normalizeSettings(data.data as Partial<BusinessSettings>);
      writeLocalCache(merged);
      return merged;
    }
  } catch {
    // fall through to local cache
  }
  return readLocalCache() ?? defaultBusinessSettings;
}

/**
 * Persists the business settings to Supabase and mirrors them into the local cache.
 * Throws on backend failure so the caller can surface an error to the user.
 */
export async function saveBusinessSettings(settings: BusinessSettings): Promise<void> {
  const normalized = normalizeSettings(settings);
  const { error } = await supabase
    .from("crm_settings")
    .upsert({ id: SETTINGS_ID, data: normalized, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
  writeLocalCache(normalized);
}
