import { getBingoProblem } from '@/api/bingo';
import { useQuery } from '@tanstack/react-query';

export const useGetBingo = (event_id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['bingo', 'problem', event_id],
    queryFn: () => getBingoProblem(event_id),
    enabled: options?.enabled ?? !!event_id,
  });
};
