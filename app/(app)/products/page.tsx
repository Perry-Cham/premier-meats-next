"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────
   DUMMY DATA  — replace with Payload API fetch
───────────────────────────────────────────────── */
const SUBCATEGORIES = [
  "Steak Cuts",
  "Roasting Joints",
  "Braai & Grill",
  "Mince & Burgers",
  "Offal & Specialty",
];

const PRODUCTS = [
  // ── Steak Cuts ──
  {
    id: 1, name: "T-Bone Steak", subcategory: "Steak Cuts",
    price: 185, weight: "400–500g", badge: "Prime",
    image: "https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/TBone5_900x600.webp",
    desc: "The classic cut — tenderloin on one side, sirloin on the other, separated by the T-shaped bone.",
  },
  {
    id: 2, name: "Ribeye Steak", subcategory: "Steak Cuts",
    price: 210, weight: "350g", badge: "Prime",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    desc: "Well-marbled, richly flavoured. The most indulgent steak cut we offer.",
  },
  {
    id: 3, name: "Sirloin Steak", subcategory: "Steak Cuts",
    price: 165, weight: "300–350g", badge: null,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    desc: "Lean, firm, and full of flavour. Perfect for a quick, hot pan sear.",
  },
  {
    id: 4, name: "Fillet Steak", subcategory: "Steak Cuts",
    price: 245, weight: "200–250g", badge: "Premium",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    desc: "The most tender cut on the animal. Butter-soft texture, delicate flavour.",
  },

  // ── Roasting Joints ──
  {
    id: 5, name: "Beef Rib Roast", subcategory: "Roasting Joints",
    price: 420, weight: "1.5–2kg", badge: "Prime",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
    desc: "Standing rib roast — the showpiece joint for any serious Sunday table.",
  },
  {
    id: 6, name: "Topside Roast", subcategory: "Roasting Joints",
    price: 285, weight: "1.2–1.5kg", badge: null,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    desc: "Lean and versatile. Slow-roast for fork-tender slices or serve pink.",
  },
  {
    id: 7, name: "Silverside", subcategory: "Roasting Joints",
    price: 255, weight: "1–1.3kg", badge: null,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    desc: "Ideal for pot-roasting or corned beef. Lean, economical, deeply satisfying.",
  },
  {
    id: 8, name: "Brisket", subcategory: "Roasting Joints",
    price: 195, weight: "1–1.8kg", badge: "Slow Cook",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    desc: "Low and slow is the only way. Collagen-rich brisket melts into something extraordinary.",
  },

  // ── Braai & Grill ──
  {
    id: 9, name: "Short Ribs (Beef)", subcategory: "Braai & Grill",
    price: 155, weight: "600g", badge: "Braai Favourite",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    desc: "The undisputed king of the braai. Fatty, charred, fall-off-the-bone tender.",
  },
  {
    id: 10, name: "Skirt Steak", subcategory: "Braai & Grill",
    price: 130, weight: "350–400g", badge: null,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
    desc: "Thin, intensely beefy. Marinate, cook fast over high heat, slice against the grain.",
  },
  {
    id: 11, name: "Beef Sosaties", subcategory: "Braai & Grill",
    price: 95, weight: "500g (pack)", badge: "Ready to Braai",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    desc: "Pre-skewered, pre-marinated. Straight from the pack onto the coals.",
  },

  // ── Mince & Burgers ──
  {
    id: 12, name: "Premium Beef Mince", subcategory: "Mince & Burgers",
    price: 85, weight: "500g", badge: null,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80",
    desc: "20% fat content — the ideal ratio for bolognese, cottage pie, or meatballs.",
  },
  {
    id: 13, name: "Lean Beef Mince", subcategory: "Mince & Burgers",
    price: 92, weight: "500g", badge: "Lean",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    desc: "5% fat, high protein. The health-conscious choice without sacrificing flavour.",
  },
  {
    id: 14, name: "Beef Burger Patties", subcategory: "Mince & Burgers",
    price: 110, weight: "4 × 125g", badge: "Ready to Cook",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    desc: "Hand-formed, seasoned, ready for the pan or the grill. No fillers, no shortcuts.",
  },

  // ── Offal & Specialty ──
  {
    id: 15, name: "Ox Liver", subcategory: "Offal & Specialty",
    price: 55, weight: "500g", badge: null,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    desc: "Nutritionally dense, deeply savoury. Best pan-fried with caramelised onions.",
  },
  {
    id: 16, name: "Beef Oxtail", subcategory: "Offal & Specialty",
    price: 145, weight: "800g–1kg", badge: "Slow Cook",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    desc: "Gelatinous, rich, and deeply comforting. The foundation of any serious stew.",
  },
  {
    id: 17, name: "Tripe (Cleaned)", subcategory: "Offal & Specialty",
    price: 65, weight: "500g", badge: null,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    desc: "Cleaned and ready for the pot. A Zambian household staple, full of character.",
  },
];

/* ─────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────── */
type Product = typeof PRODUCTS[0];

/* ─────────────────────────────────────────────────
   FRAMER HELPERS
───────────────────────────────────────────────── */
const EASE = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const SPRING = { type: "spring", stiffness: 55, damping: 16 } as const;

function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 36 : 0,
    x: direction === "left" ? -36 : direction === "right" ? 36 : 0,
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

function ParallaxBg({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const y = useSpring(rawY, { stiffness: 80, damping: 22 });
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover" />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PRODUCT CARD
   - Hover: image scales, price panel slides up,
     card lifts with shadow spring
───────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal direction="up" delay={index * 80}>
      <motion.div
        className="group relative bg-white rounded-sm overflow-hidden border border-[#e8e2d9] flex flex-col cursor-default"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(28,25,23,0.13)" }}
        transition={SPRING}
      >
        {/* ── image ── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f0ece4]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/20 to-transparent" />

          {/* badge */}
          {product.badge && (
            <div className={`absolute top-3 left-3 text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 font-medium ${
              product.badge === "Prime" ? "bg-[#c41e2a] text-white" :
              product.badge === "Premium" ? "bg-[#1c1917] text-white" :
              "bg-[#a87c3e] text-white"
            }`}>
              {product.badge}
            </div>
          )}

          {/* weight chip */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#1c1917] text-[0.65rem] tracking-wide px-2.5 py-1 rounded-sm font-medium">
            {product.weight}
          </div>
        </div>

        {/* ── body ── */}
        <div className="flex flex-col flex-1 p-5">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#a87c3e] mb-1">
            {product.subcategory}
          </p>
          <h3 className="serif text-xl font-light text-[#1c1917] mb-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-[#78716c] text-xs leading-relaxed flex-1 line-clamp-2">
            {product.desc}
          </p>

          {/* price row */}
          <div className="mt-4 pt-4 border-t border-[#f0ece4] flex items-end justify-between">
            <div>
              <span className="text-[0.6rem] tracking-widest uppercase text-[#78716c]">From</span>
              <div className="serif text-2xl font-light text-[#c41e2a] leading-none mt-0.5">
                K{product.price.toFixed(2)}
              </div>
            </div>
            <motion.div
              className="flex items-center gap-1.5 text-[#a87c3e] text-[0.65rem] tracking-[0.18em] uppercase"
              animate={{ x: hovered ? 4 : 0 }}
              transition={SPRING}
            >
              <span>Enquire</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────
   STICKY FILTER BAR
───────────────────────────────────────────────── */
function FilterBar({
  subcategories, active, onSelect,
}: {
  subcategories: string[]; active: string | null; onSelect: (s: string | null) => void;
}) {
  return (
    <div className="sticky top-0 z-30 bg-[#f7f4ef]/95 backdrop-blur-sm border-b border-[#e8e2d9]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
            active === null
              ? "bg-[#1c1917] text-white border-[#1c1917]"
              : "border-[#e8e2d9] text-[#78716c] hover:border-[#a87c3e] hover:text-[#a87c3e]"
          }`}
        >
          All Cuts
        </button>
        {subcategories.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className={`flex-shrink-0 text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
              active === s
                ? "bg-[#c41e2a] text-white border-[#c41e2a]"
                : "border-[#e8e2d9] text-[#78716c] hover:border-[#c41e2a] hover:text-[#c41e2a]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SUBCATEGORY SECTION HEADER
───────────────────────────────────────────────── */
function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <Reveal direction="left">
      <div className="flex items-end gap-6 mb-8">
        <div>
          <div className="w-10 h-0.5 bg-[#c41e2a] mb-3" />
          <h2 className="serif text-3xl md:text-4xl font-light text-[#1c1917]">{title}</h2>
        </div>
        <span className="serif text-5xl font-light text-[#c41e2a]/15 leading-none mb-1">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────
   FLOATING ENQUIRY BAR
───────────────────────────────────────────────── */
function EnquiryBar() {
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
        className="inline-flex items-center gap-4 bg-[#1c1917] text-white text-[0.7rem] tracking-[0.2em] uppercase px-8 py-4 rounded-sm shadow-2xl hover:bg-[#c41e2a] transition-colors duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#a87c3e] animate-pulse" />
        Enquire About Bulk Orders
      </a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────── */
export default function BeefPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const grouped = SUBCATEGORIES.reduce<Record<string, Product[]>>((acc, sub) => {
    const items = PRODUCTS.filter((p) => p.subcategory === sub);
    if (items.length) acc[sub] = items;
    return acc;
  }, {});

  const filteredGroups = activeFilter
    ? { [activeFilter]: grouped[activeFilter] ?? [] }
    : grouped;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .beef-page { font-family:'Jost',sans-serif; background:#f7f4ef; color:#1c1917; }
        .serif { font-family:'Cormorant Garamond',serif; }
        .section-label { font-size:0.7rem; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; color:#a87c3e; }
        .gold-divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,#a87c3e40,transparent); }
        .scrollbar-none::-webkit-scrollbar { display:none; }
        .scrollbar-none { -ms-overflow-style:none; scrollbar-width:none; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>

      <main className="beef-page">

        {/* ── HERO ── */}
        <section className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
          <ParallaxBg
            src="https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/TBone5_900x600.webp"
            alt="Premium beef"
          />
          {/* warm light overlay — not black, consistent with light theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#f7f4ef]/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/50 to-transparent z-10" />

          <div className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-20">
            {/* breadcrumb */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...EASE, delay: 0.1 }}
            >
              <a href="/" className="text-[0.65rem] tracking-[0.2em] uppercase text-[#78716c] hover:text-[#a87c3e] transition-colors">Home</a>
              <span className="text-[#e8e2d9]">/</span>
              <a href="/products" className="text-[0.65rem] tracking-[0.2em] uppercase text-[#78716c] hover:text-[#a87c3e] transition-colors">Products</a>
              <span className="text-[#e8e2d9]">/</span>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c41e2a]">Beef</span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1
                className="serif font-light text-[#1c1917] leading-[0.88]"
                style={{ fontSize: "clamp(4rem,11vw,9rem)" }}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...EASE, delay: 0.2 }}
              >
                Our Beef
              </motion.h1>
            </div>

            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.45 }}
            >
              <p className="text-[#78716c] leading-relaxed mb-2 text-[0.95rem]">
                Beef is a unique, special food. Besides its amazing effect on the taste buds, beef offers a vast array of protein, vitamins and minerals that are essential for a healthy diet.
              </p>
              <p className="text-[#78716c] leading-relaxed text-[0.95rem]">
                Beef is a great staple for a well-balanced diet. Our main beef lines are listed below.
              </p>
            </motion.div>

            {/* stats row */}
            <motion.div
              className="flex flex-wrap gap-8 mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE, delay: 0.6 }}
            >
              {[
                { value: `${PRODUCTS.length}`, label: "Products" },
                { value: `${SUBCATEGORIES.length}`, label: "Categories" },
                { value: "Daily", label: "Restocked" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="serif text-3xl font-light text-[#c41e2a]">{s.value}</div>
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase text-[#78716c] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <FilterBar
          subcategories={SUBCATEGORIES}
          active={activeFilter}
          onSelect={setActiveFilter}
        />

        {/* ── PRODUCT SECTIONS ── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-20">
          {Object.entries(filteredGroups).map(([sub, products]) => (
            <section key={sub} id={sub.toLowerCase().replace(/\s+/g, "-")}>
              <SectionHeader title={sub} count={products.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="gold-divider" />

        {/* ── QUALITY PROMISE ── */}
        <section className="py-20 bg-[#f0ece4]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-3 gap-px bg-[#a87c3e]/10">
              {[
                { icon: "🌿", title: "Freshly Restocked", body: "Every product is restocked daily. You will never find day-old meat on our shelves." },
                { icon: "🚚", title: "48h Nationwide", body: "Order before noon and we deliver anywhere in Zambia within 48 hours." },
                { icon: "⚖️", title: "Exact Weights", body: "All products are weighed and labelled to the gram. No approximations." },
              ].map((item, i) => (
                <Reveal key={item.title} direction="up" delay={i * 120}>
                  <motion.div
                    className="bg-[#f0ece4] p-8 h-full"
                    whileHover={{ backgroundColor: "#ffffff" }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="serif text-xl font-light text-[#1c1917] mb-3">{item.title}</h3>
                    <p className="text-[#78716c] text-sm leading-relaxed">{item.body}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 text-center px-6 bg-[#f7f4ef]">
          <Reveal>
            <p className="section-label mb-4">Need a Custom Order?</p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#1c1917] mb-6">
              Wholesale & Bulk <em className="text-[#a87c3e]">Enquiries</em>
            </h2>
            <p className="text-[#78716c] max-w-md mx-auto mb-10 leading-relaxed text-sm">
              We supply caterers, restaurants, wholesalers, and retailers across Zambia. Get in touch for volume pricing.
            </p>
            <a
              href="/contact"
              className="inline-block border border-[#c41e2a] text-[#1c1917] text-[0.75rem] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c41e2a] hover:text-white transition-all duration-300"
            >
              Contact Us
            </a>
          </Reveal>
        </section>

      </main>

      <EnquiryBar />
    </>
  );
}