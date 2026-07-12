import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Login",
  description: "Geschützter Zugang für Sibylle Bergold.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
