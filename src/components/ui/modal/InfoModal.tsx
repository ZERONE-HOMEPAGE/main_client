import { useEffect, useState } from 'react';
import { useLogout } from '@/hooks/useLogout';
import { getprofile } from '@/api/auth';
import { ProfileResponse } from '@/types/Auth';
import ActionButton from '@/components/ui/ActionButton';

interface InfoProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoProps) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const { mutate: LogoutMutate } = useLogout();

  const handleLogout = () => {
    LogoutMutate();
    sessionStorage.removeItem('accessToken');
    onClose(); // 닫기
  };

  // 훅으로 바꿔서
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getprofile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="absolute right-4 top-14 z-50 w-64 rounded-2xl bg-white p-4 shadow-xl">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-14 z-50 w-64 rounded-2xl border bg-white p-5 shadow-xl">
      {/* 프로필 영역 */}
      <div className="mb-4 flex flex-col items-center gap-2">
        {profile.profileImageUrl && (
          <img
            src={profile.profileImageUrl}
            alt="profile"
            className="h-16 w-16 rounded-full object-cover"
          />
        )}

        <p className="text-lg font-semibold">{profile.name}</p>
        <p className="text-sm text-gray-500">{profile.email}</p>
      </div>

      {/* 정보 영역 */}
      <div className="mb-4 space-y-1 text-sm">
        <p>학번: {profile.studentId ?? '-'}</p>
        <p>역할: {profile.role}</p>
        <p>상태: {profile.status}</p>
        <p>회비: {profile.duesStatus ?? '-'}</p>
      </div>

      {/* 버튼 영역 */}
      <ActionButton onClick={handleLogout} size="sm">
        로그아웃
      </ActionButton>
    </div>
  );
}
