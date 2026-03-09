const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) => sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
export const removeAccessToken = () => sessionStorage.removeItem(ACCESS_TOKEN_KEY);
export const isLoggedIn = () => !!sessionStorage.getItem(ACCESS_TOKEN_KEY);
