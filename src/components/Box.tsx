export default function Box({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-md border border-slate-200 bg-white" + " " + className
      }
      {...props}
    >
      {children}
    </div>
  );
}
