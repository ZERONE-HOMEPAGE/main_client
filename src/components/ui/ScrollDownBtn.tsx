import { scrollDown } from '@/utils/scroll';

export default function ScrollDownBtn() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-0 right-0 flex justify-center">
      <div
        onClick={scrollDown}
        className="pointer-events-auto flex animate-bounce flex-col items-center gap-2 p-3 hover:cursor-pointer"
      >
        <p className="hidden text-lg text-white md:block">Scroll</p>
        <div className="h-4 w-4 rotate-45 border-b-2 border-r-2 border-gray-100"></div>
      </div>
    </div>
  );
}
