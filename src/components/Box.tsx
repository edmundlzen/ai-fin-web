export default function Box({
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={
        "rounded-md border border-slate-200 bg-white" + " " + className
      }
      {...props}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
