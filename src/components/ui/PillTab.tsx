export default function PillTab({
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
      {/* Desktop - PillTab */}
      <div className="relative hidden justify-evenly gap-2 rounded-3xl bg-[#E0D7F1] p-1 md:flex">
        {tabElements.map((element, index) => (
          <button
            key={index}
            onClick={() => clickHandler(index)}
            className="relative z-10 w-32 py-2 text-center"
          >
            <p className={`${textclass}`}>{element.label}</p>
          </button>
        ))}
        <div
          className="absolute h-[calc(100%-0.5rem)] w-32 rounded-3xl bg-white p-2 px-4 transition-all duration-300 ease-in-out"
          style={{ left: `calc(${activeTabIdx} * (100% / ${tabElements.length}) + 0.3rem)` }}
        ></div>
      </div>

      {/* Mobile - Dropdown */}
      <div className="relative md:hidden">
        <select
          value={activeTabIdx}
          onChange={(e) => clickHandler(parseInt(e.target.value))}
          className="w-full appearance-none rounded-2xl border-2 border-[#E0D7F1] bg-white p-3 pr-8"
        >
          {tabElements.map((element, index) => (
            <option className="text-xs" key={index} value={index}>
              {element.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
}