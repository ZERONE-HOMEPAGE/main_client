import { useLocation } from 'react-router-dom';
import { decodeIdToken } from '@/utils/Decode';
import { parsing } from '@/utils/Parse';

interface SignupState {
  idToken: string;
  Phone: string;
}

export function useUserInfo() {
  const location = useLocation(); // loacte에 의존하여 코드가 작동하여 훅으로 넣었습니다.
  const { idToken } = (location.state as SignupState) ?? {}; // location 받기용 Phone (사용 x)
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
