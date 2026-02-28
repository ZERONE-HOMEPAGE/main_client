import { getprofile } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetInfo = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getprofile,
    retry: false,
  });
};
