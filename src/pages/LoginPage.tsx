import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icon/logo.png';
import InputModal from '@/components/ui/modal/InputModal';
import TextModal from '@/components/ui/modal/TextModal';
import { initGoogleLogin, renderGoogleButton } from '@/api/google';
import { useLogin } from '@/hooks/useLogin';
import { useLookup } from '@/hooks/useLookup';
import { decodeIdToken } from '@/utils/Decode';
import { duesinfo } from '@/api/dues';
import type { DuesInfoResponse } from '@/types/Dues';
import { parsing } from '@/utils/Parse';
import { isLoggedIn } from '@/utils/token';
import type { ValidationError422 } from '@/types/Auth';
import { AxiosError } from 'axios';
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

  // 모달용 함수
  const [isPendingOpen, setPendingOpen] = useState(false);
  const [onTextOpen, setTextOpen] = useState(false);
  const [onInputOpen, setInputOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 로그인 상태면 쫓아내기
  useEffect(() => {
    if (isLoggedIn()) {
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
                  } else if (res.step === 'LOGIN_BLOCKED') {
                    setPendingOpen(true);
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

    setConfirmOpen(true);
  };

  const handleLookup = async () => {
    try {
      await lookupMutate(
        {
          idToken: idToken,
          phoneNumber: Phone,
        },
        {
          onSuccess: (res) => {
            // 매칭됨 => migration
            if (res.step === 'MIGRATION_FOUND' && res.needsStudentId) {
              const needSid = res.needsStudentId;
              const needBjid = res.needsBaekjoonId;
              navigate('/migration', { state: { idToken, Phone, needSid, needBjid } });
            }
            // 매칭안됨 => signup
            else {
              navigate('/signup', { state: { idToken, Phone } });
            }
          },
          onError: (err) => {
            const axiosErr = err as unknown as AxiosError<ValidationError422>;
            const status = axiosErr.response?.status;
            //전화번호 형식 오류와 구분 필요(422/400 처리되면 분기하기)
            if (status === 422 || status === 400) {
              const msg = axiosErr.response?.data?.detail?.[0]?.msg;
              setPhoneError(msg ?? '전화번호 형식이 올바르지 않습니다.');
            } else {
              setConfirmOpen(false);
              setPhoneError(
                '이미 다른 구글 계정과 연동된 전화번호입니다. 관리자에게 문의해주세요.',
              );
            }
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
    <div className="-mt-4 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-8">
      <div className="flex w-full max-w-lg flex-col gap-20">
        {/* zerone 로고 */}
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="zerone 로고" className="h-48 w-auto" />
          <h1 className="text-center text-2xl font-bold text-white md:text-3xl">
            zerone 로그인하기
          </h1>
          <p className="text-center text-sm text-[#8b949e]">한양대 이메일로 로그인해주세요</p>
        </div>

        {/* 로그인/회원가입 버튼 */}
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center space-y-3">
          <div ref={googleButtonWrapRef} className="w-full">
            <div id={googleButtonElementId} className="w-full overflow-hidden rounded-xl" />
          </div>
          <ActionButton
            onClick={() => window.open('https://open.kakao.com/o/gSIUi0hi', '_blank')}
            className="w-full"
          >
            가두모집 링크 바로가기
          </ActionButton>
        </div>
      </div>

      <InputModal
        isOpen={onInputOpen}
        value={Phone}
        error={phoneError}
        onChange={handleNumberOnly_Phone}
        onSubmit={handlePhoneSubmit}
        onClose={() => setInputOpen(false)}
      />

      <TextModal
        isOpen={confirmOpen}
        title="전화번호 확인"
        description={`입력하신 번호가 ${Phone} 맞습니까?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleLookup}
      />

      <TextModal
        isOpen={onTextOpen}
        title="로그인 실패"
        description="한양대학교 이메일이 아닙니다."
        onClose={() => setTextOpen(false)}
      />

      <TextModal
        isOpen={isPendingOpen}
        title="회원가입 승인 대기중"
        description="입금 확인 후 승인 처리됩니다. 승인 완료 후 로그인이 가능하며, 승인 완료 시 메일이 발송됩니다. 관리자가 수동으로 처리하기에, 최대 하루정도의 시간이 소요 될 수 있습니다."
        onClose={() => setPendingOpen(false)}
      >
        <Dues isNew={true} />
      </TextModal>
    </div>
  );
}

interface DuesProps {
  isNew: boolean;
}

function Dues({ isNew }: DuesProps) {
  const [onDuesOpen, setDuesOpen] = useState<boolean>(false);
  const [duesInfo, setDuesInfo] = useState<DuesInfoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await duesinfo();
        setDuesInfo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const amount = isNew ? duesInfo?.amountNew : duesInfo?.amountRenew;

  const infoList = [
    { label: '계좌번호', value: duesInfo?.bankAccount },
    { label: '예금주', value: duesInfo?.bankOwner },
    { label: '입금금액', value: amount },
  ];

  return (
    <>
      <button
        className="-mt-1 font-semibold text-gray-500 underline"
        onClick={() => setDuesOpen((prev) => !prev)}
      >
        계좌를 잊으셨나요?
      </button>
      {onDuesOpen && (
        <div className="ml-3 mt-2 items-center justify-center">
          <p className="text-white">
            {infoList[0].label} : {infoList[0].value}
          </p>
          <p className="text-white">
            {infoList[1].label} : {infoList[1].value}
          </p>
          <p className="text-white">
            {infoList[2].label} : {infoList[2].value}
          </p>
        </div>
      )}
    </>
  );
}
