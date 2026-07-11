import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";

/*  
This module contains the animated components used in the About Page of the site, they are imported under /about/page.tsx in the app/(app) directory
*/

/* ─────────────────────────────────────────────────────────
   MOTION CONFIG
───────────────────────────────────────────────────────── */
const EASE = { duration: 0.75, ease: [0.16, 1, 0.3, 1] } as const;
const SPRING = { type: "spring", stiffness: 55, damping: 18 } as const;

/* ─────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────
   Scroll-triggered reveal
   Mechanism: useInView detects when the element enters the
   viewport (with a -80px margin so it fires slightly before
   fully visible). Framer then animates from the hidden
   initial state to the visible animate state. `once:true`
   means it never re-animates on scroll back up.
──────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ ...EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  src,
  alt,
  strength = 55,
  className = "",
  aspectClass = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  strength?: number;
  className?: string;
  aspectClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} className={`overflow-hidden ${aspectClass} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ── Staggered pill ── */
export function Pill({
  label,
  index,
  accent = false,
}: {
  label: string;
  index: number;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...EASE, delay: index * 0.07 }}
      className={`flex items-center gap-3 border rounded-sm px-5 py-3 transition-colors duration-300 cursor-default ${
        accent
          ? "border-brand-red/25 bg-white hover:border-brand-red hover:bg-brand-red-tint"
          : "border-brand-gold/25 bg-white hover:border-brand-gold hover:bg-brand-gold-tint"
      }`}
    >
      <span
        className={`text-base ${accent ? "text-brand-red" : "text-brand-gold"}`}
      >
        ✦
      </span>
      <span className="text-brand-dark text-sm tracking-wide">{label}</span>
    </motion.div>
  );
}

/* ── Responsibility card ── */
export function ResponsibilityCard({
  to,
  body,
  index,
}: {
  to: string;
  body: string;
  index: number;
}) {
  return (
    <Reveal direction="up" delay={index * 120}>
      <motion.div
        className="bg-white border border-brand-border rounded-sm p-7 h-full"
        whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(28,25,23,0.09)" }}
        transition={SPRING}
      >
        <div className="w-8 h-0.5 bg-brand-red mb-5" />
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-brand-gold mb-3">
          To the {to}
        </p>
        <p className="text-brand-muted text-sm leading-relaxed">{body}</p>
      </motion.div>
    </Reveal>
  );
}

/* ── Quality objective card ── */
export function QualityCard({
  body,
  num,
  index,
}: {
  body: string;
  num: string;
  index: number;
}) {
  return (
    <Reveal direction="up" delay={index * 100}>
      <motion.div
        className="relative bg-white border border-brand-border rounded-sm p-7 overflow-hidden"
        whileHover={{ borderColor: "#c41e2a", backgroundColor: "#fff8f8" }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="serif text-6xl font-light leading-none mb-5"
          style={{ color: "rgba(196,30,42,0.10)" }}
          whileHover={{ color: "rgba(196,30,42,0.30)" }}
          transition={{ duration: 0.25 }}
        >
          {num}
        </motion.div>
        <p className="text-brand-dark text-sm leading-relaxed font-medium">
          {body}
        </p>
      </motion.div>
    </Reveal>
  );
}
