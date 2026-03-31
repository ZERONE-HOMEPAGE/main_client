import { useEffect, useState } from 'react';
import PillTab from '@/components/ui/PillTab/PillTab';
import BingoBoard from '@/components/sections/BingoPage/BingoBoard';
import BingoRankings from '@/components/sections/BingoPage/BingoRankings';
import { useGetSemesterBingo } from '@/hooks/Bingo/useGetSemesterBingo';
import { BingoEvent } from '@/types/Bingo';

export default function BingoPage() {
  const { data: list, isLoading } = useGetSemesterBingo();
  const [events, setEvents] = useState<BingoEvent[]>(list?.events ?? []);
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  useEffect(() => {
    if (list?.events && Array.isArray(list.events) && list.events.length > 0) {
      setEvents(list.events);
      setActiveTabIdx(0);
    }
  }, [list]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">로딩중...</div>
    );
  }

  const currentEvent = events?.[activeTabIdx];

  if (isLoading || !currentEvent) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        {isLoading ? '로딩중...' : '이벤트 데이터를 불러오는 중입니다...'}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 bg-[#141419] py-12 lg:px-40">
      <div>
        {/* pilltab */}
        <PillTab
          tabElements={events.map((event, idx) => ({
            label: event.name,
            active: activeTabIdx === idx,
          }))}
          clickHandler={(idx) => setActiveTabIdx(idx)}
          activeTabIdx={activeTabIdx}
          textclass="font-semibold"
        />
      </div>

      {/* bingo and rankings */}
      <div className="flex flex-row gap-10">
        <div>
          <p className="mb-4 text-white">업데이트는 정각에 순차적으로 진행됩니다.</p>
          {currentEvent && <BingoBoard eventId={String(currentEvent.eventId)} />}
        </div>

        <div>
          <p className="text-white">ranking</p>
          <BingoRankings eventId={String(currentEvent.eventId)} />
        </div>
      </div>
    </div>
  );
}
