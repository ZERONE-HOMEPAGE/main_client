import Layout from '@/components/layout/Layout';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import NotFound from '@/pages/NotFoundPage';
import StudyPage from '@/pages/StudyPage';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 30,
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
