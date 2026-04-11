import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/MainPage';
import StudyPage from '@/pages/StudyPage';
import QnAPage from '@/pages/QnAPage';
import NotFound from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import MygrationPage from '@/pages/MygrationPage';
import NetworkingForumPage from '@/pages/NetworkingForumPage';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 30,
    });

    function isKakaoTalkInAppBrowser() {
      return navigator.userAgent.toLowerCase().includes('kakaotalk');
    }

    if (isKakaoTalkInAppBrowser()) {
      const targetUrl = 'https://zerone01.kr';
      // 카카오톡 인앱 브라우저에서 외부 브라우저 열기
      window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(targetUrl);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/QnA" element={<QnAPage />} />
          <Route path="/networkingForum" element={<NetworkingForumPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/migration" element={<MygrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
