import { getBingoRanking } from '@/api/bingo';
import { useQuery } from '@tanstack/react-query';

export const useGetBingoRanking = (event_id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['bingo', 'ranking', event_id],
    queryFn: () => getBingoRanking(event_id),
    enabled: options?.enabled ?? !!event_id,
  });
};
