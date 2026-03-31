import { useGetBingoRanking } from '@/hooks/Bingo/useGetBingoRankings';

interface RankProp {
  eventId: string;
}

export default function BingoRankings({ eventId }: RankProp) {
  const { data: Rank, isLoading } = useGetBingoRanking(eventId);

  return (
    <div className="flex w-full flex-col items-center">
      {/* top 3 */}
      <div className="mb-3 gap-10">
        {Rank?.rankings.map(
          (data, idx) =>
            idx < 3 && (
              <BingoUserCard
                name={data.name}
                Baekjoon_Id={data.baekjoonId}
                bingoCount={data.bingoCount}
              />
            ),
        )}
      </div>

      {/* 그 외 */}
      <div className="max-h-64 overflow-y-auto">
        {Rank?.rankings.map(
          (data, idx) =>
            idx > 3 && (
              <BingoUserCard
                name={data.name}
                Baekjoon_Id={data.baekjoonId}
                bingoCount={data.bingoCount}
              />
            ),
        )}
      </div>
    </div>
  );
}

// 유저 정보 컴포넌트
interface BingoUserCardProps {
  name: string;
  Baekjoon_Id: string;
  bingoCount: number;
}

function BingoUserCard({ name, Baekjoon_Id, bingoCount }: BingoUserCardProps) {
  return (
    <div className="m-5 flex min-w-[25rem] items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3">
      {/* 왼쪽 텍스트 */}
      <div className="text-sm text-neutral-200">
        {name} <span className="text-neutral-400">({Baekjoon_Id})</span>
      </div>

      {/* 오른쪽 */}
      <div className="rounded-md border border-neutral-600 px-3 py-1 text-xs text-neutral-200">
        {bingoCount}빙고
      </div>
    </div>
  );
}
