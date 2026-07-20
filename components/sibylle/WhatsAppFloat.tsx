'use client';

import { getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { trackEvent } from '@/lib/sibylle/tracking';

const WHATSAPP_PATH =
  'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.74h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.6.68.7-2.53-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z';

// Desktop-only floating WhatsApp button. On mobile the sticky bottom bar
// (MobileStickyCTA) already provides the WhatsApp call-to-action.
export function WhatsAppFloat() {
  const href = getWhatsAppLink(whatsappConfig.messages.default);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => trackEvent('whatsapp_click', { source: 'float' })}
      aria-label="Sibylle per WhatsApp schreiben"
      className="focus-ring fixed bottom-6 right-6 z-[70] hidden items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-bold text-white shadow-[0_12px_34px_rgba(37,211,102,.45)] transition-transform duration-300 hover:scale-105 md:inline-flex"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={WHATSAPP_PATH} />
      </svg>
      <span className="text-sm tracking-tight">Per WhatsApp anfragen</span>
    </a>
  );
}
