export default function Card({
  children,
  className,
  animation,
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
}) {
  return (
    <div data-aos={animation} className={`rounded bg-white p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}
