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
        <p
          className={`border-1 w-full rounded-md border-[#2C2C2E] bg-[#121212] px-3 py-2 outline-none transition focus:ring-2 text-[#8E8E93]`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
