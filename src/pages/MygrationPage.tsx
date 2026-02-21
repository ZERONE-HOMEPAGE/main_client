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
  const { mutate: MigrationMutate } = useMigration();
  const state = (location.state as MigrationState) ?? {};

  // 상태 (request body순으로 정렬)
  const { idToken, Phone, needSid, needBjid } = state;
  const Token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyNzU0MDdjMzllODAzNmFhNzM1ZWIyYzE3YzU0ODc2MWNlZDZhNjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MTQ3NTUyMzg0MzktMnFubmc3c2trYTZubWU3anE2ajI0a284cWFmcnM0c2MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MTQ3NTUyMzg0MzktMnFubmc3c2trYTZubWU3anE2ajI0a284cWFmcnM0c2MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwOTE2NTg3NjYyNjY4OTEyODUiLCJlbWFpbCI6InNqbzQ4MDUyNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzcxNjU4MzQ2LCJuYW1lIjoi7KGw7ISx66-8IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pEQU0xNk81enFWek13dFEyUEVVcEI2WkQxZU9XN2dWMXpJa2RlOG5GUEIwZkFZZzA9czk2LWMiLCJnaXZlbl9uYW1lIjoi7ISx66-8IiwiZmFtaWx5X25hbWUiOiLsobAiLCJpYXQiOjE3NzE2NTg2NDYsImV4cCI6MTc3MTY2MjI0NiwianRpIjoiMGZmNDhkNGI0OWU4Zjg1NDI0OWZiZGJkYjg5NWUwMGIwOWEwYjk2NCJ9.SRLcdejpbH_OP3QLeYdW1br5sb5ykyzTxFweBSJNQWOPPnjamPHuYnEnXwcozeWo7d-zOrAEbQ1lrWsjiTViGAZ1n-60jl48PNfFfkzh6gK0JaG3tdWpicCAnk5rQZYU1_l4PnyljUTnUM6h8SHvmL9S7zRudAXgom-Vzv-GgJnlbAx9tv1QvZvnvf0XXom3bnbWT3IAiCavK3wpXoyU-xyyQY_L2r-IwYtcyoynnvtTQUWN96XOd0MVvu57vnpDCy03zoJ63U-vl-UdJKxWzHxJ62wOhp5Xos927vzB0UNwqgYZqNEnWDT5sdys-mY2fKBmsk36BrGezUXvko7_2g';
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
    if (!Token) {
      console.log('idToken이 존재하지않습니다. \n로그인화면으로 이동합니다.');
      navigate('/login'); // idToken x
      return;
    }
    alert(`학번, 전번 ${Sid} ${PhoneNumber}`);

    const body: MigrationRequest = {
      idToken: Token,
      phoneNumber: PhoneNumber,
      ...(true ? { studentId: Sid } : {}),
      ...(needBjid ? { baekjoonId: BJ_id } : {}),
    };

    MigrationMutate(body, {
      onSuccess: (data) => {
        navigate('/');
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
              isLock={SidLock}
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
                isLock={BJidLock}
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
