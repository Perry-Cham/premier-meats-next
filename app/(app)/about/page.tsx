"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { Reveal, ParallaxImage, Pill, ResponsibilityCard, QualityCard } from "@/components/pages/about_page_components/about_page_components"
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────
   IMAGE SLOTS
───────────────────────────────────────────────────────── */
const IMAGES = {
  // Hero — cattle on Zambian farmland / wide pastoral shot
  hero: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85",

  // Farm-to-plate section — livestock / farm operations
  farm: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&q=85",

  // Yetu delivery truck / logistics (replace with real truck photo)
  truck: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=85",

  // Quality section — butcher / processing / counter
  quality: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",

  // Pull-quote banner — wide pastoral / herd
  banner: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=70",

  // Team / store operations
  store: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=80",
};

/* ─────────────────────────────────────────────────────────
   MOTION CONFIG
───────────────────────────────────────────────────────── */
const EASE   = { duration: 0.75, ease: [0.16, 1, 0.3, 1] } as const;
const SPRING = { type: "spring", stiffness: 55, damping: 18 } as const;


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
      <main className="about-page">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: 1.14 }}>
            <img src={IMAGES.hero} alt="Yetu — cattle on Zambian farmland" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#f7f4ef]/25 to-[#1c1917]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/45 to-transparent" />

          {/* spinning badge */}
          <div className="absolute top-[18%] right-8 md:right-16 z-10 hidden md:flex flex-col items-center justify-center w-28 h-28 border border-[#a87c3e]/30 rounded-full bg-white/20 backdrop-blur-sm">
            <div className="spin-slow absolute inset-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs><path id="qsc" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"/></defs>
                <text fontSize="9" fill="#a87c3e" letterSpacing="2.5">
                  <textPath href="#qsc">Yetu · EST. 2025 · Lusaka ·</textPath>
                </text>
              </svg>
            </div>
            <span className="serif text-2xl text-[#a87c3e] font-light italic">YT</span>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-20">
            <motion.div className="flex items-center gap-2 mb-5"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ ...EASE, delay: 0.1 }}>
              <a href="/" className="text-[0.65rem] tracking-[0.2em] uppercase text-[#78716c] hover:text-[#a87c3e] transition-colors">Home</a>
              <span className="text-[#d4cfc6]">/</span>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c41e2a]">About</span>
            </motion.div>

            <div className="overflow-hidden mb-5">
              <motion.h1
                className="serif font-light text-[#1c1917] leading-[0.9]"
                style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}
                initial={{ y: "108%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ ...EASE, delay: 0.22 }}>
                About <em className="text-[#a87c3e]">Yetu</em>
              </motion.h1>
            </div>

            <motion.div className="max-w-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.42 }}>
              <p className="text-[#78716c] text-[0.95rem] leading-relaxed mb-2">
                A registered Zambian company — <strong className="text-[#1c1917]">Yetu LTD (PACRA Cert. No. 320190015975)</strong> — founded with a simple, powerful idea.
              </p>
              <p className="text-[#78716c] text-[0.95rem] leading-relaxed">
                Speed. Savings. Quality. <em>All under one roof.</em>
              </p>
            </motion.div>

            {/* credential chips */}
            <motion.div className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.62 }}>
              {[
                { label: "Est. 2025", color: "bg-[#c41e2a]" },
                { label: "PACRA Registered", color: "bg-[#1c1917]" },
                { label: "ZPPA Reg. No. 40670", color: "bg-[#a87c3e]" },
                { label: "Ndola, Zambia", color: "bg-[#1c1917]" },
              ].map((chip) => (
                <span key={chip.label} className={`${chip.color} text-white text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm`}>
                  {chip.label}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHAT IS Yetu — identity section
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal direction="left">
            <p className="section-label mb-4 red-rule">Who We Are</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight mb-8">
              A game-changer<br />
              <em className="text-[#a87c3e]">for customers.</em>
            </h2>
            <div className="space-y-4 text-[#78716c] leading-relaxed text-[0.95rem]">
              <p>
                Yetu is a Zambian company created with a focus on producing and supplying beef, pork, poultry, chevon, mutton, lamb, processed meats, eggs and fresh fish to local and regional export markets.
              </p>
              <p>
                We boast of having an exceptionally talented team with vast years of experience in every key area of the meat business — well-positioned to offer excellent service and food products to Zambia and beyond.
              </p>
              <p>
                We are driven to carry out all activities in the most efficient and effective manner, saving our customers time, effort and — most importantly — bottom-line costs through product <strong className="text-[#1c1917]">affordability</strong>, <strong className="text-[#1c1917]">accessibility</strong>, and <strong className="text-[#1c1917]">availability</strong>.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="relative">
              <ParallaxImage src={IMAGES.quality} alt="Yetu butcher operations"
                strength={50} className="rounded-sm shadow-md" aspectClass="aspect-[3/4]" />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#c41e2a] p-6 rounded-sm hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: 0.4 }}>
                <div className="serif text-4xl font-light text-white">No. 1</div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/80 mt-1">Quality Goal</div>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#a87c3e]/25 rounded-sm hidden md:block" />
            </div>
          </Reveal>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            FARM TO PLATE — the value chain story
            (unique to Yetu — they're farmers)
        ══════════════════════════════════════ */}
        <section className="bg-[#f0ece4] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <Reveal direction="left">
              <div className="relative">
                <ParallaxImage src={IMAGES.farm} alt="Yetu livestock farming"
                  strength={45} className="rounded-sm shadow-md" aspectClass="aspect-[4/3]" />
                {/* small accent image */}
                <motion.div
                  className="absolute -bottom-5 -right-5 w-32 h-32 overflow-hidden rounded-sm shadow-lg border-2 border-white hidden md:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.5 }}>
                  <img src={IMAGES.store} alt="Yetu store" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <p className="section-label mb-4 red-rule">Farm to Plate</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight mb-8">
                We don't just<br />sell meat —<br />
                <em className="text-[#a87c3e]">we raise it.</em>
              </h2>
              <div className="space-y-4 text-[#78716c] leading-relaxed text-[0.95rem]">
                <p>
                  Yetu is also a livestock farmer, proudly controlling the value chain from farm to plate. This end-to-end mastery allows us to guarantee superior quality, uncompromising freshness, and full traceability in every cut we deliver.
                </p>
                <p>
                  Powered by modern farming practices and world-class processing standards, we set the benchmark — not just meet it.
                </p>
              </div>

              {/* farm-to-plate steps */}
              <div className="mt-10 space-y-3">
                {[
                  { step: "01", label: "Livestock Farming", desc: "Own herds, efficient sourcing systems" },
                  { step: "02", label: "Processing",        desc: "World-class standards, full traceability" },
                  { step: "03", label: "Distribution",      desc: "Own fleet, doorstep delivery on demand" },
                ].map((s, i) => (
                  <Reveal key={s.step} delay={i * 80}>
                    <div className="flex items-start gap-5">
                      <span className="serif text-3xl font-light text-[#c41e2a]/30 leading-none mt-0.5 flex-shrink-0">{s.step}</span>
                      <div>
                        <p className="text-[#1c1917] text-sm font-medium">{s.label}</p>
                        <p className="text-[#78716c] text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            MISSION STATEMENT
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="section-label mb-4 red-rule">Our Mission</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
              What We Set Out<br /><em className="text-[#a87c3e]">to Achieve</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", body: "To be a company that meets food needs wherever they are — locally, regionally and internationally." },
              { num: "02", body: "To provide a one-stop, all-under-one-roof, all-in-one food solution with passion and professionalism for enduring results." },
              { num: "03", body: "To make food affordable, accessible and available to our target markets locally, regionally and internationally." },
              { num: "04", body: "To be an excellent food company able to attract, excite, and nurture diverse and committed human resources with exceptional skills." },
              { num: "05", body: "To generate a sustained, secure and competitive financial return for the shareholders and all stakeholders on investments." },
            ].map((item, i) => (
              <QualityCard key={item.num} num={item.num} body={item.body} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            PULL-QUOTE BANNER
        ══════════════════════════════════════ */}
        <section className="relative h-[44vh] min-h-[300px] overflow-hidden flex items-center justify-center">
          <ParallaxImage src={IMAGES.banner} alt="Yetu cattle"
            strength={65} className="absolute inset-0 w-full h-full" aspectClass="h-full" />
          <div className="absolute inset-0 bg-[#f7f4ef]/62" />
          <Reveal>
            <div className="relative z-10 text-center px-6">
              <p className="section-label mb-4">Our Philosophy</p>
              <blockquote className="serif text-3xl md:text-5xl lg:text-[3.5rem] font-light text-[#1c1917] max-w-3xl leading-[1.05]">
                <em>"Never compromise on supplying quality products and providing superior customer service."</em>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════════════════════════
            QUALITY POLICY — "To Be Number 1"
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="section-label mb-4 red-rule">Quality Policy</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-4">
              To Be <em className="text-[#c41e2a]">Number 1</em>
            </h2>
            <p className="text-[#78716c] max-w-xl mb-16 text-[0.95rem] leading-relaxed">
              Our quality objectives are not aspirations — they are the standard by which we measure every decision we make.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { num: "№1", body: "In terms of customer service and product quality." },
              { num: "№1", body: "In terms of meeting customer needs and exceeding customer expectations." },
              { num: "№1", body: "In terms of being customers' preferred and convenient shopping option where meat is concerned." },
              { num: "№1", body: "In terms of conducting business in a manner that builds long-lasting partnerships with customers, suppliers and all stakeholders." },
            ].map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 90}>
                <motion.div
                  className="flex gap-6 p-7 bg-white border border-[#e8e2d9] rounded-sm"
                  whileHover={{ borderColor: "#c41e2a", backgroundColor: "#fff8f8", y: -3 }}
                  transition={SPRING}
                >
                  <div className="serif text-5xl font-light text-[#c41e2a]/20 flex-shrink-0 leading-none mt-1">{item.num}</div>
                  <p className="text-[#1c1917] text-sm leading-relaxed pt-2">{item.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            CORE VALUES + GUIDING PRINCIPLES
            (two-column split — both from profile)
        ══════════════════════════════════════ */}
        <section className="bg-[#f0ece4] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="section-label mb-4 red-rule">How We Operate</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
                Values & <em className="text-[#a87c3e]">Principles</em>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Core Values */}
              <div>
                <Reveal>
                  <h3 className="serif text-2xl font-light text-[#1c1917] mb-6">Core Values</h3>
                </Reveal>
                <div className="grid gap-3">
                  {["Integrity and Honesty","Commitment","Teamwork","Rewarding Hard Work and Effort","Encouraging Risk-taking and Responsibility","Empowering Others","Enjoying Our Work and Our Lives"]
                    .map((v, i) => <Pill key={v} label={v} index={i} />)}
                </div>
              </div>

              {/* Guiding Principles */}
              <div>
                <Reveal>
                  <h3 className="serif text-2xl font-light text-[#1c1917] mb-6">Guiding Principles</h3>
                </Reveal>
                <div className="grid gap-3">
                  {["Customer-Centred","Working in Partnership","Accountable for Quality Results","Dedicated to Financial Integrity and Cost Effectiveness","Inspired and Innovative"]
                    .map((v, i) => <Pill key={v} label={v} index={i} accent />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            OUR STRENGTH — three pillars
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <Reveal direction="left">
              <p className="section-label mb-4 red-rule">Our Strength</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight mb-8">
                Built to<br /><em className="text-[#a87c3e]">deliver.</em>
              </h2>
              <p className="text-[#78716c] leading-relaxed mb-10 text-[0.95rem]">
                Our strength in this industry is our unlimited capacity to deliver nationwide within 48 hours of receiving orders. Three foundations make this possible.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "👥", title: "Experienced Team", body: "Vast years of experience across every key area of the meat business — from livestock sourcing to final delivery." },
                  { icon: "🐄", title: "Efficient Sourcing System", body: "An end-to-end livestock sourcing system that guarantees product consistency, freshness, and full traceability." },
                  { icon: "🚛", title: "Own Delivery Fleet", body: "We operate our own fleet of refrigerated delivery vehicles — no third-party logistics, no delays, no compromises." },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 100}>
                    <div className="flex gap-5">
                      <div className="w-11 h-11 rounded-sm bg-white border border-[#e8e2d9] flex items-center justify-center text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#1c1917] text-sm font-medium mb-1">{item.title}</p>
                        <p className="text-[#78716c] text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="relative">
                <ParallaxImage src={IMAGES.truck} alt="Yetu delivery fleet"
                  strength={45} className="rounded-sm shadow-md" aspectClass="aspect-[4/3]" />
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-[#1c1917] p-6 rounded-sm hidden md:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.4 }}>
                  <div className="serif text-3xl font-light text-white">48h</div>
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/70 mt-1">Nationwide</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            OUR RESPONSIBILITIES
        ══════════════════════════════════════ */}
        <section className="bg-[#f0ece4] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="section-label mb-4 red-rule">Our Responsibilities</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-16">
                Accountable to<br /><em className="text-[#a87c3e]">Everyone.</em>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              <ResponsibilityCard index={0}
                to="Customers"
                body="Yetu aims to anticipate and meet customer needs so as to become the customers' supplier of choice — being accessible, putting the customer as No. 1, and doing business the way the customer wants." />
              <ResponsibilityCard index={1}
                to="Employees"
                body="Yetu seeks to create sustainable employment and financially empower its staff — building a team of diverse, committed people with exceptional skills who know how to listen, learn and deliver." />
              <ResponsibilityCard index={2}
                to="Shareholders"
                body="Yetu ensures that its shareholders receive a sustained, secure, and competitive long-term return on their investment in the company." />
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            TARGET MARKET
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <Reveal direction="left">
              <p className="section-label mb-4 red-rule">Who We Serve</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] leading-tight mb-8">
                Our Target<br /><em className="text-[#a87c3e]">Market</em>
              </h2>
              <p className="text-[#78716c] leading-relaxed mb-10 text-[0.95rem]">
                Our scope is national, regional and international. We serve a broad spectrum of buyers — from institutions to the mass consumer market.
              </p>
              <div className="space-y-3">
                {[
                  "HORECA Institutions",
                  "Educational and Health Institutions",
                  "The Modern Trade Sector",
                  "The General Trade Sector",
                  "The Mass Consumer Market",
                  "The Export Market",
                ].map((m, i) => (
                  <Reveal key={m} delay={i * 65}>
                    <div className="flex items-center gap-4 text-[#1c1917] text-sm">
                      <span className="w-8 h-px bg-[#c41e2a] flex-shrink-0" />
                      {m}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div>
                {/* support supplies panel */}
                <div className="bg-white border border-[#e8e2d9] rounded-sm p-8 mb-6">
                  <div className="w-8 h-0.5 bg-[#a87c3e] mb-5" />
                  <h3 className="serif text-2xl font-light text-[#1c1917] mb-4">
                    Beyond Meat
                  </h3>
                  <p className="text-[#78716c] text-sm leading-relaxed mb-6">
                    Yetu is more than just a meat company. Through strategic alliances with other suppliers, we also provide essential support foodstuffs to fulfil our all-under-one-roof promise.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Mealie Meal","Flour","Rice","Cooking Oil","Spices & Seasonings"].map((s) => (
                      <motion.span key={s}
                        className="text-[0.65rem] tracking-[0.15em] uppercase border border-[#a87c3e]/30 text-[#1c1917] px-3 py-1.5 rounded-sm"
                        whileHover={{ borderColor: "#a87c3e", backgroundColor: "#a87c3e10" }}
                        transition={{ duration: 0.2 }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* retail projection panel */}
                <motion.div
                  className="bg-[#c41e2a] rounded-sm p-8"
                  whileHover={{ backgroundColor: "#a01624" }}
                  transition={{ duration: 0.3 }}>
                  <div className="serif text-5xl font-light text-white mb-2">150</div>
                  <div className="text-[0.6rem] tracking-[0.22em] uppercase text-white/70 mb-4">Outlets by 2031</div>
                  <p className="text-white/85 text-sm leading-relaxed">
                    A truly national retail footprint — in all ten provinces. Each outlet reflecting the "all-in-one, all-under-one-roof, one stop shop" strategy.
                  </p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <section className="py-28 md:py-36 text-center px-6 bg-[#f7f4ef]">
          <Reveal>
            <p className="section-label mb-6">Ready to Work With Us?</p>
            <h2 className="serif text-5xl md:text-6xl font-light text-[#1c1917] mb-8 leading-tight">
              Get in <em className="text-[#a87c3e]">Touch</em>
            </h2>
            <p className="text-[#78716c] max-w-md mx-auto mb-3 leading-relaxed text-sm">
              President Ave, Ndola, Zambia
            </p>
            <p className="text-[#78716c] max-w-md mx-auto mb-12 leading-relaxed text-sm">
              +260-977-345462
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a href="/contact"
                className="inline-block border border-[#c41e2a] text-[#1c1917] text-[0.75rem] tracking-[0.2em] uppercase px-10 py-4"
                whileHover={{ backgroundColor: "#c41e2a", color: "#ffffff" }}
                whileTap={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
                Contact Us
              </motion.a>
              <motion.a href="/products"
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