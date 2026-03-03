import ActionButton from '@/components/ui/ActionButton';
import InputBox from '@/components/ui/InputBox';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSignup } from '@/hooks/useSignup';
import DuesModal from '@/components/ui/modal/DuesModal';
import { isLoggedIn } from '@/utils/token';
import { SignupError } from '@/types/Auth';
import { AxiosError } from 'axios';

interface SignupState {
  idToken: string;
  Phone: string;
}

export default function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const preset_info = useUserInfo();
  const { mutate: SignupMutate } = useSignup();

  // 상태 (request body순으로 정렬)
  const { idToken, Phone } = (location.state as SignupState) ?? {};
  const [Name, setName] = useState<string>(preset_info.name);
  const [Sid, setSid] = useState<string>('');
  const [Major, setMajor] = useState<string>(preset_info.major);
  const [PhoneNumber, setPhone] = useState<string>(Phone);
  const [BJ_id, setBJ_id] = useState<string>('');
  const [Email, setEmail] = useState<string>(preset_info.email);

  // 학회비 납부 안내 모달
  const [onModal, setOnModal] = useState<boolean>(false);

  // error
  const [sidError, setSidError] = useState<string>('');
  const [Bj_idError, setBj_idError] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // handler
  const handleSubmit = () => {
    if (!idToken) {
      console.log('idToken이 존재하지않습니다. \n로그인화면으로 이동합니다.');
      navigate('/login'); // idToken x
      return;
    }

    if (!validateFields()) return; // 필드검사

    SignupMutate(
      {
        idToken: idToken,
        studentId: Sid,
        name: Name,
        email: preset_info.email,
        department: Major,
        phoneNumber: PhoneNumber,
        baekjoonId: BJ_id,
      },
      {
        onSuccess: (_data) => {
          setOnModal(true);
        },
        onError: (err: AxiosError<SignupError>) => {
          const errors = err.response?.data?.errors;

          // 400 → 형식 오류 / 필드 누락
          if (err.response?.status === 400) {
            console.error('요청 형식이 잘못되었습니다.', err);
          }

          // 409 → 중복
          else if (err.response?.status === 409) {
            if (errors?.length === 2) {
              setSidError('존재하는 학번입니다.');
              setBj_idError('존재하는 백준 ID입니다.');
            } else if (errors?.[0]?.field === 'studentId') {
              setSidError('존재하는 학번입니다.');
            } else if (errors?.[0]?.field === 'baekjoonId') {
              setBj_idError('존재하는 백준 ID입니다.');
            }
          }
        },
      },
    );
  };

  const handleNumberOnly_Phone = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, '').slice(0, 11));
  };

  const handleNumberOnly_SID = (value: string) => {
    setSid(value.replace(/[^0-9]/g, '').slice(0, 10));
  };

  // field검사
  const validateFields = () => {
    let valid = true;

    if (!Sid) {
      setSidError('학번을 기입해주세요.');
      valid = false;
    } else if (Sid.length !== 10) {
      setSidError('학번은 총 10자리 입니다.');
      valid = false;
    } else {
      setSidError('');
    }

    return valid;
  };

  return (
    <>
      <div className="flex h-full h-screen w-full flex-col items-center bg-black"></div>
      {onModal ? ( // 테스트 해봐
        <DuesModal
          isNew={true}
          isOpen={onModal}
          onClose={() => navigate('/')}
          onConfirm={() => navigate('/')}
        />
      ) : (
        <div className="max-w-5xl flex-col items-center bg-black px-4 py-32">
          <p className="text-3xl font-bold text-white">회원가입</p>
          <p className="mt-2 text-xl text-[#9CA3AF]">한양대학교 이메일로만 가입할 수 있습니다.</p>

          <div className="mt-8 flex-col gap-2">
            {/* Name and Baekjoon ID */}
            <div className="flex flex-row flex-wrap justify-center md:gap-8">
              <InputBox
                title="이름"
                value={Name}
                placeholder="ex)홍길동"
                errormessage={''}
                Change={setName}
                isLock={true}
              />
              <InputBox
                title="전화번호"
                value={PhoneNumber}
                placeholder="ex) 01012345458"
                errormessage={''}
                Change={handleNumberOnly_Phone}
                isLock={true}
              />
            </div>

            {/* department and email*/}
            <div className="flex flex-row flex-wrap justify-center md:gap-8">
              <InputBox
                title="학과"
                value={Major}
                placeholder="학과를 입력하세요"
                errormessage={''}
                Change={setMajor}
                isLock={true}
              />
              <InputBox
                title="이메일"
                value={Email}
                placeholder="field"
                Change={setEmail}
                isLock={true}
              />
            </div>

            {/* Student ID and Phone NUmber */}
            <div className="flex flex-row flex-wrap justify-center md:gap-8">
              <InputBox
                title="학번"
                value={Sid}
                placeholder="ex) 2026012345"
                errormessage={sidError}
                Change={handleNumberOnly_SID}
              />
              <InputBox
                title="백준 ID"
                value={BJ_id}
                placeholder="(선택)"
                Change={setBJ_id}
                errormessage={Bj_idError}
              />
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center">
            <ActionButton
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              className="flex justify-center"
            >
              제출하기
            </ActionButton>
          </div>
        </div>
      )}
    </>
  );
}
