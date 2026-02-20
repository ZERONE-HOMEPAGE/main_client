import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icon/logo.png';
import ActionButton from '@/components/ui/ActionButton';
import InputModal from '@/components/ui/InputModal';
import GoogleLogo from '@/assets/icon/googleLogo.svg';
import { initGoogleLogin } from '@/api/Google/useGoogle';
import { useLogin } from '@/hooks/useLogin';
import { useLookup } from '@/hooks/useLookup';

export default function LoginPage() {
  const navigate = useNavigate();
  // hook
  const { mutate: loginMutate } = useLogin();
  const { mutateAsync: lookupMutate } = useLookup();

  // variable
  const [isOpen, setOpen] = useState<boolean>(false);
  const [Phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState('');
  const [idToken, setIdToken] = useState<string>('');

  useEffect(() => {
    // 소셜로그인
    initGoogleLogin({
      clientId: '914755238439-2qnng7skka6nme7jq6j24ko8qafrs4sc.apps.googleusercontent.com',
      callback: (idToken) => {
        if (!idToken) return console.log('id_token 없음');
        setIdToken(idToken);
        // 서버로그인
        loginMutate(
          { idToken },
          {
            onSuccess: (res) => {
              if (res.step === 'NEED_PHONE') {
                setOpen(true);
              }
            },
          },
        );
      },
    });
  }, []);

  // handle
  const handleNumberOnly_Phone = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, ''));
  };

  const handlePhoneSubmit = async () => {
    let valid = true;

    // 검사
    if (!Phone) {
      setPhoneError('전화번호를 기입해주세요.');
      valid = false;
    } else if (Phone.length !== 11) {
      setPhoneError('전화번호 11자리를 기입해주세요.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!valid) return;

    try {
      await lookupMutate(
        {
          idToken: idToken,
          phoneNumber: Phone,
        },
        {
          onSuccess: (res) => {
            // 매칭됨 => mygration
            if (res.step === 'MIGRATION_FOUND') {
              navigate('/mygration', { state: { idToken, res } });
            }
            // 매칭안됨 => signup
            else {
              navigate('/signup', { state: { idToken, Phone } });
            }
          },
          onError: (err) => {
            setPhoneError('이미 다른 구글 계정과 연동된 전화번호입니다. 관리자에게 문의해주세요.');
          },
        },
      );
      console.log('저장된 전화번호:', Phone);
      setOpen(false);
    } catch {
      console.error();
    }
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
            onClick={() => (window as any).google.accounts.id.prompt()}
            className="flex w-full items-center justify-center gap-3"
          >
            <img src={GoogleLogo} alt="Google 로고" className="h-6 w-6" />
            <span>Google 계정으로 로그인</span>
          </ActionButton>
        </div>
      </div>

      <InputModal
        isOpen={isOpen}
        value={Phone}
        error={phoneError}
        onChange={handleNumberOnly_Phone}
        onSubmit={handlePhoneSubmit}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
