import ActionButton from '@/components/ui/ActionButton';
import Dropdown from '@/components/ui/Dropdown';
import InputBox from '@/components/ui/InputBox';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSignup } from '@/hooks/useSignup';

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
  const [Major, setMajor] = useState<string>('');
  const [PhoneNumber, setPhone] = useState<string>(Phone);
  const [BJ_id, setBJ_id] = useState<string>('');

  const [College, setCollege] = useState<string>('');
  const [isEtc, setIsEtc] = useState<boolean>(false);

  // error
  const [nameError, setNameError] = useState('');
  const [sidError, setSidError] = useState<string>('');
  const [majorError, setMajorError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // 단과대 목록
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
    '기타(직접 입력)',
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

  // college inverse choojeock
  function findCollegeByMajor(major: string) {
    for (const college in departmentMap) {
      if (departmentMap[college].includes(major)) return college;
    }
    return null;
  }

  // server chogi value
  useEffect(() => {
    const serverMajor = preset_info.major;
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
          navigate('/');
        },
        onError: (err: any) => {
          if (err.status === 409) {
            setSidError('이미 등록된 학번입니다.');
          }
        },
      },
    );
  };

  const handleCollegeChange = (college: string) => {
    setCollege(college);
    setMajor('');
    setIsEtc(college === '기타');
  };

  const handleNumberOnly_Phone = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, ''));
  };

  const handleNumberOnly_SID = (value: string) => {
    setSid(value.replace(/[^0-9]/g, ''));
  };

  // field검사
  const validateFields = () => {
    let valid = true;

    if (!Name) {
      setNameError('이름을 기입해주세요.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!Sid) {
      setSidError('학번을 기입해주세요.');
      valid = false;
    } else if (Sid.length !== 10) {
      setSidError('학번은 총 10자리 입니다.');
      valid = false;
    } else {
      setSidError('');
    }

    if (!PhoneNumber) {
      setPhoneError('전화번호를 기입해주세요.');
      valid = false;
    } else if (PhoneNumber.length !== 11) {
      setPhoneError('전화번호 11자리를 기입해주세요.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!Major) {
      setMajorError('학과를 선택(입력)해주세요.');
      valid = false;
    } else {
      setMajorError('');
    }

    return valid;
  };

  return (
    <div className="flex h-full h-screen w-full flex-col items-center bg-black">
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
              errormessage={nameError}
              Change={setName}
            />
            <InputBox title="백준 아이디" value={BJ_id} placeholder="(선택)" Change={setBJ_id} />
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
              title="전화번호"
              value={PhoneNumber}
              placeholder="ex) 01012345458"
              errormessage={phoneError}
              Change={handleNumberOnly_Phone}
              isLock={true}
            />
          </div>

          {/* College and Major */}
          <div className="flex flex-row flex-wrap justify-center md:gap-8">
            <DropDown
              title="단과대"
              value={College}
              placeholder="선택하세요"
              label={collegeOptions}
              onChange={handleCollegeChange}
            />

            {isEtc ? (
              <InputBox
                title="학과"
                value={Major}
                placeholder="학과를 입력해주세요"
                errormessage={majorError}
                Change={setMajor}
              />
            ) : (
              <DropDown
                title="학과"
                value={Major}
                placeholder="선택하세요"
                label={College ? departmentMap[College] : []}
                errormessage={majorError}
                onChange={setMajor}
              />
            )}
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
    </div>
  );
}

// minimini component
interface dropbox {
  title: string;
  value: string;
  placeholder: string;
  label: string[];
  errormessage?: string;
  onChange: (value: string) => void;
}

function DropDown({ title, value, placeholder, label, errormessage = '', onChange }: dropbox) {
  if (errormessage === '') errormessage = 'NULL';
  return (
    <div className="flex min-w-80 flex-col gap-1">
      <p className="text-lg text-white">{title}</p>
      <Dropdown lists={label} value={value} placeholder={placeholder} onChange={onChange} />
      <p className={`text-md ${errormessage === 'NULL' ? 'text-black' : 'text-[#AE4345]'}`}>
        {errormessage}
      </p>
    </div>
  );
}
