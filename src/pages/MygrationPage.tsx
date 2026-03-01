import ActionButton from '@/components/ui/ActionButton';
import InputBox from '@/components/ui/InputBox';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMigration } from '@/hooks/useMigration';
import { MigrationRequest } from '@/types/Auth';
import { useEffect } from 'react';
import { isLoggedIn } from '@/utils/token';
import DuesModal from '@/components/ui/modal/DuesModal';

interface MigrationState {
  idToken: string;
  Phone: string;
  needSid: boolean;
  needBjid: boolean;
}

export default function MygrationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: migrationMutate } = useMigration();
  const state = (location.state as MigrationState) ?? {};

  // 상태 (request body순으로 정렬)
  const { idToken, Phone, needSid, needBjid } = state;
  const [Sid, setSid] = useState<string>('');
  const [PhoneNumber, setPhone] = useState<string>(Phone);
  const [BJ_id, setBJ_id] = useState<string>('');

  const SidLock = needSid ?? false;
  const BJidLock = needBjid ?? false;

  const [onModal, setOnModal] = useState<boolean>(false);

  // error
  const [sidError, setSidError] = useState<string>('');
  const [BJidError, setBJidError] = useState<string>('');

  // handle
  const handleNumberOnly_Phone = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, ''));
  };

  const handleNumberOnly_SID = (value: string) => {
    setSid(value.replace(/[^0-9]/g, '').slice(0, 10));
  };

  const handeleSubmit = () => {
    if (!idToken) {
      console.log('idToken이 존재하지않습니다. \n로그인화면으로 이동합니다.');
      navigate('/login'); // idToken x
      return;
    }

    const body: MigrationRequest = {
      idToken: idToken,
      phoneNumber: PhoneNumber,
      ...(needBjid ? { baekjoonId: BJ_id } : {}),
      ...(needSid ? { studentId: Sid } : {}),
    };

    if (!validateFields()) return; // 필드검사)

    migrationMutate(body, {
      onSuccess: (data) => {
        // 마이그레이션 o + 학회비 지불 o
        if (data.step === 'LOGIN_SUCCESS') {
          sessionStorage.setItem(data.accessToken, 'accessToken');
          navigate('/');
        }
        // 마이그레이션 o + 학회비 지불 x
        else if (data.step === 'LOGIN_BLOCKED') {
          setOnModal(true);
        }
      },
      onError: (err) => {
        if (err.response?.data.step === 'VALIDATION_ERROR') {
          // (리팩토링 필요)
          if (err.response?.data.errors.length === 2) {
            setSidError('이미 등록된 학번입니다.');
            setBJidError('이미 등록된 백준 아이디 입니다.');
          } else if (err.response?.data.errors[0]?.field === 'studentId') {
            setSidError('이미 등록된 학번입니다.');
          } else if (err.response?.data.errors[0]?.field === 'baekjoonId') {
            setBJidError('이미 등록된 백준 아이디 입니다.');
          }
        }
      },
    });
  };

  // url접근 방지 (로그인상태)
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // field검사
  const validateFields = () => {
    let valid = true;

    if (needSid) {
      if (!Sid) {
        setSidError('학번을 기입해주세요.');
        valid = false;
      } else if (Sid.length !== 10) {
        setSidError('학번은 총 10자리 입니다.');
        valid = false;
      } else {
        setSidError('');
      }
    }

    return valid;
  };

  return onModal ? (
    <DuesModal
      isNew={false}
      isOpen={onModal}
      onClose={() => setOnModal}
      onConfirm={() => setOnModal}
    />
  ) : (
    <div className="flex h-full h-screen w-full flex-col items-center bg-black">
      <div className="max-w-5xl flex-col items-center bg-black px-4 py-32">
        <p className="flex justify-center text-3xl font-bold text-white">마이그레이션</p>
        <p className="mt-2 flex justify-center text-xl text-[#9CA3AF]">누락된 정보가 있습니다.</p>

        <div className="mt-4 flex w-full flex-col flex-wrap justify-center gap-2">
          <InputBox
            title="전화번호"
            value={PhoneNumber}
            placeholder="ex) 01012345458"
            Change={handleNumberOnly_Phone}
            isLock={true}
          />
          <InputBox
            title="학번"
            value={Sid}
            placeholder="ex) 2026012345"
            errormessage={sidError}
            Change={handleNumberOnly_SID}
            isLock={!SidLock}
          />
          <InputBox
            title="백준 아이디"
            value={BJ_id}
            placeholder="선택"
            errormessage={BJidError}
            Change={setBJ_id}
            isLock={!BJidLock}
          />
        </div>

        {/* submit */}
        <div className="mt-4 flex w-full justify-center">
          <ActionButton
            variant="primary"
            size="lg"
            onClick={handeleSubmit}
            className="flex justify-center"
          >
            제출하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
