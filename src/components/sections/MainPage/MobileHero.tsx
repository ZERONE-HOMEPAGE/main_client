import Button from '@/components/ui/Button';
import logo from '@/assets/icon/logo.png';
import ScrollDownBtn from '@/components/ui/ScrollDownBtn';
import { useNavigate } from 'react-router-dom';
import { useMainCta } from '@/hooks/useMainCta';
import { RENEW_REDIRECT_URL } from '@/constants/urls';

export default function MobileHero() {
  const navigate = useNavigate();
  const cta = useMainCta();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-evenly bg-black text-white">
      <div>
        <img src={logo} alt="ZERONE" className="" />
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl text-[20px] text-gray-400">한양대학교 ERICA 소프트웨어융합대학</p>
          <h1 className="text-4xl font-bold text-white">알고리즘학회 영과일</h1>
          {cta === 'JOIN' && (
            <Button className="text-black" variant="primary" onClick={() => navigate('/login')}>
              가입하기 →
            </Button>
          )}
          {cta === 'RENEW' && (
            <Button
              className="text-black"
              variant="primary"
              onClick={() => window.location.assign(RENEW_REDIRECT_URL)}
            >
              갱신하기 →
            </Button>
          )}
        </div>
      </div>
      <div></div>
      <ScrollDownBtn />
    </div>
  );
}
