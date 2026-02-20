import { LookupError, LookupRequest, LookupResponse } from '@/api/Auth/type';
import { lookup } from '@/api/Auth/useAuth';
import { useMutation } from '@tanstack/react-query';
import {} from 'axios';

export const useLookup = () => {
  return useMutation<LookupResponse, LookupError, LookupRequest>({
    mutationFn: (body) => lookup(body),

    onSuccess: (res) => {
      // 매칭됨 => mygration
      if (res.step === 'MIGRATION_FOUND') {
        console.log(
          '/auth/lookup_phone 성공했습니다. \n상태: 매칭되었습니다. \n/auth/migration 절차로 넘어갑니다. \n마이그레이션페이지로 이동합니다.',
        );
      }
      // 매칭안됨 => signup
      else {
        console.log(
          '/auth/lookup_phone 성공했습니다. \n상태: 매칭되는 정보가 없습니다. \n/auth/signup 절차로 넘어갑니다. \n회원가입페이지로 이동합니다.',
        );
      }
    },
    onError: (err) => {
      if (err.status === 409) {
        console.log('/auth/lookup_phone 실패했습니다. \n상태: 정보가 존재하는 번호입니다.');
      } else {
        console.error('/auth/lookup_phone 실패했습니다. \nerror:', err);
      }
    },
  });
};
