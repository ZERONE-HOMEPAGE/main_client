import { useEffect, useState } from 'react';
import tossIcon from '@/assets/icon/tossIcon.png';
import { duesinfo } from '@/api/dues';
import type { DuesInfoResponse } from '@/types/Dues';
import ActionButton from '@/components/ui/ActionButton';
import { useNavigate } from 'react-router-dom';

interface DuesProps {
  isNew: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function DuesModal({ isNew, isOpen, onClose }: DuesProps) {
  const [duesInfo, setDuesInfo] = useState<DuesInfoResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await duesinfo();
        console.log('duesInfo:', data);
        setDuesInfo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const amount = isNew ? duesInfo?.amountNew : duesInfo?.amountRenew; // New : 신규, reNew : 재갱신

  const infoList = [
    { label: '계좌번호', value: duesInfo?.bankAccount },
    { label: '예금주', value: duesInfo?.bankOwner },
    { label: '입금금액', value: amount },
  ];

  if (!isOpen) return null;

  return (
    <div className="flex h-screen w-full flex-col items-center bg-black">
      <div className="flex max-w-5xl flex-col items-center px-4 py-32">
        <p className="text-3xl font-bold text-white">회원가입</p>
        <p className="mt-2 text-xl text-[#9CA3AF]">
          {isNew
            ? '회원가입이 완료되었습니다. 안내된 계좌로 학회비를 입금해주세요.'
            : '입금까지 시간이 걸립니다.'}
        </p>

        <div className="my-4 w-[420px] rounded-2xl bg-[#1C1F26] px-8 pb-8 pt-2 shadow-2xl">
          <div className="my-4 flex items-center gap-2">
            <img src={tossIcon} className="h-6 w-6" />
            <p className="text-[#D1D5DB]">토스뱅크</p>
          </div>

          {infoList.map((item, index) => (
            <div key={index}>
              <div className="h-px w-full bg-gray-700" />
              <div className="flex py-4">
                <p className="w-24 text-gray-400">{item.label}</p>
                <p className="flex-1 font-medium text-white">{item.value ?? 'loading'}</p>
              </div>
            </div>
          ))}
        </div>
        <ActionButton
          onClick={() => {
            onClose;
            navigate('/');
          }}
          className="min-w-80"
        >
          입금완료
        </ActionButton>
      </div>
    </div>
  );
}
