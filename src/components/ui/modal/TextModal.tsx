interface TextModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export default function TextModal({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  children,
}: TextModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[420px] rounded-2xl bg-[#1C1F26] px-8 py-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 타이틀 */}
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {/* 설명 텍스트 */}
        <p className="mt-4 text-sm text-gray-400">{description}</p>

        {/* 구분선 */}
        <div className="my-6 h-px w-full bg-gray-700" />

        {children}

        {/* 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#2A2F3A] px-5 py-2 text-sm text-gray-300 transition hover:bg-[#343A46]"
          >
            닫기
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="ml-4 rounded-lg bg-[#5F63E6] px-5 py-2 text-sm text-gray-300 transition hover:bg-[#343A46]"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
