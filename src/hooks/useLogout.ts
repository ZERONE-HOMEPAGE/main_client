import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/auth';
import { removeAccessToken } from '@/utils/token';
import type { LogoutResponse } from '@/types/Auth';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LogoutResponse>({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeAccessToken();
      queryClient.removeQueries({ queryKey: ['profile'] });
      queryClient.removeQueries({ queryKey: ['myStudies'] });
      navigate('/');
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};
