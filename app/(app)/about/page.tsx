"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   SWAP THESE image URLs for real photography
   ───────────────────────────────────────────── */
const IMAGES = {
  hero: "https://ik.imagekit.io/ypgvaedes/Images/Hero.jpeg?updatedAt=1763243890397",
  business: "/images/about/butcher-counter.jpg",      // ← replace
  ceo: "/images/about/ceo-lubinda.jpg",               // ← replace
  secretary: "/images/about/secretary-maria.jpg",     // ← replace
  team: "/images/about/team-photo.jpg",               // ← replace
  store: "/images/about/store-front.jpg",             // ← replace
};

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Reusable image placeholder ── */
function ImageBlock({
  src,
  alt,
  className = "",
  aspectClass = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#1a1a18] ${aspectClass} ${className}`}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#5a5a52]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="text-xs tracking-widest uppercase font-medium">{alt}</span>
        </div>
      )}
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#1e1e1a] to-[#2a2a24]" />
      )}
    </div>
  );
}

/* ── Reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, visible } = useReveal();
  const initial =
    direction === "up" ? "translateY(40px)" :
    direction === "left" ? "translateX(-40px)" :
    direction === "right" ? "translateX(40px)" : "none";

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initial,
      }}
    >
      {children}
    </div>
  );
}

/* ── Core value pill ── */
function ValuePill({ label, index }: { label: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
      }}
      className="flex items-center gap-3 border border-[#c8a96e]/30 rounded-sm px-5 py-3 hover:border-[#c8a96e] hover:bg-[#c8a96e]/5 transition-colors duration-300 group"
    >
      <span className="text-[#c8a96e] text-lg font-serif">✦</span>
      <span className="text-[#d4d0c8] text-sm tracking-wide">{label}</span>
    </div>
  );
}

/* ── Stat counter ── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-5xl md:text-6xl text-[#c8a96e] mb-2">{value}</div>
      <div className="text-[#8a8a7e] text-xs tracking-[0.2em] uppercase">{label}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .about-page { font-family: 'Jost', sans-serif; background: #0f0f0d; color: #d4d0c8; }
        .serif { font-family: 'Cormorant Garamond', serif; }

        .red-rule::before {
          content: '';
          display: block;
          width: 48px;
          height: 2px;
          background: #c41e2a;
          margin-bottom: 1rem;
        }

        .section-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c8a96e;
        }

        .gold-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c8a96e40, transparent);
        }

        .market-tag {
          display: inline-block;
          border: 1px solid #c41e2a40;
          color: #d4d0c8;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          transition: all 0.3s;
        }
        .market-tag:hover { border-color: #c41e2a; background: #c41e2a10; }

        .team-card { position: relative; overflow: hidden; }
        .team-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0f0f0d 0%, transparent 60%);
          pointer-events: none;
        }
        .team-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 2rem 1.5rem 1.5rem;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .float-slow { animation: float 6s ease-in-out infinite; }
      `}</style>

      <main className="about-page">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <ImageBlock src={IMAGES.hero} alt="Premier Meats" className="!absolute inset-0 w-full h-full" aspectClass="h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0d] via-[#0f0f0d]/60 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16">
            <Reveal>
              <p className="section-label mb-4">Est. Lusaka, Zambia</p>
              <h1 className="serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] mb-6">
                The Art of<br />
                <em className="text-[#c8a96e]">Premier</em> Meat
              </h1>
              <p className="text-[#8a8a7e] text-sm tracking-widest uppercase">
                Wholesale · Retail · National Distribution
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div>
              <p className="section-label mb-6 red-rule">Our Business</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
                Zambia's finest<br />meat, delivered<br /><em>daily.</em>
              </h2>
              <div className="space-y-4 text-[#8a8a7e] leading-relaxed text-[0.95rem]">
                <p>
                  The word <strong className="text-[#c8a96e]">PREMIER</strong> means Number One, Second to None, First Class, Top Notch. We are a player in the wholesale and retail of an assortment of fresh and processed meat products in the Zambian, regional and international markets.
                </p>
                <p>
                  Whether you are a caterer, restaurateur, a trader, a wholesaler, a retailer, or simply a consumer — we have a range of products packed especially for your needs.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {["Beef","Pork","Chicken","Chevon & Mutton","Fish","Processed Meats","Eggs"].map(p => (
                  <span key={p} className="market-tag">{p}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="relative">
              <ImageBlock
                src={IMAGES.business}
                alt="Our butcher counter"
                className="rounded-sm"
                aspectClass="aspect-[3/4]"
              />
              {/* floating accent */}
              <div className="float-slow absolute -bottom-6 -left-6 w-24 h-24 border border-[#c8a96e]/20 rounded-sm hidden md:block" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#c41e2a] rounded-sm hidden md:block" />
            </div>
          </Reveal>
        </section>

        <div className="gold-divider" />

        {/* ── STATS ── */}
        <section className="py-20 bg-[#0c0c0a]">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { value: "14+", label: "Years Experience" },
              { value: "150", label: "Planned Outlets" },
              { value: "7", label: "Days a Week" },
              { value: "10", label: "Provinces" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <Stat {...s} />
              </Reveal>
            ))}
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── CORE VALUES ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="section-label mb-4 red-rule">What Drives Us</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-white mb-16">Core Values</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Integrity and Honesty",
              "Commitment",
              "Teamwork",
              "Rewarding Hard Work",
              "Encouraging Risk & Responsibility",
              "Empowering Others",
              "Enjoying Our Work and Lives",
            ].map((v, i) => <ValuePill key={v} label={v} index={i} />)}
          </div>
        </section>

        {/* ── FULL-WIDTH IMAGE ── */}
        <section className="relative h-[50vh] overflow-hidden">
          <ImageBlock
            src={IMAGES.store}
            alt="Premier Meats store"
            className="w-full h-full"
            aspectClass="h-full"
          />
          <div className="absolute inset-0 bg-[#0f0f0d]/50" />
          <Reveal>
            <div className="absolute inset-0 flex items-center justify-center">
              <blockquote className="serif text-3xl md:text-5xl text-white font-light text-center px-8 max-w-3xl leading-tight">
                <em>"On the move 7 days a week — local and out of town deliveries made daily."</em>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ── MARKET SCOPE ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16">
          <Reveal direction="left">
            <div>
              <p className="section-label mb-4 red-rule">Scope of Market</p>
              <h2 className="serif text-4xl font-light text-white mb-8 leading-tight">
                National. Regional.<br /><em className="text-[#c8a96e]">International.</em>
              </h2>
              <p className="text-[#8a8a7e] leading-relaxed mb-10">
                We are targeting every segment of the market — from corporate accounts to the everyday Zambian consumer. Our distribution runs seven days a week, reaching every corner of the country.
              </p>
              <div className="space-y-3">
                {[
                  "The Corporate Market",
                  "The Formal Retail Sector",
                  "The Informal Retail Sector",
                  "The Mass Consumer Market",
                  "The Export Market",
                ].map((m, i) => (
                  <Reveal key={m} delay={i * 60}>
                    <div className="flex items-center gap-4 text-[#d4d0c8] text-sm">
                      <span className="w-8 h-px bg-[#c41e2a] flex-shrink-0" />
                      {m}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ImageBlock
                  src={IMAGES.team}
                  alt="The Premier Meats team"
                  className="rounded-sm"
                  aspectClass="aspect-square"
                />
                <div className="flex flex-col gap-4">
                  <div className="flex-1 bg-[#c41e2a] rounded-sm flex items-center justify-center p-6">
                    <p className="serif text-white text-2xl font-light text-center leading-tight italic">
                      "One stop.<br />All under<br />one roof."
                    </p>
                  </div>
                  <div className="h-1/3 bg-[#c8a96e]/10 border border-[#c8a96e]/20 rounded-sm" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="gold-divider" />

        {/* ── CTA ── */}
        <section className="py-24 md:py-32 text-center px-6">
          <Reveal>
            <p className="section-label mb-6">Ready to Work With Us?</p>
            <h2 className="serif text-5xl md:text-6xl font-light text-white mb-8">
              Get in <em className="text-[#c8a96e]">Touch</em>
            </h2>
            <p className="text-[#8a8a7e] max-w-lg mx-auto mb-10 leading-relaxed">
              We are committed to customer satisfaction. Visit one of our stores or reach management directly.
            </p>
            <a
              href="/contact"
              className="inline-block border border-[#c41e2a] text-white text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c41e2a] transition-colors duration-300"
            >
              Contact Us
            </a>
          </Reveal>
        </section>

      </main>
    </>
  );
}