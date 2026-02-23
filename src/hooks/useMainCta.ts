import { getProfile } from '@/api/auth';
import type { AuthProfile, DuesStatus } from '@/types/Auth';
import { useEffect, useState } from 'react';

export type MainCtaType = 'JOIN' | 'RENEW' | 'NONE';

function isPaidStatus(status: DuesStatus | null | undefined) {
  return status === 'YES' || status === 'HONOR';
}

function getMainCta(profile: AuthProfile): MainCtaType {
  const current = profile.currentSemester;
  if (!current?.isMember) return 'RENEW';
  if (current.duesPending || profile.duesPending) return 'RENEW';

  const dues = current.duesStatus ?? profile.duesStatus;
  return isPaidStatus(dues) ? 'NONE' : 'RENEW';
}

export function useMainCta() {
  const [cta, setCta] = useState<MainCtaType>('JOIN');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      setCta('JOIN');
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const profile = await getProfile();
        if (!mounted) return;
        setCta(getMainCta(profile));
      } catch {
        if (!mounted) return;
        sessionStorage.removeItem('accessToken');
        setCta('JOIN');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return cta;
}
