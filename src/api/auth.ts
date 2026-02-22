import { client } from '@/api/client';
import { LoginRequest, LoginResponse, LoginV2Response } from '@/types/Auth';
import { SignupRequest, SignupResponse } from '@/types/Auth';
import { MigrationRequest, MigrationResponse } from '@/types/Auth';
import { LookupRequest, LookupResponse } from '@/types/Auth';

// backend login (더이상 미사용)
export const login = (body: LoginRequest): Promise<LoginResponse> =>
  client.post<LoginResponse>('/auth/login', body).then((res) => res.data);

// backend signup
export const signup = (body: SignupRequest): Promise<SignupResponse> =>
  client.post<SignupResponse>('/auth/register', body).then((res) => res.data);

// beckend login v2
export const loginV2 = (body: LoginRequest): Promise<LoginV2Response> =>
  client.post<LoginV2Response>('/auth/google', body).then((res) => res.data);

// migration
export const migration = (body: MigrationRequest): Promise<MigrationResponse> =>
  client.post<MigrationResponse>('auth/migrate', body).then((res) => res.data);

// lookup phone
export const lookup = (body: LookupRequest): Promise<LookupResponse> =>
  client.post<LookupResponse>('auth/lookup-phone', body).then((res) => res.data);
