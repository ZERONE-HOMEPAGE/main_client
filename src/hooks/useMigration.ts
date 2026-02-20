import { MigrationError, MigrationRequest, MigrationResponse } from '@/api/Auth/type';
import { migration } from '@/api/Auth/useAuth';
import { useMutation } from '@tanstack/react-query';

export const useMigration = () => {
  return useMutation<MigrationResponse, MigrationError, MigrationRequest>({
    mutationFn: async (body) => migration(body),

    onSuccess: (data) => {
      console.log('/auth/migration 성공했습니다. \n data:', data);
    },
    onError: (err) => {
      console.error('/auth/migration 실패했습니다. \n error:', err);
    },
  });
};
