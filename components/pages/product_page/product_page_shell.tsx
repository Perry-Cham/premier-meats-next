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

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <Reveal direction="left">
      <div className="flex items-end gap-6 mb-8">
        <div>
          <div className="w-10 h-0.5 bg-brand-red mb-3" />
          <h2 className="serif text-3xl md:text-4xl font-light text-brand-dark">
            {title}
          </h2>
        </div>
        <span className="serif text-5xl font-light text-brand-red/15 leading-none mb-1">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </Reveal>
  );
}

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

  const {content, products} = data;

  useEffect(() => {
    let p = totalProducts;
    for (const [key, value] of Object.entries(data.products)) {
      let p = totalProducts;
      p += products[key].length;
      setTotalProducts(p);
    }
  }, []);

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
      {filtered ? (
        <main className="beef-page">
          {/* ── HERO ── */}
          <section className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-cream/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/50 to-transparent z-10" />

            <div className="relative z-20 max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-20">
              <div className="overflow-hidden mb-4">
                <motion.h1
                  className="serif font-light text-brand-dark leading-[0.88]"
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
                  className="text-brand-muted leading-relaxed mb-2 text"
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
                    <div className="serif text-3xl font-light text-brand-red">
                      {s.value}
                    </div>
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase text-brand-muted mt-0.5">
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
          <section className="py-20 bg-brand-off-white">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <div className="grid md:grid-cols-3 gap-px bg-brand-gold/10">
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
                      className="bg-brand-off-white p-8 h-full"
                      whileHover={{ backgroundColor: "#ffffff" }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="serif text-xl font-light text-brand-dark mb-3">
                        {item.title}
                      </h3>
                      <p className="text-brand-muted text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-24 text-center px-6 bg-brand-cream">
            <Reveal>
              <p className="section-label mb-4">Need a Custom Order?</p>
              <h2 className="serif text-4xl md:text-5xl font-light text-brand-dark mb-6">
                Wholesale & Bulk <em className="text-brand-gold">Enquiries</em>
              </h2>
              <p className="text-brand-muted max-w-md mx-auto mb-10 leading-relaxed text-sm">
                We supply caterers, restaurants, wholesalers, and retailers
                across Zambia. Get in touch for volume pricing.
              </p>
              <a
                href="/contact"
                className="inline-block border border-brand-red text-brand-dark text-[0.75rem] tracking-[0.2em] uppercase px-10 py-4 hover:bg-brand-red hover:text-white transition-all duration-300"
              >
                Contact Us
              </a>
            </Reveal>
          </section>
        </main>
      ) : (
        <div className="min-h-screen items-center justify-center space-y-2">
          
        </div>
      )}

      <EnquiryBar />
    </>
  );
}
