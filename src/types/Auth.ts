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
  message: string;
  errors: ErrorField[];
}

export interface ErrorField {
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

// get profile types
export interface ProfileResponse {
  userId: string;
  name: string;
  email: string;
  studentId?: string;
  generation?: number | string;
  department?: string;
  baekjoonId?: string;
  phoneNumber?: string;
  role?: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MENTOR' | string;
  status?: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED' | string;
  duesStatus?: DuesStatus;
  duesPending?: boolean;
  profileImageUrl?: string;
  createdAt?: string;
  activitySemesters?: ActivitySemester[];
  currentSemester?: CurrentSemester;
  studies?: {
    all: StudyHistory[];
    current: StudyHistory[];
  };
}

// (이해못함)
export type DuesStatus = 'YES' | 'NO' | 'HONOR';

export interface ActivitySemester {
  year: number;
  semester: number;
  duesStatus: DuesStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentSemester {
  year: number;
  semester: number;
  isMember: boolean;
  duesStatus: DuesStatus | null;
  duesPending: boolean;
}

export interface StudyHistory {
  studyId: string;
  name: string;
  year: number;
  semester: number;
  studyStatus: string;
  memberStatus: string;
  joinedAt: string;
  isCurrentSemester: boolean;
}

// logout types
export interface LogoutResponse {
  message: string;
}

// FastAPI 422 Validation Error
export interface ValidationDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationError422 {
  detail: ValidationDetail[];
}
