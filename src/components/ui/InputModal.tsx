import { useState } from 'react';

interface InputModalProps {
  isOpen: boolean;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function InputModal({
  isOpen,
  value,
  error,
  onChange,
  onSubmit,
  onClose,
}: InputModalProps) {
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
        <h2 className="text-lg font-semibold">전화번호 입력</h2>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="01012345678"
          maxLength={11}
          className={`rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
        />

        {/* ✅ 에러 메시지 출력 */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={onSubmit}
          className="mt-2 rounded-md bg-black py-2 text-white transition hover:opacity-80"
        >
          제출
        </button>
      </div>
    </div>
  );
}
