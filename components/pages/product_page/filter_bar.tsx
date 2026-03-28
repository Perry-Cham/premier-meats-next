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
  console.log(subcategories);
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