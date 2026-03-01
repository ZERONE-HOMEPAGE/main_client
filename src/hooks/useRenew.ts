import { renew } from '@/api/auth';
import { RenewResponse } from '@/types/Auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRenew = () => {
  return useMutation<RenewResponse, AxiosError>({
    mutationFn: () => renew(),
    onSuccess: (data) => {
      if (data.step === 'RENEW_REQUESTED') {
        console.log('/auth/renew 성공했습니다. \n상태: ', data.step);
      } else if (data.step === 'RENEW_PENDING') {
        console.log('/auth/renew 성공했습니다. \n상태: ', data.step);
      } else if (data.step === 'RENEW_ALREADY_COMPLETED') {
        console.log('/auth/renew 성공했습니다. \n상태: ', data.step);
      } else if (data.step === 'RENEW_HONOR_AUTO') {
        console.log('/auth/renew 성공했습니다. \n상태: ', data.step);
      }
    },
    onError: (err) => {
      if (err.status === 403) {
        console.error('베리어토큰이 존재하지 않습니다.', err);
      }
      console.error(err);
    },
  });
};
