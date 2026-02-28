import { SignupResponse, SignupRequest, SignupError } from '@/types/Auth';
import { signup } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useSignup = () => {
  return useMutation<SignupResponse, AxiosError<SignupError>, SignupRequest>({
    mutationFn: async (body) => signup(body),

    onSuccess: (_data) => {
      console.log(
        '/auth/register 성공했습니다. \n상태: 학회비 미납상태(pending) \n회원가입요청이 완료되었습니다.',
      );
    },

    onError: (err) => {
      // 400 → 필드 누락, 형식 오류 등
      if (err.response?.status === 400) {
        console.error(
          '/auth/register 실패했습니다. \n상태: 필수 값 누락 또는 형식 오류입니다.',
          err,
        );
      }

      // 409 → 중복 / 이미 존재
      else if (err.response?.status === 409) {
        const errors = err.response?.data?.errors;

        if (errors?.length === 2) {
          console.error(
            '/auth/register 실패했습니다. \n상태: 모든 필드가 중복이거나 존재하는 정보입니다.',
            err,
          );
        } else if (errors?.[0]?.field === 'studentid') {
          console.error(
            '/auth/register 실패했습니다. \n상태: 학번 필드가 중복이거나 존재하는 정보입니다.',
            err,
          );
        } else if (errors?.[0]?.field === 'baekjoonId') {
          console.error(
            '/auth/register 실패했습니다. \n상태: 백준아이디 필드가 중복이거나 존재하는 정보입니다.',
            err,
          );
        } else {
          console.error('/auth/register 실패했습니다. \n상태: 이미 가입된 정보입니다.', err);
        }
      }

      // 그 외
      else {
        console.error(
          '/auth/register 실패했습니다. \n상태: 한양메일이 아니거나 기타 서버 오류입니다.',
          err,
        );
      }
    },
  });
};
