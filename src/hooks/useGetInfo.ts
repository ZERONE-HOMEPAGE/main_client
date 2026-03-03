import { getprofile } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetInfo = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getprofile,
    retry: false,
    enabled: options?.enabled,
  });
};
