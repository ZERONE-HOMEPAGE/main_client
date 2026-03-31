import BingoCell from '@/components/sections/BingoPage/BingoCell';
import { useGetBingo } from '@/hooks/Bingo/useGetBingo';
import { BingoProblemDetail } from '@/types/Bingo';

interface Board {
  eventId: string;
}

export default function BingoBoard({ eventId }: Board) {
  const { data: Problem, isLoading } = useGetBingo(eventId);

  return (
    <div className="rounded-lg border-2 border-[#323239] p-5">
      <div className="grid grid-cols-5 gap-5">
        {Problem?.problemDetails.map((prob: BingoProblemDetail) => (
          <BingoCell
            key={`${eventId}-${prob.position}-${prob.problemId}`}
            problemId={prob.problemId}
            tier={prob.tier}
          />
        ))}
      </div>
    </div>
  );
}
