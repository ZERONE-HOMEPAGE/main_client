import { client } from '@/api/client';
import { LoginRequest, LoginResponse, SSOResponse } from '@/api/Auth/type';
import { SignupRequest, SignupResponse } from '@/api/Auth/type';
import { MigrationRequest, MigrationResponse } from '@/api/Auth/type';
import { LookupRequest, LookupResponse } from '@/api/Auth/type';

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

// backend login (더이상 미사용)
export const login = (body: LoginRequest): Promise<LoginResponse> =>
  client.post<LoginResponse>('/api/v1/auth/login', body).then((res) => res.data);

// backend signup
export const signup = (body: SignupRequest): Promise<SignupResponse> =>
  client.post<SignupResponse>('/api/v1/auth/register', body).then((res) => res.data);

// beckend Single Sign-ON
export const singleLogin = (body: LoginRequest): Promise<SSOResponse> =>
  client.post<SSOResponse>('/api/v1/auth/google', body).then((res) => res.data);

// migration
export const migration = (body: MigrationRequest): Promise<MigrationResponse> =>
  client.post<MigrationResponse>('/api/v1/auth/migrate', body).then((res) => res.data);

// lookup phone
export const lookup = (body: LookupRequest): Promise<LookupResponse> =>
  client.post<LookupResponse>('/api/v1/auth/lookup-phone', body).then((res) => res.data);
