import DownIcon from "@/assets/icon/DownIcon.png";

interface QnAProps {
  id: number;
  Question: string;
  Answer: string;
  isActive?: boolean;
  onToggle?: (id: number) => void;
  animation?: string
  delay? : number
}

export default function QnA({ id, Question, Answer, isActive = false, onToggle, animation, delay }: QnAProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle?.(id);
    }
  };

  return (
    <div
      data-aos = {animation}
      data-aos-delay={delay}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onToggle?.(id)}
      onKeyDown={handleKey}
      className="w-full m-2 bg-white shadow-lg flex flex-col justify-center border border-[#E5E5EC] rounded-lg px-8 py-5 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:bg-[#F4F0FF]"
    >
      <div className="flex w-full justify-between items-center flex-1 break-keep">
        <p className="text-lg font-semibold">{Question}</p>
        <img
          src={DownIcon}
          alt=""
          className={`w-5 h-5 transition-transform duration-300 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`grid transition-[grid-template-rows,gap] duration-100 ease-linear ${
          isActive ? "grid-rows-[auto_1fr] gap-4" : "grid-rows-[auto_0fr] gap-0"
        }`}
      >
        <div className="overflow-hidden transition-opacity duration-700 ease-linear">
          {isActive && (
            <>
              <hr className="w-full border-t border-[#E5E5EC] my-4" />
              {Answer.split("'\n'").map((line, index) => (
                <p
                  key={index}
                  className="leading-relaxed text-base text-[#6B6B6B]">
                  {line}
              </p>
               ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
