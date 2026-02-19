// login types
export interface LoginRequest {
  idToken: string;
}

export interface LoginSuccess {
  accessToken: string;
}

export type LoginResponse = LoginSuccess;

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

export interface SignupSuccess {
  message: string;
  userId: string;
  status: string;
}

export type SignupResponse = SignupSuccess;
