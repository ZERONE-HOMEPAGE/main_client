import { useEffect, useState } from 'react';
import tossIcon from '@/assets/icon/tossIcon.png';
import { duesinfo } from '@/api/dues';
import type { DuesInfoResponse } from '@/types/Dues';

interface DuesProps {
  isNew: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DuesModal({ isNew, isOpen, onClose, onConfirm }: DuesProps) {
  const [duesInfo, setDuesInfo] = useState<DuesInfoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await duesinfo();
        setDuesInfo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const amount = isNew ? duesInfo?.amountNew : duesInfo?.amountRenew;

  const infoList = [
    { label: '계좌번호', value: duesInfo?.bankAccount },
    { label: '예금주', value: duesInfo?.bankOwner },
    { label: '입금금액', value: amount },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[420px] rounded-2xl bg-[#1C1F26] px-8 pb-8 pt-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isNew ? '학회비 납부 안내 (신규 가입)' : '학회비 납부 안내 (재가입)'}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {isNew
                ? '회원가입이 완료되었습니다. 안내된 계좌로 학회비를 입금해주세요.'
                : '아래 계좌로 학회비를 입금해주세요.'}
            </p>
          </div>
          <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* 은행 */}
        <div className="mb-2 flex items-center gap-2">
          <img src={tossIcon} className="h-5 w-5" />
          <p className="text-sm text-[#D1D5DB]">토스뱅크</p>
        </div>

        {/* 계좌 정보 */}
        {infoList.map((item, index) => (
          <div key={index}>
            <div className="h-px w-full bg-gray-700" />
            <div className="flex py-3">
              <p className="w-24 text-sm text-gray-400">{item.label}</p>
              <p className="flex-1 text-sm font-medium text-white">
                {item.value ?? '불러오는 중...'}
              </p>
            </div>
          </div>
        ))}

        {/* 닫기 버튼 */}
        <div className="mt-6">
          <button
            onClick={onConfirm}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            {isNew ? '확인' : '재가입 신청'}
          </button>
        </div>
        {/* 
        <p className="mt-2 flex w-full flex-col items-center font-bold text-[#A1122F]">
          입금 후 버튼을 꼭 눌러주세요!
        </p> 
        */}
      </div>
    </div>
  );
}
