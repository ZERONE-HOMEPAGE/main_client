import axios, { type AxiosRequestConfig } from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true, // httpOnly 쿠키(refreshToken) 자동 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: access token 자동 첨부
client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
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

    if (error.response?.status !== 401 || originalRequest._retry) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      sessionStorage.setItem('accessToken', data.accessToken);

      processQueue(data.accessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${data.accessToken}`,
      };
      return client(originalRequest);
    } catch {
      // 갱신 실패 → 로그아웃 처리
      sessionStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
