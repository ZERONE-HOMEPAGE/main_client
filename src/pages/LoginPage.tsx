import logo from '@/assets/icon/logo.png';
import ActionButton from '@/components/ui/ActionButton';
import GoogleLogo from '@/assets/icon/googleLogo.svg';
import { useLogin } from '@/hooks/useLogin';

import { decodeIdToken } from '@/api/Auth/useAuth';
import { initGoogleLogin } from '@/api/Google/useGoogle';
import { Parsing } from '@/api/Auth/parse';

export default function LoginPage() {
  const { mutate: loginMutate } = useLogin();

  initGoogleLogin({
    clientId: '914755238439-2qnng7skka6nme7jq6j24ko8qafrs4sc.apps.googleusercontent.com',
    callback: (idToken) => {
      if (!idToken) return alert('id_token 없음');

      const payload = decodeIdToken(idToken);
      if (!payload) return alert('id_token 디코딩 실패');

      const user = Parsing(payload.name);

      // 이벤트 안에서 mutate 호출
      loginMutate(
        { idToken },
        {
          onSuccess: (res) => {
            console.log('액세스 토큰:', res.accessToken);
            localStorage.setItem('accessToken', res.accessToken);

            alert(`이름: ${user?.name}\n학과: ${user?.major}\n이메일: ${payload.email}`);
          },
          onError: (err) => {
            console.error(err);
          },
        },
      );
    },
  });

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
            onClick={() => (window as any).google.accounts.id.prompt()}
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
