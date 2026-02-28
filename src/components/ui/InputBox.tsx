import LockIcon from '@/assets/icon/LockIcon.png';

interface inputbox {
  title: string;
  value: string;
  placeholder: string;
  errormessage?: string;
  Change: (value: string) => void;
  isLock?: boolean;
}

export default function InputBox({
  title,
  value,
  placeholder,
  errormessage = '',
  Change,
  isLock = false,
}: inputbox) {
  if (errormessage === '') errormessage = 'NULL';

  return (
    <div className="mb-1 flex min-w-80 flex-col gap-1">
      <p className="text-lg text-white">{title}</p>
      {!isLock ? (
        <>
          <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => Change(e.target.value)}
            className={`w-full rounded-md bg-[#1E2025] px-3 py-2 text-white outline-none transition focus:ring-2`}
          />
          <p className={`text-md ${errormessage === 'NULL' ? 'text-black' : 'text-[#AE4345]'}`}>
            {errormessage}
          </p>
        </>
      ) : (
        <>
          <div className="mb-6 flex w-full items-center rounded-md border border-[#2C2C2E] bg-[#121212] px-3 py-2 text-[#8E8E93]">
            <img src={LockIcon} className="mr-2 h-3 w-2.5" alt="lock icon" />
            <p className="">{value}</p>
          </div>
        </>
      )}
    </div>
  );
}
