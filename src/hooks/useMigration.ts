import { MigrationError, MigrationRequest, MigrationResponse } from '@/types/Auth';
import { migration } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMigration = () => {
  return useMutation<MigrationResponse, AxiosError<MigrationError>, MigrationRequest>({
    mutationFn: async (body) => migration(body),

    onSuccess: (data) => {
      // migration success
      if (data.step === 'LOGIN_SUCCESS') {
        console.log('migration 성공. \n상태: 학회비 지불 확인 \n메인화면으로 이동합니다.');
      }
      // migration uccesss and not pending
      else {
        console.log('migration 성공. \n상태: 학회비 미지불 \n메인화면으로 이동합니다.');
      }
    },
    onError: (err) => {
      if (err.response?.data.step === 'VALIDATION_ERROR') {
        console.log(
          '/auth/migration 실패했습니다. \n상태: 유효성 검사 실패. \n필드:',
          err.response?.data.field,
          '\n메시지:',
          err.response?.data.message,
        );
      } else {
        console.error('/auth/migration 실패했습니다. \n error:', err);
      }
    },
  });
};
