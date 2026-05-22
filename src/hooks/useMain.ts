import { useQuery } from '@tanstack/react-query';
import { getMainEvents, getAwards } from '@/api/main';

export const useMainEvents = () => {
  return useQuery({
    queryKey: ['mainEvents'],
    queryFn: getMainEvents,
  });
};

export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: getAwards,
  });
};
