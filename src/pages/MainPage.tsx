import { useState, useEffect } from 'react';
import Awards from '@/components/sections/MainPage/Awards';
import ClubIntro from '@/components/sections/MainPage/ClubIntro';
import CompetitionHistory from '@/components/sections/MainPage/CompetitionHistory';
import Event from '@/components/sections/MainPage/Event';
import Hero from '@/components/sections/MainPage/Hero';
import Contact from '@/components/sections/MainPage/Contact';
import MobileHero from '@/components/sections/MainPage/MobileHero';

export default function MainPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768); // md 기준
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div className="flex h-full min-w-full flex-col">
      <div className="flex h-screen flex-col md:-mt-16">{isMobile ? <MobileHero /> : <Hero />}</div>
      <div className="flex min-w-full flex-col items-center justify-center">
        <Event />
        <ClubIntro />
        <Awards />
        <CompetitionHistory />
        <Contact />
      </div>
    </div>
  );
}
