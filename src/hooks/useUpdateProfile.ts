import { updateprofile } from '@/api/auth';
import { UpdateProfileRequest, UpdateProfileError, UpdateProfileResponse } from '@/types/Auth';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, AxiosError<UpdateProfileError>, UpdateProfileRequest>({
    mutationFn: async (body) => updateprofile(body),

    onSuccess: (data) => {
      console.log('/auth/profile 성공했습니다. \n상태: 백준아이디를 변경하였습니다. \ndata:', data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        console.error(
          '/auth/profile 실패했습니다. \n상태: 이미 존재하는 아이디입니다. \nError:',
          err,
        );
      } else console.error('/auth/profile 실패했습니다. \nError:', err);
    },
  });
};
