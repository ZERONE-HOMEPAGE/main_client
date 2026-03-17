interface InputModalProps {
  isOpen: boolean;
  value: string;
  error: string;
  title: string;
  description?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function InputModal({
  isOpen,
  value,
  error,
  title,
  description,
  placeholder,
  onChange,
  onSubmit,
  onClose,
}: InputModalProps) {
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
        <p className="mt-2 text-sm text-gray-400">{description}</p>

        {/* 인풋 */}
        <div className="mt-6">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-lg bg-[#2A2F3A] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
              error ? 'ring-red-500' : 'focus:ring-indigo-500'
            }`}
          />
          {/* 에러 */}
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>

        {/* 구분선 */}
        <div className="my-6 h-px w-full bg-gray-700" />

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#2A2F3A] px-5 py-2 text-sm text-gray-300 transition hover:bg-[#343A46]"
          >
            닫기
          </button>
          <button
            onClick={onSubmit}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
