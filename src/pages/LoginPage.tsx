import logo from '@/assets/icon/logo.png';
import ActionButton from '@/components/ui/ActionButton';
import GoogleLogo from '@/assets/icon/googleLogo.svg';

import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    alert('로그인 실패');
    navigate('/signup');
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4">
      <div className="flex w-full max-w-lg flex-col gap-20">
        {/* zerone 로고 */}
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="zerone 로고" className="h-48 w-auto" />
          <h1 className="text-center text-2xl font-bold text-white md:text-3xl">
            zerone 로그인하기
          </h1>
        </div>

        {/* 로그인/회원가입 버튼 */}
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-3 md:max-w-md">
          <ActionButton
            variant="google"
            size="lg"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3"
          >
            <img src={GoogleLogo} alt="Google 로고" className="h-6 w-6" />
            <span>Google 계정으로 로그인</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
