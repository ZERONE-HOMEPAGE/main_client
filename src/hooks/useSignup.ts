import { SignupSuccess, SignupRequest } from '@/api/Auth/type';
import { signup } from '@/api/Auth/useAuth';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  return useMutation<SignupSuccess, Error, SignupRequest>({
    mutationFn: async (body) => {
      const res = await signup(body);
      return res as SignupSuccess;
    },

    onError: (err: any) => {
      const data = err.response?.data || err;
    },
  });
};
