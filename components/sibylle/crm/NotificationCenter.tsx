"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/sibylle/supabase";
import { customerNameFromRelation, formatCurrency } from "@/lib/sibylle/crm";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "appointment" | "invoice" | "customer" | "system";
  isRead: boolean;
  href: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();

    // Close on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchNotifications() {
    const alerts: Notification[] = [];

    try {
      // 1. Check for upcoming appointments (next 24h)
      const now = new Date().toISOString();
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      const { data: appts } = await supabase
        .from("appointments")
        .select("id, title, start_time, customers(name)")
        .gte("start_time", now)
        .lte("start_time", tomorrow)
        .limit(3);

      appts?.forEach(a => {
        const customerName = customerNameFromRelation((a as any).customers);
        alerts.push({
          id: `appt-${a.id}`,
          title: "Anstehender Termin",
          message: `${a.title} mit ${customerName || 'Kunde'}`,
          time: new Date(a.start_time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
          type: "appointment",
          isRead: false,
          href: "/crm/calendar"
        });
      });

      // 2. Check for pending/overdue invoices
      const { data: invs } = await supabase
        .from("invoices")
        .select("id, amount, customers(name)")
        .eq("status", "Offen")
        .limit(2);

      invs?.forEach(i => {
        const customerName = customerNameFromRelation((i as any).customers);
        alerts.push({
          id: `inv-${i.id}`,
          title: "Offene Rechnung",
          message: `${i.id} für ${customerName || 'Kunde'} (${formatCurrency(i.amount)})`,
          time: "HEUTE",
          type: "invoice",
          isRead: false,
          href: "/crm/finances"
        });
      });

      // 3. Newest customers (last 3)
      const { data: custs } = await supabase
        .from("customers")
        .select("id, name, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      custs?.forEach(c => {
        alerts.push({
          id: `cust-${c.id}`,
          title: "Neuer Kontakt",
          message: `${c.name} wurde im System angelegt`,
          time: "NEU",
          type: "customer",
          isRead: false,
          href: "/crm/customers"
        });
      });

    } catch (err) {
      console.error("Error fetching notifications:", err);
    }

    // If no data, add a welcome message
    if (alerts.length === 0) {
      alerts.push({
        id: "sys-welcome",
        title: "System",
        message: "Willkommen zurück! Aktuell gibt es keine dringenden Meldungen.",
        time: "Jetzt",
        type: "system",
        isRead: true,
        href: "/crm"
      });
    }

    setNotifications(alerts);
    setHasUnread(alerts.some(n => !n.isRead));
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setHasUnread(false);
  };

  const handleNav = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative rounded-full p-2 text-gold hover:bg-gold/5 transition-all active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {hasUnread && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-softGold ring-2 ring-white animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 overflow-hidden rounded-[32px] border border-gold/20 bg-white shadow-2xl z-50"
          >
            <div className="flex items-center justify-between border-b border-gold/10 bg-mist/5 px-6 py-4">
              <h3 className="font-bold text-warmBlack">Benachrichtigungen</h3>
              <button 
                onClick={markAllRead}
                className="text-[10px] font-bold uppercase tracking-widest text-deepGold hover:text-gold"
              >
                Gelesen
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNav(n.href)}
                  className={`flex w-full gap-4 px-6 py-5 text-left transition-all hover:bg-gold/5 border-b border-gold/5 last:border-0 ${!n.isRead ? 'bg-gold/5' : ''}`}
                >
                  <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    n.type === 'appointment' ? 'bg-blue-50 text-blue-600' :
                    n.type === 'invoice' ? 'bg-red-50 text-red-600' :
                    n.type === 'customer' ? 'bg-green-50 text-green-600' :
                    'bg-sand/30 text-deepGold'
                  }`}>
                    {n.type === 'appointment' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {n.type === 'invoice' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {n.type === 'customer' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {n.type === 'system' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-warmBlack">{n.title}</span>
                      <span className="text-[10px] font-medium text-gold/40">{n.time}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-deepGold/70">{n.message}</p>
                  </div>
                  {!n.isRead && (
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-softGold" />
                  )}
                </button>
              ))}
            </div>

            <div className="bg-mist/5 p-4 text-center">
              <button 
                onClick={() => handleNav("/crm")}
                className="text-xs font-bold text-deepGold hover:underline"
              >
                Alle Aktivitäten anzeigen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
