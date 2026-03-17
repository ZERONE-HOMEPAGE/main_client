import axios, { type AxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from '@/utils/token';

//개발환경에서 프록시 설정이 되어있는데, 이것의 필요성 파악할 필요 있음.(2026-03-15)
export const client = axios.create({
  baseURL: import.meta.env.DEV ? '/' : import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키 포함
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
});

// 요청 인터셉터: access token 자동 첨부
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 토큰 갱신 중복 방지
let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
};

// 응답 인터셉터: 401 시 토큰 갱신 후 재요청
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const isLogoutRequest = originalRequest.url?.includes('/auth/logout');
    if (error.response?.status !== 401 || originalRequest._retry || isLogoutRequest) {
      return Promise.reject(error);
    }

    // 이미 갱신 중이면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          resolve(client(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // refreshToken은 httpOnly 쿠키로 자동 전송됨
      const refreshBaseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.post(
        `${refreshBaseURL}/api/v1/auth/refresh`,
        {},
        { withCredentials: true },
      );

      setAccessToken(data.accessToken);

      processQueue(data.accessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${data.accessToken}`,
      };
      return client(originalRequest);
    } catch {
      // 갱신 실패 → 대기열 정리 후 로그아웃 처리
      pendingRequests = [];
      sessionStorage.removeItem('accessToken');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
