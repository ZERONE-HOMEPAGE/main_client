import { MigrationError, MigrationRequest, MigrationResponse } from '@/types/Auth';
import { migration } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useMigration = () => {
  return useMutation<MigrationResponse, MigrationError, MigrationRequest>({
    mutationFn: async (body) => migration(body),

    onSuccess: (data) => {
      console.log('/auth/migration 성공했습니다. \n data:', data);
    },
    onError: (err) => {
      if (err.step === 'VALIDATION_ERROR') {
        console.log(
          '/auth/migration 실패했습니다. \n상태: 유효성 검사 실패. \n필드:',
          err.field,
          '\n메시지:',
          err.message,
        );
      } else {
        console.error('/auth/migration 실패했습니다. \n error:', err);
      }
    },
  });
};
