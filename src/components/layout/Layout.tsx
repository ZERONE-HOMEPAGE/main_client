import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
      <Footer />
    </div>
  );
}
