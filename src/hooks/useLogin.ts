import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/Auth/useAuth';
import type { LoginRequest, LoginResponse, LoginSuccess } from '@/api/Auth/type';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginSuccess, Error, LoginRequest>({
    mutationFn: async (body) => {
      const res = await login(body);

      if ('code' in res) {
        switch (res.code) {
          case '401':
            navigate('/signup');

            break;
          case '403':
            navigate('/signup');
            break;
          default:
            navigate('/signup');
        }
        throw new Error(res.message || '로그인 실패');
      }

      return res;
    },
    onSuccess: (data) => {
      // 로그인 성공 후 처리
      localStorage.setItem('token', data.accessToken);
      navigate('/'); // 메인 페이지 이동
    },
    onError: (err) => {
      console.error('로그인 실패:', err.message);
    },
  });
};
