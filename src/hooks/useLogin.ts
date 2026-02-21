import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginV2 } from '@/api/auth';
import type { LoginV2Response, LoginRequest } from '@/types/Auth';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginV2Response, Error, LoginRequest>({
    mutationFn: (body) => loginV2(body),

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
      if (err.status === 403) {
        console.log(
          '/auth/google 실패했습니다. \n상태: 학교이메일이 아니거나 활성화상태가 아닙니다. \nerror:',
          err,
        );
      } else {
        console.error('/auth/google 실패했습니다. \nerror:', err);
      }
    },
  });
};
