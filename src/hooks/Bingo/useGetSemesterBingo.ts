import { getBingoList } from '@/api/bingo';
import { useQuery } from '@tanstack/react-query';

export const useGetSemesterBingo = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['bingo'],
    queryFn: getBingoList,
    enabled: options?.enabled ?? true,
  });
};
