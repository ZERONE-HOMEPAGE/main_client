import googleLogo from '@/assets/icon/googleLogo.svg';
import hanyangLogo from '@/assets/icon/hanyangLogo.svg';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const handleLogin = () => {
    alert('로그인 로직 아직없음');
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-[#f9f7ff] px-4">
      <Card className="space-y-6 p-12">
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
          <img src={hanyangLogo} alt="냥대로고" className="h-16 w-16 md:h-20 md:w-20" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-2 text-xl font-bold md:text-2xl">영과일 회원가입</h1>
            <p className="text-sm text-gray-600 md:text-base">
              hanyang.ac.kr 도메인의 이메일만 사용 가능합니다.
            </p>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="flex w-full flex-row justify-center gap-4 rounded border bg-[#f9f7ff] p-3 text-center"
        >
          <img src={googleLogo} alt="구글" />
          <div className="flex flex-row items-center gap-1">
            <p>Google 계정으로</p>
            <p className="font-bold text-blue-500">로그인</p>
          </div>
        </button>
      </Card>
      <hr className="m-6 w-[30%]" />
      <p>구글 로그인을 통한 회원가입 시,</p>
      <p>
        영과일의{' '}
        <a
          href="https://www.notion.so/0-1-2a2387bfdae48023a155fe4fe55fe729?source=copy_link"
          className="text-blue-600"
        >
          개인정보 수집 및 이용
        </a>
        에 동의하는 것으로 처리됩니다.
      </p>
    </div>
  );
}
