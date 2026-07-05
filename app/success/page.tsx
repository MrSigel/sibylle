"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getWhatsAppLink, whatsappConfig } from "@/lib/sibylle/siteData";
import { CTAButton } from "@/components/sibylle/CTAButton";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paketName = searchParams.get("paket") || "dein Paket";
  const waLink = getWhatsAppLink(whatsappConfig.messages.paketAnfrage(paketName));

  return (
    <div className="container relative z-10 max-w-3xl text-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <div className="mb-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-softGold/20 text-softGold">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="editorial text-5xl md:text-7xl">Anfrage vorbereiten</h1>
        <p className="mt-8 text-xl leading-relaxed text-deepGold/80">
          Für <span className="font-bold italic text-deepGold">„{paketName}“</span> ist noch keine verbindliche Buchung oder Zahlung erfolgt.
        </p>

        <div className="premium-panel mt-16 rounded-[3rem] p-10 md:p-14">
          <h2 className="editorial text-3xl">Wie geht es jetzt weiter?</h2>
          <p className="mt-6 text-lg leading-relaxed text-deepGold/70">
            Schreibe Sibylle kurz per WhatsApp. Danach werden Rahmen, Termin und nächste Schritte persönlich bestätigt.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <CTAButton href={waLink} className="!h-16 !px-10 text-lg">
              Anfrage per WhatsApp senden
            </CTAButton>
            <CTAButton href="/preise" variant="secondary" className="!h-16 !px-10 text-lg">
              Pakete ansehen
            </CTAButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="grain relative flex min-h-[80svh] items-center overflow-hidden py-24">
      <div className="absolute -left-32 -top-20 h-[45rem] w-[45rem] rounded-full bg-sand/20 blur-[130px]" />
      <div className="absolute -right-24 top-0 h-[35rem] w-[35rem] rounded-full bg-softGold/10 blur-[110px]" />
      <Suspense fallback={<div className="container text-center"><p>Wird geladen...</p></div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
