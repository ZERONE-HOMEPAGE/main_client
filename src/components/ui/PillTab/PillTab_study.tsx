export default function PillTab_study({
  tabElements,
  clickHandler,
  activeTabIdx,
  textclass,
}: {
  tabElements: { label: string; active: boolean }[];
  clickHandler: (index: number) => void;
  activeTabIdx: number;
  textclass?: string;
}) {
  return (
    <>
      {/* Desktop */}
      <div className="relative hidden h-12 overflow-hidden rounded-3xl lg:flex">
        <div className="absolute inset-0 bg-[#E0D7F1]" />

        <div
          className="absolute bottom-1 top-1 w-32 rounded-3xl bg-white transition-all duration-300 ease-in-out"
          style={{
            left: `calc(${activeTabIdx} * (100% / ${tabElements.length}) + 0.6rem)`,
          }}
        />

        <div className="relative flex w-full items-center gap-5 px-3">
          {tabElements.map((element, index) => (
            <button
              key={index}
              onClick={() => clickHandler(index)}
              className="w-32 bg-transparent py-2 text-center"
            >
              <p className={textclass}>{element.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative lg:hidden">
        <select
          value={activeTabIdx}
          onChange={(e) => clickHandler(Number(e.target.value))}
          className="w-full appearance-none rounded-2xl border-2 border-[#E0D7F1] bg-white p-3 pr-8"
        >
          {tabElements.map((element, index) => (
            <option key={index} value={index} className="text-xs">
              {element.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
}
