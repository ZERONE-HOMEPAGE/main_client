export interface LoginRequest {
  idToken: string;
}

export interface LoginSuccess {
  accessToken: string;
}

export interface LoginError {
  code: string;
  message: string;
  status: any;
}

export type LoginResponse = LoginSuccess | LoginError;
