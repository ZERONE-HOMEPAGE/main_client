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
import ExamplePage from '@/pages/ExamplePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import MygrationPage from '@/pages/MygrationPage';
import RenewPage from '@/pages/RenewPage';

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
          <Route path="/QnA" element={<QnAPage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/renew" element={<RenewPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/migration" element={<MygrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
