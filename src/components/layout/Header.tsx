import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [barOpen, setBarOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  function barClick() {
    setBarOpen(!barOpen);
  }
  const menuItems = [
    { name: '스터디', path: '/study' },
    { name: '활동', path: null },
    { name: '게시판', path: null },
    { name: '컴파일러', path: 'https://zerone01.kr/compiler', external: true },
    { name: 'Q&A', path: null },
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
  }, []);

  return (
    <>
      <div
        ref={observerRef}
        className="pointer-events-none invisible absolute top-[100vh] h-px w-full"
      ></div>
      <header className="sticky top-0 z-50 bg-transparent">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-transparent backdrop-blur transition-opacity duration-500 ease-out ${
            isHeroVisible ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 ease-out ${
            location.pathname === '/' && isHeroVisible ? 'opacity-0' : 'opacity-100'
          }`}
        ></div>
        <nav className="relative flex h-16 flex-row items-center justify-between px-4 text-white md:justify-around">
          <div className="font-semibold">
            <Link to="/">zerone</Link>
          </div>

          <div>
            <ul className="hidden flex-row space-x-5 md:flex">
              {menuItems.map(({ name, path, external }) => (
                <li key={name}>
                  {path ? (
                    external ? (
                      <a href={path}>{name}</a>
                    ) : (
                      <NavLink
                        to={path}
                        className={({ isActive }) => (isActive ? 'font-bold' : '')}
                      >
                        {name}
                      </NavLink>
                    )
                  ) : (
                    <span>{name}</span>
                  )}
                </li>
              ))}
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
              {menuItems.map(({ name, path, external }) => (
                <li key={name} onClick={barClick} className="w-full">
                  {path ? (
                    external ? (
                      <a href={path} className="block w-full rounded p-3">
                        {name}
                      </a>
                    ) : (
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          'block w-full rounded p-3 ' + (isActive ? 'font-bold' : '')
                        }
                      >
                        {name}
                      </NavLink>
                    )
                  ) : (
                    <div className="block w-full p-3">{name}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
