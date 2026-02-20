import ActionButton from '@/components/ui/ActionButton';
import Input from '@/components/ui/Input';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MygrationPage() {
  const navigate = useNavigate();

  // 상태 (request body순으로 정렬)
  const [Sid, setSid] = useState<string>('');
  const [Phone, setPhone] = useState<string>('');
  const [BJ_id, setBJ_id] = useState<string>('');

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

  return (
    <div className="flex h-full h-screen w-full flex-col items-center bg-black">
      <div className="max-w-5xl flex-col items-center bg-black px-4 py-32">
        <p className="text-3xl font-bold text-white">회원가입</p>
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
            />
            <InputBox
              title="전화번호"
              value={Phone}
              placeholder="ex) 01012345458"
              errormessage={phoneError}
              Change={handleNumberOnly_Phone}
            />
          </div>
          {/* Baekjoon ID */}
          <div className="flex flex-row flex-wrap justify-center">
            <div className="w-full">
              <InputBox title="백준 아이디" value={BJ_id} placeholder="선택" Change={setBJ_id} />
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mt-8 flex w-full justify-center">
        <ActionButton
          variant="primary"
          size="lg"
          onClick={() => {
            alert(`학번, 전번 ${Sid} ${Phone}`);
          }}
          className="flex justify-center"
        >
          제출하기
        </ActionButton>
      </div>
    </div>
  );
}

// minimini component
interface inputbox {
  title: string;
  value: string;
  placeholder: string;
  errormessage?: string;
  Change: (value: string) => void;
}

function InputBox({ title, value, placeholder, errormessage = '', Change }: inputbox) {
  if (errormessage === '') errormessage = 'NULL';
  return (
    <div className="mb-1 flex min-w-80 flex-col gap-1">
      <p className="text-lg text-white">{title}</p>
      <Input value={value} onChange={Change} placeholder={placeholder} />
      <p className={`text-md ${errormessage === 'NULL' ? 'text-black' : 'text-[#AE4345]'}`}>
        {errormessage}
      </p>
    </div>
  );
}
