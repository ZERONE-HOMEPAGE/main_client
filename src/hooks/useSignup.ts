import { SignupResponse, SignupRequest } from '@/types/Auth';
import { signup } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: async (body) => signup(body),

    onSuccess: (_data) => {
      console.log(
        '/auth/register 성공했습니다. \n상태: 학회비 미납상태 \n회원가입요청이 완료되었습니다.',
      );
    },
    onError: (err: any) => {
      // 필드누락
      if (err.status === 400) {
        console.error('/auth/register 실패했습니다. \n상태: 필수 필드가 누락되었습니다.', err);
      }
      // 이미가입된 사용자
      else if (err.status === 409) {
        console.error('/auth/register 실패했습니다. \n상태: 이미 가입된 정보입니다.', err);
      }
      // not hanyang edu mail (가능성 x)
      else {
        console.error('/auth/register 실패했습니다. \n상태: 한양메일이 아닙니다.', err);
      }
    },
  });
};
