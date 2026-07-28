"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, CalendarCheck, MessageCircle, Home, Wrench, ShoppingBag, X, Bot, ClipboardList } from "lucide-react";
import { useUI } from "@/lib/ui-store";

export function MobileBottomNav() {
  const items = [
    { icon: Home, label: "Home", href: "#top" },
    { icon: ShoppingBag, label: "Shop", href: "#sales" },
    { icon: CalendarCheck, label: "Book", href: "#contact", primary: true },
    { icon: Wrench, label: "Repair", href: "#services" },
    { icon: Phone, label: "Call", href: "tel:+18005550199" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/10 bg-white/90 backdrop-blur-xl lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-semibold text-navy/70"
          >
            {item.primary ? (
              <span className="grid h-11 w-11 -translate-y-3 place-items-center rounded-2xl bg-accent text-white shadow-lift">
                <item.icon className="h-5 w-5" />
              </span>
            ) : (
              <item.icon className="h-5 w-5" />
            )}
            <span className={item.primary ? "-mt-2" : ""}>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { openQuote } = useUI();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-40 hidden flex-col items-end gap-3 lg:flex">
      <AnimatePresence>
        {show && open && (
          <motion.div
            className="flex flex-col items-end gap-2"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
          >
            <FloatingItem icon={MessageCircle} label="WhatsApp" href="https://wa.me/18005550199" color="bg-success" />
            <FloatingItem icon={Bot} label="AI Assistant" href="#contact" color="bg-royal" />
            <FloatingItem icon={ClipboardList} label="Get a Quote" onClick={() => openQuote()} color="bg-royal-600" />
            <FloatingItem icon={CalendarCheck} label="Book Service" href="#contact" color="bg-accent" />
            <FloatingItem icon={Phone} label="Call Now" href="tel:+18005550199" color="bg-navy" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.button
            onClick={() => setOpen((v) => !v)}
            className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-navy to-royal text-white shadow-lift"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={open ? "Close quick actions" : "Open quick actions"}
          >
            <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.3 }}>
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingItem({
  icon: Icon,
  label,
  href,
  onClick,
  color,
}: {
  icon: typeof Phone;
  label: string;
  href?: string;
  onClick?: () => void;
  color: string;
}) {
  const inner = (
    <>
      <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-navy opacity-0 shadow-card transition group-hover:opacity-100">
        {label}
      </span>
      <span className={`grid h-12 w-12 place-items-center rounded-full ${color} text-white shadow-lift transition-transform group-hover:scale-110`}>
        <Icon className="h-5 w-5" />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="group flex items-center gap-2.5">
        {inner}
      </button>
    );
  }

  return (
    <a href={href} className="group flex items-center gap-2.5">
      {inner}
    </a>
  );
}
