import { useLocation } from 'react-router-dom';
import { decodeIdToken } from '@/utils/Decode';
import { parsing } from '@/utils/Parse';

interface SignupState {
  idToken: string;
  Phone: string;
}

export function useUserInfo() {
  const location = useLocation(); // from /login
  const { idToken } = (location.state as SignupState) ?? {};

  if (!idToken) {
    return {
      idToken: '',
      name: '',
      email: '',
      major: '',
    };
  }
  const decoded = decodeIdToken(idToken);
  const parsed = parsing(decoded);

  return {
    idToken,
    name: parsed?.name ?? '',
    email: decoded?.email ?? '',
    major: parsed?.major ?? '',
  };
}
