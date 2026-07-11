"use client";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  product: {
    name?: string;
    price?: string | number;
    imagesrc: string;
    subcategory?: string;
    weight?: string;
    badge?: string | null;
    desc?: string;
  };
}

const SPRING = { type: "spring", stiffness: 55, damping: 16 } as const;

export default function Product_Card({ product }: Props) {
  const { name, price, imagesrc, subcategory, weight, badge, desc } = product;
  const [hovered, setHovered] = useState(false);
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  const formattedPrice =
    numPrice != null && !isNaN(numPrice) ? `K${numPrice.toFixed(2)}` : null;

  const badgeColor =
    badge === "Prime"
      ? "bg-brand-red text-white"
      : badge === "Premium"
        ? "bg-brand-dark text-white"
        : "bg-brand-gold text-white";

  return (
    <motion.div
      className="group relative bg-white rounded-sm overflow-hidden border border-brand-border flex flex-col cursor-default"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(28,25,23,0.13)" }}
      transition={SPRING}
    >
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-off-white">
        {imagesrc ? (
          <motion.img
            src={imagesrc}
            alt={name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-placeholder">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/15 to-transparent" />

        {badge && (
          <div
            className={`absolute top-3 left-3 text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 font-medium ${badgeColor}`}
          >
            {badge}
          </div>
        )}
        {weight && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark text-[0.65rem] tracking-wide px-2.5 py-1 rounded-sm font-medium">
            {weight}
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-5">
        {subcategory && (
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-gold mb-1">
            {subcategory}
          </p>
        )}
        <h3
          className="serif text-xl font-light text-brand-dark mb-2 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {name}
        </h3>
        {desc && (
          <p className="text-brand-muted text-xs leading-relaxed flex-1 line-clamp-2">
            {desc}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-brand-off-white flex items-end justify-between">
          {formattedPrice ? (
            <div>
              <span className="text-[0.6rem] tracking-widest uppercase text-brand-muted">
                From
              </span>
              <div
                className="text-2xl font-light text-brand-red leading-none mt-0.5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {formattedPrice}
              </div>
            </div>
          ) : (
            <div className="text-[0.65rem] tracking-wide uppercase text-brand-muted">
              Price on enquiry
            </div>
          )}
          <motion.div
            className="flex items-center gap-1.5 text-brand-gold text-[0.65rem] tracking-[0.18em] uppercase"
            animate={{ x: hovered ? 4 : 0 }}
            transition={SPRING}
          >
            <span>Enquire</span>
            <span>→</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
