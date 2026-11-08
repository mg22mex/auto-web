import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-[#c01b21] focus-visible:outline-brand-red",
  secondary:
    "bg-transparent text-white border border-brand-border hover:bg-brand-surface focus-visible:outline-brand-accent",
  whatsapp:
    "bg-brand-whatsapp text-[#061630] font-semibold hover:bg-[#4bc460] focus-visible:outline-brand-whatsapp",
  ghost:
    "bg-transparent text-brand-muted hover:text-white focus-visible:outline-brand-accent",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 min-h-11",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
