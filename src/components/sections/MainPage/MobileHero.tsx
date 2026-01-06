import logo from '@/assets/icon/logo.png';
import Button from '@/components/ui/Button';
import ScrollDownBtn from '@/components/ui/ScrollDownBtn';

export default function MobileHero() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-evenly bg-black text-white">
      <div>
        <img src={logo} alt="ZERONE" className="" />
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl text-[20px] text-gray-400">한양대학교 ERICA 소프트웨어융합대학</p>
          <h1 className="text-4xl font-bold text-white">알고리즘학회 영과일</h1>
          <Button
            className="text-black"
            variant="primary"
            onClick={() => window.open('https://forms.gle/tM5VeU42QsDkQ7cz7', '_blank')}
          >
            가입하기 →
          </Button>
        </div>
      </div>
      <div></div>
      <ScrollDownBtn />
    </div>
  );
}
