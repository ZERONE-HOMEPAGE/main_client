interface TextModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export default function TextModal({ isOpen, title, description, onClose }: TextModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="flex w-[320px] flex-col gap-3 rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <button
          onClick={onClose}
          className="mt-2 rounded-md bg-black py-2 text-white transition hover:opacity-80"
        >
          확인
        </button>
      </div>
    </div>
  );
}
