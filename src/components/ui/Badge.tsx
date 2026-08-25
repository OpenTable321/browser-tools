import Link from "next/link";

interface BadgeProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ href, children, className = "" }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const color = "bg-brand-50 text-brand-700";

  if (href) {
    return (
      <Link href={href} className={`${base} ${color} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <span className={`${base} ${color} ${className}`}>{children}</span>
  );
}
