import { getprofile } from '@/api/auth';
import { ProfileResponse } from '@/types/Auth';
import { useMutation } from '@tanstack/react-query';

export const useGetInfo = () => {
  return useMutation<ProfileResponse>({
    mutationFn: () => getprofile(),
    onSuccess: (data) => {
      console.log('/auth/getprofile 성공했습니다. \ndata:', data);
    },
  });
};
