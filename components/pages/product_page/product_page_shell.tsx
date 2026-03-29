"use client";
import { motion, useInView } from "motion/react";
import { useParams } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import axios from "axios";
import { useRef, useState, useEffect, use } from "react";
import ProductCard from "@/components/custom/product_card";
import FilterBar from "@/components/pages/product_page/filter_bar";
import EnquiryBar from "@/components/pages/product_page/enquiry_bar";
import { LoaderCircle } from "lucide-react";

/* ─────────────────────────────────────────────────
   FRAMER HELPERS
───────────────────────────────────────────────── */
const EASE = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

function Reveal({
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 36 : 0,
    x: direction === "left" ? -36 : direction === "right" ? 36 : 0,
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

/* ─────────────────────────────────────────────────
   SUBCATEGORY SECTION HEADER
───────────────────────────────────────────────── */
function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <Reveal direction="left">
      <div className="flex items-end gap-6 mb-8">
        <div>
          <div className="w-10 h-0.5 bg-[#c41e2a] mb-3" />
          <h2 className="serif text-3xl md:text-4xl font-light text-[#1c1917]">
            {title}
          </h2>
        </div>
        <span className="serif text-5xl font-light text-[#c41e2a]/15 leading-none mb-1">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────── */
interface Image {
  createdAt: string;
  updatedAt: string;
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  thumbnailURL: string | null;
  id: string;
}

interface ProductImage {
  image: Image;
  id: string;
}

interface Product {
  createdAt: string;
  updatedAt: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  images: ProductImage[];
  featured: boolean;
  _status: string;
  id: string;
  imagesrc: string;
}

interface HeroText {
  createdAt: string;
  updatedAt: string;
  category: string;
  content: SerializedEditorState;
  id: string;
}

interface PageContent {
  content: HeroText;
  products: Record<string, Product[]>;
}

export default function Product_Page({ data }: { data: PageContent }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<Record<string, Product[]> | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // Get the page content from data 
  const {content, products} = data;


  useEffect(() => {
    //Set Content to data
    for (const [key, value] of Object.entries(data.products)) {
      let p = totalProducts;
      p += products[key].length;
      setTotalProducts(p);
    }
  }, []);

  // Filter products by the selected subcategory
  useEffect(() => {
    if (activeFilter === null && content) {
      setFiltered(data.products);
    } else if (activeFilter) {
      const filtered = {
        [activeFilter]: data.products[activeFilter] || [],
      };
      setFiltered(filtered);
    }
  }, [activeFilter, content]);

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

      {filtered ? (
        <main className="beef-page">
          {/* ── HERO ── */}
          <section className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
            {/* warm light overlay — not black, consistent with light theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#f7f4ef]/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/50 to-transparent z-10" />

            <div className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-20">
              <div className="overflow-hidden mb-4">
                <motion.h1
                  className="serif font-light text-[#1c1917] leading-[0.88]"
                  style={{ fontSize: "clamp(4rem,11vw,9rem)" }}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...EASE, delay: 0.2 }}
                >
                  Our <span className="capitalize">{data.content.category}</span>
                </motion.h1>
              </div>

              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...EASE, delay: 0.45 }}
              >
                <RichText
                  data={content.content}
                  className="text-[#78716c] leading-relaxed mb-2 text"
                />
              </motion.div>

              {/* stats row */}
              <motion.div
                className="flex flex-wrap gap-8 mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...EASE, delay: 0.6 }}
              >
                {[
                  { value: `${totalProducts}`, label: "Products" },
                  {
                    value: `${Object.keys(products).length}`,
                    label: "Categories",
                  },
                  { value: "Daily", label: "Restocked" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="serif text-3xl font-light text-[#c41e2a]">
                      {s.value}
                    </div>
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase text-[#78716c] mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── FILTER BAR ── */}
          <FilterBar
            subcategories={Object.keys(products)}
            active={activeFilter}
            onSelect={setActiveFilter}
          />
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-20">
            {/* ── PRODUCT SECTIONS ── */}
            {Object.entries(filtered).map(([sub, products]) => (
              <section key={sub} id={sub.toLowerCase().replace(/\s+/g, "-")}>
                <SectionHeader title={sub} count={products.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} />
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
                  {
                    icon: "🌿",
                    title: "Freshly Restocked",
                    body: "Every product is restocked daily. You will never find day-old meat on our shelves.",
                  },
                  {
                    icon: "🚚",
                    title: "48h Nationwide",
                    body: "Order before noon and we deliver anywhere in Zambia within 48 hours.",
                  },
                  {
                    icon: "⚖️",
                    title: "Exact Weights",
                    body: "All products are weighed and labelled to the gram. No approximations.",
                  },
                ].map((item, i) => (
                  <Reveal key={item.title} direction="up" delay={i * 120}>
                    <motion.div
                      className="bg-[#f0ece4] p-8 h-full"
                      whileHover={{ backgroundColor: "#ffffff" }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="serif text-xl font-light text-[#1c1917] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#78716c] text-sm leading-relaxed">
                        {item.body}
                      </p>
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
                We supply caterers, restaurants, wholesalers, and retailers
                across Zambia. Get in touch for volume pricing.
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
      ) : (
        <div className="min-h-screen flex items-center justify-center space-x-2 space-y-2 flex-col">
          <LoaderCircle className="animate-spin" />
          <p>Please wait as we get things ready for you</p>
        </div>
      )}

      <EnquiryBar />
    </>
  );
}
