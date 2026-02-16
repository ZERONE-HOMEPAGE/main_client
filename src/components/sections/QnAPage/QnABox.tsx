import DownIcon from '@/assets/icon/DownIcon.png';

interface QnAProps {
  id: number;
  Question: string;
  Answer: string;
  isActive?: boolean;
  onToggle?: (id: number) => void;
  animation?: string;
  delay?: number;
}

export default function QnA({
  id,
  Question,
  Answer,
  isActive = false,
  onToggle,
  animation,
  delay,
}: QnAProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle?.(id);
    }
  };

  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onToggle?.(id)}
      onKeyDown={handleKey}
      className="m-2 flex w-full cursor-pointer select-none flex-col justify-center rounded-lg border border-[#E5E5EC] bg-white px-8 py-5 shadow-lg transition-shadow duration-300 hover:bg-[#F4F0FF] hover:shadow-xl"
    >
      <div className="flex w-full flex-1 items-center justify-between break-keep">
        <p className="text-md font-semibold md:text-lg">{Question}</p>
        <img
          src={DownIcon}
          alt=""
          className={`h-5 w-5 transition-transform duration-300 ${
            isActive ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      <div
        className={`grid transition-[grid-template-rows,gap] duration-100 ease-in ${
          isActive ? 'grid-rows-[auto_1fr] gap-4' : 'grid-rows-[auto_0fr] gap-0'
        }`}
      >
        <div className="overflow-hidden transition-opacity duration-700 ease-in">
          {isActive && (
            <>
              <hr className="my-4 w-full border-t border-[#E5E5EC]" />
              <p className="whitespace-pre-wrap text-base leading-relaxed text-[#6B6B6B]">
                {' '}
                {Answer}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
