import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/useLogout';
import { isLoggedIn, removeAccessToken } from '@/utils/token';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const [barOpen, setBarOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { mutate: LogoutMutate } = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = isLoggedIn();

  function barClick() {
    setBarOpen(!barOpen);
  }

  const menuItems = [
    { name: '스터디', path: '/study' },
    //{ name: '활동', path: null },
    //{ name: '게시판', path: null },
    //{ name: '컴파일러', path: 'https://zerone01.kr/compiler', external: true },
    { name: 'Q&A', path: '/QnA' },

    // 로그인 - 로그아웃버튼 토글을 위해 따로 빼도록 하겠습니다.
    //{ name: '로그인/회원가입', path: '/login' },

    //로그인 페이지 연결 임시 처리
  ];

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
    // 메인 페이지일 때만 observer 작동
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

  const handleLogout = () => {
    removeAccessToken();
    queryClient.removeQueries({ queryKey: ['profile'] });
    navigate('/');
    LogoutMutate();
  };

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
        <nav className="relative flex h-16 flex-row items-center justify-between px-4 text-white md:justify-around">
          <div className="font-semibold">
            <Link to="/">zerone</Link>
          </div>

          <div>
            <ul className="hidden flex-row space-x-5 md:flex">
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                    {name}
                  </NavLink>
                </li>
              ))}

              <li>
                {!token ? (
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) => (isActive ? 'font-bold' : '')}
                  >
                    로그인/회원가입
                  </NavLink>
                ) : (
                  <button onClick={handleLogout} className="text-white">
                    로그아웃
                  </button>
                )}
              </li>
            </ul>
            <div>
              <button className="text-xl md:hidden" onClick={barClick}>
                ☰
              </button>
            </div>
          </div>
          {barOpen && (
            <div className="fixed inset-0 z-20 bg-black bg-opacity-40" onClick={barClick}></div>
          )}
          <div
            className={`fixed right-0 top-0 z-30 h-full w-3/5 transform bg-white ${
              barOpen ? 'translate-x-0' : 'translate-x-full'
            } text-black transition-transform duration-300 ease-in-out`}
          >
            <div className="flex h-16 items-center px-7">
              <button className="text-xl" onClick={barClick}>
                ✕
              </button>
            </div>
            <ul className="flex flex-col space-y-4 p-4">
              {menuItems.map(({ name, path }) => (
                <li key={name} onClick={barClick}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      'block w-full rounded p-3 ' + (isActive ? 'font-bold' : '')
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
              <li className="p-3">
                {!token ? (
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) => (isActive ? 'font-bold' : '')}
                  >
                    로그인/회원가입
                  </NavLink>
                ) : (
                  <button onClick={handleLogout} className="test-white">
                    로그아웃
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
