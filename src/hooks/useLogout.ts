import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/auth';
import type { LogoutResponse } from '@/types/Auth';

export const useLogout = () => {
  return useMutation<LogoutResponse>({
    mutationFn: () => logout(),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};
