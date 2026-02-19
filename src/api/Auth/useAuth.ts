import { client } from '@/api/client';
import { LoginRequest, LoginResponse } from './type';

// decoding
export function decodeIdToken(idToken: string) {
  try {
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);

    const jsonPayload = decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// backend login
export const login = (body: LoginRequest): Promise<LoginResponse> =>
  client.post<LoginResponse>('/api/v1/auth/login', body).then((res) => res.data);

// backend signup
