type NewButtonProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const styles = {
  variant: {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-100',
  },
  size: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  disabled: 'opacity-50 cursor-not-allowed',
};

export default function NewButton({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  className,
}: NewButtonProps) {
  return (
    <button
      className={`${styles.variant[variant]} ${styles.size[size]} ${disabled ? styles.disabled : ''} rounded-lg transition-colors ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
