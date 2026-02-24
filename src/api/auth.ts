import { client } from '@/api/client';
import { LoginRequest, LoginResponse, LoginV2Response, ProfileResponse } from '@/types/Auth';
import { SignupRequest, SignupResponse } from '@/types/Auth';
import { MigrationRequest, MigrationResponse } from '@/types/Auth';
import { LookupRequest, LookupResponse } from '@/types/Auth';

// backend login (더이상 미사용)
export const login = (body: LoginRequest): Promise<LoginResponse> =>
  client.post<LoginResponse>('api/v1/auth/login', body).then((res) => res.data);

// backend signup
export const signup = (body: SignupRequest): Promise<SignupResponse> =>
  client.post<SignupResponse>('api/v1/auth/register', body).then((res) => res.data);

// beckend login v2
export const loginV2 = (body: LoginRequest): Promise<LoginV2Response> =>
  client.post<LoginV2Response>('api/v1/auth/google', body).then((res) => res.data);

// migration
export const migration = (body: MigrationRequest): Promise<MigrationResponse> =>
  client.post<MigrationResponse>('api/v1/auth/migrate', body).then((res) => res.data);

// lookup phone
export const lookup = (body: LookupRequest): Promise<LookupResponse> =>
  client.post<LookupResponse>('api/v1/auth/lookup-phone', body).then((res) => res.data);

// get profile
export const getprofile = (): Promise<ProfileResponse> =>
  client.get('api/v1/auth/profile').then((res) => res.data);
