import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/useLogout';
import { getprofile } from '@/api/auth';
import { removeAccessToken } from '@/utils/token';

interface InfoProps {
  onClose: () => void;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: '활성', className: 'bg-green-500/20 text-green-400 border border-green-500/30' },
  PENDING: {
    label: '승인 대기',
    className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  },
  SUSPENDED: { label: '정지', className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  REJECTED: { label: '거절', className: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' },
};

const ROLE_MAP: Record<string, string> = {
  ROLE_ADMIN: '관리자',
  ROLE_MENTOR: '멘토',
  ROLE_USER: '일반 회원',
};

const DUES_MAP: Record<string, { label: string; className: string }> = {
  YES: {
    label: '납부 완료',
    className: 'bg-green-500/20 text-green-400 border border-green-500/30',
  },
  NO: { label: '미납', className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
};

export default function InfoModal({ onClose }: InfoProps) {
  const { mutate: LogoutMutate } = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getprofile,
    retry: false,
  });

  const handleLogout = () => {
    removeAccessToken();
    queryClient.removeQueries({ queryKey: ['profile'] });
    LogoutMutate();
    onClose();
    navigate('/');
  };

  if (isLoading || !profile) {
    return (
      <div className="w-72 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]/95 shadow-2xl backdrop-blur-md">
        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-[#30363d]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 animate-pulse rounded-full bg-[#30363d]" />
              <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-[#30363d]" />
            </div>
          </div>
          <div className="my-3 border-t border-[#30363d]" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 animate-pulse rounded-full bg-[#30363d]" />
          ))}
        </div>
      </div>
    );
  }

  const status = STATUS_MAP[profile.status ?? ''] ?? {
    label: profile.status ?? '-',
    className: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  };
  const role = ROLE_MAP[profile.role ?? ''] ?? profile.role ?? '-';
  const dues = DUES_MAP[profile.duesStatus ?? ''] ?? {
    label: profile.duesStatus ?? '-',
    className: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  };

  return (
    <div className="w-72 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]/95 shadow-2xl backdrop-blur-md">
      {/* 프로필 */}
      <div className="flex items-center gap-3 border-b border-[#30363d] px-4 py-4">
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#30363d]"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#30363d] text-base font-bold text-[#e6edf3]">
            {profile.name[0]}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#e6edf3]">{profile.name}</p>
          <p className="truncate text-xs text-[#8b949e]">{profile.email}</p>
        </div>
      </div>

      {/* 정보 */}
      <div className="space-y-2 px-4 py-3">
        <InfoRow label="학번" value={profile.studentId ?? '-'} />
        <InfoRow label="학과" value={profile.department ?? '-'} />
        <InfoRow label="기수" value={profile.generation ? `${profile.generation}기` : '-'} />
        <InfoRow label="역할" value={role} />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8b949e]">상태</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8b949e]">학회비</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dues.className}`}>
            {dues.label}
          </span>
        </div>
      </div>

      {/* 로그아웃 */}
      <div className="border-t border-[#30363d] px-4 py-3">
        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-[#30363d] bg-[#21262d] py-2 text-xs font-medium text-[#e6edf3] transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#8b949e]">{label}</span>
      <span className="text-xs font-medium text-[#e6edf3]">{value}</span>
    </div>
  );
}
