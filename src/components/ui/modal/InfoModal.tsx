import { useLogout } from '@/hooks/useLogout';
import { useGetInfo } from '@/hooks/useGetInfo';
import type { StudyHistory } from '@/types/Auth';
import { useState, useEffect } from 'react';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import InputModal from '@/components/ui/modal/InputModal';
import { useNavigate } from 'react-router-dom';

interface InfoProps {
  onClose: () => void;
}

const ROLE_MAP: Record<string, string> = {
  ROLE_ADMIN: '관리자',
  ROLE_MENTOR: '멘토',
  ROLE_USER: '일반 회원',
};

const DUES_LABEL: Record<string, string> = {
  YES: '납부 완료',
  NO: '미납',
  HONOR: '명예',
};

export default function InfoModal({ onClose }: InfoProps) {
  const navigate = useNavigate();
  const { mutate: LogoutMutate } = useLogout();
  const { data: profile, isLoading } = useGetInfo();
  const { mutate: UpdateMutate } = useUpdateProfile();
  const [Bjid, setBjid] = useState<string>(profile?.baekjoonId ?? '');

  // 백준아이디 업데이트
  const [newBjid, setNewBjid] = useState<string>(profile?.baekjoonId ?? '');
  const [BjidError, setBjidError] = useState<string>('');

  // modal
  const [onNew, setNew] = useState(false);

  // 재랜더링, 재요청 후 업뎃
  useEffect(() => {
    setBjid(profile?.baekjoonId ?? '');
  }, [profile]);

  // handle
  const handleLogout = () => {
    LogoutMutate();
    onClose();
    navigate('/');
  };

  const handleUpdate = () => {
    UpdateMutate(
      {
        baekjoonId: newBjid,
      },
      {
        onSuccess: (_data) => {
          setNew(false);
          setNewBjid(newBjid);
          setBjidError('');
        },
        onError: (_err) => {
          setBjidError('이미 존재하는 백준 ID입니다.');
        },
      },
    );
  };

  if (isLoading || !profile) {
    return (
      <div className="w-80 rounded-2xl bg-black/60 shadow-2xl">
        <div className="flex flex-col items-center px-6 pb-6 pt-8">
          <div className="h-20 w-20 animate-pulse rounded-full bg-[#2a2a2e]" />
          <div className="mt-3 h-5 w-24 animate-pulse rounded-full bg-[#2a2a2e]" />
          <div className="mt-2 h-3.5 w-16 animate-pulse rounded-full bg-[#2a2a2e]" />
        </div>
        <div className="space-y-4 px-6 pb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded-full bg-[#2a2a2e]" />
          ))}
        </div>
        <div className="px-6 pb-6">
          <div className="h-14 animate-pulse rounded-2xl bg-[#2a2a2e]" />
        </div>
      </div>
    );
  }

  const role = ROLE_MAP[profile.role ?? ''] ?? profile.role ?? '-';
  const duesLabel = DUES_LABEL[profile.duesStatus ?? ''] ?? '-';
  const currentStudies = profile.studies?.current ?? [];
  const profileImage =
    profile.profileImageUrl || sessionStorage.getItem('authUserImage') || undefined;

  return (
    <div className="w-72 rounded-2xl bg-[#18181b] shadow-2xl">
      {/* 프로필 */}
      <div className="flex w-full flex-row items-center px-6 pb-6 pt-8">
        <img src={profileImage} alt="profile" className="h-20 w-20 rounded-full object-cover" />
        <div className="ml-4">
          <p className="text-xl font-bold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-gray-400">{role}</p>
        </div>
      </div>

      {/* 정보 */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
          <InfoRow label="학번" value={profile.studentId ?? '-'} />
          <InfoRow label="기수" value={profile.generation ? `${profile.generation}기수` : '-'} />
          <InfoRow label="학회비 납입" value={duesLabel} />
          <span className="whitespace-nowrap text-sm text-gray-400">백준 ID</span>
          <div className="flex w-full items-center">
            {Bjid !== '' ? (
              <>
                <span className="text-sm text-white">{Bjid}</span>
                <button
                  className="ml-auto text-sm font-bold italic text-gray-500 underline underline-offset-2"
                  onClick={() => setNew(true)} // 임시
                >
                  수정
                </button>
              </>
            ) : (
              <button
                className="itailc text-sm font-bold text-gray-500 underline underline-offset-2"
                onClick={() => setNew(true)}
              >
                ID를 입력해주세요.
              </button>
            )}
          </div>
          <StudyRow studies={currentStudies} />
        </div>
      </div>

      {/* 로그아웃 */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="text-md flex w-full justify-center rounded-lg bg-zerone p-2 text-white transition-all transition-colors hover:bg-opacity-80"
        >
          로그아웃
        </button>
      </div>

      {/* 백준아이디 수정 모달*/}
      {onNew && (
        <InputModal
          isOpen={onNew}
          value={newBjid}
          error={BjidError}
          title={
            newBjid === '' ? '추가할 백준 ID를 입력해주세요.' : '수정할 백준 ID를 입력해주세요.'
          }
          description={'아래 하단 박스에다가 ID를 입력해주세요.'}
          onChange={setNewBjid}
          onSubmit={handleUpdate}
          onClose={() => setNew(false)}
        />
      )}

      {/* 안내 모달 */}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="whitespace-nowrap text-sm text-gray-400">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </>
  );
}

function StudyRow({ studies }: { studies: StudyHistory[] }) {
  return (
    <>
      <span className="whitespace-nowrap text-sm text-gray-400">스터디</span>
      <div className="flex flex-col gap-1">
        {studies.length === 0 ? (
          <span className="text-sm text-white">없음</span>
        ) : (
          studies.map((s) => (
            <span key={s.studyId} className="text-sm text-white">
              {s.name}
            </span>
          ))
        )}
      </div>
    </>
  );
}
