import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import * as AOS from "aos";
import "aos/dist/aos.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/MainPage';
import StudyPage from '@/pages/StudyPage';
import NotFound from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
