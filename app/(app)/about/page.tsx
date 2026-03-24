"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────
   IMAGE SLOTS
   Every src is a clearly-labelled Unsplash photo.
   Perry: swap the src strings with your own URLs.
───────────────────────────────────────────────────────── */
const IMAGES = {
  // Hero — wide landscape of a premium butcher counter or meat display
  hero: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1600&q=85",

  // "Our Business" section — butcher at work / counter shot
  business: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",

  // Full-width pull-quote banner — aesthetic meat/food
  banner: "https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80",

  // Market scope section — delivery / store / produce feel
  scope: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=900&q=85",

  // Team photo (replace with real team photo)
  team: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80",

  // CEO portrait (replace with real headshot)
  ceo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=85",

  // Secretary portrait (replace with real headshot)
  secretary: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85",
};

/* ─────────────────────────────────────────────────────────
   MOTION CONFIG
───────────────────────────────────────────────────────── */
const EASE   = { duration: 0.75, ease: [0.16, 1, 0.3, 1] } as const;
const SPRING = { type: "spring", stiffness: 55, damping: 18 } as const;

/* ─────────────────────────────────────────────────────────
   REVEAL
───────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div ref={ref} className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ ...EASE, delay: delay / 1000 }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   PARALLAX IMAGE
───────────────────────────────────────────────────────── */
function ParallaxImage({
  src, alt, strength = 60, className = "", aspectClass = "aspect-[4/3]",
}: {
  src: string; alt: string; strength?: number; className?: string; aspectClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} className={`overflow-hidden ${aspectClass} ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.15 }} className="w-full h-full object-cover" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   VALUE PILL
───────────────────────────────────────────────────────── */
function ValuePill({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...EASE, delay: index * 0.08 }}
      className="flex items-center gap-3 border border-[#a87c3e]/25 rounded-sm px-5 py-3 bg-white hover:border-[#a87c3e] hover:bg-[#fdfaf6] transition-colors duration-300 cursor-default"
    >
      <span className="text-[#a87c3e] text-base">✦</span>
      <span className="text-[#1c1917] text-sm tracking-wide">{label}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   STAT
───────────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={EASE}>
      <div className="serif text-5xl md:text-6xl font-light text-[#c41e2a] mb-2">{value}</div>
      <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[#78716c]">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   TEAM CARD
───────────────────────────────────────────────────────── */
function TeamCard({
  src, alt, role, name, bio, tags, index,
}: {
  src: string; alt: string; role: string; name: string;
  bio: string; tags: string[]; index: number;
}) {
  return (
    <Reveal direction={index % 2 === 0 ? "left" : "right"} delay={index * 120}>
      <motion.div
        className="bg-white border border-[#e8e2d9] rounded-sm overflow-hidden"
        whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(28,25,23,0.10)" }}
        transition={SPRING}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img src={src} alt={alt}
            className="w-full h-full object-cover object-top"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/20 to-transparent" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#a87c3e]">{role}</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="serif text-2xl font-light text-[#1c1917] mb-4">{name}</h3>
          <p className="text-[#78716c] text-sm leading-relaxed mb-5">{bio}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-[0.6rem] tracking-widest uppercase text-[#a87c3e] border border-[#a87c3e]/25 px-2.5 py-1 rounded-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroRawY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroY = useSpring(heroRawY, { stiffness: 80, damping: 22 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .about-page  { font-family:'Jost',sans-serif; background:#f7f4ef; color:#1c1917; }
        .serif       { font-family:'Cormorant Garamond',serif; }
        .section-label { font-size:.7rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:#a87c3e; }
        .red-rule::before { content:'';display:block;width:48px;height:2px;background:#c41e2a;margin-bottom:1rem; }
        .gold-divider { width:100%;height:1px;background:linear-gradient(90deg,transparent,#a87c3e40,transparent); }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation:spin-slow 20s linear infinite; }
      `}</style>

      <main className="about-page">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: 1.14 }}>
            <img src={IMAGES.hero} alt="Premier Meats — premium butcher counter" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#f7f4ef]/25 to-[#1c1917]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/40 to-transparent" />

          {/* spinning badge */}
          <div className="absolute top-[18%] right-8 md:right-16 z-10 hidden md:flex flex-col items-center justify-center w-28 h-28 border border-[#a87c3e]/30 rounded-full bg-white/20 backdrop-blur-sm">
            <div className="spin-slow absolute inset-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs><path id="abt-c" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"/></defs>
                <text fontSize="9.5" fill="#a87c3e" letterSpacing="3">
                  <textPath href="#abt-c">ABOUT PREMIER MEATS · LUSAKA ·</textPath>
                </text>
              </svg>
            </div>
            <span className="serif text-2xl text-[#a87c3e] font-light">PM</span>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-20">
            <motion.p className="section-label mb-5"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.15 }}>
              Est. Lusaka, Zambia
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h1
                className="serif font-light text-[#1c1917] leading-[0.9]"
                style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}
                initial={{ y: "108%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ ...EASE, delay: 0.25 }}>
                About <em className="text-[#a87c3e]">Premier</em>
              </motion.h1>
            </div>
            <motion.p className="text-[#78716c] text-[0.95rem] max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.45 }}>
              Wholesale and retail of an assortment of fresh and processed meat products — in the Zambian, regional and international markets.
            </motion.p>
          </div>
        </section>

        {/* ── OUR BUSINESS ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal direction="left">
            <p className="section-label mb-4 red-rule">Our Business</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight mb-8">
              Zambia's finest meat,<br />
              <em className="text-[#a87c3e]">delivered daily.</em>
            </h2>
            <div className="space-y-4 text-[#78716c] leading-relaxed text-[0.95rem]">
              <p>
                The word <strong className="text-[#a87c3e]">PREMIER</strong> means Number One, Second to None, First Class, Top Notch. We are a player in the wholesale and retail of an assortment of fresh and processed meat products in the Zambian, regional and international markets.
              </p>
              <p>
                Our products are packed and supplied with the consumer in mind — whether you are a caterer, restaurateur, trader, wholesaler, retailer, or simply a consumer.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Beef","Pork","Chicken","Chevon & Mutton","Fish","Processed Meats","Eggs"].map((p) => (
                <motion.span key={p}
                  className="text-[0.65rem] tracking-[0.15em] uppercase border border-[#c41e2a]/30 text-[#1c1917] px-3 py-1.5 rounded-sm"
                  whileHover={{ borderColor: "#c41e2a", backgroundColor: "#c41e2a10" }}
                  transition={{ duration: 0.2 }}>
                  {p}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="relative">
              <ParallaxImage src={IMAGES.business} alt="Premier Meats butcher counter"
                strength={50} className="rounded-sm shadow-md" aspectClass="aspect-[3/4]" />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#c41e2a] p-6 rounded-sm hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: 0.4 }}>
                <div className="serif text-4xl font-light text-white">7</div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/80 mt-1">Days a Week</div>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#a87c3e]/25 rounded-sm hidden md:block" />
            </div>
          </Reveal>
        </section>

        <div className="gold-divider" />

        {/* ── STATS ── */}
        <section className="py-20 bg-[#f0ece4]">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
            <Stat value="14+" label="Years Experience" />
            <Stat value="150" label="Planned Outlets" />
            <Stat value="7"   label="Days a Week" />
            <Stat value="10"  label="Provinces" />
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── CORE VALUES ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="section-label mb-4 red-rule">What Drives Us</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
              Core <em className="text-[#a87c3e]">Values</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Integrity and Honesty","Commitment","Teamwork","Rewarding Hard Work & Effort","Encouraging Risk & Responsibility","Empowering Others","Enjoying Our Work and Lives"]
              .map((v, i) => <ValuePill key={v} label={v} index={i} />)}
          </div>
        </section>

        {/* ── PULL-QUOTE BANNER ── */}
        <section className="relative h-[48vh] min-h-[320px] overflow-hidden flex items-center justify-center">
          <ParallaxImage src={IMAGES.banner} alt="Premium meat"
            strength={70} className="absolute inset-0 w-full h-full" aspectClass="h-full" />
          <div className="absolute inset-0 bg-[#f7f4ef]/65" />
          <Reveal>
            <div className="relative z-10 text-center px-6">
              <p className="section-label mb-4">Our Promise</p>
              <blockquote className="serif text-3xl md:text-5xl lg:text-6xl font-light text-[#1c1917] max-w-3xl leading-[1.05]">
                <em>"On the move 7 days a week — local and out of town deliveries made daily."</em>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ── MARKET SCOPE ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal direction="left">
            <p className="section-label mb-4 red-rule">Scope of Market</p>
            <h2 className="serif text-4xl font-light text-[#1c1917] mb-8 leading-tight">
              National. Regional.<br />
              <em className="text-[#a87c3e]">International.</em>
            </h2>
            <p className="text-[#78716c] leading-relaxed mb-10 text-[0.95rem]">
              We are targeting every segment of the market — from corporate accounts to the everyday Zambian consumer. Our distribution runs seven days a week, reaching every corner of the country and beyond.
            </p>
            <div className="space-y-3">
              {["The Corporate Market","The Formal Retail Sector","The Informal Retail Sector","The Mass Consumer Market","The Export Market"]
                .map((m, i) => (
                  <Reveal key={m} delay={i * 70}>
                    <div className="flex items-center gap-4 text-[#1c1917] text-sm">
                      <span className="w-8 h-px bg-[#c41e2a] flex-shrink-0" />
                      {m}
                    </div>
                  </Reveal>
                ))}
            </div>
            <div className="mt-10 border-l-2 border-[#a87c3e] pl-5">
              <p className="text-[#78716c] text-sm leading-relaxed italic">
                Premier Meats aims to open <strong className="text-[#1c1917] not-italic">150 outlets</strong> across all ten provinces of Zambia — an all-in-one, all-under-one-roof national retail footprint.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <ParallaxImage src={IMAGES.scope} alt="Premier Meats distribution"
                  strength={40} className="rounded-sm shadow-sm" aspectClass="aspect-[16/9]" />
              </div>
              <ParallaxImage src={IMAGES.team} alt="The Premier Meats team"
                strength={30} className="rounded-sm shadow-sm" aspectClass="aspect-square" />
              <motion.div
                className="bg-[#c41e2a] rounded-sm flex items-center justify-center p-6 aspect-square"
                whileHover={{ backgroundColor: "#a01624" }}
                transition={{ duration: 0.3 }}>
                <p className="serif text-white text-xl font-light text-center leading-tight italic">
                  "One stop.<br />All under<br />one roof."
                </p>
              </motion.div>
            </div>
          </Reveal>
        </section>

        <div className="gold-divider" />

        {/* ── MANAGEMENT TEAM ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="section-label mb-4 red-rule">The People Behind Premier</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
              Management <em className="text-[#a87c3e]">Team</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <TeamCard index={0}
              src={IMAGES.ceo} alt="Lubinda Chamileke — CEO"
              role="Chief Executive Officer" name="Lubinda Chamileke"
              bio="Over 14 years of senior management experience in food sales and marketing. Former Group Head of Business & Corporate Sales and Group Head of Marketing at Zambeef — Africa's largest vertically integrated meat company. Worked under USAID/TechnoServe as a consultant on sales capacity building."
              tags={["Zambeef Alumni","USAID / TechnoServe","Sales & Marketing","14+ Years"]} />
            <TeamCard index={1}
              src={IMAGES.secretary} alt="Maria M. Chamileke — Company Secretary"
              role="Company Secretary & Chief Administrative" name="Maria M. Chamileke"
              bio="A decade of experience as an Admin Specialist encompassing HR, Office Management, Purchasing & Supply, IT and Logistics. Former specialist at Game Stores, one of Zambia's leading retail chains. Coordinates Premier Meats' entire administrative support."
              tags={["HR & Administration","Logistics","Game Stores Alumni","Office Management"]} />
          </div>
        </section>

        <div className="gold-divider" />

        {/* ── WHY PREMIER ── */}
        <section className="py-24 bg-[#f0ece4]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="section-label mb-4 red-rule">Why Premier</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
                The Premier <em className="text-[#a87c3e]">Difference</em>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#a87c3e]/10">
              {[
                { num: "01", title: "Daily Delivery",     body: "Local and out-of-town deliveries made every single day, seven days a week." },
                { num: "02", title: "National Reach",     body: "Physical retail presence across all ten provinces of the Republic of Zambia." },
                { num: "03", title: "All Under One Roof", body: "Beef, pork, chicken, chevon, fish, eggs, and processed meats — one supplier." },
                { num: "04", title: "For Every Customer", body: "Whether corporate, wholesale, retail, or consumer — we have your range." },
              ].map((item, i) => (
                <Reveal key={item.num} direction="up" delay={i * 100}>
                  <motion.div className="bg-[#f0ece4] p-8 h-full"
                    whileHover={{ backgroundColor: "#ffffff" }} transition={{ duration: 0.25 }}>
                    <motion.div className="serif text-5xl font-light mb-6"
                      style={{ color: "rgba(196,30,42,0.15)" }}
                      whileHover={{ color: "rgba(196,30,42,0.4)" }}
                      transition={{ duration: 0.25 }}>
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
        <section className="py-28 md:py-36 text-center px-6 bg-[#f7f4ef]">
          <Reveal>
            <p className="section-label mb-6">Ready to Work With Us?</p>
            <h2 className="serif text-5xl md:text-6xl font-light text-[#1c1917] mb-8 leading-tight">
              Get in <em className="text-[#a87c3e]">Touch</em>
            </h2>
            <p className="text-[#78716c] max-w-lg mx-auto mb-12 leading-relaxed text-sm">
              We are committed to customer satisfaction. Visit one of our stores or reach management directly via the contact page.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a href="/contact"
                className="inline-block border border-[#c41e2a] text-[#1c1917] text-[0.75rem] tracking-[0.2em] uppercase px-10 py-4"
                whileHover={{ backgroundColor: "#c41e2a", color: "#ffffff" }}
                whileTap={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
                Contact Us
              </motion.a>
              <motion.a href="/products/beef"
                className="inline-block border border-[#a87c3e]/40 text-[#a87c3e] text-[0.75rem] tracking-[0.2em] uppercase px-10 py-4"
                whileHover={{ backgroundColor: "#a87c3e15", borderColor: "#a87c3e" }}
                whileTap={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
                Our Products
              </motion.a>
            </div>
          </Reveal>
        </section>

      </main>
    </>
  );
}