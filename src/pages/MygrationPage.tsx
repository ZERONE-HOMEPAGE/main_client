import ActionButton from '@/components/ui/ActionButton';
import InputBox from '@/components/ui/InputBox';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMigration } from '@/hooks/useMigration';
import { MigrationRequest } from '@/types/Auth';

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
  const [PhoneNumber, setPhone] = useState<string>('01047285459');
  const [BJ_id, setBJ_id] = useState<string>('');
  const SidLock = needSid ?? false;
  const BJidLock = needBjid ?? false;

  // error
  const [sidError, setSidError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // handle
  const handleNumberOnly_Phone = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, ''));
  };

  const handleNumberOnly_SID = (value: string) => {
    setSid(value.replace(/[^0-9]/g, ''));
  };

  const handeleSubmit = () => {
    if (!idToken) {
      console.log('idToken이 존재하지않습니다. \n로그인화면으로 이동합니다.');
      navigate('/login'); // idToken x
      return;
    }
    alert(`Token, 학번, 전번 ${idToken} ${Sid} ${PhoneNumber}`);

    const body: MigrationRequest = {
      idToken: idToken,
      phoneNumber: PhoneNumber,
      ...(needSid ? { studentId: Sid } : {}),
      ...(needBjid ? { baekjoonId: BJ_id } : {}),
    };

    migrationMutate(body, {
      onSuccess: (data) => {
        console.log('하이요', data);
      },
    });
  };

  return (
    <div className="flex h-full h-screen w-full flex-col items-center bg-black">
      <div className="max-w-5xl flex-col items-center bg-black px-4 py-32">
        <p className="text-3xl font-bold text-white">오마이그레이션</p>
        <p className="mt-2 text-xl text-[#9CA3AF]">한양대학교 이메일로만 가입할 수 있습니다.</p>

        <div className="mt-8 flex-col gap-2">
          {/* Student ID and Phone NUmber */}
          <div className="flex flex-row flex-wrap justify-center md:gap-8">
            <InputBox
              title="학번"
              value={Sid}
              placeholder="ex) 2026012345"
              errormessage={sidError}
              Change={handleNumberOnly_SID}
              isLock={!SidLock}
            />
            <InputBox
              title="전화번호"
              value={PhoneNumber}
              placeholder="ex) 01012345458"
              errormessage={phoneError}
              Change={handleNumberOnly_Phone}
              isLock={true}
            />
          </div>
          {/* Baekjoon ID */}
          <div className="flex flex-row flex-wrap justify-center">
            <div className="w-full">
              <InputBox
                title="백준 아이디"
                value={BJ_id}
                placeholder="선택"
                Change={setBJ_id}
                isLock={!BJidLock}
              />
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mt-8 flex w-full justify-center">
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
  );
}
