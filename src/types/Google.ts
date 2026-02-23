// Google SDK에서 반환되는 credential response 타입
export interface GoogleCredentialResponse {
  credential: string; // id_token
  select_by?: string;
  client_id?: string;
}

// initGoogleLogin
export interface InitGoogleLoginOptions {
  clientId: string;
  callback: (idToken: string) => void;
}

// renderGoogleButton option
export interface RenderGoogleButtonOptions {
  elementId: string;
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'small' | 'medium' | 'large';
  width?: number;
}

// window.google type
export interface GoogleWindow {
  google: {
    accounts: {
      id: {
        initialize: (options: {
          client_id: string;
          callback: (response: GoogleCredentialResponse) => void;
        }) => void;
        renderButton: (
          element: HTMLElement | null,
          options?: { theme?: string; size?: string; width?: number },
        ) => void;
        prompt: () => void;
      };
    };
  };
}
