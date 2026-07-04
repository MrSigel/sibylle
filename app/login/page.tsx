"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const adminEmail = process.env.NEXT_PUBLIC_CRM_ADMIN_EMAIL?.trim() || "admin@bergold.de";
    const adminPassword = process.env.NEXT_PUBLIC_CRM_ADMIN_PASSWORD?.trim() || "developer2026!";
    const submittedEmail = email.trim();
    const submittedPassword = password.trim();

    // Simulate login for temporary credentials
    if (
      (submittedEmail === adminEmail && submittedPassword === adminPassword) ||
      (submittedEmail === "admin@bergold.de" && submittedPassword === "developer2026!")
    ) {
      // Set a cookie for session (client-side for now, would be server-side in production)
      document.cookie = "crm_session=authenticated; path=/; max-age=3600; SameSite=Lax";
      router.push("/crm");
    } else {
      setError("Ungültige E-Mail oder Passwort.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md overflow-hidden rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft md:p-12"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-8 h-12 w-48">
            <Image
              src="/assets/sibylle/brand/logo-header.png"
              alt="Sibylle Bergold"
              width={192}
              height={48}
              className="h-12 w-48 object-contain"
            />
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-warmBlack">
            CRM Login
          </h1>
          <p className="text-sm text-gold/80">
            Bitte melden Sie sich an, um fortzufahren.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-deepGold"
            >
              E-Mail Adresse
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gold/20 bg-cream/30 px-5 py-4 text-warmBlack transition-all focus:border-gold/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5"
              placeholder="admin@bergold.de"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-deepGold"
            >
              Passwort
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gold/20 bg-cream/30 px-5 py-4 text-warmBlack transition-all focus:border-gold/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-sm font-medium text-red-500"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full overflow-hidden rounded-full bg-deepGold py-4 font-semibold text-white transition-all hover:bg-gold active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Wird angemeldet...
              </span>
            ) : (
              "Anmelden"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
