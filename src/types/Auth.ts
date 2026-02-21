// login types 미사용
export interface LoginRequest {
  idToken: string;
}

export interface LoginResponse {
  accessToken: string;
}

// signup types
export interface SignupRequest {
  idToken: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  phoneNumber: string;
  baekjoonId?: string;
}

export interface SignupResponse {
  message: string;
  userId: string;
  status: string;
}

// LoginV2 types
export type LoginV2step = 'LOGIN_SUCCESS' | 'LOGIN_BLOCKED' | 'NEED_PHONE';

export interface LoginV2Success {
  step: 'LOGIN_SUCCESS';
  accessToken: string;
  refreshToken: string;
  profile: {
    userId: string;
  };
}

export interface LoginV2Blocked {
  step: 'LOGIN_BLOCKED';
  status: string;
  message: string;
}

export interface LoginV2Need {
  step: 'NEED_PHONE';
  email: string;
}

export type LoginV2Response = LoginV2Success | LoginV2Blocked | LoginV2Need;

// migration types
export interface MigrationRequest {
  idToken: string;
  phoneNumber: string;
  studentId?: string;
  baekjoonId?: string;
}

export type MigrationStep = 'LOGIN_SUCCESS' | 'LOGIN_BLOCKED' | 'VALIDATION_ERROR';

export interface MigrationSuccess {
  step: 'LOGIN_SUCCESS';
  accessToken: string;
  refreshToken: string;
  profile: { userId: string };
}

export interface MigrationBlocked {
  step: 'LOGIN_BLOCKED';
  status: string;
  message: string;
}

export interface MigrationError {
  step: 'VALIDATION_ERROR';
  field: string;
  message: string;
}

export type MigrationResponse = MigrationSuccess | MigrationBlocked | MigrationError;

// lookup phone types
export interface LookupRequest {
  idToken: string;
  phoneNumber: string;
}

export type LookupStep = 'MIGRATION_FOUND' | 'SIGNUP_REQUIRED';

export interface LookupMigrationFound {
  step: 'MIGRATION_FOUND';
  maskedName: string;
  maskedStudentId: string | null;
  needsStudentId: boolean;
  needsBaekjoonId: boolean;
}

export interface LookupSignupRequired {
  step: 'SIGNUP_REQUIRED';
}

export type LookupResponse = LookupMigrationFound | LookupSignupRequired;

export interface LookupError {
  code: number;
  message: string;
  status: null;
}
