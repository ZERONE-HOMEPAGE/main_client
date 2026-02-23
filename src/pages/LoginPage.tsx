import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icon/logo.png';
import InputModal from '@/components/ui/modal/InputModal';
import TextModal from '@/components/ui/modal/TextModal';
import { initGoogleLogin, renderGoogleButton } from '@/api/google';
import { useLogin } from '@/hooks/useLogin';
import { useLookup } from '@/hooks/useLookup';
import { decodeIdToken } from '@/utils/Decode';
import { parsing } from '@/utils/Parse';
import Button from '@/components/ui/Button';
import ActionButton from '@/components/ui/ActionButton';

export default function LoginPage() {
  // 버튼 최대 길이 (가로)
  const GOOGLE_BUTTON_MAX_WIDTH = 400;
  const navigate = useNavigate();

  // hook
  const { mutate: loginMutate } = useLogin();
  const { mutateAsync: lookupMutate } = useLookup();

  // variable
  const [Phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState('');
  const [idToken, setIdToken] = useState<string>('');
  const googleButtonElementId = 'googleBtn';
  const googleButtonWrapRef = useRef<HTMLDivElement>(null);
  const isGoogleInitializedRef = useRef(false);

  //
  const [isTextOpen, setTextOpen] = useState(false);
  const [isInputOpen, setInputOpen] = useState<boolean>(false);

  // 로그인 상태면 쫓아내기
  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // 구글 버튼
  useEffect(() => {
    const renderButton = () => {
      const wrap = googleButtonWrapRef.current;
      const element = document.getElementById(googleButtonElementId);
      if (!wrap || !element) return;

      element.innerHTML = '';
      renderGoogleButton({
        elementId: googleButtonElementId,
        theme: 'outline',
        size: 'large',
        width: Math.min(Math.round(wrap.offsetWidth), GOOGLE_BUTTON_MAX_WIDTH),
      });
    };

    const setupGoogle = () => {
      const google = (window as any).google;
      if (!google?.accounts?.id) return false;

      if (!isGoogleInitializedRef.current) {
        // 소셜로그인
        initGoogleLogin({
          clientId: '914755238439-2qnng7skka6nme7jq6j24ko8qafrs4sc.apps.googleusercontent.com',
          callback: (idToken) => {
            if (!idToken) return console.log('id_token 없음');
            setIdToken(idToken);

            const decoded = decodeIdToken(idToken);
            const parsed = decoded?.name ? parsing(decoded.name) : null;
            const displayName = parsed?.name ?? decoded?.name ?? '';
            const profileImage = decoded?.picture ?? '';

            if (displayName) {
              sessionStorage.setItem('authUserName', displayName);
            }
            if (profileImage) {
              sessionStorage.setItem('authUserImage', profileImage);
            }

            // 서버로그인
            loginMutate(
              { idToken },
              {
                onSuccess: (res) => {
                  if (res.step === 'NEED_PHONE') {
                    setInputOpen(true);
                  }
                },
                onError: (_err) => {
                  setTextOpen(true);
                },
              },
            );
          },
        });
        isGoogleInitializedRef.current = true;
      }

      renderButton();
      return true;
    };

    // 버튼 갱신
    const timer = window.setInterval(() => {
      if (setupGoogle()) {
        window.clearInterval(timer);
      }
    }, 150);

    setupGoogle();
    window.addEventListener('resize', renderButton);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', renderButton);
    };
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
    } else if (Phone.startsWith('010') && Phone.length !== 11) {
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
            // 매칭됨 => migration
            if (res.step === 'MIGRATION_FOUND') {
              const needSid = res.needsStudentId;
              const needBjid = res.needsBaekjoonId;
              navigate('/migration', { state: { idToken, Phone, needSid, needBjid } });
            }
            // 매칭안됨 => signup
            else {
              navigate('/signup', { state: { idToken, Phone } });
            }
          },
          onError: (_err) => {
            setPhoneError('이미 다른 구글 계정과 연동된 전화번호입니다. 관리자에게 문의해주세요.');
          },
        },
      );
      console.log('저장된 전화번호:', Phone);
      setInputOpen(false);
    } catch {
      console.error();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-black px-4">
      <div className="flex w-full max-w-lg flex-col gap-20">
        {/* zerone 로고 */}
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="zerone 로고" className="h-48 w-auto" />
          <h1 className="text-center text-2xl font-bold text-white md:text-3xl">zerone 영과일</h1>
          <p className="text-center text-sm text-[#8b949e]">
            아래 버튼을 통해 가두모집에 참여해주세요.
          </p>
        </div>

        {/* 로그인/회원가입 버튼 */}
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center space-y-3">
          {/* <div ref={googleButtonWrapRef} className="w-full">
            <div id={googleButtonElementId} className="w-full overflow-hidden rounded-xl" />
          </div> */}
          <ActionButton
            onClick={() => window.open('https://open.kakao.com/o/gSIUi0hi', '_blank')}
            className="w-full"
          >
            가두모집 링크 바로가기
          </ActionButton>
        </div>
      </div>

      <InputModal
        isOpen={isInputOpen}
        value={Phone}
        error={phoneError}
        onChange={handleNumberOnly_Phone}
        onSubmit={handlePhoneSubmit}
        onClose={() => setInputOpen(false)}
      />

      <TextModal
        isOpen={isTextOpen}
        title="로그인 실패"
        description="한양대학교 이메일이 아닙니다."
        onClose={() => setTextOpen(false)}
      />
    </div>
  );
}
