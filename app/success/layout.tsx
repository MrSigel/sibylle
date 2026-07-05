import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Anfrage gesendet",
  description: "Interne Bestätigungsseite nach einer Paket- oder Kontaktanfrage.",
  path: "/success",
  noIndex: true,
});

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
