type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const styles = {
  primary: 'bg-[#8ab3e2] py-2 px-4 rounded-full',
  secondary: 'bg-gray-500 text-white py-2 px-4 rounded',
  disabled: 'opacity-50 cursor-not-allowed',
};

export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      className={`${styles[variant]} ${disabled ? styles.disabled : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
