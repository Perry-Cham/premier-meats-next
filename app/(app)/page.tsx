"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, HandCoins, Target } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   COLOUR TOKENS  (light scheme)
   bg:        warm off-white  #f7f4ef
   surface:   white           #ffffff
   surface2:  pale cream      #f0ece4
   ink:       deep charcoal   #1c1917
   muted:     warm grey       #78716c
   gold:      warm amber      #a87c3e
   red:       brand red       #c41e2a
───────────────────────────────────────────────────────── */

const SPRING = { type: "spring", stiffness: 60, damping: 18 } as const;
const EASE   = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

/* ────────────────────────────────────────────────────────
   Scroll-triggered reveal
   Mechanism: useInView detects when the element enters the
   viewport (with a -80px margin so it fires slightly before
   fully visible). Framer then animates from the hidden
   initial state to the visible animate state. `once:true`
   means it never re-animates on scroll back up.
──────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

/* ────────────────────────────────────────────────────────
   Parallax image
   Mechanism: useScroll tracks how far the target element
   has scrolled through the viewport (0 = enters bottom,
   1 = exits top). useTransform maps that 0→1 range to a
   -strength→+strength pixel offset on Y. useSpring adds
   physical lag so the image "drags" behind the scroll
   rather than moving in lockstep.
──────────────────────────────────────────────────────── */
function ParallaxImage({
  src, alt, strength = 80, className = "",
}: {
  src: string; alt: string; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const y    = useSpring(rawY, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Ticker
   The translateX loop is a single infinite CSS keyframe —
   moving from 0% to -33.333% (one third of the tripled
   list). No JS measurement or spring needed; CSS handles
   this more efficiently than any JS library would.
──────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Fresh Beef","Zambian Pork","Free-Range Chicken",
  "Processed Meats","National Delivery","7 Days a Week",
  "Wholesale & Retail","Est. Lusaka","Premier Quality",
];

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-[#a87c3e]/20 bg-[#f0ece4] py-3 select-none">
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.25em] uppercase text-[#78716c]">
            <span className="text-[#a87c3e]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Product card ── */
const PRODUCTS = [
  {
    title: "Beef", href: "/products/beef",
    image: `/api/media/file/TBone5_900x600.webp`,
    desc: "Premium cuts from T-bone to mince — sourced fresh, delivered daily.",
    tag: "Our Bestseller",
  },
  {
    title: "Pork", href: "/products/pork",
    image: `/api/media/file/PorkChops.webp`,
    desc: "Whole carcasses and precision cuts for every occasion.",
    tag: "Whole & Cut",
  },
  {
    title: "Chicken", href: "/products/chicken",
    image: `/api/media/file/RawWholeChicken.jpg`,
    desc: "Zambia's most-loved meat — whole, portioned, and ready.",
    tag: "Most Popular",
  },
  {
    title: "Processed", href: "/products/processed",
    image: `/api/media/file/meat_counter_in_the_supermarket_1190595804.jpg`,
    desc: "Cured, smoked, and cooked meats crafted with care.",
    tag: "Artisan Range",
  },
];

function ProductCard({ item, index }: { item: typeof PRODUCTS[0]; index: number }) {
  return (
    <Reveal direction="up" delay={index * 120}>
      <motion.a
        href={item.href}
        className="group block overflow-hidden rounded-sm bg-white shadow-sm border border-[#e8e2d9] cursor-pointer"
        whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(28,25,23,0.12)" }}
        transition={SPRING}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/25 to-transparent" />
          <div className="absolute top-4 left-4 text-[0.6rem] tracking-[0.2em] uppercase bg-[#c41e2a] text-white px-3 py-1">
            {item.tag}
          </div>
        </div>
        <div className="p-6">
          <h3 className="serif text-3xl font-light text-[#1c1917] mb-2">{item.title}</h3>
          <p className="text-[#78716c] text-sm leading-relaxed mb-5">{item.desc}</p>
          <motion.div
            className="flex items-center gap-2 text-[#a87c3e] text-xs tracking-[0.2em] uppercase"
            whileHover={{ x: 5 }}
            transition={SPRING}
          >
            <span>View Products</span><span>→</span>
          </motion.div>
        </div>
      </motion.a>
    </Reveal>
  );
}

/* ── Pillar card ── */
function PillarCard({ icon, title, body, index }: { icon: React.ReactNode; title: string; body: string; index: number }) {
  return (
    <Reveal direction="up" delay={index * 150}>
      <motion.div
        className="relative border border-[#e8e2d9] rounded-sm p-8 bg-white overflow-hidden cursor-default"
        whileHover={{ borderColor: "#a87c3e", backgroundColor: "#fdfaf6" }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#c41e2a]/20" />
        <div className="text-[#a87c3e] mb-6">{icon}</div>
        <h3 className="serif text-2xl font-light text-[#1c1917] mb-4">{title}</h3>
        <p className="text-[#78716c] text-sm leading-relaxed">{body}</p>
      </motion.div>
    </Reveal>
  );
}

/* ── Stat with count-up ── */
function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const numStr = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const target = parseInt(numStr || "0", 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !target) return;
    const id = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      const raf = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(id);
  }, [inView, target, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...EASE, delay: delay / 1000 }}
    >
      <div className="serif text-5xl md:text-6xl font-light text-[#c41e2a] mb-2">
        {target ? `${count}${suffix}` : value}
      </div>
      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-[#78716c]">{label}</div>
    </motion.div>
  );
}

/* ── Fill-slide CTA button ── */
function FillButton({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center overflow-hidden border text-sm tracking-[0.2em] uppercase px-10 py-4 ${
        outline ? "border-black text-[#1c1917]" : "border-[#c41e2a] text-[#1c1917]"
      }`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className={`absolute inset-0 ${outline ? "bg-[#a87c3e]/50" : "bg-[#c41e2a]"}`}
        initial={{ x: "-101%" }}
        animate={{ x: hovered ? "0%" : "-101%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className={`relative z-10 transition-colors duration-300 ${hovered && !outline ? "text-white" : ""}`}>
        {children}
      </span>
    </motion.a>
  );
}

/* ────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .home-page { font-family:'Jost',sans-serif; background:#f7f4ef; color:#1c1917; }
        .serif { font-family:'Cormorant Garamond',serif; }
        .section-label { font-size:0.7rem; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; color:#a87c3e; }
        .section-label.light{color:rgb(255 190 99);}
        .red-rule::before { content:''; display:block; width:48px; height:2px; background:#c41e2a; margin-bottom:1rem; }
        .gold-divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,#a87c3e40,transparent); }

        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        .ticker-track { animation:ticker 28s linear infinite; }

        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation:spin-slow 20s linear infinite; }
      `}</style>

      <main className="home-page">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: 1.12 }}>
            <img
              src="https://ik.imagekit.io/ypgvaedes/Images/Hero.jpeg?updatedAt=1763243890397"
              alt="Yetu Meats"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#1c1917]/35 to-[#1c1917]/15" />
          </motion.div>

          {/* spinning badge */}
          <div className="absolute top-[20%] right-8 md:right-16 z-10 hidden md:flex flex-col items-center justify-center w-30 h-30 border border-[#a87c3e]/30 rounded-full bg-white/80 backdrop-blur-sm">
            <div className="spin-slow absolute inset-0">
              <img
              src="/api/media/file/IMG-20260325-WA0000_1_-removebg-preview.png"
              className="object-cover"
              />
            </div>
            <span className="serif text-2xl text-[#a87c3e] font-light">PM</span>
          </div>

          {/* hero copy — word-by-word entrance */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
            <motion.p
              className="section-label light text-gold-light mb-6 text-gold-light"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.2 }}
            >
              Est. Lusaka, Zambia — Wholesale & Retail
            </motion.p>

            <h1 className="serif font-light leading-[0.9] mb-10">
              {[
                { text: "Zambia's", delay: 0.3, color: "#1c1917" },
                { text: "Finest",   delay: 0.45, color: "rgb(255 190 99)" },
                { text: "Meat.",    delay: 0.6,  color: "#1c1917" },
              ].map(({ text, delay, color }) => (
                <div key={text} className="overflow-hidden">
                  <motion.span
                    className="block"
                    style={{ fontSize: "clamp(3.5rem,10vw,8rem)", color }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ...EASE, delay }}
                  >
                    {text}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.9 }}
            >
              <FillButton href="/contact">Get Started</FillButton>
              <FillButton href="/products/beef" outline>Browse Products</FillButton>
            </motion.div>
          </div>

          {/* scroll indicator — Framer pulsing line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#78716c]">Scroll</span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-[#a87c3e] to-transparent"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        {/* ── TICKER ── */}
        <Ticker />

        {/* ── WHO WE ARE ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-center">
            <Reveal direction="left">
              <p className="section-label mb-4 red-rule">Who We Are</p>
              <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1c1917] leading-tight mb-8">
                Number One.<br />
                <em className="text-[#a87c3e]">Second to None.</em>
              </h2>
              <p className="text-[#78716c] leading-relaxed mb-6 text-[0.95rem]">
                The word <strong className="text-[#a87c3e]">PREMIER</strong> means First Class, Top Notch. We are a player in the wholesale and retail of an assortment of fresh and processed meat products in the Zambian, regional and international markets.
              </p>
              <p className="text-[#78716c] leading-relaxed text-[0.95rem]">
                Whether you are a caterer, restaurateur, trader, wholesaler, retailer, or simply a consumer — we have a range of products packed especially for your needs.
              </p>
              <div className="mt-10">
                <FillButton href="/about" outline>Our Story</FillButton>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div className="relative">
                <ParallaxImage
                  src="https://hips.hearstapps.com/hmg-prod/images/how-to-cook-steak-in-the-oven-lead-66a3eda7b0f65.jpg"
                  alt="Premium beef cut"
                  strength={50}
                  className="rounded-sm aspect-[4/5]"
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-[#c41e2a] p-6 rounded-sm hidden md:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.4 }}
                >
                  <div className="serif text-4xl font-light text-white">7</div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-white/80 mt-1">Days a Week</div>
                </motion.div>
                <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#a87c3e]/25 rounded-sm hidden md:block" />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── STATS ── */}
        <section className="py-20 bg-[#f0ece4]">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
            <Stat value="14+" label="Years Experience" delay={0} />
            <Stat value="150" label="Planned Outlets" delay={100} />
            <Stat value="10" label="Provinces" delay={200} />
            <Stat value="48h" label="Nationwide Delivery" delay={300} />
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── PILLARS ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <div className="text-center mb-16">
              <p className="section-label mb-4">Our Foundation</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917]">
                Vision. Mission. <em className="text-[#a87c3e]">Strength.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            <PillarCard index={0} icon={<TrendingUp size={32}/>} title="Our Vision"
              body="To be the most customer-centered and dominant meat production, processing and supply company in the national and regional markets." />
            <PillarCard index={1} icon={<Target size={32}/>} title="Our Mission"
              body="To meet clients needs wherever they are — locally, regionally, or internationally — and provide a one-stop all-in-one food solution with passion and professionalism." />
            <PillarCard index={2} icon={<HandCoins size={32}/>} title="Our Strength"
              body="Unlimited capacity to deliver nationwide within 48 hours of receiving orders, as a one-stop supplier for an assortment of premium meats." />
          </div>
        </section>

        {/* ── PARALLAX BANNER ── */}
        <section className="relative h-[45vh] overflow-hidden flex items-center justify-center">
          <ParallaxImage
            src="https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/meat_counter_in_the_supermarket_1190595804.jpg"
            alt="Meat counter"
            strength={60}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-[#f7f4ef]/60" />
          <Reveal>
            <div className="relative z-10 text-center px-6">
              <p className="section-label mb-4">Our Promise</p>
              <blockquote className="serif text-3xl md:text-5xl lg:text-6xl font-light text-[#1c1917] max-w-3xl leading-tight">
                <em>"On the move 7 days a week."</em>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="section-label mb-4 red-rule">What We Offer</p>
                <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight">
                  Our <em className="text-[#a87c3e]">Products</em>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((item, i) => (
              <ProductCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── WHY PREMIER ── */}
        <section className="py-24 md:py-32 bg-[#f0ece4]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="section-label mb-4 red-rule">Why Premier</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
                The Yetu <em className="text-[#a87c3e]">Difference</em>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#a87c3e]/10">
              {[
                { num: "01", title: "Daily Delivery",    body: "Local and out-of-town deliveries made every single day, seven days a week." },
                { num: "02", title: "National Reach",    body: "Physical retail presence across all ten provinces of the Republic of Zambia." },
                { num: "03", title: "All Under One Roof",body: "Beef, pork, chicken, chevon, fish, eggs, and processed meats — one supplier." },
                { num: "04", title: "For Every Customer",body: "Whether corporate, wholesale, retail, or consumer — we have your range." },
              ].map((item, i) => (
                <Reveal key={item.num} direction="up" delay={i * 100}>
                  <motion.div
                    className="bg-[#f0ece4] p-8 h-full"
                    whileHover={{ backgroundColor: "#ffffff" }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className="serif text-5xl font-light mb-6"
                      style={{ color: "rgba(196,30,42,0.15)" }}
                      whileHover={{ color: "rgba(196,30,42,0.4)" }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.num}
                    </motion.div>
                    <h3 className="text-[#1c1917] font-medium text-sm tracking-wide mb-3">{item.title}</h3>
                    <p className="text-[#78716c] text-sm leading-relaxed">{item.body}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── CTA ── */}
        <section className="py-28 md:py-40 text-center px-6 bg-[#f7f4ef]">
          <Reveal>
            <p className="section-label mb-6">Ready to Order?</p>
            <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-light text-[#1c1917] mb-8 leading-tight">
              Let's Work<br />
              <em className="text-[#a87c3e]">Together.</em>
            </h2>
            <p className="text-[#78716c] max-w-lg mx-auto mb-12 leading-relaxed">
              Our sales representatives will get back to you within an hour. Reach out via our contact page or visit one of our outlets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <FillButton href="/contact">Contact Us</FillButton>
              <FillButton href="/about" outline>Learn More</FillButton>
            </div>
          </Reveal>
        </section>

      </main>
    </>
  );
}