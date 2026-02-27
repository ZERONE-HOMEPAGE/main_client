import { useQuery } from '@tanstack/react-query';
import { getprofile } from '@/api/auth';
import type { ProfileResponse, DuesStatus } from '@/types/Auth';
import { isLoggedIn } from '@/utils/token';

export type MainCtaType = 'JOIN' | 'RENEW' | 'NONE';

function isPaidStatus(status: DuesStatus | null | undefined) {
  return status === 'YES' || status === 'HONOR';
}

function getMainCta(profile: ProfileResponse): MainCtaType {
  const current = profile.currentSemester;
  if (!current?.isMember) return 'RENEW';
  if (current.duesPending || profile.duesPending) return 'RENEW';
  const dues = current.duesStatus ?? profile.duesStatus;
  return isPaidStatus(dues) ? 'NONE' : 'RENEW';
}

export function useMainCta(): MainCtaType | null {
  const loggedIn = isLoggedIn();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getprofile,
    enabled: loggedIn,
    retry: false,
  });

  if (!loggedIn) return 'JOIN';
  if (isLoading) return null;
  if (!profile) return 'JOIN';
  return getMainCta(profile);
}
