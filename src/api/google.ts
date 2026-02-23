import {
  GoogleCredentialResponse,
  InitGoogleLoginOptions,
  RenderGoogleButtonOptions,
  GoogleWindow,
} from '../types/Google';

export function initGoogleLogin({ clientId, callback }: InitGoogleLoginOptions) {
  const google = (window as unknown as GoogleWindow).google;
  if (!google) return;

  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response: GoogleCredentialResponse) => {
      callback(response.credential);
    },
  });
}

export function renderGoogleButton({
  elementId,
  theme = 'outline',
  size = 'large',
  width,
}: RenderGoogleButtonOptions) {
  const google = (window as unknown as GoogleWindow).google;
  if (!google) return;

  google.accounts.id.renderButton(document.getElementById(elementId), {
    theme,
    size,
    width,
  });
}
