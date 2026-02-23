import { useEffect } from 'react';
import { RENEW_REDIRECT_URL } from '@/constants/urls';

export default function RenewPage() {
  useEffect(() => {
    window.location.replace(RENEW_REDIRECT_URL);
  }, []);

  return null;
}
