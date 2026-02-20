import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { singleLogin } from '@/api/Auth/useAuth';
import type { SSOResponse, LoginRequest } from '@/api/Auth/type';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<SSOResponse, Error, LoginRequest>({
    mutationFn: (body) => singleLogin(body),

    onSuccess: (data) => {
      // 성공
      if (data.step === 'LOGIN_SUCCESS') {
        localStorage.setItem('token', data.accessToken);
        console.log('/auth/google 성공했습니다. \n상태: success \naccessToken: ', data.accessToken);
        navigate('/');
      }
      // 학회비 미납
      else if (data.step === 'LOGIN_BLOCKED') {
        console.log('/auth/google 성공했습니다. \n상태: 학회비 미납 \n메인으로 돌아갑니다.');
        navigate('/');
      }
      // 전화번호 필요
      else
        console.log(
          '/auth/google 성공했습니다. \n상태: 전화번호 필요 \n/auth/lookup_phone절차로 넘어갑니다. \n이메일:',
          data.email,
        );
    },
    onError: (err: any) => {
      console.error('/auth/google 실패했습니다. \n error:', err);
    },
  });
};
