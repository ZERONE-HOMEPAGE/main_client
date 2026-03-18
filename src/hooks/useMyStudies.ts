import { useQuery } from '@tanstack/react-query';
import { getMyStudies } from '@/api/study';
import { isLoggedIn } from '@/utils/token';

export const useMyStudies = () => {
  return useQuery({
    queryKey: ['myStudies'],
    queryFn: getMyStudies,
    enabled: isLoggedIn(),
    retry: false,
  });
};
