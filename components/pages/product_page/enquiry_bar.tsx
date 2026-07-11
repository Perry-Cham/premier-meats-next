import { useEffect, useState } from "react";
import {motion} from 'motion/react'
/* ─────────────────────────────────────────────────
   FLOATING ENQUIRY BAR
───────────────────────────────────────────────── */
export default function EnquiryBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href="/contact"
        className="inline-flex items-center gap-4 bg-brand-dark text-white text-[0.7rem] tracking-[0.2em] uppercase px-8 py-4 rounded-sm shadow-2xl hover:bg-brand-red transition-colors duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
        Enquire About Bulk Orders
      </a>
    </motion.div>
  );
}
