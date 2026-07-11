/* ─────────────────────────────────────────────────
   STICKY FILTER BAR
───────────────────────────────────────────────── */
export default function FilterBar({
  subcategories,
  active,
  onSelect,
}: {
  subcategories: string[];
  active: string | null;
  onSelect: (s: string | null) => void;
}) {
  return (
    <div className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
            active === null
              ? "bg-brand-dark text-white border-brand-dark"
              : "border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-gold"
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
                ? "bg-brand-red text-white border-brand-red"
                : "border-brand-border text-brand-muted hover:border-brand-red hover:text-brand-red"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
