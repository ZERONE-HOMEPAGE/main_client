import { getProfile, logout } from '@/api/auth';
import type { ActivitySemester, AuthProfile, DuesStatus, StudyHistory } from '@/types/Auth';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

type BadgeTone = 'success' | 'danger' | 'honor' | 'pending' | 'muted';

type HeaderUser = {
  name: string;
  studentId: string;
  department: string;
  generation: string;
  avatarUrl: string;
  baekjoonId: string;
  duesLabel: string;
  duesTone: BadgeTone;
  currentSemesterLabel: string;
  activitySemesters: ActivitySemester[];
  studiesCurrent: StudyHistory[];
  studiesAll: StudyHistory[];
};

const menuItems = [
  { name: '스터디', path: '/study' },
  { name: 'Q&A', path: '/QnA' },
];

const badgeToneClass: Record<BadgeTone, string> = {
  success: 'border-[#238636] bg-[#122a1f] text-[#3fb950]',
  danger: 'border-[#da3633] bg-[#2a1215] text-[#f85149]',
  honor: 'border-[#8957e5] bg-[#1f1433] text-[#a371f7]',
  pending: 'border-[#9e6a03] bg-[#2d210b] text-[#d29922]',
  muted: 'border-[#30363d] bg-[#161b22] text-[#8b949e]',
};

function formatSemester(year?: number, semester?: number) {
  if (!year || !semester) return '-';
  return `${year}년 ${semester}학기`;
}

function duesStatusLabel(duesStatus: DuesStatus | null | undefined) {
  if (duesStatus === 'YES') return { label: '납부완료', tone: 'success' as const };
  if (duesStatus === 'NO') return { label: '미납', tone: 'danger' as const };
  if (duesStatus === 'HONOR') return { label: '명예회원', tone: 'honor' as const };
  return { label: '미등록', tone: 'muted' as const };
}

function currentSemesterDues(profile: AuthProfile) {
  const current = profile.currentSemester;
  if (!current?.isMember) {
    return { label: '미등록', tone: 'muted' as const };
  }
  if (current.duesPending || profile.duesPending) {
    return { label: '확인대기', tone: 'pending' as const };
  }
  return duesStatusLabel(current.duesStatus);
}

function toGeneration(profile: AuthProfile) {
  const raw = profile.generation;
  if (raw !== undefined && raw !== null) {
    const text = String(raw);
    return text.endsWith('기') ? text : `${text}기`;
  }

  const sid = (profile.studentId ?? '').replace(/\D/g, '');
  if (sid.length >= 4) {
    return `${sid.slice(2, 4)}기`;
  }
  return '-';
}

function mapToHeaderUser(profile: AuthProfile): HeaderUser {
  const dues = currentSemesterDues(profile);
  return {
    name: profile.name || sessionStorage.getItem('authUserName') || '사용자',
    studentId: profile.studentId || '-',
    department: profile.department || '-',
    generation: toGeneration(profile),
    avatarUrl: profile.profileImageUrl || sessionStorage.getItem('authUserImage') || '',
    baekjoonId: profile.baekjoonId || '-',
    duesLabel: dues.label,
    duesTone: dues.tone,
    currentSemesterLabel: formatSemester(profile.currentSemester?.year, profile.currentSemester?.semester),
    activitySemesters: profile.activitySemesters || [],
    studiesCurrent: profile.studies?.current || [],
    studiesAll: profile.studies?.all || [],
  };
}

function emptyHeaderUser(name: string, avatarUrl: string): HeaderUser {
  return {
    name,
    studentId: '-',
    department: '-',
    generation: '-',
    avatarUrl,
    baekjoonId: '-',
    duesLabel: '-',
    duesTone: 'muted',
    currentSemesterLabel: '-',
    activitySemesters: [],
    studiesCurrent: [],
    studiesAll: [],
  };
}

function ProfileDetails({ user, isMobile = false }: { user: HeaderUser; isMobile?: boolean }) {
  return (
    <>
      <div className={`mb-3 flex items-center gap-2 border-t border-[#21262d] ${isMobile ? 'pt-2' : 'pt-3'}`}>
        <span className={`rounded-full border px-2 py-1 text-xs ${badgeToneClass[user.duesTone]}`}>
          학회비 {user.duesLabel}
        </span>
        <span className="rounded-full border border-[#30363d] bg-[#161b22] px-2 py-1 text-xs text-[#8b949e]">
          현재 {user.currentSemesterLabel}
        </span>
      </div>

      <div
        className={`mb-3 grid gap-2 border-t border-[#21262d] ${isMobile ? 'grid-cols-1 pt-2' : 'grid-cols-2 pt-3'} text-sm`}
      >
        <div className="rounded-md bg-[#161b22] px-3 py-2">
          <p className="text-xs text-[#8b949e]">학번</p>
          <p className="text-white">{user.studentId}</p>
        </div>
        <div className="rounded-md bg-[#161b22] px-3 py-2">
          <p className="text-xs text-[#8b949e]">기수</p>
          <p className="text-white">{user.generation}</p>
        </div>
        <div className="rounded-md bg-[#161b22] px-3 py-2">
          <p className="text-xs text-[#8b949e]">학과</p>
          <p className="truncate text-white">{user.department}</p>
        </div>
        <div className="rounded-md bg-[#161b22] px-3 py-2">
          <p className="text-xs text-[#8b949e]">백준 ID</p>
          <p className="text-white">{user.baekjoonId}</p>
        </div>
      </div>

      <div className={`mb-3 border-t border-[#21262d] ${isMobile ? 'pt-2' : 'pt-3'}`}>
        <p className="mb-2 text-xs uppercase tracking-wide text-[#8b949e]">활동 학기</p>
        <div className="space-y-2">
          {user.activitySemesters.length > 0 ? (
            user.activitySemesters.slice(0, 4).map((item) => {
              const dues = duesStatusLabel(item.duesStatus);
              return (
                <div
                  key={`${item.year}-${item.semester}`}
                  className="flex items-center justify-between rounded-md bg-[#161b22] px-3 py-2 text-sm"
                >
                  <span>{formatSemester(item.year, item.semester)}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${badgeToneClass[dues.tone]}`}>
                    {dues.label}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="rounded-md bg-[#161b22] px-3 py-2 text-sm text-[#8b949e]">
              활동 학기 정보가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className={`mb-3 border-t border-[#21262d] ${isMobile ? 'pt-2' : 'pt-3'}`}>
        <p className="mb-2 text-xs uppercase tracking-wide text-[#8b949e]">
          수강중인 스터디 ({user.studiesCurrent.length})
        </p>
        <div className="space-y-2">
          {user.studiesCurrent.length > 0 ? (
            user.studiesCurrent.slice(0, 3).map((study) => (
              <div key={study.studyId} className="rounded-md bg-[#161b22] px-3 py-2 text-sm">
                <p className="text-white">{study.name}</p>
                <p className="text-xs text-[#8b949e]">
                  {formatSemester(study.year, study.semester)} · {study.memberStatus}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-md bg-[#161b22] px-3 py-2 text-sm text-[#8b949e]">
              현재 수강 중인 스터디가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className={`border-t border-[#21262d] ${isMobile ? 'pt-2' : 'pt-3'}`}>
        <p className="mb-2 text-xs uppercase tracking-wide text-[#8b949e]">
          전체 수강 스터디 ({user.studiesAll.length})
        </p>
        <div className="space-y-2">
          {user.studiesAll.length > 0 ? (
            user.studiesAll.slice(0, 3).map((study) => (
              <div key={`all-${study.studyId}`} className="rounded-md bg-[#161b22] px-3 py-2 text-sm">
                <p className="text-white">{study.name}</p>
                <p className="text-xs text-[#8b949e]">
                  {formatSemester(study.year, study.semester)} · {study.memberStatus}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-md bg-[#161b22] px-3 py-2 text-sm text-[#8b949e]">
              수강한 스터디 이력이 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const [barOpen, setBarOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(sessionStorage.getItem('accessToken'));
  const displayName = user?.name || sessionStorage.getItem('authUserName') || '사용자';
  const displayAvatar = user?.avatarUrl || sessionStorage.getItem('authUserImage') || '';

  const clearAuth = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('authUserName');
    sessionStorage.removeItem('authUserImage');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('logout 실패:', err);
    } finally {
      clearAuth();
      setUser(null);
      setProfileOpen(false);
      setBarOpen(false);
      navigate('/login');
    }
  };

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const fallbackName = sessionStorage.getItem('authUserName') || '사용자';
    const fallbackAvatar = sessionStorage.getItem('authUserImage') || '';

    if (!token) {
      setUser(null);
      return;
    }

    let mounted = true;
    setUser((prev) => prev || emptyHeaderUser(fallbackName, fallbackAvatar));

    (async () => {
      try {
        const profile = await getProfile();
        if (!mounted) return;
        setUser(mapToHeaderUser(profile));
      } catch {
        if (!mounted) return;
        setUser(emptyHeaderUser(fallbackName, fallbackAvatar));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && barOpen) {
        setBarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [barOpen]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!profileWrapRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
      }
    };

    window.addEventListener('mousedown', onOutsideClick);
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('mousedown', onOutsideClick);
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div
        ref={observerRef}
        className="pointer-events-none invisible absolute top-[100vh] h-px w-full"
      ></div>
      <header className="sticky top-0 z-50 bg-transparent">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-transparent backdrop-blur ${
            location.pathname !== '/' ? '' : 'transition-opacity duration-500 ease-out'
          } ${isHeroVisible ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        <div
          className={`pointer-events-none absolute inset-0 bg-black ${
            location.pathname !== '/' ? '' : 'transition-opacity duration-500 ease-out'
          } ${location.pathname === '/' && isHeroVisible ? 'opacity-0' : 'opacity-100'}`}
        ></div>

        <nav className="relative flex h-16 items-center justify-between px-4 text-white md:px-8">
          <div className="font-semibold">
            <Link to="/">zerone</Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex flex-row space-x-5">
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="relative" ref={profileWrapRef}>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleAuthClick}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 hover:bg-black/50"
                >
                  <span className="text-sm font-medium">{displayName}</span>
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt="프로필 이미지"
                      className="h-8 w-8 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#30363d] text-sm">
                      {displayName.slice(0, 1)}
                    </div>
                  )}
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium hover:bg-black/50 ${isActive ? 'font-bold' : ''}`
                  }
                >
                  로그인/회원가입
                </NavLink>
              )}

              {isLoggedIn && profileOpen && user && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl border border-[#30363d] bg-[#0d1117] p-3 text-[#c9d1d9] shadow-[0_14px_45px_rgba(0,0,0,0.5)]">
                  <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#30363d] bg-[#010409] p-3">
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt="프로필 이미지"
                        className="h-12 w-12 rounded-full border border-[#30363d] object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#30363d] bg-[#21262d] text-base font-semibold">
                        {displayName.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-semibold text-white">{displayName}</p>
                      <p className="text-xs text-[#8b949e]">{user.department}</p>
                    </div>
                  </div>

                  <ProfileDetails user={user} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-left text-[#f85149] hover:bg-[#21262d]"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="text-xl md:hidden" onClick={() => setBarOpen((prev) => !prev)}>
            ☰
          </button>
        </nav>

        {barOpen && (
          <div className="fixed inset-0 z-20 bg-black/40" onClick={() => setBarOpen(false)}></div>
        )}
        <div
          className={`fixed right-0 top-0 z-30 h-full w-3/5 transform overflow-y-auto border-l border-[#30363d] bg-[#0d1117] text-[#c9d1d9] transition-transform duration-300 ease-in-out ${
            barOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center px-6">
            <button className="text-xl" onClick={() => setBarOpen(false)}>
              ✕
            </button>
          </div>

          <ul className="flex flex-col space-y-2 px-4 pb-4">
            {menuItems.map(({ name, path }) => (
              <li key={name} className="w-full">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block w-full rounded-md px-3 py-2 hover:bg-[#161b22] ${isActive ? 'font-bold text-white' : ''}`
                  }
                  onClick={() => setBarOpen(false)}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mx-4 border-t border-[#21262d] pt-4">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="mb-3 flex w-full items-center gap-3 rounded-xl border border-[#30363d] bg-[#010409] px-3 py-2 text-left"
                >
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt="프로필 이미지"
                      className="h-10 w-10 rounded-full border border-[#30363d] object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#30363d] bg-[#21262d]">
                      {displayName.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{displayName}</p>
                    <p className="text-xs text-[#8b949e]">
                      {user?.studentId || '-'} · {user?.duesLabel || '-'}
                    </p>
                  </div>
                </button>

                {user && <ProfileDetails user={user} isMobile />}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mb-4 w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-left text-[#f85149] hover:bg-[#21262d]"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="block w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-center font-semibold text-white hover:bg-[#21262d]"
                onClick={() => setBarOpen(false)}
              >
                로그인/회원가입
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
