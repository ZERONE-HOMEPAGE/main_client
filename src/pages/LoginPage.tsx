import googleLogo from '@/assets/icon/googleLogo.svg';
import logo from '@/assets/icon/logo.png';
import NewButton from '@/components/ui/NewButton';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    alert('로그인 로직 아직없음');
  };

  const handleSignup = () => {
    alert('회원가입 로직 아직없음');
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4">
      <div className="flex flex-col  gap-20">
        {/* zerone 로고 */}
        <div className="flex flex-col items-center gap-4">
          
            <img src={logo} alt="zerone 로고" className="h-48 w-auto" />
          
          <h1 className="text-center text-2xl font-bold text-white md:text-3xl">
            zerone 로그인하기
          </h1>
        </div>

        {/* 로그인/회원가입 버튼 */}
        <div className="w-full max-w-sm space-y-3">
          <NewButton
            variant="default"
            size="lg"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3"
          >
            <img src={googleLogo} alt="Google" className="h-5 w-5" />
            <span>Google 계정으로 로그인</span>
          </NewButton>
          <NewButton
            variant="outline"
            size="lg"
            onClick={handleSignup}
            className="w-full"
          >
            회원가입
          </NewButton>
        </div>
      </div>

    </div>
  );
}
