import ActionButton from '@/components/ui/ActionButton';
import Dropdown from '@/components/ui/Dropdown';
import Input from '@/components/ui/Input';
import { useEffect, useState } from 'react';

export default function SignupPage() {
  // 상태
  const [Sid, setSid] = useState<string>('');
  const [Name, setName] = useState<string>('');
  const [BJ_id, setBJ_id] = useState<string>('');
  const [Phone, setPhone] = useState<string>('');
  const [College, setCollege] = useState<string>('');
  const [Major, setMajor] = useState<string>('');
  const [isEtc, setIsEtc] = useState<boolean>(false);

  const collegeOptions = [
    '공학대학',
    '소프트웨어융합대학',
    '약학대학',
    '첨단융합대학',
    '글로벌문화통상대학',
    '커뮤니케이션&컬처대학',
    '경상대학',
    '디자인대학',
    '예체능대학',
    'LIONS칼리지',
    '기타', // 추가
  ];

  // 드롭다운 내용
  const departmentMap: Record<string, string[]> = {
    공학대학: [
      '건설환경공학과',
      '건축학부',
      '교통·물류공학과',
      '기계공학과',
      '로봇공학과',
      '배터리소재화학공학과',
      '산업경영공학과',
      '스마트융합공학부',
      '에너지바이오학과',
      '융합시스템공학과',
      '재료화학공학과',
      '전자공학부',
      '지능형로봇학과',
      '해양융합공학과',
    ],
    소프트웨어융합대학: [
      'ICT융합학부',
      '수리데이터사이언스학과',
      '융합전공',
      '인공지능학과',
      '컴퓨터학부',
    ],
    약학대학: ['약학과'],
    첨단융합대학: ['국방지능정보융합공학부', '바이오신약융합학부', '차세대반도체융합공학부'],
    글로벌문화통상대학: [
      '영미언어문화학과',
      '일본학과',
      '중국학과',
      '프랑스학과',
      '한국언어문학과',
    ],
    '커뮤니케이션&컬처대학': ['광고홍보학과', '미디어학과', '문화인류학과', '문화콘텐츠학과'],
    경상대학: ['경제학부', '경영학부', '보험계리학과', '회계세무학과'],
    디자인대학: [
      '산업디자인학과',
      '영상디자인학과',
      '융합디자인학부',
      '주얼리·패션디자인학과',
      '커뮤니케이션디자인학과',
    ],
    예체능대학: ['무용예술학과', '스포츠과학부', '실용음악학과'],
    LIONS칼리지: [
      'LIONS자율전공학부 - 전계열',
      'LIONS자율전공학부 - 자연계열',
      'LIONS자율전공학부 - 인문사회계열',
    ],
  };

  // 학과 → 단과대 역추적 함수
  function findCollegeByMajor(major: string) {
    for (const college in departmentMap) {
      if (departmentMap[college].includes(major)) return college;
    }
    return null;
  }

  // server chogigap
  useEffect(() => {
    const serverMajor = '전자공학부'; // exx
    const college = findCollegeByMajor(serverMajor);

    if (college) {
      setCollege(college);
      setMajor(serverMajor);
      setIsEtc(false);
    } else {
      setCollege('기타');
      setMajor(serverMajor);
      setIsEtc(true);
    }
  }, []);

  // handler
  const EventHandler = () => {
    alert(`
    이름: ${Name}
    학번: ${Sid}
    BJ ID: ${BJ_id}
    전화번호: ${Phone}
    단과대: ${College}
    학과: ${Major}
    `);
  };

  const handleCollegeChange = (college: string) => {
    setCollege(college);
    setMajor('');
    setIsEtc(college === '기타'); // 기타 선택 시 Input으로 전환
  };

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
          <div className="flex flex-row flex-wrap justify-center md:gap-8">
            <InputBox title="이름" value={Name} placeholder="써라" Change={setName} />
            <InputBox title="백준 아이디" value={BJ_id} placeholder="써라" Change={setBJ_id} />
          </div>

          <div className="flex flex-row flex-wrap justify-center md:gap-8">
            <InputBox
              title="학번"
              value={Sid}
              placeholder="ex) 2026012345"
              Change={handleNumberOnly_SID}
            />
            <InputBox
              title="전화번호"
              value={Phone}
              placeholder="ex) 01012345458"
              Change={handleNumberOnly_Phone}
            />
          </div>

          <div className="flex flex-row flex-wrap justify-center md:gap-8">
            <DropDown
              title="단과대"
              value={College}
              placeholder="선택하세요"
              onChange={handleCollegeChange}
              label={collegeOptions}
            />

            {isEtc ? (
              <InputBox
                title="학과"
                value={Major}
                Change={setMajor}
                placeholder="학과를 입력해주세요"
              />
            ) : (
              <DropDown
                title="학과"
                value={Major}
                placeholder="선택하세요"
                onChange={setMajor}
                label={College ? departmentMap[College] : []}
              />
            )}
          </div>
        </div>

        <div className="mt-8 flex w-full justify-center">
          <ActionButton
            variant="primary"
            size="lg"
            onClick={EventHandler}
            className="flex justify-center"
          >
            제출하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

// minimini component
interface inputbox {
  title: string;
  value: string;
  placeholder: string;
  Change: (value: string) => void;
}

interface dropbox {
  title: string;
  value: string;
  placeholder: string;
  label: string[];
  onChange: (value: string) => void;
}

function InputBox({ title, value, placeholder, Change }: inputbox) {
  return (
    <div className="mb-4 flex min-w-80 flex-col gap-1">
      <p className="text-lg text-white">{title}</p>
      <Input value={value} onChange={Change} placeholder={placeholder} />
    </div>
  );
}

function DropDown({ title, value, placeholder, label, onChange }: dropbox) {
  return (
    <div className="flex min-w-80 flex-col gap-1">
      <p className="text-lg text-white">{title}</p>
      <Dropdown lists={label} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
