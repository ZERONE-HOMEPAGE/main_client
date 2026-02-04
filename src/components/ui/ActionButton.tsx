type ActionButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const styles = {
  variant: {
    primary: 'bg-zerone text-white hover:bg-opacity-80 transition-all',
    secondary: 'bg-[#1E2025] text-[#98989C] hover:bg-opacity-80 transition-all',
  },
  size: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  disabled: 'opacity-50 cursor-not-allowed',
};

export default function ActionButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className,
}: ActionButtonProps) {
  return (
    <button
      className={`${styles.variant[variant]} ${styles.size[size]} ${disabled ? styles.disabled : ''} rounded-xl transition-colors ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
