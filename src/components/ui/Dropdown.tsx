import { useState } from 'react';

interface Props {
  lists: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Dropdown({ lists, value, placeholder, onChange, disabled = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = value || placeholder;

  const handleToggle = () => {
    if (disabled || lists.length === 0) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full rounded-md px-3 py-2 text-left ${selectedLabel === '선택하세요' ? 'text-[#6B7280]' : 'text-white'} ${disabled ? 'cursor-not-allowed bg-gray-500' : 'bg-[#1E2025]'} `}
      >
        {selectedLabel}
      </button>

      {isOpen && !disabled && lists.length > 0 && (
        <ul className="text-md absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-md bg-[#1E2025] text-[#6B7280] shadow">
          {lists.map((item) => (
            <li
              key={item}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 hover:bg-[#4447AC] ${
                item === value ? 'bg-[#5F63E6] text-[#FEFEFF]' : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
