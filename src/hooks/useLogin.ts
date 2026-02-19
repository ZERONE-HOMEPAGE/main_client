import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/Auth/useAuth';
import type { LoginRequest, LoginSuccess } from '@/api/Auth/type';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginSuccess, Error, LoginRequest>({
    mutationFn: (body) => login(body),

    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      navigate('/');
    },

    onError: (err: any) => {
      if (err.response?.data) {
        const data = err.response.data;
        if (data.code === '401') {
          // no idTkoen
          let idToken = err.config.data ? JSON.parse(err.config.data).idToken : undefined;
          navigate('/signup', { state: { idToken } });
        }
        if (data.code === '403') {
          if (data.status === 'PENDING') {
            alert('승인 대기중입니다.'); // 모달이든 컴포넌트에 표시
            navigate('/');
          } else {
            alert('학교 이메일이 아닙니다.'); // 모달이든 컴포넌트에 표시
            navigate('/');
          }
        }
      } else {
        console.error('로그인 실패(서버 무응답):', err.message);
      }
    },
  });
};
