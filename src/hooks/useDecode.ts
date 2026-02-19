import { useLocation } from 'react-router-dom';
import { decodeIdToken } from '@/api/Auth/useAuth';
import { parsing } from '@/api/Util/useParse';

export function useUserInfo() {
  const location = useLocation();
  const idToken = (location.state as { idToken?: string })?.idToken;
  if (!idToken) {
    return {
      idToken: '',
      name: '',
      email: '',
      major: '',
    };
  }
  const decoded = decodeIdToken(idToken);
  const parsed = parsing(decoded.name);

  return {
    idToken,
    name: parsed?.name ?? '',
    email: decoded?.email ?? '',
    major: parsed?.major ?? '',
  };
}
