import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import logo from '@/assets/icon/logo.png';
import ScrollDownBtn from '@/components/ui/ScrollDownBtn';
import DuesModal from '@/components/ui/modal/DuesModal';
import TextModal from '@/components/ui/modal/TextModal';
import { useMainCta } from '@/hooks/useMainCta';
import { useRenew } from '@/hooks/useRenew';

export default function MobileHero() {
  const navigate = useNavigate();
  const cta = useMainCta();
  const { mutate: RenewMutate } = useRenew();
  const [isDuesOpen, setIsDuesOpen] = useState(false);
  const [resultTitle, setResultTitle] = useState('');
  const [resultDesc, setResultDesc] = useState('');
  const [onResult, setOnResult] = useState<boolean>(false);

  const handleRenew = () => {
    setIsDuesOpen(false);

    RenewMutate(undefined, {
      onSuccess: (data) => {
        switch (data.step) {
          case 'RENEW_REQUESTED':
            setResultTitle('재가입 신청 완료');
            setResultDesc('재가입 신청이 접수되었습니다.');
            break;

          case 'RENEW_PENDING':
            setResultTitle('처리 대기 중');
            setResultDesc(
              '관리자가 수동으로 처리하기에, 최대 하루정도의 시간이 소요 될 수 있습니다.',
            );
            break;

          case 'RENEW_ALREADY_COMPLETED':
            setResultTitle('이미 재가입 완료');
            setResultDesc('이미 재가입이 완료된 상태입니다.');
            break;

          case 'RENEW_HONOR_AUTO':
            setResultTitle('자동 재가입');
            setResultDesc('명예회원 자동 재가입이 완료되었습니다.');
            break;

          default:
            setResultTitle('');
            setResultDesc('');
        }

        setOnResult(true);
      },

      onError: () => {
        setResultTitle('재가입 실패');
        setResultDesc('권한이 없거나 오류가 발생했습니다.');
        setOnResult(true);
      },
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-evenly bg-black text-white">
      <div>
        <img src={logo} alt="ZERONE" className="" />
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl text-[20px] text-gray-400">한양대학교 ERICA 소프트웨어융합대학</p>
          <h1 className="text-4xl font-bold text-white">알고리즘학회 영과일</h1>
          {cta === 'JOIN' && (
            <Button variant="primary" onClick={() => navigate('/login')} className="text-black">
              영과일 가입 →
            </Button>
          )}
          {cta === 'RENEW' && (
            <Button variant="primary" onClick={() => setIsDuesOpen(true)} className="text-black">
              영과일 재가입 →
            </Button>
          )}
          {cta === 'JOIN' && <></>}
        </div>
      </div>
      <></>
      <ScrollDownBtn />

      {/* 계좌 알림 */}
      <DuesModal
        isNew={false}
        isOpen={isDuesOpen}
        onClose={() => setIsDuesOpen(false)}
        onConfirm={handleRenew}
      />

      {/* Renew 모달 */}
      <TextModal
        isOpen={onResult}
        title={resultTitle}
        description={resultDesc}
        onClose={() => setOnResult(false)}
      />
    </div>
  );
}
